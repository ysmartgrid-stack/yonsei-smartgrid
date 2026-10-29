// Run after exporting dist from the maintained local source workspace.
const fs = require('node:fs');
const path = require('node:path');
const file = path.resolve(__dirname, '../dist/data.js');
const raw = fs.readFileSync(file, 'utf8');
const data = JSON.parse(raw.split('window.LAB_DATA = ')[1].replace(/;\s*$/, ''));
const checked = data.projectsSource.checked;
const used = ['introductionVideo','scholar','hub','areas','research','researchTopics','projects','completedProjects','collaborators','currentPhdStudents','people','publications','patents'];
const publicData = Object.fromEntries(used.map(key => [key, data[key]]));
function clean(value) {
  if (!value || typeof value !== 'object') return;
  for (const key of Object.keys(value)) {
    if (/source/i.test(key) || ['paperSelection','linkAudit','previousName','previousURL','snapshot'].includes(key)) {
      delete value[key];
    } else if (key === 'note' && value.role !== 'Visiting Researcher') {
      delete value[key];
    } else clean(value[key]);
  }
}
clean(publicData);
for (const person of publicData.people) {
  if (!['Professor', 'M.S. Student'].includes(person.role)) delete person.email;
  delete person.cv;
}
publicData.projectsSource = {checked}; // Used for the visible project reference date.
fs.writeFileSync(file, '// Public website data; internal editorial metadata and non-displayed contact fields excluded.\nwindow.LAB_DATA = ' + JSON.stringify(publicData, null, 2) + ';\n');
console.log('Public data sanitized. Visible directory content retained.');
