import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/hero';

const SITE = 'https://www.yash12007.com';
const logo = '/192x192.png';
const sameAs = [
  'https://www.facebook.com/yash12007',
  'https://www.instagram.com/yash12007_com',
  'https://www.linkedin.com/company/yash12007',
  'https://twitter.com/_Yash12007_',
  'https://github.com/Yash12007',
  'https://www.youtube.com/@Yash12007',
];
const faqItems = [
  ['What software solutions and platforms does Yash12007 offer?', 'Yash12007 develops native security suites like SERA Antivirus, performance profiling tools such as Metrica Analytics, cloud orchestration platforms (CPS), and Paradise SDP for cross-platform app distribution.'],
  ['How does Yash12007 Cloud Platform Services (CPS) work?', 'CPS provides low-latency cloud storage, high-throughput REST APIs, and structured JSON indexing tailored for developers building fast, distributed applications.'],
  ['How do I access and manage my Yash12007 account?', <>You can sign in securely through our unified authentication portal (<a href="https://auth.yash12007.com">auth.yash12007.com</a>) to access licensed software keys, developer portals, and cloud subscriptions.</>],
  ['What is Paradise SDP?', 'Paradise SDP is a software distribution platform that enables independent developers to publish, manage, and scale native Windows (.exe, .msix) and Android (.apk) packages effortlessly.'],
  ['Can I commission custom software development or architectural consulting?', <>Yes, Yash12007 provides end-to-end custom software architecture, full-stack development, mobile engineering, and IT optimization. Inquiries can be submitted via our <a href="https://www.yash12007.com/services" target="_blank" rel="noreferrer">services portal</a>.</>],
];
const services = [
  'Software Architecture', 'UI / UX Design', 'Mobile App Development', 'Full-Stack Systems',
  'Flask & Backend Engineering', 'Enterprise Infrastructure', 'Software Consulting',
  'IT Optimization', 'Software Outsourcing',
];
const featuredServices = [
  { name: 'Custom Software Development', text: 'Turn your requirements into reliable software. From focused desktop applications to complete platforms, we build solutions around your workflows and business objectives.' },
  { name: 'UI / UX & Interface Development', text: 'Create intuitive, polished interfaces for desktop, web and native applications. We focus on clear layouts, consistent design and smooth user experiences, including Qt-based interfaces.' },
  { name: 'Full-stack Development', text: 'Build complete web solutions with responsive frontends and dependable backends, designed to work smoothly across desktop and mobile devices.' },
  { name: 'Backend & Server Development', text: "Develop custom APIs, server-side applications and backend services that support your product's functionality, integrations and data workflows." },
];
const specialisedServices = [
  { name: 'Enterprise Software', text: 'Streamline business operations with tailored software that supports your processes, improves productivity and adapts as your organisation grows.' },
  { name: 'Software Engineering', text: 'Get professional engineering support for custom applications, integrations and software solutions built to meet defined technical requirements.' },
  { name: 'Mobile App Development', text: 'Bring your ideas to mobile with user-friendly applications, with a focus on Android and experiences that make everyday tasks easier.' },
  { name: 'Software Consulting', text: 'Make informed technical decisions with guidance on software architecture, development approaches and technology selection.' },
  { name: 'IT Consulting', text: 'Identify opportunities to improve your technology environment, modernise existing systems and choose practical digital solutions.' },
  { name: 'Software Development Partnerships', text: 'Extend your project capacity with development support for defined deliverables, product improvements and ongoing technical work.' },
];
const originalServiceIcons = [
  'home-inline-01.svg', 'home-inline-02.svg', 'home-inline-03.svg',
  'home-inline-04.svg', 'home-inline-05.svg', 'home-inline-06.svg',
  'home-inline-07.svg', 'home-inline-08.svg', 'home-inline-09.svg',
];

const pageSeo = {
  home: {
    title: 'Yash12007 | Software Development Company',
    description: 'Yash12007 is an innovative software development ecosystem creating advanced tools, security platforms, cloud services, and multi-platform solutions.',
    keywords: 'Yash12007, Yash Bodhe, software development company, custom software solutions, web and mobile app development, AI software, Sera antivirus, Nexus OS, NovaStream IDE',
    path: '/', type: 'WebSite',
  },
  services: {
    title: 'Software Development Services | Yash12007',
    description: 'Explore Yash12007 software development, UI/UX, web, mobile, backend and technology consulting services for modern businesses.',
    keywords: 'Yash12007 services, software development, UI UX design, full-stack development, mobile app development, backend, IT consulting',
    path: '/services', type: 'WebPage',
  },
  terms: { title: 'Terms of Service | Yash12007', description: 'Terms of Service for the Yash12007 website, software, APIs, applications, and services.', keywords: 'Yash12007 terms of service, software terms, API terms', path: '/legal/terms', type: 'WebPage' },
  privacy: { title: 'Privacy Policy | Yash12007', description: 'Learn how Yash12007 collects, uses, and protects information across its web, mobile, and desktop software ecosystem.', keywords: 'Yash12007 privacy policy, data protection, software privacy', path: '/legal/privacy', type: 'WebPage' },
  license: { title: 'Developer API & Software License Agreement | Yash12007', description: 'Developer API and software license terms for integrating with Yash12007 APIs, software binaries, and technologies.', keywords: 'Yash12007 developer license, API license, software license', path: '/legal/license', type: 'WebPage' },
  returns: { title: 'Return & Refund Policy | Yash12007', description: 'Review the Yash12007 software and digital product return and refund policy, eligibility, timeframes, and process.', keywords: 'Yash12007 returns, refund policy, software refund', path: '/return-policy', type: 'WebPage' },
  shipping: { title: 'Shipping Policy | Yash12007', description: 'Shipping terms for Yash12007 physical and digital products, including coverage, handling, delivery, and costs.', keywords: 'Yash12007 shipping policy, digital delivery, shipping India', path: '/shipping-policy', type: 'WebPage' },
};

function routeFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/services') return 'services';
  if (path === '/legal/terms') return 'terms';
  if (path === '/legal/privacy') return 'privacy';
  if (path === '/legal/license') return 'license';
  if (path === '/return-policy') return 'returns';
  if (path === '/shipping-policy') return 'shipping';
  return 'home';
}

function Seo({ page }) {
  useEffect(() => {
    const seo = pageSeo[page] || pageSeo.home;
    document.title = seo.title;
    document.documentElement.lang = 'en';
    document.body.dataset.page = page;
    const setMeta = (key, value, property = false) => {
      const selector = property ? `meta[property="${key}"]` : `meta[name="${key}"]`;
      let node = document.head.querySelector(selector);
      if (!node) {
        node = document.createElement('meta');
        node.setAttribute(property ? 'property' : 'name', key);
        document.head.appendChild(node);
      }
      node.setAttribute('content', value);
    };
    setMeta('description', seo.description);
    setMeta('keywords', seo.keywords);
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('theme-color', '#ffffff');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    setMeta('twitter:image', `${SITE}/192x192.png`);
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:type', seo.type, true);
    setMeta('og:site_name', 'Yash12007', true);
    setMeta('og:url', `${SITE}${seo.path}`, true);
    setMeta('og:image', `${SITE}/192x192.png`, true);
    setMeta('og:image:alt', 'Yash12007 logo', true);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE}${seo.path}`;
    let ld = document.head.querySelector('#page-structured-data');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'page-structured-data';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    const data = page === 'home'
      ? [{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Yash12007', url: `${SITE}/` }, { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Yash12007', url: `${SITE}/`, logo: `${SITE}/192x192.png`, founder: { '@id': `${SITE}/#person` }, sameAs }, { '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE}/#person`, name: 'Yash Bodhe', url: `${SITE}/yashbodhe`, image: `${SITE}/yashbodhe.jpg`, jobTitle: 'Founder & Owner', worksFor: { '@id': `${SITE}/#organization` }, description: 'Tech entrepreneur, software developer, and founder of Yash12007, focused on high-quality software solutions.', sameAs: ['https://www.facebook.com/yashbodheofc', 'https://www.linkedin.com/in/yash12007', 'https://www.instagram.com/yashbodheofc', 'https://github.com/yashbodheofc', 'https://twitter.com/yashbodheofc', 'https://www.quora.com/profile/Yash-Bodhe-11'] }, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: typeof answer === 'string' ? answer : 'Account access and services information is available through Yash12007.' } })) }]
      : { '@context': 'https://schema.org', '@type': seo.type, name: seo.title, url: `${SITE}${seo.path}`, description: seo.description, isPartOf: { '@type': 'WebSite', name: 'Yash12007', url: `${SITE}/` } };
    ld.textContent = JSON.stringify(data);
  }, [page]);
  return null;
}

function Brand({ services = false }) {
  return <a className="brand" href="/" aria-label="Yash12007 home"><img src={logo} alt="" width="38" height="38" />{services ? <span>Services</span> : <span>Yash12007</span>}</a>;
}

function HomeHeader() {
  const authUrl = 'https://auth.yash12007.com?origin=https://www.yash12007.com&redirect=https://www.yash12007.com';
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    if (email && ['authenticated', 'success'].includes(params.get('status'))) {
      const name = email.split('@')[0].replace(/^./, (letter) => letter.toUpperCase());
      const session = { email, name, provider: params.get('provider') || 'email/passkey', authenticatedAt: Date.now() };
      localStorage.setItem('yash12007_auth_user', JSON.stringify(session));
      window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.hash}`);
      setUser(session);
    } else {
      try { setUser(JSON.parse(localStorage.getItem('yash12007_auth_user'))); } catch { localStorage.removeItem('yash12007_auth_user'); }
    }
  }, []);
  const signOut = () => { localStorage.removeItem('yash12007_auth_user'); setUser(null); setMenu(false); };
  return <><nav className="home-nav"><div className="container nav-inner"><Brand />{user ? <div className="profile-container"><button className="profile-btn" aria-expanded={menu} onClick={() => setMenu(!menu)}><span className="profile-avatar">{(user.name || user.email || 'U')[0].toUpperCase()}</span><span>{user.name || 'Developer'}</span><span aria-hidden="true">⌄</span></button>{menu && <div className="profile-dropdown"><strong>{user.name}</strong><small>{user.email}</small><a href="https://dashboard.yash12007.com">Dashboard</a><a href="https://paradise.yash12007.com">Developer Console</a><a href="https://auth.yash12007.com/">Account Settings</a><button onClick={signOut}>Sign Out</button></div>}</div> : <div className="nav-actions"><a className="btn btn-secondary" href={authUrl}>Login</a><a className="btn btn-primary" href={authUrl}>Sign up</a></div>}</div></nav><div className="subnav-wrapper"><div className="container subnav"><a href="#featured">Featured</a><a href="#platforms">Platforms</a><a href="https://pricing.yash12007.com" target="_blank" rel="noreferrer">Pricing</a><a href="#services">Services</a><a href="#assets">3D Studio</a><a href="#faq">FAQ</a></div></div></>;
}

function OriginalSvg({ file, className = '' }) {
  return <img className={className} src={`/Icons/inline-svg/${file}`} alt="" aria-hidden="true" />;
}

function HomeFooter() {
  const socialIcons = [
    'home-inline-10.svg',
    'home-inline-11.svg',
    'home-inline-12.svg',
    'home-inline-13.svg',
    'home-inline-14.svg',
  ];
  return <footer className="home-footer"><div className="container"><div className="footer-grid"><div className="footer-about"><h2>Yash12007 Software Solutions</h2><p>Enterprise systems orchestration and application environments structured for permanent trace execution logs.</p><a className="btn btn-secondary" href="https://g.page/r/CUlXNoglU0GAEBM/review" target="_blank" rel="noreferrer">Review on Google</a><div className="social-row">{sameAs.slice(0, 4).map((url, i) => <a href={url} key={url} aria-label={['Facebook', 'Instagram', 'LinkedIn', 'X'][i]} target="_blank" rel="noreferrer"><OriginalSvg file={socialIcons[i]} /></a>)}<a href="https://www.youtube.com/@Yash12007" aria-label="YouTube" target="_blank" rel="noreferrer"><OriginalSvg file={socialIcons[4]} /></a></div></div><div className="footer-links-grid"><a href="https://www.yash12007.com/Sera">Sera Antivirus</a><a href="https://www.yash12007.com/NovaStream">NovaStream IDE</a><a href="https://www.yash12007.com/Nexus">Nexus OS</a><a href="https://github.com/Yash12007/Alice_AI/blob/main/README.md" target="_blank" rel="noreferrer">Alice AI</a><a href="https://blog.yash12007.com">Blogs</a><a href="https://medium.com/@Yash12007" target="_blank" rel="noreferrer">Medium</a><a href="/legal/terms">Terms of Service</a><a href="/legal/privacy">Privacy Policy</a><a href="/legal/license">Developer License</a><a href="/return-policy">Returns</a><a href="/shipping-policy">Shipping</a><a href="/sitemap.xml">Sitemap</a></div></div><div className="footer-bottom">© 2026 Yash12007. All Rights Reserved.</div></div></footer>;
}

function HomePage() {
  return <div className="home-page"><Seo page="home" /><HomeHeader /><main><header className="home-hero"><div className="container"><div className="hero-intro"><Hero title="Next-Gen Software Solutions" /></div><h1>Empowering minds through<br />elegant software design</h1><p>Modern enterprise architectures and scalable consumer tools engineered with performance, logic, and precision.</p><div className="hero-cta-group"><a href="#featured" className="btn btn-primary">Explore Products</a><a href="/services" className="btn btn-secondary">Get in Touch</a></div></div></header><section id="featured"><div className="container"><h2>Featured Products</h2><div className="product-grid"><article className="product-card"><img src="https://www.yash12007.com/Sera/Sera.png" alt="SERA 3.0 antivirus software" loading="lazy"/><h3>SERA 3.0</h3><p>Advanced antivirus protection and proactive endpoint security software engineered for deep threat mitigation.</p><div className="product-footer"><span className="price-tag">$2.50 <del>$30.00</del></span><a href="https://www.yash12007.com/Sera" className="btn btn-secondary">Details</a></div></article><article className="product-card"><img src="https://www.yash12007.com/metrica/Metrica.png" alt="Metrica Analytics performance monitoring" loading="lazy"/><h3>Metrica Analytics</h3><p>Real-time device performance profiling and background process telemetry suite for power users.</p><div className="product-footer"><span className="price-tag">$4.99 <del>$5.00</del></span><a href="https://www.yash12007.com/metrica" className="btn btn-secondary">Details</a></div></article></div></div></section><section id="platforms" className="section-muted"><div className="container"><h2>Ecosystem Platforms</h2><div className="platform-stack"><article className="platform-card"><img src="https://images.g2crowd.com/uploads/product/hd_favicon/515121e3e402577e2f54b7a643a48e7d/api-platforms.svg" alt="Cloud Platform API" loading="lazy"/><div className="platform-content"><h3>Cloud Platform Services (CPS)</h3><p>High-throughput cloud storage and API orchestration built for developers. Seamlessly structure, index, and query deeply nested JSON documents with minimal latency.</p><div className="button-row"><a href="https://pricing.yash12007.com" className="btn btn-primary">Pay-as-you-go</a><a href="https://docs.yash12007.com" className="btn btn-secondary">Read Docs</a></div></div></article><article className="platform-card"><img src="https://paradise.yash12007.com/bg.png" alt="Paradise Software Distribution Platform" loading="lazy"/><div className="platform-content"><h3>Paradise SDP</h3><p>A streamlined Software Distribution Platform enabling independent developers to publish and scale native Windows and Android applications affordably.</p><div className="button-row"><a href="https://paradise.yash12007.com" className="btn btn-primary">Learn More</a><a href="https://paradise.yash12007.com" className="btn btn-secondary">Developer Portal</a></div></div></article></div></div></section><section id="services"><div className="container"><div className="services-header"><h2>Services &amp; Solutions</h2><p>Need custom architecture? Visit our <a href="/services">services portal</a> to initiate a project.</p></div><div className="services-grid">{services.map((service, index) => <article className="service-tile" key={service}><OriginalSvg className="service-svg" file={originalServiceIcons[index]} />{service}</article>)}</div></div></section><section id="assets"><div className="container"><div className="studio-banner"><h2>Cyan Sword Studio</h2><p>Explore production-ready 3D asset libraries designed for real-time game engines and 3D animations. Join our partner ecosystem to earn through referrals.</p><div className="button-row centered"><a href="https://studio.yash12007.com" className="btn btn-primary">Browse Assets</a><a href="https://studio.yash12007.com" className="btn btn-secondary">Affiliate Program</a></div></div></div></section><section id="faq" className="section-muted"><div className="container"><h2>Frequently Asked Questions</h2><div className="faq-container">{faqItems.map(([question, answer], index) => <details className="faq-item" key={question} open={index === 0}><summary>{question}</summary><div className="faq-answer">{answer}</div></details>)}</div></div></section><section id="founder"><div className="container"><div className="founder-card"><div className="founder-copy"><span className="founder-eyebrow">The person behind Yash12007</span><h2>Meet Yash Bodhe</h2><p>Founder, technology entrepreneur, and software developer building thoughtful digital products and platforms.</p><a className="founder-link" href="https://yash12007.com/yashbodhe" target="_blank" rel="noopener noreferrer">Learn more about Yash Bodhe <span aria-hidden="true">↗</span></a></div><img className="founder-photo" src="https://cdn.yash12007.com/yashbodhe/Formal.jpeg" alt="Yash Bodhe, founder of Yash12007" loading="lazy" /></div></div></section></main><HomeFooter /></div>;
}

function ServicesHeader() {
  const [open, setOpen] = useState(false);
  return <header className="services-nav"><nav className="services-nav-inner" aria-label="Main navigation"><button className="menu-toggle" aria-controls="services-navigation" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>☰</button><Brand services /><div className={`services-nav-links ${open ? 'is-open' : ''}`} id="services-navigation"><a href="/">Home</a><a href="/#founder">About</a><a href="/legal/terms">Terms of Service</a><a href="/legal/privacy">Privacy Policy</a><a href="https://dashboard.yash12007.com">Dashboard</a></div><a className="services-account" href="https://auth.yash12007.com/?origin=https://www.yash12007.com/services&redirect=https://www.yash12007.com/services" aria-label="Sign in to your Yash12007 account"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg></a></nav></header>;
}

function ServiceTrack({ title, id, items, initialService, onSelect }) {
  const scrollTrack = (direction) => {
    const track = document.getElementById(id);
    if (track) track.scrollBy({ left: direction * 312, behavior: 'smooth' });
  };
  return <><h2 className="section-heading">{title}</h2><div className="service-track" id={id} aria-label={title}>{items.map((service) => <article className="service-card" key={service.name}><h3>{service.name}</h3><p>{service.text}</p><a href="#sales" className="btn" onClick={() => onSelect(service.name)}>Enquire Now</a></article>)}</div><div className="track-controls" aria-label={`${title} controls`}><button type="button" aria-label={`Scroll ${title} left`} onClick={() => scrollTrack(-1)}>‹</button><button type="button" aria-label={`Scroll ${title} right`} onClick={() => scrollTrack(1)}>›</button></div></>;
}

function ServicesPage() {
  const [service, setService] = useState('');
  return <div className="services-page"><Seo page="services"/><ServicesHeader/><main><section className="services-hero"><img className="hero-logo" src={logo} alt="Yash12007 logo" width="120" height="120"/><div><h1>Smart Solutions for Modern Businesses</h1><p>Explore professional software and technology services designed to help your business work smarter, grow confidently and deliver better digital experiences.</p><div className="hero-actions"><a className="btn btn-outline" href="#services">Explore Services</a><a className="btn" href="#sales">Contact Sales</a></div></div></section><section className="glass-panel"><div id="services"><ServiceTrack title="Featured Services" id="featured-track" items={featuredServices} onSelect={setService}/><h2 className="section-subheading">Specialised Services</h2><ServiceTrack title="" id="specialised-track" items={specialisedServices} onSelect={setService}/></div></section><section className="glass-panel sales-panel" id="sales"><h2 className="section-heading">Contact Our Sales Team</h2><p>Tell us a little about your requirements. We'll use the details to understand your enquiry and get back to you.</p><form className="contact-form" action="https://formspree.io/f/xzzarbnd" method="post"><div className="form-field"><label htmlFor="name">Full Name</label><input id="name" name="name" type="text" placeholder="Your full name" autoComplete="name" required/></div><div className="form-field"><label htmlFor="email">Email Address</label><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required/></div><div className="form-field"><label htmlFor="service-interest">Service of Interest</label><input id="service-interest" name="service" type="text" placeholder="Which service are you interested in?" value={service} onChange={(event) => setService(event.target.value)}/></div><div className="form-field"><label htmlFor="message">How Can We Help?</label><textarea id="message" name="message" rows="4" placeholder="Describe your project or requirements..." required/></div><button type="submit" className="btn">Prepare Enquiry</button></form></section></main><ServicesFooter/></div>;
}

function ServicesFooter() {
  const socialIcons = [
    'home-inline-10.svg',
    'home-inline-11.svg',
    'home-inline-12.svg',
    'home-inline-13.svg',
    'home-inline-15.svg',
    'home-inline-14.svg'
  ];
  const socialLabels = ['Facebook', 'Instagram', 'LinkedIn', 'X', 'GitHub', 'YouTube'];
  return <footer className="glass-panel services-footer"><img src={logo} width="40" height="40" alt="Yash12007 logo"/><h2>Yash12007 | Services</h2><p>© 2026 Yash12007. All Rights Reserved.</p><div className="footer-contact"><a href="https://share.google/xNASlbmnA0zcAP9Oy">Pune, Maharashtra – 411048</a><a href="mailto:info@yash12007.com">info@yash12007.com</a></div><div className="social-icons" aria-label="Social media links">{sameAs.map((url, index) => <a href={url} key={url} target="_blank" rel="noreferrer" aria-label={socialLabels[index]}><OriginalSvg file={socialIcons[index]} /></a>)}</div><strong>Helpful Links</strong><div className="helpful-links">{[['Home', '/'], ['Dashboard', 'https://dashboard.yash12007.com'], ['Whirlsen', 'https://whirlsen.yash12007.com/'], ['Paradise SDP', 'https://paradise.yash12007.com'], ['SERA 3.0', 'https://www.yash12007.com/Sera'], ['Metrica', 'https://www.yash12007.com/metrica'], ['Documentation', 'https://docs.yash12007.com'], ['Certifications', 'https://docs.yash12007.com/certifications'], ['Terms of Service', '/legal/terms'], ['Privacy Policy', '/legal/privacy']].map(([text, href]) => <a href={href} key={text}>{text}</a>)}</div></footer>;
}

function LegalLayout({ title, children }) {
  return <main className="legal-container"><header className="legal-header"><a href="/" className="legal-brand"><img src={logo} alt="Yash12007 logo" width="40" height="40"/>Yash12007</a><h1>{title}</h1><p className="legal-meta">Last Updated: June 19, 2026</p></header>{children}<footer className="legal-footer">© 2026 Yash12007. All rights reserved. Contact: <a href="mailto:info@yash12007.com">info@yash12007.com</a><div><a href="/legal/terms">Terms</a><a href="/legal/privacy">Privacy</a><a href="/legal/license">Developer License</a><a href="/return-policy">Returns</a><a href="/shipping-policy">Shipping</a></div></footer></main>;
}

function LegalPage({ page }) {
  const info = {
    terms: { title: 'Terms of Service', seo: 'terms' },
    privacy: { title: 'Privacy Policy', seo: 'privacy' },
    license: { title: 'Developer API & Software License Agreement', seo: 'license' },
  }[page];
  return <div className="legal-page"><Seo page={info.seo}/><LegalLayout title={info.title}>{page === 'terms' ? <><section><p>Welcome to Yash12007. Please read these Terms of Service (“Terms”) carefully before using our website located at <a href="https://yash12007.com">yash12007.com</a> and any associated software, applications, or services (collectively, the “Service”) operated by Yash12007 (“us”, “we”, or “our”).</p><div className="highlight-box"><strong>TL;DR:</strong> By accessing our multi-platform software tools, APIs, or website, you agree to these rules. If you do not agree, please do not use our services.</div></section><section><h2>1. Conditions of Use</h2><p>By using this Service, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. Yash12007 only grants use and access of this website, its products, and its services to those who have accepted its terms.</p></section><section><h2>2. Intellectual Property</h2><p>You agree that all materials, products, and services provided on this website are the property of Yash12007, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute Yash12007’s intellectual property in any way, including electronic, digital, or new trademark registrations, without express written permission.</p></section><section><h2>3. User Accounts</h2><p>As a user of this website or our software ecosystem, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.</p><p>If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.</p></section><section><h2>4. Prohibited Activities</h2><p>You agree not to use the Service to:</p><ul><li>Reverse engineer, decompile, or disassemble any binaries or software served across Windows, Linux, Android, or Web environments, except as permitted by explicit developer licenses.</li><li>Engage in any automated scraping, data mining, or resource-heavy queries that disrupt service infrastructure.</li><li>Use our software or systems to distribute malware, spyware, or launch malicious digital operations.</li></ul></section><section><h2>5. Termination</h2><p>We may terminate your access to the Service, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p></section><section><h2>6. Limitation of Liability</h2><p>Yash12007 is not liable for any damages that may occur to you as a result of your misuse of our website or software. Yash12007 reserves the right to edit, modify, and change this Agreement at any time.</p></section><section><h2>7. Governing Law</h2><p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p></section></> : page === 'privacy' ? <><section><p>At Yash12007, accessible from <a href="https://yash12007.com">yash12007.com</a>, one of our main priorities is the privacy of our visitors and users. This Privacy Policy document contains types of information that is collected and recorded by Yash12007 and how we use it across our web, mobile, and desktop software ecosystems.</p></section><section><h2>1. Information We Collect</h2><p>If you contact us directly or sign up for an account, we may receive additional information about you, such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p><p>When you use our native applications (Android, Windows, Linux), we may process basic system diagnostic and telemetry data anonymously to improve software stability and execution efficiency.</p></section><section><h2>2. How We Use Your Information</h2><p>We use the information we collect in various ways, including to:</p><ul><li>Provide, operate, and maintain our software and web services.</li><li>Improve, personalise, and expand our platform features.</li><li>Understand and analyse how you interact with our applications.</li><li>Develop new products, services, features, and functionality.</li><li>Send you technical updates, security alerts, and support messages.</li></ul></section><section><h2>3. Log Files</h2><p>Yash12007 follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p></section><section><h2>4. Data Protection Rights</h2><p>We want to ensure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p><ul><li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li><li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li><li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li><li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li></ul></section><section><h2>5. Security of Data</h2><p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use industry-standard commercial means to protect your personal data, we cannot guarantee its absolute security.</p></section></> : <><section><p>This Developer API &amp; Software License Agreement (“Agreement”) governs your development and deployment of commercial or non-commercial applications integrating with software binaries, web endpoints, or proprietary technologies owned by Yash12007.</p></section><section><h2>1. License Grant</h2><p>Subject to your compliance with this Agreement, Yash12007 grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access our APIs and utilize our binary distributions solely to build, optimize, and distribute interoperable integrations across Web, Android, Windows, and Linux operating systems.</p></section><section><h2>2. Restrictions and Safeguards</h2><p>Unless explicitly approved by Yash12007 via a separate Enterprise Agreement, you shall not:</p><ul><li>Modify, disguise, or obfuscate the native headers or source references of our distributed components.</li><li>Exceed maximum threshold API limits or systematically cache resources to bypass operational paywalls.</li><li>Redistribute standalone binaries under competing commercial brands or labels.</li></ul></section><section><h2>3. API Usage Data &amp; Custom Headers</h2><p>Developers must include valid structural identification in user-agent strings or custom API headers when querying our infrastructure. We reserve the right to dynamically limit rate capacities or drop connection sockets for non-compliant or unidentified programmatic request formats.</p></section><section><h2>4. No Warranty (“AS-IS”)</h2><p>The developer tools, packages, and API endpoints are provided on an <code>AS-IS</code> and <code>AS-AVAILABLE</code> basis without any technical warranties, express or implied. Yash12007 does not warrant that the underlying code frameworks will be permanently error-free or completely uninterrupted.</p></section></>}</LegalLayout></div>;
}

function ReturnsPage() {
  return <div className="policy-page"><Seo page="returns"/><header className="policy-nav"><Brand/></header><main className="policy-container"><h1>Return &amp; Refund Policy</h1><p><strong>Last Updated:</strong> March 2026</p><p>Thank you for choosing <strong>Yash12007</strong>. We are committed to delivering high-quality digital software and applications. While our products are digitally delivered, we do accept return and refund requests for both defective and non-defective products, subject to the conditions outlined below.</p><h2>Eligibility for Returns</h2><p>A return or refund request may be approved only if a <strong>valid and justifiable reason</strong> is provided. All requests are carefully reviewed to ensure fair usage and prevent misuse.</p><h2>Valid Reasons for Return</h2><p>Returns may be accepted under the following conditions:</p><ul><li>The software is defective, not functioning, or fails to install on supported systems.</li><li>The product does not match the description provided.</li><li>Technical issues that cannot be resolved by our support team.</li><li>Accidental duplicate purchase or billing errors.</li><li>Non-defective returns with a valid explanation (subject to approval).</li></ul><h2>Non-Defective Product Returns</h2><p>Returns for non-defective products are not automatically approved. Requests must include a clear and reasonable explanation, and approval depends on internal review.</p><p><strong>Returns will NOT be accepted if:</strong></p><ul><li>The product has already been fully used or consumed for its intended purpose.</li><li>The request is made without a valid or specific reason.</li><li>The customer changes their mind without justification.</li><li>The product functions as described and meets expectations outlined in documentation.</li></ul><h2>Return Request Timeframe</h2><p>All return or refund requests must be submitted within <strong>30 days of purchase</strong>. Requests submitted after this period may not be eligible.</p><h2>Review &amp; Approval Process</h2><p>Each request is manually reviewed. To process your request, please provide:</p><ul><li>Your Order ID or transaction reference</li><li>A detailed reason for the return</li><li>Proof of purchase</li><li>Screenshots or video evidence (if applicable)</li></ul><p>Our team reserves the right to approve or reject any request based on the information provided.</p><h2>Fair Usage Policy</h2><p>To maintain fairness, we enforce a strict policy against misuse. Returns may be denied if we detect patterns such as repeated purchase-and-return behaviour or attempts to exploit the system.</p><h2>Processing Time</h2><p>Approved refunds will be processed within <strong>3–7 business days</strong>.</p><h2>How to Request a Return</h2><p>To request a return or refund, please contact us via email and include all required details.</p><p>Email us at: <a href="mailto:info@yash12007.com">info@yash12007.com</a></p><p>Our support team will review your request and respond within <strong>3 business days</strong>.</p><h2>Contact</h2><p><strong>Company:</strong> Yash12007<br/><strong>Email:</strong> <a href="mailto:info@yash12007.com">info@yash12007.com</a></p></main></div>;
}

function ShippingPage() {
  return <div className="policy-page shipping-policy"><Seo page="shipping"/><header className="policy-nav"><Brand/></header><main className="policy-container"><h1>Shipping Policy</h1><p><strong>Effective Date:</strong> 25 July 2025</p><p>Yash12007 provides both <strong>digital products</strong> and <strong>physical products</strong>. Shipping terms are clearly defined below in accordance with Google Merchant Center requirements.</p><h2>1. Shipping Coverage</h2><ul><li>Physical products are shipped only within <strong>India</strong>.</li><li>Digital products are delivered worldwide via electronic delivery and do not require shipping.</li></ul><h2>2. Order Handling Time</h2><ul><li>All physical orders are processed within <strong>1 business day</strong>.</li><li>Handling time: <strong>0–1 business days</strong>.</li></ul><h2>3. Transit Time (After Dispatch)</h2><ul><li>Standard Shipping: <strong>3–7 business days</strong></li><li>Express Shipping: <strong>1–3 business days</strong></li></ul><h2>4. Shipping Costs (India)</h2><ul><li>Standard Shipping: <strong>₹0 (Free)</strong></li><li>Express Shipping: <strong>₹199 flat rate</strong></li><li>No hidden fees are charged.</li></ul><h2>5. Digital Products</h2><ul><li>Digital products are delivered instantly via email or secure download link after payment.</li><li>Shipping cost: <strong>₹0</strong></li><li>Delivery time: <strong>Immediate (within minutes)</strong></li></ul><h2>6. Remote &amp; Exceptional Locations</h2><ul><li>Delivery times may extend by 1–2 business days for remote areas.</li><li>Any delay will be communicated to the customer via email.</li></ul><h2>7. Shipping Confirmation &amp; Tracking</h2><ul><li>Tracking details are provided via email once physical products are dispatched.</li></ul><h2>8. Taxes &amp; Duties</h2><ul><li>All prices are inclusive of applicable Indian taxes unless stated otherwise.</li><li>No customs duties apply for domestic shipments.</li></ul><h2>9. Customer Support</h2><p>📍 Pune, Maharashtra, India<br/>📧 Email: <a href="mailto:info@yash12007.com">info@yash12007.com</a><br/>🌐 Website: <a href="https://www.yash12007.com/Max/contact">www.yash12007.com/Max/contact</a></p><p><em>This policy is designed to comply with Google Merchant Center shipping and transparency requirements fully.</em></p></main></div>;
}

function App() {
  const [page, setPage] = useState(() => routeFor(window.location.pathname));
  useEffect(() => {
    const onPopState = () => setPage(routeFor(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  if (page === 'services') return <ServicesPage/>;
  if (['terms', 'privacy', 'license'].includes(page)) return <LegalPage page={page}/>;
  if (page === 'returns') return <ReturnsPage/>;
  if (page === 'shipping') return <ShippingPage/>;
  return <HomePage/>;
}

export default App;
