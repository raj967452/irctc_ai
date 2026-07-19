import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';

await mkdir('dist/src', { recursive: true });
await cp('src', 'dist/src', { recursive: true });
let html = await readFile('index.html', 'utf8');
html = html.replace('/src/styles.css', './src/styles.css').replace('/src/main.js', './src/main.js');
await writeFile('dist/index.html', html);
console.log('Built static IRCTC AI UI into dist/');
