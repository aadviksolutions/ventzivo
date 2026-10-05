const https = require('https');

const routes = [
  '/',
  '/events',
  '/events/weddings',
  '/categories',
  '/categories/event-venues-banquets',
  '/vendors',
  '/vendor/dream-decor-events',
  '/vendors/dream-decor-events',
  '/how-it-works',
  '/about',
  '/contact',
  '/login',
  '/register',
  '/vendor/register',
  '/forgot-password',
  '/reset-password',
  '/privacy',
  '/terms',
  '/faq',
  '/shortlist',
  '/client/dashboard',
  '/vendor/dashboard',
  '/admin',
];

async function checkRoute(path) {
  return new Promise((resolve) => {
    https
      .get(`https://ventzivo.vercel.app${path}`, (res) => {
        resolve({ path, status: res.statusCode });
      })
      .on('error', (err) => {
        resolve({ path, error: err.message });
      });
  });
}

async function run() {
  console.log('Testing VentZivo Production Routes on https://ventzivo.vercel.app ...');
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`${res.status === 200 ? '✅ [PASS]' : '❌ [FAIL]'} ${r.padEnd(35)} -> HTTP ${res.status || res.error}`);
  }
}

run();
