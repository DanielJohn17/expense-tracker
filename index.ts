Bun.serve({
  fetch(req) {
    return new Response('Hello from bun server!');
  },
});

console.log('Server is running on http://localhost:3000');
