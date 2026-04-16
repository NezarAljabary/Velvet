const fs = require('fs');
const path = require('path');
const { rcedit } = require('rcedit');

async function main() {
  const projectRoot = path.join(__dirname, '..');
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version || '1.0.0';
  const exePath = path.join(projectRoot, 'out', 'win-unpacked', 'Velvet.exe');
  const iconPath = path.join(projectRoot, 'build', 'icons', 'velvet_tasks_icon.ico');

  if (!fs.existsSync(exePath)) {
    throw new Error(`Executable not found: ${exePath}`);
  }
  if (!fs.existsSync(iconPath)) {
    throw new Error(`Icon not found: ${iconPath}`);
  }

  await rcedit(exePath, {
    icon: iconPath,
    'file-version': version,
    'product-version': version,
    'version-string': {
      CompanyName: 'Velvet',
      FileDescription: 'Velvet',
      ProductName: 'Velvet',
      InternalName: 'Velvet',
      OriginalFilename: 'Velvet.exe'
    }
  });

  process.stdout.write(`Patched Windows executable metadata: ${exePath}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
