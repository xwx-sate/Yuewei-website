---
name: H5 Supply Chain 3C Accessories Website
description: Mobile-first H5 website for supply chain 3C accessories brand
type: design
---

# H5 供应链 3C 配件网站设计文档

## 项目概述

创建一个移动端 H5 网站，展示供应链 3C 数码配件品牌，包含首页入口和二级详情页。

## 设计决策

### 首页入口页
- **布局**: 卡片式布局（方案C）
- **配色**: 商务蓝配色（配色A）
- **主标题**: 「全球供应链，链接中国与世界」
- **两个入口按钮**:
  - 左侧：品牌客户（Brand Clients）
  - 右侧：供应链合作伙伴（Supply Chain Partners）
- **交互**: 点击右侧按钮跳转二级详情页

### 二级详情页
- **布局**: 长滚动页面，三个模块上下排列
- **每个模块**: 标题居中 + 3行2列网格卡片

#### 模块1：地域 Region
- 6个地域卡片，使用 Unsplash 网络图片
- MX 墨西哥、E 欧洲、NA 巴西、哥伦比亚、Indian 印度、CN 中国

#### 模块2：产品 Product
- 6个产品卡片，预留图片上传位置
- 手机壳、平板、IML、耳机、硅胶、支架

#### 模块3：工艺 Craft
- 4个工艺卡片，预留图片上传位置
- IML工艺、硅胶成型、精密模具、印刷工艺

## 技术规范

### 配色方案
```css
/* 主色调 */
--primary-blue: #4a90a4;
--primary-dark: #2c5f7c;
--primary-darker: #1a3a4a;

/* 背景色 */
--bg-light: #f8f9fa;
--bg-gray: #e9ecef;

/* 文字色 */
--text-dark: #1a1a2e;
--text-muted: #666666;

/* 白色 */
--white: #ffffff;
```

### 字体
- 标题：无衬线字体，加粗
- 正文：无衬线字体，常规
- 层级：标题 > 模块标题 > 卡片标题

### 交互效果
- 按钮/卡片悬浮：渐变光晕、边框提亮、背景微亮
- 过渡动画：0.3s ease

### 响应式
- 移动端优先设计
- 最大宽度限制，居中显示

## 文件结构

```
/
├── index.html          # 首页入口
├── detail.html         # 二级详情页
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互脚本
└── images/
    ├── product/        # 产品图片（用户上传）
    │   ├── case.jpg
    │   ├── tablet.jpg
    │   ├── iml.jpg
    │   ├── earphone.jpg
    │   ├── silicone.jpg
    │   └── stand.jpg
    └── craft/          # 工艺图片（用户上传）
        ├── iml-process.jpg
        ├── silicone-molding.jpg
        ├── precision-mold.jpg
        └── printing.jpg
```

## 图片资源

### 地域图片（Unsplash）
| 地域 | 图片URL |
|------|---------|
| MX 墨西哥 | https://images.unsplash.com/photo-1518640467707-6811f4a6ab73 |
| E 欧洲 | https://images.unsplash.com/photo-1467269204594-9661b134dd2b |
| NA 巴西 | https://images.unsplash.com/photo-1483729558449-99ef09a8c325 |
| 哥伦比亚 | https://images.unsplash.com/photo-1570664832331-26f5845ba469 |
| Indian 印度 | https://images.unsplash.com/photo-1524492412937-b28074a5d7da |
| CN 中国 | https://images.unsplash.com/photo-1508804185872-d7badad00f7d |

### 产品/工艺图片
用户自行上传至 `images/` 目录

## 实现步骤

1. 创建项目文件结构
2. 编写 CSS 样式文件
3. 创建首页 HTML
4. 创建二级详情页 HTML
5. 添加交互脚本
6. 测试移动端适配
