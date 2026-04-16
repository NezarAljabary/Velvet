const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const iconSourceCandidates = [
  path.join(projectRoot, 'velvet_tasks_icon.ico'),
  path.join(projectRoot, 'build', 'icons', 'velvet_tasks_icon.ico'),
  path.join(projectRoot, 'build', 'icons', 'icon.ico')
];

const iconSource = iconSourceCandidates.find((candidate) => fs.existsSync(candidate));
if (!iconSource) {
  throw new Error('No .ico source found. Place velvet_tasks_icon.ico in the project root or build/icons/.');
}

const targets = [
  path.join(projectRoot, 'build', 'icons', 'velvet_tasks_icon.ico'),
  path.join(projectRoot, 'build', 'icons', 'icon.ico')
];

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(iconSource, target);
}

process.stdout.write(`Synced icon from ${iconSource}\n`);
