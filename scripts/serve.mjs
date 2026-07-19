import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
createServer(async (req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  try {
    const file = await readFile(join(process.cwd(), url));
    res.writeHead(200, { 'content-type': types[extname(url)] || 'text/plain', 'cache-control': 'public,max-age=60' });
    res.end(file);
  } catch {
    res.writeHead(404); res.end('Not found');
  }
}).listen(4173, () => console.log('IRCTC AI running at http://localhost:4173'));
