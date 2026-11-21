const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', 'build');
const entries = [
  { route: 'services', title: 'Software Development Services | Yash12007', description: 'Explore Yash12007 software development, UI/UX, web, mobile, backend and technology consulting services for modern businesses.' },
  { route: 'legal/terms', title: 'Terms of Service | Yash12007', description: 'Terms of Service for the Yash12007 website, software, APIs, applications, and services.' },
  { route: 'legal/privacy', title: 'Privacy Policy | Yash12007', description: 'Learn how Yash12007 collects, uses, and protects information across its software ecosystem.' },
  { route: 'legal/license', title: 'Developer API & Software License Agreement | Yash12007', description: 'Developer API and software license terms for integrating with Yash12007 APIs, binaries, and technologies.' },
  { route: 'return-policy', title: 'Return & Refund Policy | Yash12007', description: 'Yash12007 software and digital product return and refund policy, eligibility, timeframes, and process.' },
  { route: 'shipping-policy', title: 'Shipping Policy | Yash12007', description: 'Shipping terms for Yash12007 physical and digital products, including delivery, coverage, and costs.' },
];
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const { route, title, description } of entries) {
  const canonical = `https://www.yash12007.com/${route}`;
  const escapedTitle = title.replace(/&/g, '&amp;');
  const head = source
    .replace(/<title>.*?<\/title>/, `<title>${escapedTitle}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapedTitle}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapedTitle}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`);
  const output = path.join(root, route, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, head);
}
