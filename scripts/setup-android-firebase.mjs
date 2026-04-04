import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const targetPath = path.join(cwd, 'android', 'app', 'google-services.json');
const localSourcePath = path.join(cwd, 'google-services.json');
const strictMode = process.argv.includes('--strict') || process.env.REQUIRE_ANDROID_FIREBASE === '1';

const hasAndroidProject = fs.existsSync(path.join(cwd, 'android', 'app'));

const fail = (message) => {
  console.error(`[android-firebase] ${message}`);
  process.exit(1);
};

const warn = (message) => {
  console.warn(`[android-firebase] ${message}`);
};

if (!hasAndroidProject) {
  const message = 'android/app not found. Run `npx cap add android` first.';
  if (strictMode) fail(message);
  warn(`${message} Skipping Firebase config step.`);
  process.exit(0);
}

let source = '';
let content = '';

const fromB64 = String(process.env.GOOGLE_SERVICES_JSON_B64 ?? '').trim();
if (fromB64 !== '') {
  try {
    content = Buffer.from(fromB64, 'base64').toString('utf8');
    source = 'GOOGLE_SERVICES_JSON_B64';
  } catch {
    if (strictMode) fail('GOOGLE_SERVICES_JSON_B64 is not valid base64.');
    warn('GOOGLE_SERVICES_JSON_B64 is not valid base64. Skipping Firebase config step.');
    process.exit(0);
  }
}

if (content === '') {
  const fromRaw = String(process.env.GOOGLE_SERVICES_JSON ?? '').trim();
  if (fromRaw !== '') {
    content = fromRaw;
    source = 'GOOGLE_SERVICES_JSON';
  }
}

if (content === '' && fs.existsSync(localSourcePath)) {
  content = fs.readFileSync(localSourcePath, 'utf8');
  source = 'google-services.json (repo root)';
}

if (content === '') {
  if (fs.existsSync(targetPath)) {
    console.log('[android-firebase] Existing android/app/google-services.json found. Keeping current file.');
    process.exit(0);
  }

  const message = [
    'google-services.json source not found.',
    'Provide one of:',
    '- env GOOGLE_SERVICES_JSON_B64 (recommended for CI)',
    '- env GOOGLE_SERVICES_JSON',
    '- local file ./google-services.json',
  ].join(' ');
  if (strictMode) fail(message);
  warn(`${message} Skipping Firebase config step.`);
  process.exit(0);
}

if (!content.includes('"project_info"') || !content.includes('"client"')) {
  const message = `Resolved content from ${source} does not look like google-services.json.`;
  if (strictMode) fail(message);
  warn(`${message} Skipping Firebase config step.`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, `${content.trim()}\n`, 'utf8');
console.log(`[android-firebase] Wrote ${targetPath} from ${source}`);
