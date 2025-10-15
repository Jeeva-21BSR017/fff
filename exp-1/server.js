const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Default to index.html
  const filePath = req.url === '/' ? 'index.html' : req.url;

  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 - File Not Found');
    }

    // Determine MIME type
    const ext = path.extname(filePath);
    const mime = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    }[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
