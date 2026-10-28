// Build, then check the shipped files exist and the source tree has no leftovers.
const { execSync } = require('child_process');
const fs = require('fs');

execSync('npm run build', { stdio: 'inherit' });

const fail = [];
for (const f of ['cleanframework.min.css', 'cleanframework.min.js']) {
    if (!fs.existsSync(f) || fs.statSync(f).size < 10000) fail.push(`${f} missing or suspiciously small`);
}
const main = fs.readFileSync('main.css', 'utf8');
for (const [, f] of main.matchAll(/@import "([^"]+)"/g)) {
    if (!fs.existsSync(f)) fail.push(`main.css imports missing file ${f}`);
}
if (fs.readdirSync('components').some(d => fs.readdirSync(`components/${d}`).some(f => f.endsWith('.scss')))) {
    fail.push('found .scss files; the framework is plain CSS now');
}

if (fail.length) { console.error('FAIL\n' + fail.join('\n')); process.exit(1); }
console.log('OK');
