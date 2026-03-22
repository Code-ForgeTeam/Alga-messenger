import { UPDATE_FILE_PATH, UPDATE_REPO } from './config';

export interface ApkUpdateInfo {
  sha: string;
  name: string;
  size: number;
  htmlUrl: string;
  downloadUrl: string;
}

const DISMISSED_SHA_KEY = 'alga:update:dismissedSha';

const encodePath = (value: string): string =>
  value
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');

const buildContentsUrl = (repo: string, filePath: string): string => {
  const [owner, name] = repo.split('/');
  if (!owner || !name) return '';
  return `https://api.github.com/repos/${owner}/${name}/contents/${encodePath(filePath)}`;
};

export async function checkGithubApkUpdate(): Promise<ApkUpdateInfo | null> {
  const url = buildContentsUrl(UPDATE_REPO, UPDATE_FILE_PATH);
  if (!url) return null;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) return null;

    const payload = await response.json();
    if (!payload || payload.type !== 'file') return null;

    const info: ApkUpdateInfo = {
      sha: String(payload.sha || ''),
      name: String(payload.name || 'Alga.apk'),
      size: Number(payload.size || 0),
      htmlUrl: String(payload.html_url || ''),
      downloadUrl: String(payload.download_url || payload.html_url || ''),
    };

    if (!info.sha || !info.downloadUrl) return null;
    return info;
  } catch {
    return null;
  }
}

export function shouldShowUpdatePrompt(info: ApkUpdateInfo): boolean {
  const dismissedSha = localStorage.getItem(DISMISSED_SHA_KEY);
  return dismissedSha !== info.sha;
}

export function markUpdatePromptDismissed(info: ApkUpdateInfo): void {
  localStorage.setItem(DISMISSED_SHA_KEY, info.sha);
}