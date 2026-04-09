// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 数字递增动画
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length > 0) {
    const animateNumbers = () => {
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // 使用 easeOutExpo 缓动函数
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(start + (target - start) * easeProgress);

          num.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            num.textContent = target;
          }
        };

        requestAnimationFrame(updateNumber);
      });
    };

    // 延迟启动数字动画
    setTimeout(animateNumbers, 800);
  }

  // 卡片悬浮效果增强
  const cards = document.querySelectorAll('.card, .grid-card, .home-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });

    // 移动端触摸效果
    card.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 8px 30px rgba(74, 144, 164, 0.2)';
    });

    card.addEventListener('touchend', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    });
  });

  // 图片加载失败处理
  const images = document.querySelectorAll('.grid-card-image img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.nextElementSibling;
      if (placeholder && placeholder.classList.contains('grid-card-placeholder')) {
        placeholder.style.display = 'flex';
      }
    });
  });

  // 滚动动画 - 元素进入视口时添加动画
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // 延迟添加子元素动画
        const children = entry.target.querySelectorAll('.case-card, .feature-card, .coop-card, .section-points p');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-in');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // 观察所有section
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('animate-ready');
    observer.observe(section);
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.sc-nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 鼠标跟随光效（仅PC端）
  if (window.innerWidth > 768) {
    document.querySelectorAll('.case-card, .feature-card, .coop-card').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // 导航栏滚动效果
  const nav = document.querySelector('.sc-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // 导航链接高亮
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.sc-nav-links a');

  function highlightNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // 首页鼠标跟随效果
  const homeHero = document.querySelector('.home-hero');
  if (homeHero && window.innerWidth > 768) {
    homeHero.addEventListener('mousemove', function(e) {
      const glows = this.querySelectorAll('.bg-glow');
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      glows.forEach((glow, index) => {
        const factor = (index + 1) * 0.5;
        glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }
});
