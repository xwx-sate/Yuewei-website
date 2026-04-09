# H5 供应链 3C 配件网站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个移动端 H5 网站，展示供应链 3C 数码配件品牌，包含首页入口和二级详情页。

**Architecture:** 单页应用架构，首页和详情页分离，使用纯 HTML/CSS/JS 实现，无需框架。CSS 使用 CSS 变量管理主题色，响应式布局适配移动端。

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript

---

## 文件结构

```
/
├── index.html              # 首页入口
├── detail.html             # 二级详情页
├── css/
│   └── style.css           # 全局样式
├── js/
│   └── main.js             # 交互脚本
└── images/
    ├── product/            # 产品图片（用户上传）
    └── craft/              # 工艺图片（用户上传）
```

---

### Task 1: 创建项目目录结构

**Files:**
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `images/product/.gitkeep`
- Create: `images/craft/.gitkeep`

- [ ] **Step 1: 创建目录结构**

```bash
mkdir -p css js images/product images/craft
touch css/style.css js/main.js images/product/.gitkeep images/craft/.gitkeep
```

- [ ] **Step 2: 验证目录创建成功**

Run: `ls -la`
Expected: 显示 css, js, images 目录

---

### Task 2: 编写 CSS 样式文件

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: 编写 CSS 变量和重置样式**

```css
/* CSS 变量 - 商务蓝配色 */
:root {
  --primary-blue: #4a90a4;
  --primary-dark: #2c5f7c;
  --primary-darker: #1a3a4a;
  --bg-light: #f8f9fa;
  --bg-gray: #e9ecef;
  --text-dark: #1a1a2e;
  --text-muted: #666666;
  --white: #ffffff;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 30px rgba(74, 144, 164, 0.2);
  --radius: 12px;
  --transition: all 0.3s ease;
}

/* 重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-gray) 100%);
  min-height: 100vh;
  color: var(--text-dark);
  line-height: 1.6;
}
```

- [ ] **Step 2: 编写首页卡片样式**

```css
/* 首页容器 */
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 主标题 */
.main-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 50px;
  letter-spacing: 2px;
}

/* 卡片容器 */
.card-container {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 500px;
}

/* 卡片样式 */
.card {
  flex: 1;
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px 20px;
  text-align: center;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  color: inherit;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border: 2px solid var(--primary-blue);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius);
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.card-icon.brand {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-dark) 100%);
}

.card-icon.partner {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-darker) 100%);
}

.card-title {
  font-weight: 600;
  color: var(--text-dark);
  font-size: 16px;
  margin-bottom: 6px;
}

.card-subtitle {
  font-size: 12px;
  color: var(--text-muted);
}

/* 移动端适配 */
@media (max-width: 480px) {
  .card-container {
    flex-direction: column;
    max-width: 280px;
  }

  .main-title {
    font-size: 20px;
    margin-bottom: 40px;
  }
}
```

- [ ] **Step 3: 编写二级详情页样式**

```css
/* 详情页容器 */
.detail-container {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

/* 模块标题 */
.section-title {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 16px;
  margin-top: 30px;
}

.section-title:first-child {
  margin-top: 0;
}

/* 网格布局 */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* 网格卡片 */
.grid-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.grid-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.grid-card-image {
  width: 100%;
  height: 90px;
  object-fit: cover;
  background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-gray) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grid-card-placeholder {
  color: var(--primary-blue);
  font-size: 12px;
}

.grid-card-title {
  padding: 10px;
  text-align: center;
  font-weight: 600;
  color: var(--text-dark);
  font-size: 14px;
}

/* 模块间距 */
.section {
  margin-bottom: 30px;
}

/* 返回按钮 */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--white);
  border-radius: 8px;
  color: var(--primary-dark);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.back-btn:hover {
  background: var(--primary-blue);
  color: var(--white);
}
```

---

### Task 3: 创建首页 HTML

**Files:**
- Create: `index.html`

- [ ] **Step 1: 编写首页 HTML**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>全球供应链 - 链接中国与世界</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="home-container">
    <h1 class="main-title">全球供应链，链接中国与世界</h1>

    <div class="card-container">
      <a href="#" class="card">
        <div class="card-icon brand">
          <span style="color: white;">🏢</span>
        </div>
        <div class="card-title">品牌客户</div>
        <div class="card-subtitle">Brand Clients</div>
      </a>

      <a href="detail.html" class="card">
        <div class="card-icon partner">
          <span style="color: white;">🤝</span>
        </div>
        <div class="card-title">供应链合作伙伴</div>
        <div class="card-subtitle">Supply Chain Partners</div>
      </a>
    </div>
  </div>

  <script src="js/main.js"></script>
</body>
</html>
```

---

### Task 4: 创建二级详情页 HTML

**Files:**
- Create: `detail.html`

- [ ] **Step 1: 编写二级详情页 HTML**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>供应链合作伙伴 - 全球供应链</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="detail-container">
    <a href="index.html" class="back-btn">
      <span>←</span> 返回首页
    </a>

    <!-- 地域模块 -->
    <div class="section">
      <h2 class="section-title">地域 Region</h2>
      <div class="grid">
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=300&h=200&fit=crop" alt="墨西哥">
          </div>
          <div class="grid-card-title">MX 墨西哥</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=200&fit=crop" alt="欧洲">
          </div>
          <div class="grid-card-title">E 欧洲</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=300&h=200&fit=crop" alt="巴西">
          </div>
          <div class="grid-card-title">NA 巴西</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="https://images.unsplash.com/photo-1570664832331-26f5845ba469?w=300&h=200&fit=crop" alt="哥伦比亚">
          </div>
          <div class="grid-card-title">哥伦比亚</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=200&fit=crop" alt="印度">
          </div>
          <div class="grid-card-title">Indian 印度</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300&h=200&fit=crop" alt="中国">
          </div>
          <div class="grid-card-title">CN 中国</div>
        </div>
      </div>
    </div>

    <!-- 产品模块 -->
    <div class="section">
      <h2 class="section-title">产品 Product</h2>
      <div class="grid">
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/product/case.jpg" alt="手机壳" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">手机壳</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/product/tablet.jpg" alt="平板" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">平板</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/product/iml.jpg" alt="IML" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">IML</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/product/earphone.jpg" alt="耳机" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">耳机</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/product/silicone.jpg" alt="硅胶" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">硅胶</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/product/stand.jpg" alt="支架" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">支架</div>
        </div>
      </div>
    </div>

    <!-- 工艺模块 -->
    <div class="section">
      <h2 class="section-title">工艺 Craft</h2>
      <div class="grid">
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/craft/iml-process.jpg" alt="IML工艺" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">IML工艺</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/craft/silicone-molding.jpg" alt="硅胶成型" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">硅胶成型</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/craft/precision-mold.jpg" alt="精密模具" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">精密模具</div>
        </div>
        <div class="grid-card">
          <div class="grid-card-image">
            <img src="images/craft/printing.jpg" alt="印刷工艺" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="grid-card-placeholder" style="display:none;">📷 您的图片</span>
          </div>
          <div class="grid-card-title">印刷工艺</div>
        </div>
      </div>
    </div>
  </div>

  <script src="js/main.js"></script>
</body>
</html>
```

---

### Task 5: 编写交互脚本

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: 编写交互脚本**

```javascript
// 卡片悬浮效果增强
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card, .grid-card');

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
});
```

---

### Task 6: 测试验证

- [ ] **Step 1: 在浏览器中打开首页**

打开 `index.html`，验证：
- 标题居中显示
- 两个卡片并排显示
- 悬浮效果正常
- 点击右侧卡片跳转到详情页

- [ ] **Step 2: 在浏览器中打开详情页**

打开 `detail.html`，验证：
- 返回按钮正常工作
- 三个模块上下排列
- 地域图片正常加载
- 产品/工艺显示占位符（因为用户图片未上传）
- 卡片悬浮效果正常

- [ ] **Step 3: 测试移动端适配**

使用浏览器开发者工具模拟移动端（宽度 375px），验证：
- 首页卡片在小屏幕上垂直排列
- 详情页网格正常显示
- 所有元素可触摸操作

---

### Task 7: 创建 README 说明文档

**Files:**
- Create: `README.md`

- [ ] **Step 1: 编写 README**

```markdown
# H5 供应链 3C 配件网站

移动端 H5 网站，展示供应链 3C 数码配件品牌。

## 使用说明

1. 直接在浏览器中打开 `index.html`
2. 点击「供应链合作伙伴」进入详情页
3. 上传您的产品/工艺图片到 `images/` 目录

## 图片上传

### 产品图片
将以下图片放入 `images/product/` 目录：
- `case.jpg` - 手机壳
- `tablet.jpg` - 平板
- `iml.jpg` - IML
- `earphone.jpg` - 耳机
- `silicone.jpg` - 硅胶
- `stand.jpg` - 支架

### 工艺图片
将以下图片放入 `images/craft/` 目录：
- `iml-process.jpg` - IML工艺
- `silicone-molding.jpg` - 硅胶成型
- `precision-mold.jpg` - 精密模具
- `printing.jpg` - 印刷工艺

## 技术栈

- HTML5
- CSS3 (CSS Variables)
- Vanilla JavaScript
```
