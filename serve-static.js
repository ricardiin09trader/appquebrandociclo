const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'out');
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.txt': 'text/plain', '.map': 'application/json',
};

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(OUT_DIR, urlPath === '/' ? 'index.html' : urlPath);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end('Not found'); return;
  }
  
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}).listen(3000, () => console.log('Static server on port 3000 from', OUT_DIR));
