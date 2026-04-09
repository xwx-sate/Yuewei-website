/**
 * YUEWEI Language Switcher
 * 三语切换系统 - 中文 / English / Español México
 */

// 当前语言状态
let currentLang = localStorage.getItem('yuewei-lang') || 'zh';

// 语言切换按钮样式
const langSwitcherStyle = `
.lang-switch {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background: rgba(30, 58, 95, 0.9);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.lang-switch:hover {
  background: rgba(44, 95, 124, 1);
  transform: scale(1.05);
}
`;

// 注入样式
const styleSheet = document.createElement('style');
styleSheet.textContent = langSwitcherStyle;
document.head.appendChild(styleSheet);

// 创建语言切换按钮
function createLangSwitcher() {
  const btn = document.createElement('button');
  btn.className = 'lang-switch';
  btn.id = 'langSwitchBtn';
  updateButtonText(btn);
  btn.onclick = toggleLanguage;
  document.body.appendChild(btn);
}

// 更新按钮文字
function updateButtonText(btn) {
  const labels = { zh: '中 / EN / MX', en: 'EN / MX / 中', mx: 'MX / 中 / EN' };
  btn.textContent = labels[currentLang] || '中 / EN / MX';
}

// 切换语言
function toggleLanguage() {
  const langOrder = ['zh', 'en', 'mx'];
  const currentIndex = langOrder.indexOf(currentLang);
  currentLang = langOrder[(currentIndex + 1) % langOrder.length];
  localStorage.setItem('yuewei-lang', currentLang);
  updateButtonText(document.getElementById('langSwitchBtn'));
  applyLanguage();
}

// 应用语言
function applyLanguage() {
  // 处理所有带有 data-zh, data-en, data-mx 属性的元素
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    let text = el.getAttribute('data-' + currentLang);
    // 如果没有当前语言的翻译，回退到英文
    if (!text && currentLang === 'mx') {
      text = el.getAttribute('data-en');
    }
    if (text) {
      // 检查是否是input或textarea
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // 更新页面标题
  const titleEl = document.querySelector('title');
  if (titleEl) {
    let title = titleEl.getAttribute('data-' + currentLang);
    if (!title && currentLang === 'mx') {
      title = titleEl.getAttribute('data-en');
    }
    if (title) {
      document.title = title;
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  createLangSwitcher();
  applyLanguage();
});

// 导出函数供外部调用
window.toggleLanguage = toggleLanguage;
window.currentLang = currentLang;
window.applyLanguage = applyLanguage;
