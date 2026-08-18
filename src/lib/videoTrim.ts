type TrimVideoOptions = {
  onProgress?: (progress: number) => void;
};

type FFmpegModule = typeof import('@ffmpeg/ffmpeg');
type FFmpegUtilModule = typeof import('@ffmpeg/util');

let ffmpegLoadPromise: Promise<{
  ffmpeg: InstanceType<FFmpegModule['FFmpeg']>;
  util: FFmpegUtilModule;
}> | null = null;

const FFMPEG_BASE_URL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';

const getExtensionFromFile = (file: File): string => {
  const fromName = file.name.split('.').pop()?.trim().toLowerCase() || '';
  if (fromName) return fromName;
  if (file.type.includes('mp4')) return 'mp4';
  if (file.type.includes('webm')) return 'webm';
  if (file.type.includes('quicktime')) return 'mov';
  return 'mp4';
};

const getOutputMimeType = (extension: string): string => {
  if (extension === 'webm') return 'video/webm';
  if (extension === 'mov') return 'video/quicktime';
  return 'video/mp4';
};

const loadFfmpegRuntime = async () => {
  if (!ffmpegLoadPromise) {
    ffmpegLoadPromise = (async () => {
      const [{ FFmpeg }, util] = await Promise.all([
        import('@ffmpeg/ffmpeg'),
        import('@ffmpeg/util'),
      ]);
      const ffmpeg = new FFmpeg();
      const { toBlobURL } = util;
      await ffmpeg.load({
        coreURL: await toBlobURL(`${FFMPEG_BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${FFMPEG_BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      return { ffmpeg, util };
    })().catch((error) => {
      ffmpegLoadPromise = null;
      throw error;
    });
  }

  return ffmpegLoadPromise;
};

const execTrimCopy = async (
  ffmpeg: InstanceType<FFmpegModule['FFmpeg']>,
  inputName: string,
  outputName: string,
  trimStart: number,
  duration: number,
) => {
  await ffmpeg.exec([
    '-ss',
    trimStart.toFixed(3),
    '-i',
    inputName,
    '-t',
    duration.toFixed(3),
    '-c',
    'copy',
    outputName,
  ]);
};

const execTrimReencode = async (
  ffmpeg: InstanceType<FFmpegModule['FFmpeg']>,
  inputName: string,
  outputName: string,
  trimStart: number,
  duration: number,
) => {
  await ffmpeg.exec([
    '-ss',
    trimStart.toFixed(3),
    '-i',
    inputName,
    '-t',
    duration.toFixed(3),
    '-c:v',
    'mpeg4',
    '-q:v',
    '5',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-movflags',
    '+faststart',
    outputName,
  ]);
};

export const trimVideoWithFfmpeg = async (
  file: File,
  trimStart: number,
  trimEnd: number,
  options?: TrimVideoOptions,
): Promise<File> => {
  const duration = trimEnd - trimStart;
  if (!Number.isFinite(duration) || duration <= 0) return file;

  const { ffmpeg, util } = await loadFfmpegRuntime();
  const { fetchFile } = util;

  const extension = getExtensionFromFile(file);
  const inputName = `input.${extension}`;
  const outputName = extension === 'webm' ? 'output.webm' : 'output.mp4';

  const progressHandler = ({ progress }: { progress: number }) => {
    options?.onProgress?.(Math.max(0, Math.min(1, Number(progress) || 0)));
  };

  ffmpeg.on('progress', progressHandler);

  try {
    options?.onProgress?.(0.02);
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    try {
      await execTrimCopy(ffmpeg, inputName, outputName, trimStart, duration);
    } catch {
      await execTrimReencode(ffmpeg, inputName, outputName, trimStart, duration);
    }

    const data = await ffmpeg.readFile(outputName);
    const bytes = typeof data === 'string'
      ? new TextEncoder().encode(data)
      : new Uint8Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength));
    const outputBuffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(outputBuffer).set(bytes);
    const outputMime = getOutputMimeType(outputName.split('.').pop() || 'mp4');
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'video';
    const nextName = `${baseName}-trimmed.${outputName.split('.').pop() || 'mp4'}`;
    options?.onProgress?.(1);
    return new File([outputBuffer], nextName, { type: outputMime, lastModified: Date.now() });
  } finally {
    ffmpeg.off('progress', progressHandler);
    await Promise.allSettled([
      ffmpeg.deleteFile(inputName),
      ffmpeg.deleteFile(outputName),
    ]);
  }
};
