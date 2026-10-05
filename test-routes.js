const http = require('http');

const routes = [
  '/',
  '/vendors',
  '/vendor/the-grand-imperial-palace-resort',
  '/vendor/register',
  '/vendor/dashboard',
  '/admin',
  '/plan-event',
  '/shortlist',
  '/events',
  '/categories',
  '/login',
  '/api/categories',
  '/api/event-types',
  '/api/vendors',
];

async function checkRoute(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      console.log(`${path.padEnd(45)} Status: ${res.statusCode}`);
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      console.error(`${path.padEnd(45)} Error: ${err.message}`);
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing VentZivo Platform routes on http://localhost:3000...\n');
  for (const r of routes) {
    await checkRoute(r);
  }
}

run();
