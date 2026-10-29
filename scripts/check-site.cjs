const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '../dist');
const dataText = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const data = JSON.parse(dataText.split('window.LAB_DATA = ')[1].replace(/;\s*$/, ''));
for (const person of data.people) {
  if (person.email && !['Professor','M.S. Student'].includes(person.role)) throw new Error('Non-displayed member email must be excluded');
}
function checkPublic(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (key !== 'projectsSource' && (/source/i.test(key) || ['paperSelection','linkAudit','previousName','previousURL','snapshot'].includes(key))) throw new Error('Internal editorial metadata must be excluded: ' + key);
    if (key === 'note' && value.role !== 'Visiting Researcher') throw new Error('Internal review note must be excluded');
    checkPublic(item);
  }
}
checkPublic(data);
if (/@[a-z0-9.-]+\.[a-z]{2,}/i.test(fs.readFileSync(path.resolve(__dirname,'../README.md'),'utf8'))) throw new Error('Do not add contact email addresses to README');
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
