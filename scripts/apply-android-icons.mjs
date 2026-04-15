import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceBase = path.join(repoRoot, 'assets', 'android-icons');
const targetBase = path.join(repoRoot, 'android', 'app', 'src', 'main', 'res');
const densities = ['mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'];
const iconNames = ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'];

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const copyIcons = async () => {
  for (const density of densities) {
    for (const iconName of iconNames) {
      const sourcePath = path.join(sourceBase, density, iconName);
      const targetPath = path.join(targetBase, density, iconName);
      if (!(await fileExists(sourcePath))) {
        throw new Error(`Missing source icon: ${sourcePath}`);
      }
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.copyFile(sourcePath, targetPath);
    }
  }
};

const applyBackgroundColor = async () => {
  const valuesPath = path.join(targetBase, 'values', 'ic_launcher_background.xml');
  const content = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#092C57</color>
</resources>
`;
  await fs.mkdir(path.dirname(valuesPath), { recursive: true });
  await fs.writeFile(valuesPath, content, 'utf8');
};

const main = async () => {
  const hasAndroid = await fileExists(path.join(repoRoot, 'android', 'app'));
  if (!hasAndroid) {
    console.log('[android-icons] android/app not found. Skip icon apply.');
    return;
  }

  const hasSources = await fileExists(sourceBase);
  if (!hasSources) {
    throw new Error('[android-icons] assets/android-icons directory is missing.');
  }

  await copyIcons();
  await applyBackgroundColor();
  console.log('[android-icons] Android launcher icons applied successfully.');
};

main().catch((error) => {
  console.error(error?.message || error);
  process.exit(1);
});
