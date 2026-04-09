/* ============================================
   YUEWEI 交互效果脚本
   Interactive Effects Script
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // 1. 滚动动画观察器 - Scroll Animation Observer
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // 观察所有需要动画的元素
  document.querySelectorAll('.yw-service-card, .yw-advantage-card, .yw-value-card, .yw-coop-card, .yw-process-step, .region-card, .product-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // ============================================
  // 2. 鼠标跟随光效 - Mouse Follow Glow
  // ============================================
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // ============================================
  // 3. 粒子背景 - Particle Background
  // ============================================
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-bg');
    document.body.prepend(particlesContainer);

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // ============================================
  // 4. 卡片点击波纹效果 - Card Click Ripple
  // ============================================
  document.querySelectorAll('.yw-service-card, .yw-advantage-card, .yw-value-card, .yw-coop-card, .region-card, .product-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(74, 144, 164, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: ripple 0.6s ease-out forwards;
      `;
      ripple.style.left = (e.clientX - this.getBoundingClientRect().left) + 'px';
      ripple.style.top = (e.clientY - this.getBoundingClientRect().top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================
  // 5. 导航栏滚动效果 - Navbar Scroll Effect
  // ============================================
  const nav = document.querySelector('.sc-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.style.background = 'rgba(26, 54, 93, 0.95)';
      nav.style.backdropFilter = 'blur(10px)';
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // 6. 平滑滚动 - Smooth Scroll
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // 7. 数字计数动画 - Number Counter Animation
  // ============================================
  const counters = document.querySelectorAll('.yw-stat-number, .counter-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (!isNaN(number) && !target.classList.contains('counted')) {
          target.classList.add('counted');
          animateCounter(target, 0, number, 2000);
        }
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + range * easeProgress);

      const originalText = element.textContent;
      const suffix = originalText.replace(/[\d,]/g, '');
      element.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    requestAnimationFrame(updateCounter);
  }

  // ============================================
  // 8. 卡片悬停3D效果 - Card 3D Hover Effect
  // ============================================
  document.querySelectorAll('.yw-service-card, .yw-value-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ============================================
  // 9. 打字机效果 - Typewriter Effect
  // ============================================
  const typewriterElements = document.querySelectorAll('.typewriter');

  typewriterElements.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    el.style.borderRight = '2px solid var(--yw-primary)';

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        el.style.borderRight = 'none';
      }
    }, 50);
  });

  // ============================================
  // 10. 图片懒加载动画 - Image Lazy Load Animation
  // ============================================
  const images = document.querySelectorAll('img');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';

        img.onload = () => {
          img.style.transition = 'all 0.5s ease';
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        };

        if (img.complete) {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        }

        imageObserver.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => imageObserver.observe(img));

  // ============================================
  // 11. 按钮点击反馈 - Button Click Feedback
  // ============================================
  document.querySelectorAll('.yw-cta-btn, .ec-cta-btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(-1px) scale(0.98)';
    });

    btn.addEventListener('mouseup', function() {
      this.style.transform = '';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ============================================
  // 12. 视差滚动效果 - Parallax Scroll Effect
  // ============================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero 区域视差
    const heroContent = document.querySelector('.yw-hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - scrolled / 500;
    }

    // 光晕视差
    const glows = document.querySelectorAll('.yw-hero-glow');
    glows.forEach((glow, index) => {
      glow.style.transform = `translate(${scrolled * (0.1 + index * 0.05)}px, ${scrolled * 0.1}px)`;
    });
  });

  // ============================================
  // 13. 标签悬停效果 - Tag Hover Effects
  // ============================================
  document.querySelectorAll('.yw-hero-tag, .yw-service-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.1)';
    });

    tag.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ============================================
  // 14. 页面加载动画 - Page Load Animation
  // ============================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // ============================================
  // 15. 表单输入动画 - Form Input Animation
  // ============================================
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('input-focused');
      this.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('input-focused');
      this.style.transform = '';
    });
  });

  // ============================================
  // 16. 返回顶部按钮 - Back to Top Button
  // ============================================
  const backToTop = document.createElement('button');
  backToTop.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  `;
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4a90a4 0%, #2c5f7c 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(74, 144, 164, 0.3);
  `;
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backToTop.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
  });

  backToTop.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });

  // ============================================
  // 17. 随机颜色标签 - Random Color Tags
  // ============================================
  const colors = [
    'linear-gradient(135deg, #4a90a4 0%, #2c5f7c 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  ];

  document.querySelectorAll('.yw-service-tags span').forEach((tag, index) => {
    tag.addEventListener('mouseenter', function() {
      this.style.background = colors[index % colors.length];
      this.style.color = 'white';
    });

    tag.addEventListener('mouseleave', function() {
      this.style.background = '';
      this.style.color = '';
    });
  });

  // ============================================
  // 18. 控制台欢迎信息 - Console Welcome Message
  // ============================================
  console.log('%c YUEWEI 全球供应链 ', 'background: linear-gradient(135deg, #4a90a4, #2c5f7c); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
  console.log('%c 链接中国与世界 ', 'color: #4a90a4; font-size: 14px;');

});
