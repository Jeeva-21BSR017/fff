const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Pong! 🏓');
});

server.listen(PORT, () => console.log(`✅ Ping server running on port ${PORT}`));

// docker build -t ping-server .
// docker run -p 3000:3000 ping-server
