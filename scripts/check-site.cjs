const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '../dist');
const dataText = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
if (fs.existsSync(path.join(root, 'assets/documents/kyeon-hur-cv-2026.pdf')) || dataText.includes('kyeon-hur-cv-2026.pdf')) throw new Error('CV must be excluded from this public deployment');
for (const file of ['app.js', 'data.js']) execFileSync(process.execPath, ['--check', path.join(root, file)], {stdio:'inherit'});
const assets = new Set();
for (const file of ['index.html', 'styles.css', 'typography.css', 'app.js', 'data.js']) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of text.matchAll(/(?:\.\/)?assets\/[A-Za-z0-9_./-]+/g)) assets.add(match[0].replace(/^\.\//, ''));
}
for (const asset of assets) {
  const target = path.resolve(root, asset);
  if (!target.startsWith(root + path.sep) || !fs.statSync(target).isFile()) throw new Error('Missing local asset: ' + asset);
}
for (const file of ['index.html', 'styles.css', 'typography.css', 'app.js', 'data.js', '.nojekyll']) {
  if (!fs.statSync(path.join(root, file)).isFile()) throw new Error('Missing entry: ' + file);
}
console.log(`Website checks passed: JavaScript syntax, entry files, and ${assets.size} local assets.`);
