const root = document.documentElement;
const body = document.body;

const menuToggle = document.querySelector('.menu-toggle');
const mobilePanel = document.getElementById('mobilePanel');
const mobileBackdrop = document.getElementById('mobileBackdrop');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

const themeButtons = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')].filter(Boolean);
const langButtons = [document.getElementById('langToggle'), document.getElementById('langToggleMobile')].filter(Boolean);

const translations = {
  en: {
    brand: 'Traseen International',
    menuTitle: 'Menu',
    navAbout: 'About',
    navServices: 'Services',
    navGallery: 'Gallery',
    navContact: 'Contact',
    kicker: 'Global Digital Leadership',
    heroTitle: 'We build business websites that communicate authority and drive growth.',
    heroDesc:
      'From strategic positioning to high-performance implementation, Traseen International helps brands present a stronger market image and convert attention into results.',
    ctaPrimary: 'Start Your Project',
    ctaSecondary: 'Explore Services',
    aboutTitle: 'About Traseen',
    aboutDesc:
      'We partner with ambitious organizations to craft premium digital experiences that balance executive-level design standards with measurable business outcomes.',
    servicesTitle: 'Core Services',
    service1Title: 'Corporate Website Development',
    service1Desc: 'Scalable, responsive, and conversion-focused websites tailored for global audiences.',
    service2Title: 'Brand Experience Design',
    service2Desc: 'Unified visual systems that increase trust, recognition, and perceived market value.',
    service3Title: 'Performance Optimization',
    service3Desc: 'Technical optimization, media compression, and structural cleanup for faster delivery.',
    galleryTitle: 'Project Gallery',
    contactTitle: 'Contact',
    emailLabel: 'Email:',
    phoneLabel: 'Phone:'
  },
  ar: {
    brand: 'تراسين الدولية',
    menuTitle: 'القائمة',
    navAbout: 'من نحن',
    navServices: 'الخدمات',
    navGallery: 'الأعمال',
    navContact: 'تواصل',
    kicker: 'قيادة رقمية عالمية',
    heroTitle: 'نبني مواقع أعمال احترافية تعزز الثقة وتدفع النمو.',
    heroDesc:
      'من التموضع الاستراتيجي إلى التنفيذ عالي الأداء، تساعد تراسين الدولية الشركات على تقديم صورة سوقية أقوى وتحويل الاهتمام إلى نتائج فعلية.',
    ctaPrimary: 'ابدأ مشروعك',
    ctaSecondary: 'استعرض الخدمات',
    aboutTitle: 'عن تراسين',
    aboutDesc:
      'نتعاون مع المؤسسات الطموحة لصناعة تجارب رقمية راقية تجمع بين معايير التصميم التنفيذي والنتائج القابلة للقياس.',
    servicesTitle: 'الخدمات الأساسية',
    service1Title: 'تطوير مواقع الشركات',
    service1Desc: 'مواقع سريعة ومتجاوبة ومهيأة للتحويل ومناسبة للجمهور العالمي.',
    service2Title: 'تصميم تجربة العلامة',
    service2Desc: 'أنظمة بصرية موحدة تعزز الثقة والانتشار والقيمة السوقية.',
    service3Title: 'تحسين الأداء',
    service3Desc: 'تحسين تقني شامل وضغط الوسائط وتنظيم الهيكل لسرعة أعلى.',
    galleryTitle: 'معرض المشاريع',
    contactTitle: 'التواصل',
    emailLabel: 'البريد:',
    phoneLabel: 'الهاتف:'
  }
};

function closeMenu() {
  body.classList.remove('menu-open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  if (mobilePanel) {
    mobilePanel.setAttribute('aria-hidden', 'true');
  }
}

function openMenu() {
  body.classList.add('menu-open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'true');
  }
  if (mobilePanel) {
    mobilePanel.setAttribute('aria-hidden', 'false');
  }
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (body.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (mobileBackdrop) {
  mobileBackdrop.addEventListener('click', closeMenu);
}

if (mobileClose) {
  mobileClose.addEventListener('click', closeMenu);
}

mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

function updateThemeButtonLabels(theme) {
  const label = theme === 'dark' ? 'Light' : 'Dark';
  themeButtons.forEach((btn) => {
    btn.textContent = label;
  });
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeButtonLabels(theme);
}

function toggleTheme() {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}

themeButtons.forEach((btn) => btn.addEventListener('click', toggleTheme));

function updateLanguageButtons(language) {
  const label = language === 'en' ? 'AR' : 'EN';
  langButtons.forEach((btn) => {
    btn.textContent = label;
  });
}

function applyLanguage(language) {
  const dict = translations[language] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (dict[key]) {
      node.textContent = dict[key];
    }
  });

  root.lang = language;
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  root.dir = direction;
  body.dir = direction;

  localStorage.setItem('language', language);
  updateLanguageButtons(language);
}

function toggleLanguage() {
  const current = root.lang === 'ar' ? 'ar' : 'en';
  const next = current === 'en' ? 'ar' : 'en';
  applyLanguage(next);
}

langButtons.forEach((btn) => btn.addEventListener('click', toggleLanguage));

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  applyTheme(savedTheme);
} else {
  applyTheme('dark');
}

const savedLanguage = localStorage.getItem('language');
if (savedLanguage === 'ar' || savedLanguage === 'en') {
  applyLanguage(savedLanguage);
} else {
  applyLanguage('en');
}

if (window.AOS) {
  window.AOS.init({
    duration: 720,
    once: true,
    easing: 'ease-out-cubic'
  });
}
