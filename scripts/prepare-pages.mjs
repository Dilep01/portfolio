import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Run after a successful production build. GitHub Pages serves docs at /portfolio/.
const source = resolve('dist/client');
const destination = resolve('docs');
if (!existsSync(resolve(source, 'index.html'))) throw new Error('Build the portfolio first.');
const html = readFileSync(resolve(source, 'index.html'), 'utf8');
const prefix = '/portfolio/';
const references = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map(match => match[1])
  .filter(url => !/^(?:https?:|mailto:|data:)/.test(url));
for (const url of references) {
  const input = resolve(source, url.replace(/^\//, ''));
  if (!existsSync(input)) throw new Error(`Missing build asset: ${url}`);
}
mkdirSync(destination, { recursive: true });
for (const name of ['index.html', 'index.rsc', 'favicon.svg', 'og.png', 'dilep-photo.jpeg', 'Dilep_Kumar_K_Resume.docx']) {
  cpSync(resolve(source, name), resolve(destination, name));
}
cpSync(resolve(source, 'portfolio/_next'), resolve(destination, '_next'), { recursive: true });
writeFileSync(resolve(destination, '.nojekyll'), '');
for (const url of references) {
  const relative = url.startsWith(prefix) ? url.slice(prefix.length) : url.replace(/^\//, '');
  if (!existsSync(resolve(destination, relative))) throw new Error(`Missing Pages asset: ${url}`);
}
console.log(`Prepared GitHub Pages output; verified ${references.length} local references.`);
