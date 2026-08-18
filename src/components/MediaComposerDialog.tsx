import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import BlurOnRoundedIcon from '@mui/icons-material/BlurOnRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CropRoundedIcon from '@mui/icons-material/CropRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import type { Theme } from '@mui/material/styles';
import { trimVideoWithFfmpeg } from '../lib/videoTrim';

type CropPreset = 'original' | 'square' | 'portrait' | 'wide';
type ToolMode = 'draw' | 'arrow' | 'blur' | 'text';

type MediaComposerDialogProps = {
  open: boolean;
  files: File[];
  initialCaption: string;
  busy?: boolean;
  onClose: () => void;
  onConfirm: (files: File[], caption: string) => Promise<void> | void;
};

type NormalizedPoint = {
  x: number;
  y: number;
};

type OverlayStroke = {
  color: string;
  size: number;
  points: NormalizedPoint[];
};

type ArrowOverlay = {
  color: string;
  size: number;
  start: NormalizedPoint;
  end: NormalizedPoint;
};

type TextOverlay = {
  color: string;
  size: number;
  weight: number;
  text: string;
  point: NormalizedPoint;
};

type HistoryEntry = 'draw' | 'blur' | 'arrow' | 'text';

type ImageEditorState = {
  kind: 'image';
  cropPreset: CropPreset;
  rotation: 0 | 90 | 180 | 270;
  drawStrokes: OverlayStroke[];
  blurStrokes: OverlayStroke[];
  arrows: ArrowOverlay[];
  texts: TextOverlay[];
  history: HistoryEntry[];
};

type VideoEditorState = {
  kind: 'video';
  duration: number;
  trimStart: number;
  trimEnd: number;
  posterTime: number;
};

type FileEditorState = ImageEditorState | VideoEditorState | { kind: 'file' };

const BRUSH_COLORS = ['#FF3B30', '#FF9500', '#FFD60A', '#34C759', '#0A84FF', '#FFFFFF'] as const;
const VIDEO_TRIM_MIN_SECONDS = 0.4;

const isImageFile = (file?: File | null): boolean => Boolean(file?.type.startsWith('image/'));
const isVideoFile = (file?: File | null): boolean => Boolean(file?.type.startsWith('video/'));

const createImageEditorState = (): ImageEditorState => ({
  kind: 'image',
  cropPreset: 'original',
  rotation: 0,
  drawStrokes: [],
  blurStrokes: [],
  arrows: [],
  texts: [],
  history: [],
});

const createVideoEditorState = (): VideoEditorState => ({
  kind: 'video',
  duration: 0,
  trimStart: 0,
  trimEnd: 0,
  posterTime: 0,
});

const createEditorStateForFile = (file: File): FileEditorState => {
  if (isImageFile(file)) return createImageEditorState();
  if (isVideoFile(file)) return createVideoEditorState();
  return { kind: 'file' };
};

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('IMAGE_LOAD_FAILED'));
    image.src = url;
  });

const loadVideoMetadata = (url: string): Promise<{ width: number; height: number; duration: number }> =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth || 0,
        height: video.videoHeight || 0,
        duration: Number.isFinite(video.duration) ? video.duration : 0,
      });
    };
    video.onerror = () => reject(new Error('VIDEO_METADATA_FAILED'));
    video.src = url;
  });

const getRotatedDimensions = (width: number, height: number, rotation: number) =>
  rotation % 180 === 0 ? { width, height } : { width: height, height: width };

const getCropRect = (width: number, height: number, preset: CropPreset) => {
  if (preset === 'original') return { sx: 0, sy: 0, sw: width, sh: height };

  const targetRatio = preset === 'square' ? 1 : preset === 'portrait' ? 4 / 5 : 16 / 9;
  const sourceRatio = width / Math.max(height, 1);

  if (sourceRatio > targetRatio) {
    const sw = height * targetRatio;
    return { sx: (width - sw) / 2, sy: 0, sw, sh: height };
  }

  const sh = width / targetRatio;
  return { sx: 0, sy: (height - sh) / 2, sw: width, sh };
};

const getContainedRect = (contentWidth: number, contentHeight: number, boxWidth: number, boxHeight: number) => {
  const safeWidth = Math.max(contentWidth, 1);
  const safeHeight = Math.max(contentHeight, 1);
  const safeBoxWidth = Math.max(boxWidth, 1);
  const safeBoxHeight = Math.max(boxHeight, 1);
  const contentRatio = safeWidth / safeHeight;
  const boxRatio = safeBoxWidth / safeBoxHeight;

  if (contentRatio > boxRatio) {
    const width = safeBoxWidth;
    const height = width / contentRatio;
    return { x: 0, y: (safeBoxHeight - height) / 2, width, height };
  }

  const height = safeBoxHeight;
  const width = height * contentRatio;
  return { x: (safeBoxWidth - width) / 2, y: 0, width, height };
};

const cropLabel = (preset: CropPreset): string => {
  if (preset === 'square') return '1:1';
  if (preset === 'portrait') return '4:5';
  if (preset === 'wide') return '16:9';
  return 'Оригинал';
};

const toolButtonSx = (active: boolean, theme: Theme) => ({
  minHeight: 34,
  px: 1.2,
  borderRadius: 999,
  border: '1px solid',
  borderColor: active ? 'rgba(255,88,80,0.8)' : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
  bgcolor: active ? 'rgba(255,88,80,0.14)' : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : '#fff',
  color: '#fff',
  flexShrink: 0,
});

const drawStrokePath = (ctx: CanvasRenderingContext2D, stroke: OverlayStroke, width: number, height: number) => {
  if (stroke.points.length < 2) return;
  ctx.beginPath();
  stroke.points.forEach((point, index) => {
    const x = point.x * width;
    const y = point.y * height;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
};

const drawArrow = (ctx: CanvasRenderingContext2D, overlay: ArrowOverlay, width: number, height: number) => {
  const startX = overlay.start.x * width;
  const startY = overlay.start.y * height;
  const endX = overlay.end.x * width;
  const endY = overlay.end.y * height;
  const angle = Math.atan2(endY - startY, endX - startX);
  const headLength = Math.max(10, overlay.size * 2.8);

  ctx.strokeStyle = overlay.color;
  ctx.fillStyle = overlay.color;
  ctx.lineWidth = overlay.size;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - headLength * Math.cos(angle - Math.PI / 7), endY - headLength * Math.sin(angle - Math.PI / 7));
  ctx.lineTo(endX - headLength * Math.cos(angle + Math.PI / 7), endY - headLength * Math.sin(angle + Math.PI / 7));
  ctx.closePath();
  ctx.fill();
};

const drawTextOverlay = (ctx: CanvasRenderingContext2D, overlay: TextOverlay, width: number, height: number) => {
  const x = overlay.point.x * width;
  const y = overlay.point.y * height;
  ctx.font = `${overlay.weight} ${overlay.size}px "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(2, overlay.size * 0.18);
  ctx.strokeStyle = 'rgba(0,0,0,0.38)';
  ctx.strokeText(overlay.text, x, y);
  ctx.fillStyle = overlay.color;
  ctx.fillText(overlay.text, x, y);
};

const renderImageOverlayCanvas = (
  canvas: HTMLCanvasElement,
  rectWidth: number,
  rectHeight: number,
  state: ImageEditorState,
) => {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const width = Math.max(1, Math.round(rectWidth));
  const height = Math.max(1, Math.round(rectHeight));
  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  state.drawStrokes.forEach((stroke) => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    drawStrokePath(ctx, stroke, width, height);
    ctx.stroke();
  });

  state.blurStrokes.forEach((stroke) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.26)';
    ctx.lineWidth = stroke.size * 1.7;
    ctx.filter = `blur(${Math.max(6, stroke.size * 1.1)}px)`;
    drawStrokePath(ctx, stroke, width, height);
    ctx.stroke();
    ctx.restore();
  });

  state.arrows.forEach((overlay) => drawArrow(ctx, overlay, width, height));
};

const resolveRecorderMimeType = (): string => {
  if (typeof MediaRecorder === 'undefined') return '';
  const candidates = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  return candidates.find((item) => MediaRecorder.isTypeSupported(item)) || '';
};

const trimVideoFile = async (
  file: File,
  trimStart: number,
  trimEnd: number,
  onProgress?: (progress: number, message: string) => void,
): Promise<File> => {
  const duration = trimEnd - trimStart;
  if (!Number.isFinite(duration) || duration <= VIDEO_TRIM_MIN_SECONDS) return file;

  try {
    onProgress?.(0.04, 'Подготовка ffmpeg...');
    return await trimVideoWithFfmpeg(file, trimStart, trimEnd, {
      onProgress: (progress) => {
        const bounded = Math.max(0, Math.min(1, progress));
        onProgress?.(bounded, bounded >= 1 ? 'Клип готов' : `Обработка видео ${Math.round(bounded * 100)}%`);
      },
    });
  } catch {
    // fall back to MediaRecorder pipeline when ffmpeg.wasm is unavailable
  }

  if (typeof document === 'undefined' || typeof MediaRecorder === 'undefined') return file;

  const url = URL.createObjectURL(file);
  try {
    const video = document.createElement('video');
    video.src = url;
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error('VIDEO_LOAD_FAILED'));
    });

    if (typeof (video as HTMLVideoElement & { captureStream?: () => MediaStream }).captureStream !== 'function') {
      return file;
    }

    const mimeType = resolveRecorderMimeType();
    if (!mimeType) return file;

    const stream = (video as HTMLVideoElement & { captureStream: () => MediaStream }).captureStream();
    const recorder = new MediaRecorder(stream, { mimeType });
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    const stopped = new Promise<File>((resolve, reject) => {
      recorder.onerror = () => reject(new Error('VIDEO_RECORD_FAILED'));
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        if (!blob.size) {
          reject(new Error('VIDEO_RECORD_EMPTY'));
          return;
        }
        const baseName = file.name.replace(/\.[^.]+$/, '') || 'video';
        resolve(new File([blob], `${baseName}-edited.webm`, { type: mimeType, lastModified: Date.now() }));
      };
    });

    await new Promise<void>((resolve, reject) => {
      const onSeeked = () => {
        video.removeEventListener('seeked', onSeeked);
        resolve();
      };
      video.addEventListener('seeked', onSeeked);
      video.currentTime = Math.max(0, trimStart);
      window.setTimeout(() => reject(new Error('VIDEO_SEEK_TIMEOUT')), 5000);
    });

    onProgress?.(0.1, 'Резервная обработка видео...');
    recorder.start(200);
    await video.play();

    await new Promise<void>((resolve) => {
      const tick = () => {
        const nextProgress = Math.min(0.98, Math.max(0, (video.currentTime - trimStart) / Math.max(duration, 0.001)));
        onProgress?.(nextProgress, `Резервная обработка ${Math.round(nextProgress * 100)}%`);
        if (video.currentTime >= trimEnd || video.ended) {
          video.pause();
          resolve();
          return;
        }
        window.requestAnimationFrame(tick);
      };
      tick();
    });

    if (recorder.state !== 'inactive') recorder.stop();
    const result = await stopped;
    onProgress?.(1, 'Клип готов');
    return result;
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(url);
  }
};

const exportEditedImageFile = async (
  file: File,
  previewUrl: string,
  state: ImageEditorState,
): Promise<File> => {
  const image = await loadImage(previewUrl);
  const rotated = getRotatedDimensions(image.naturalWidth, image.naturalHeight, state.rotation);

  const rotatedCanvas = document.createElement('canvas');
  rotatedCanvas.width = Math.max(1, Math.round(rotated.width));
  rotatedCanvas.height = Math.max(1, Math.round(rotated.height));
  const rotatedCtx = rotatedCanvas.getContext('2d');
  if (!rotatedCtx) throw new Error('CANVAS_CONTEXT_UNAVAILABLE');

  rotatedCtx.save();
  if (state.rotation === 90) {
    rotatedCtx.translate(rotatedCanvas.width, 0);
    rotatedCtx.rotate(Math.PI / 2);
  } else if (state.rotation === 180) {
    rotatedCtx.translate(rotatedCanvas.width, rotatedCanvas.height);
    rotatedCtx.rotate(Math.PI);
  } else if (state.rotation === 270) {
    rotatedCtx.translate(0, rotatedCanvas.height);
    rotatedCtx.rotate(-Math.PI / 2);
  }
  rotatedCtx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
  rotatedCtx.restore();

  const crop = getCropRect(rotatedCanvas.width, rotatedCanvas.height, state.cropPreset);
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = Math.max(1, Math.round(crop.sw));
  outputCanvas.height = Math.max(1, Math.round(crop.sh));
  const outputCtx = outputCanvas.getContext('2d');
  if (!outputCtx) throw new Error('CANVAS_CONTEXT_UNAVAILABLE');

  outputCtx.drawImage(rotatedCanvas, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, outputCanvas.width, outputCanvas.height);
  outputCtx.lineCap = 'round';
  outputCtx.lineJoin = 'round';

  state.drawStrokes.forEach((stroke) => {
    outputCtx.strokeStyle = stroke.color;
    outputCtx.lineWidth = stroke.size * (outputCanvas.width / Math.max(rotatedCanvas.width, 1));
    outputCtx.beginPath();
    stroke.points.forEach((point, index) => {
      const x = point.x * rotatedCanvas.width - crop.sx;
      const y = point.y * rotatedCanvas.height - crop.sy;
      if (index === 0) outputCtx.moveTo(x, y);
      else outputCtx.lineTo(x, y);
    });
    outputCtx.stroke();
  });

  state.blurStrokes.forEach((stroke) => {
    outputCtx.save();
    outputCtx.strokeStyle = 'rgba(255,255,255,0.28)';
    outputCtx.lineWidth = stroke.size * 1.7 * (outputCanvas.width / Math.max(rotatedCanvas.width, 1));
    outputCtx.filter = `blur(${Math.max(10, stroke.size * 1.4)}px)`;
    outputCtx.beginPath();
    stroke.points.forEach((point, index) => {
      const x = point.x * rotatedCanvas.width - crop.sx;
      const y = point.y * rotatedCanvas.height - crop.sy;
      if (index === 0) outputCtx.moveTo(x, y);
      else outputCtx.lineTo(x, y);
    });
    outputCtx.stroke();
    outputCtx.restore();
  });

  state.arrows.forEach((overlay) => {
    drawArrow(outputCtx, {
      ...overlay,
      start: {
        x: (overlay.start.x * rotatedCanvas.width - crop.sx) / Math.max(outputCanvas.width, 1),
        y: (overlay.start.y * rotatedCanvas.height - crop.sy) / Math.max(outputCanvas.height, 1),
      },
      end: {
        x: (overlay.end.x * rotatedCanvas.width - crop.sx) / Math.max(outputCanvas.width, 1),
        y: (overlay.end.y * rotatedCanvas.height - crop.sy) / Math.max(outputCanvas.height, 1),
      },
      size: overlay.size * (outputCanvas.width / Math.max(rotatedCanvas.width, 1)),
    }, outputCanvas.width, outputCanvas.height);
  });

  state.texts.forEach((overlay) => {
    drawTextOverlay(outputCtx, {
      ...overlay,
      size: overlay.size * (outputCanvas.width / Math.max(rotatedCanvas.width, 1)),
      point: {
        x: (overlay.point.x * rotatedCanvas.width - crop.sx) / Math.max(outputCanvas.width, 1),
        y: (overlay.point.y * rotatedCanvas.height - crop.sy) / Math.max(outputCanvas.height, 1),
      },
    }, outputCanvas.width, outputCanvas.height);
  });

  const mimeType = file.type.includes('png') || file.type.includes('webp') || file.type.includes('gif')
    ? 'image/png'
    : 'image/jpeg';

  const blob = await new Promise<Blob>((resolve, reject) => {
    outputCanvas.toBlob((value) => {
      if (!value) {
        reject(new Error('CANVAS_EXPORT_FAILED'));
        return;
      }
      resolve(value);
    }, mimeType, 0.92);
  });

  const nextName = file.name.replace(/\.[^.]+$/, '') || 'photo';
  const extension = mimeType === 'image/png' ? 'png' : 'jpg';
  return new File([blob], `${nextName}-edited.${extension}`, { type: mimeType, lastModified: Date.now() });
};

const formatSeconds = (value: number): string => {
  const safe = Math.max(0, Math.floor(value));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

export function MediaComposerDialog({
  open,
  files,
  initialCaption,
  busy = false,
  onClose,
  onConfirm,
}: MediaComposerDialogProps) {
  const [draftFiles, setDraftFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toolMode, setToolMode] = useState<ToolMode>('draw');
  const [brushColor, setBrushColor] = useState<(typeof BRUSH_COLORS)[number]>('#FF3B30');
  const [brushSize, setBrushSize] = useState(5);
  const [textOverlayValue, setTextOverlayValue] = useState('');
  const [textSize, setTextSize] = useState(28);
  const [editorStates, setEditorStates] = useState<FileEditorState[]>([]);
  const [surfaceSize, setSurfaceSize] = useState({ width: 0, height: 0 });
  const [currentMediaSize, setCurrentMediaSize] = useState({ width: 0, height: 0 });
  const [videoProcessingState, setVideoProcessingState] = useState<{ active: boolean; progress: number; message: string }>({
    active: false,
    progress: 0,
    message: '',
  });

  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const pointerDrawingRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    setDraftFiles(files);
    setCaption(initialCaption);
    setCurrentIndex(0);
    setToolMode('draw');
    setBrushColor('#FF3B30');
    setBrushSize(5);
    setTextOverlayValue('');
    setTextSize(28);
    setEditorStates(files.map(createEditorStateForFile));
  }, [files, initialCaption, open]);

  const previewUrls = useMemo(() => draftFiles.map((file) => URL.createObjectURL(file)), [draftFiles]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const currentFile = draftFiles[currentIndex] || null;
  const currentPreviewUrl = previewUrls[currentIndex] || '';
  const currentEditor = editorStates[currentIndex];
  const currentImageState = currentEditor?.kind === 'image' ? currentEditor : null;
  const currentVideoState = currentEditor?.kind === 'video' ? currentEditor : null;

  useEffect(() => {
    if (!open || !surfaceRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect;
      if (!next) return;
      setSurfaceSize({ width: next.width, height: next.height });
    });
    observer.observe(surfaceRef.current);
    return () => observer.disconnect();
  }, [open]);

  useEffect(() => {
    let cancelled = false;
    if (!currentPreviewUrl || !currentFile) {
      setCurrentMediaSize({ width: 0, height: 0 });
      return;
    }

    if (isImageFile(currentFile)) {
      loadImage(currentPreviewUrl)
        .then((image) => {
          if (cancelled) return;
          setCurrentMediaSize({ width: image.naturalWidth, height: image.naturalHeight });
        })
        .catch(() => {
          if (!cancelled) setCurrentMediaSize({ width: 0, height: 0 });
        });
      return () => {
        cancelled = true;
      };
    }

    if (isVideoFile(currentFile)) {
      loadVideoMetadata(currentPreviewUrl)
        .then((meta) => {
          if (cancelled) return;
          setCurrentMediaSize({ width: meta.width, height: meta.height });
          setEditorStates((prev) => prev.map((item, index) => {
            if (index !== currentIndex || item?.kind !== 'video') return item;
            const duration = Math.max(0, meta.duration);
            const nextTrimEnd = item.trimEnd > 0 ? Math.min(item.trimEnd, duration) : duration;
            return {
              ...item,
              duration,
              trimEnd: nextTrimEnd,
              posterTime: Math.min(item.posterTime || 0, duration),
            };
          }));
        })
        .catch(() => {
          if (!cancelled) setCurrentMediaSize({ width: 0, height: 0 });
        });
    }

    return () => {
      cancelled = true;
    };
  }, [currentFile, currentIndex, currentPreviewUrl]);

  const rotatedMediaSize = useMemo(() => {
    if (!currentImageState) return currentMediaSize;
    return getRotatedDimensions(currentMediaSize.width, currentMediaSize.height, currentImageState.rotation);
  }, [currentImageState, currentMediaSize]);

  const stageRect = useMemo(
    () => getContainedRect(rotatedMediaSize.width || 1, rotatedMediaSize.height || 1, surfaceSize.width || 1, surfaceSize.height || 1),
    [rotatedMediaSize, surfaceSize],
  );

  useEffect(() => {
    if (!currentImageState || !currentPreviewUrl || !previewCanvasRef.current) return;
    const draw = async () => {
      try {
        const image = await loadImage(currentPreviewUrl);
        const canvas = previewCanvasRef.current;
        if (!canvas) return;
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        const width = Math.max(1, Math.round(stageRect.width));
        const height = Math.max(1, Math.round(stageRect.height));
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        const rotation = currentImageState.rotation;
        if (rotation === 90) {
          ctx.translate(width, 0);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(image, 0, 0, height, width);
        } else if (rotation === 180) {
          ctx.translate(width, height);
          ctx.rotate(Math.PI);
          ctx.drawImage(image, 0, 0, width, height);
        } else if (rotation === 270) {
          ctx.translate(0, height);
          ctx.rotate(-Math.PI / 2);
          ctx.drawImage(image, 0, 0, height, width);
        } else {
          ctx.drawImage(image, 0, 0, width, height);
        }
        ctx.restore();
      } catch {
        // ignore preview draw errors
      }
    };
    void draw();
  }, [currentImageState, currentPreviewUrl, stageRect]);

  useEffect(() => {
    if (!currentImageState || !overlayCanvasRef.current) return;
    renderImageOverlayCanvas(overlayCanvasRef.current, stageRect.width, stageRect.height, currentImageState);
  }, [currentImageState, stageRect]);

  const updateCurrentEditor = (updater: (state: FileEditorState) => FileEditorState) => {
    setEditorStates((prev) => prev.map((item, index) => (index === currentIndex ? updater(item) : item)));
  };

  const updateCurrentImageState = (updater: (state: ImageEditorState) => ImageEditorState) => {
    updateCurrentEditor((state) => (state.kind === 'image' ? updater(state) : state));
  };

  const updateCurrentVideoState = (updater: (state: VideoEditorState) => VideoEditorState) => {
    updateCurrentEditor((state) => (state.kind === 'video' ? updater(state) : state));
  };

  const normalizePoint = (event: React.PointerEvent<HTMLCanvasElement>): NormalizedPoint | null => {
    if (stageRect.width <= 0 || stageRect.height <= 0) return null;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / Math.max(rect.width, 1)));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / Math.max(rect.height, 1)));
    return { x, y };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!currentImageState) return;
    const point = normalizePoint(event);
    if (!point) return;
    if (toolMode === 'text') {
      const text = textOverlayValue.trim();
      if (!text) return;
      updateCurrentImageState((state) => ({
        ...state,
        texts: [...state.texts, { text, point, color: brushColor, size: textSize, weight: 800 }],
        history: [...state.history, 'text'],
      }));
      setTextOverlayValue('');
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    pointerDrawingRef.current = true;

    if (toolMode === 'draw') {
      updateCurrentImageState((state) => ({
        ...state,
        drawStrokes: [...state.drawStrokes, { color: brushColor, size: brushSize, points: [point] }],
        history: [...state.history, 'draw'],
      }));
      return;
    }

    if (toolMode === 'blur') {
      updateCurrentImageState((state) => ({
        ...state,
        blurStrokes: [...state.blurStrokes, { color: brushColor, size: brushSize * 1.6, points: [point] }],
        history: [...state.history, 'blur'],
      }));
      return;
    }

    if (toolMode === 'arrow') {
      updateCurrentImageState((state) => ({
        ...state,
        arrows: [...state.arrows, { color: brushColor, size: Math.max(3, brushSize), start: point, end: point }],
        history: [...state.history, 'arrow'],
      }));
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointerDrawingRef.current || !currentImageState) return;
    const point = normalizePoint(event);
    if (!point) return;

    if (toolMode === 'draw') {
      updateCurrentImageState((state) => {
        if (!state.drawStrokes.length) return state;
        const next = state.drawStrokes.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, points: [...last.points, point] };
        return { ...state, drawStrokes: next };
      });
      return;
    }

    if (toolMode === 'blur') {
      updateCurrentImageState((state) => {
        if (!state.blurStrokes.length) return state;
        const next = state.blurStrokes.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, points: [...last.points, point] };
        return { ...state, blurStrokes: next };
      });
      return;
    }

    if (toolMode === 'arrow') {
      updateCurrentImageState((state) => {
        if (!state.arrows.length) return state;
        const next = state.arrows.slice();
        next[next.length - 1] = { ...next[next.length - 1], end: point };
        return { ...state, arrows: next };
      });
    }
  };

  const stopDrawing = () => {
    pointerDrawingRef.current = false;
  };

  const undoCurrentImageChange = () => {
    if (!currentImageState?.history.length) return;
    const lastEntry = currentImageState.history[currentImageState.history.length - 1];
    updateCurrentImageState((state) => {
      const history = state.history.slice(0, -1);
      if (lastEntry === 'draw') return { ...state, drawStrokes: state.drawStrokes.slice(0, -1), history };
      if (lastEntry === 'blur') return { ...state, blurStrokes: state.blurStrokes.slice(0, -1), history };
      if (lastEntry === 'arrow') return { ...state, arrows: state.arrows.slice(0, -1), history };
      return { ...state, texts: state.texts.slice(0, -1), history };
    });
  };

  const clearCurrentImageEdits = () => {
    updateCurrentImageState((state) => ({
      ...state,
      drawStrokes: [],
      blurStrokes: [],
      arrows: [],
      texts: [],
      history: [],
    }));
  };

  const rotateCurrentImage = (direction: 'left' | 'right') => {
    updateCurrentImageState((state) => {
      const next = direction === 'left'
        ? (((state.rotation + 270) % 360) as 0 | 90 | 180 | 270)
        : (((state.rotation + 90) % 360) as 0 | 90 | 180 | 270);
      return { ...state, rotation: next };
    });
  };

  const removeCurrentFile = () => {
    if (!draftFiles.length) return;
    const nextFiles = draftFiles.filter((_, index) => index !== currentIndex);
    if (!nextFiles.length) {
      onClose();
      return;
    }
    setDraftFiles(nextFiles);
    setEditorStates((prev) => prev.filter((_, index) => index !== currentIndex));
    setCurrentIndex((prev) => Math.max(0, Math.min(nextFiles.length - 1, prev)));
  };

  const handleConfirm = async () => {
    if (!draftFiles.length || busy) return;
    const finalFiles: File[] = [];

    try {
      for (let index = 0; index < draftFiles.length; index += 1) {
        const file = draftFiles[index];
        const editor = editorStates[index];
        const previewUrl = previewUrls[index];

        if (editor?.kind === 'image' && previewUrl) {
          const hasImageEdits =
            editor.rotation !== 0 ||
            editor.cropPreset !== 'original' ||
            editor.drawStrokes.length > 0 ||
            editor.blurStrokes.length > 0 ||
            editor.arrows.length > 0 ||
            editor.texts.length > 0;
          if (hasImageEdits) {
            finalFiles.push(await exportEditedImageFile(file, previewUrl, editor));
            continue;
          }
        }

        if (editor?.kind === 'video') {
          const trimNeeded = editor.trimEnd > 0 && editor.trimEnd < editor.duration - 0.05 || editor.trimStart > 0.05;
          if (trimNeeded) {
            setVideoProcessingState({ active: true, progress: 0.02, message: 'Подготовка видео...' });
            finalFiles.push(await trimVideoFile(file, editor.trimStart, editor.trimEnd, (progress, message) => {
              setVideoProcessingState({ active: true, progress, message });
            }));
            continue;
          }
        }

        finalFiles.push(file);
      }
    } finally {
      setVideoProcessingState({ active: false, progress: 0, message: '' });
    }

    await onConfirm(finalFiles, caption);
  };

  const currentImageHasHistory = Boolean(currentImageState?.history.length);

  return (
    <Dialog open={open} onClose={busy ? undefined : onClose} fullScreen>
      <Box
        sx={{
          height: '100%',
          bgcolor: '#0C111D',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            pt: 'max(env(safe-area-inset-top), 10px)',
            px: 1,
            pb: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <IconButton onClick={onClose} disabled={busy} sx={{ color: '#fff' }}>
            <CloseRoundedIcon />
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Редактор медиа</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
              {draftFiles.length} файл(ов)
            </Typography>
          </Box>
          <Button
            variant="contained"
            disableElevation
            onClick={() => void handleConfirm()}
            disabled={busy || draftFiles.length === 0}
            sx={{
              borderRadius: 999,
              bgcolor: '#FF584F',
              color: '#fff',
              px: 1.8,
              '&:hover': { bgcolor: '#F2443A' },
            }}
          >
            {busy ? 'Загрузка...' : 'Отправить'}
          </Button>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <Box
            ref={surfaceRef}
            sx={{
              position: 'relative',
              flex: 1,
              minHeight: 320,
              overflow: 'hidden',
              background:
                'radial-gradient(circle at top, rgba(255,88,80,0.18), transparent 40%), linear-gradient(180deg, #151D2D 0%, #0A0F18 100%)',
            }}
          >
            {currentFile && isImageFile(currentFile) ? (
              <Box
                sx={{
                  position: 'absolute',
                  left: stageRect.x,
                  top: stageRect.y,
                  width: stageRect.width,
                  height: stageRect.height,
                }}
              >
                <Box
                  component="canvas"
                  ref={previewCanvasRef}
                  sx={{ width: '100%', height: '100%', display: 'block', borderRadius: 2.5 }}
                />
                {!!currentImageState && currentImageState.cropPreset !== 'original' && (
                  <Box
                    sx={{
                      pointerEvents: 'none',
                      position: 'absolute',
                      inset: 0,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        boxShadow: 'inset 0 0 0 9999px rgba(0,0,0,0.38), inset 0 0 0 2px rgba(255,255,255,0.58)',
                        clipPath:
                          currentImageState.cropPreset === 'square'
                            ? 'inset(calc(50% - min(42vw, 160px)) calc(50% - min(42vw, 160px)))'
                            : currentImageState.cropPreset === 'portrait'
                              ? 'inset(calc(50% - min(46vw, 200px)) calc(50% - min(36vw, 145px)))'
                              : 'inset(calc(50% - min(24vw, 96px)) calc(50% - min(43vw, 170px)))',
                      },
                    }}
                  />
                )}
                {currentImageState?.texts.map((item, index) => (
                  <Box
                    key={`${item.text}-${index}`}
                    sx={{
                      position: 'absolute',
                      left: `${item.point.x * 100}%`,
                      top: `${item.point.y * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      color: item.color,
                      fontWeight: item.weight,
                      fontSize: item.size,
                      textShadow: '0 2px 6px rgba(0,0,0,0.42)',
                      userSelect: 'none',
                      textAlign: 'center',
                      maxWidth: '80%',
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {item.text}
                  </Box>
                ))}
                <Box
                  component="canvas"
                  ref={overlayCanvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={stopDrawing}
                  onPointerCancel={stopDrawing}
                  onPointerLeave={stopDrawing}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    cursor: toolMode === 'text' ? 'copy' : 'crosshair',
                    touchAction: 'none',
                  }}
                />
              </Box>
            ) : currentFile && isVideoFile(currentFile) ? (
              <Box
                sx={{
                  position: 'absolute',
                  left: stageRect.x,
                  top: stageRect.y,
                  width: stageRect.width,
                  height: stageRect.height,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box
                  component="video"
                  ref={videoPreviewRef}
                  src={currentPreviewUrl}
                  controls
                  playsInline
                  sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 2.5 }}
                />
                {videoProcessingState.active && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 16,
                      right: 16,
                      bottom: 16,
                      p: 1.2,
                      borderRadius: 2.5,
                      bgcolor: 'rgba(8,11,18,0.8)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                      {videoProcessingState.message || 'Обработка видео...'}
                    </Typography>
                    <Box
                      sx={{
                        mt: 0.8,
                        height: 6,
                        borderRadius: 999,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${Math.max(4, Math.round(videoProcessingState.progress * 100))}%`,
                          height: '100%',
                          borderRadius: 999,
                          background: 'linear-gradient(90deg, #FF7A6F 0%, #FF584F 100%)',
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            ) : currentFile ? (
              <Stack spacing={1.2} sx={{ px: 2.5, pt: 8, alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{currentFile.name}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.68)', fontSize: 13 }}>
                  Для этого типа вложения доступен только предпросмотр перед отправкой.
                </Typography>
              </Stack>
            ) : null}

            {draftFiles.length > 1 && (
              <>
                <IconButton
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex <= 0}
                  sx={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.34)',
                  }}
                >
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={() => setCurrentIndex((prev) => Math.min(draftFiles.length - 1, prev + 1))}
                  disabled={currentIndex >= draftFiles.length - 1}
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.34)',
                  }}
                >
                  <ArrowForwardIosRoundedIcon />
                </IconButton>
              </>
            )}
          </Box>

          <Box
            sx={{
              p: 1.1,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'rgba(10,14,22,0.96)',
              backdropFilter: 'blur(18px)',
            }}
          >
            {!!currentImageState && (
              <>
                <Stack direction="row" spacing={0.8} sx={{ mb: 1, overflowX: 'auto', pb: 0.3 }}>
                  <Button
                    startIcon={<CropRoundedIcon />}
                    onClick={() => updateCurrentImageState((state) => ({ ...state, cropPreset: state.cropPreset === 'square' ? 'original' : 'square' }))}
                    sx={(theme) => toolButtonSx(currentImageState.cropPreset === 'square', theme)}
                  >
                    1:1
                  </Button>
                  <Button
                    onClick={() => updateCurrentImageState((state) => ({ ...state, cropPreset: state.cropPreset === 'portrait' ? 'original' : 'portrait' }))}
                    sx={(theme) => toolButtonSx(currentImageState.cropPreset === 'portrait', theme)}
                  >
                    4:5
                  </Button>
                  <Button
                    onClick={() => updateCurrentImageState((state) => ({ ...state, cropPreset: state.cropPreset === 'wide' ? 'original' : 'wide' }))}
                    sx={(theme) => toolButtonSx(currentImageState.cropPreset === 'wide', theme)}
                  >
                    16:9
                  </Button>
                  <Button
                    startIcon={<RotateLeftRoundedIcon />}
                    onClick={() => rotateCurrentImage('left')}
                    sx={(theme) => toolButtonSx(false, theme)}
                  >
                    Лево
                  </Button>
                  <Button
                    startIcon={<RotateRightRoundedIcon />}
                    onClick={() => rotateCurrentImage('right')}
                    sx={(theme) => toolButtonSx(false, theme)}
                  >
                    Право
                  </Button>
                </Stack>

                <Stack direction="row" spacing={0.8} sx={{ mb: 1, overflowX: 'auto', pb: 0.3 }}>
                  <Button startIcon={<BrushRoundedIcon />} onClick={() => setToolMode('draw')} sx={(theme) => toolButtonSx(toolMode === 'draw', theme)}>
                    Рисование
                  </Button>
                  <Button startIcon={<ArrowOutwardRoundedIcon />} onClick={() => setToolMode('arrow')} sx={(theme) => toolButtonSx(toolMode === 'arrow', theme)}>
                    Стрелка
                  </Button>
                  <Button startIcon={<BlurOnRoundedIcon />} onClick={() => setToolMode('blur')} sx={(theme) => toolButtonSx(toolMode === 'blur', theme)}>
                    Blur
                  </Button>
                  <Button startIcon={<TextFieldsRoundedIcon />} onClick={() => setToolMode('text')} sx={(theme) => toolButtonSx(toolMode === 'text', theme)}>
                    Текст
                  </Button>
                  <Button
                    startIcon={<UndoRoundedIcon />}
                    onClick={undoCurrentImageChange}
                    disabled={!currentImageHasHistory}
                    sx={(theme) => toolButtonSx(currentImageHasHistory, theme)}
                  >
                    Отмена
                  </Button>
                  <Button startIcon={<DoneRoundedIcon />} onClick={clearCurrentImageEdits} sx={(theme) => toolButtonSx(false, theme)}>
                    Сброс
                  </Button>
                  <Button startIcon={<DeleteOutlineRoundedIcon />} onClick={removeCurrentFile} sx={(theme) => toolButtonSx(false, theme)}>
                    Убрать
                  </Button>
                </Stack>

                <Stack direction="row" spacing={0.8} sx={{ mb: 1, alignItems: 'center', overflowX: 'auto' }}>
                  {BRUSH_COLORS.map((color) => (
                    <Button
                      key={color}
                      onClick={() => setBrushColor(color)}
                      sx={{
                        minWidth: 34,
                        width: 34,
                        height: 34,
                        p: 0,
                        borderRadius: '50%',
                        border: brushColor === color ? '2px solid #fff' : '1px solid rgba(255,255,255,0.18)',
                        bgcolor: color,
                        flexShrink: 0,
                      }}
                    />
                  ))}
                  <Typography sx={{ minWidth: 96, fontSize: 13 }}>{toolMode === 'text' ? 'Размер текста' : 'Размер кисти'}</Typography>
                  <Box sx={{ width: 132, px: 0.5 }}>
                    <Slider
                      min={toolMode === 'text' ? 14 : 2}
                      max={toolMode === 'text' ? 54 : 20}
                      step={1}
                      value={toolMode === 'text' ? textSize : brushSize}
                      onChange={(_, value) => {
                        const next = Array.isArray(value) ? value[0] : value;
                        if (toolMode === 'text') setTextSize(next);
                        else setBrushSize(next);
                      }}
                      sx={{ color: '#FF584F' }}
                    />
                  </Box>
                </Stack>

                {toolMode === 'text' && (
                  <TextField
                    fullWidth
                    placeholder="Введите текст и тапните по фото, чтобы разместить"
                    value={textOverlayValue}
                    onChange={(event) => setTextOverlayValue(event.target.value)}
                    sx={{
                      mb: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        color: '#fff',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.12)',
                      },
                    }}
                  />
                )}
              </>
            )}

            {!!currentVideoState && (
              <Stack spacing={1} sx={{ mb: 1.1 }}>
                <Typography sx={{ fontWeight: 700 }}>Видео</Typography>
                <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>
                  Обрезка работает в браузере best-effort. На поддерживаемых устройствах клип экспортируется как новый файл.
                </Typography>
                <Box>
                  <Typography sx={{ mb: 0.4, fontSize: 13 }}>
                    Начало: {formatSeconds(currentVideoState.trimStart)} / Конец: {formatSeconds(currentVideoState.trimEnd || currentVideoState.duration)}
                  </Typography>
                  <Slider
                    min={0}
                    max={Math.max(currentVideoState.duration, VIDEO_TRIM_MIN_SECONDS)}
                    step={0.1}
                    value={[
                      currentVideoState.trimStart,
                      currentVideoState.trimEnd > 0 ? currentVideoState.trimEnd : currentVideoState.duration,
                    ]}
                    onChange={(_, value) => {
                      if (!Array.isArray(value)) return;
                      const [start, end] = value;
                      const safeEnd = Math.max(start + VIDEO_TRIM_MIN_SECONDS, end);
                      updateCurrentVideoState((state) => ({
                        ...state,
                        trimStart: start,
                        trimEnd: Math.min(safeEnd, state.duration || safeEnd),
                        posterTime: Math.min(Math.max(state.posterTime, start), Math.min(safeEnd, state.duration || safeEnd)),
                      }));
                    }}
                    sx={{ color: '#FF584F' }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ mb: 0.4, fontSize: 13 }}>
                    Обложка: {formatSeconds(currentVideoState.posterTime)}
                  </Typography>
                  <Slider
                    min={currentVideoState.trimStart}
                    max={currentVideoState.trimEnd > 0 ? currentVideoState.trimEnd : Math.max(currentVideoState.duration, currentVideoState.trimStart)}
                    step={0.1}
                    value={currentVideoState.posterTime}
                    onChange={(_, value) => {
                      const next = Array.isArray(value) ? value[0] : value;
                      updateCurrentVideoState((state) => ({ ...state, posterTime: next }));
                      const video = videoPreviewRef.current;
                      if (video) {
                        video.currentTime = next;
                      }
                    }}
                    sx={{ color: '#F7B244' }}
                  />
                </Box>
                <Button startIcon={<DeleteOutlineRoundedIcon />} onClick={removeCurrentFile} sx={(theme) => toolButtonSx(false, theme)}>
                  Убрать файл
                </Button>
              </Stack>
            )}

            {!currentImageState && !currentVideoState && (
              <Button startIcon={<DeleteOutlineRoundedIcon />} onClick={removeCurrentFile} sx={(theme) => toolButtonSx(false, theme)}>
                Убрать файл
              </Button>
            )}

            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              placeholder="Добавьте подпись"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.12)',
                },
              }}
            />

            <Stack direction="row" spacing={0.8} sx={{ mt: 1.1, overflowX: 'auto', pb: 0.2 }}>
              {draftFiles.map((file, index) => (
                <Button
                  key={`${file.name}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    minWidth: 96,
                    justifyContent: 'flex-start',
                    borderRadius: 2.5,
                    px: 0.8,
                    py: 0.6,
                    border: '1px solid',
                    borderColor: currentIndex === index ? 'rgba(255,88,80,0.8)' : 'rgba(255,255,255,0.08)',
                    bgcolor: currentIndex === index ? 'rgba(255,88,80,0.12)' : 'rgba(255,255,255,0.04)',
                  }}
                >
                  <Stack spacing={0.2} sx={{ alignItems: 'flex-start', minWidth: 0 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }} noWrap>
                      {index + 1}. {isImageFile(file) ? cropLabel(editorStates[index]?.kind === 'image' ? editorStates[index].cropPreset : 'original') : isVideoFile(file) ? 'Видео' : 'Файл'}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.68)' }} noWrap>
                      {file.name}
                    </Typography>
                  </Stack>
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
