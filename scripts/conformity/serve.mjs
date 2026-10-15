// Minimal static file server (no dependency).
//   CLI:    node scripts/conformity/serve.mjs <dir> <port>
//   Module: const srv = await startServer(dir, 0); srv.url; srv.close()
// Serves <dir>/x/index.html for /x, and guesses types from the extension (JPEG for extension-less design assets).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

export function startServer(dirArg, port = 0) {
  const dir = path.resolve(dirArg);
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = path.join(dir, p);
    if (!f.startsWith(dir)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': 'text/plain' }).end('not found'); return; }
    const ext = path.extname(f).toLowerCase();
    res.writeHead(200, { 'content-type': TYPES[ext] || (ext === '' ? 'image/jpeg' : 'application/octet-stream'), 'cache-control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => {
    const url = `http://localhost:${server.address().port}`;
    resolve({ url, close: () => new Promise((r) => server.close(r)) });
  }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const srv = await startServer(process.argv[2] || '.', Number(process.argv[3] || 8765));
  console.log(`serving ${path.resolve(process.argv[2] || '.')} on ${srv.url} (pid ${process.pid})`);
}
