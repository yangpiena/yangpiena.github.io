# 昜丿捺 博客项目

> "没有阳光，沉默而居"

## 🌐 在线访问

| 平台 | 地址 |
|------|------|
| **GitHub Pages** | [yangpiena.github.io](https://yangpiena.github.io/) |
| **Gitee Pages** | [yangpiena.gitee.io](https://yangpiena.gitee.io/) |
| **Coding Pages** | [coding-pages-bucket-407450-1059047-17379-602648-1258146968.cos-website.ap-hongkong.myqcloud.com](http://coding-pages-bucket-407450-1059047-17379-602648-1258146968.cos-website.ap-hongkong.myqcloud.com/) |
| **Cloudflare Pages** | [yangpiena.pages.dev](https://yangpiena.pages.dev) |

---

## 📚 项目概览

| 属性 | 内容 |
|------|------|
| **项目类型** | 个人技术博客（Hexo + NexT 主题） |
| **核心功能** | 文章发布、分类标签、搜索、Live2D 看板娘 |
| **部署平台** | Gitee、GitHub、Coding、Cloudflare Pages |
| **当前状态** | ✅ 可编译运行，已有丰富技术文档内容 |

---

## 🏗️ 项目结构

```
yangpiena/
├── _config.yml              # Hexo 主配置文件
├── package.json             # NPM 依赖管理
├── source/                  # 源文件目录
│   ├── _posts/              # 76 篇技术文章
│   ├── asset/               # 静态资源
│   ├── categories/          # 分类文档
│   ├── img/                 # 图片资源
│   ├── links/               # 友情链接
│   ├── photos/              # 相册
│   └── tags/                # 标签文档
├── themes/
│   ├── jsimple/             # 旧主题备份
│   └── next/                # 主用主题（NexT）
├── public/                  # 编译后的静态站点
├── db.json                  # 数据库缓存
└── .deploy_git/             # Git 部署配置
```

---

## 📝 核心内容分析

### ✨ 文章内容（source/_posts）

共 **76 篇** 技术文档，时间跨度从 2019-2025 年，主要主题：

| 类别 | 数量 | 典型文章 |
|------|------|----------|
| **Git**      | 4+ | Git 命令大全、SSH 公钥生成、上传 Gitee/GitHub |
| **Linux**    | 10+ | Linux 命令大全、数据盘分区格式化、常用命令 |
| **Web 服务器** | 7+ | Nginx 安装配置、HAProxy 负载均衡详解 |
| **数据库**   | 5+ | MySQL 安装配置、SQL 经典语句、Oracle 操作 |
| **编程技术** | 10+ | Docker 使用、Python Django 部署、Java/C# 开发 |
| **工具软件** | 8+ | VSCode 设置、Chrome 插件、Markdown 语法 |

### 🎨 主题配置（_config.yml）

```yaml
site:
  title: 昜丿捺
  subtitle: '没有阳光，沉默而居'
  description: ''
  author: 昜丿捺
  keywords: []
deploy:
  - type: git      # Gitee (master, source)
    repo: https://gitee.com/yangpiena/yangpiena.git
  - type: git     # GitHub (master, source)
    repo: https://github.com/yangpiena/yangpiena.github.io.git
```

**特色插件：**
- ✅ Live2D 看板娘（黑猫模型 hijiki）
- ✅ NexT 主题
- ✅ Hexo Generator Search（全文搜索）
- ✅ Mermaid 流程图渲染
- ✅ MathJax 数学公式支持

### 🎁 部署配置

| 平台 | 分支 | 仓库 |
|------|------|------|
| **Gitee**  | `master` / `source` | 主仓库 |
| **GitHub** | `master` / `source` | 开源托管 |
| **Coding** | - | 备用部署（已注释）|
| **Cloudflare Pages** | - | CDN 加速（通过 .nojekyll 启用）|

---

## 🔍 技术栈详情

### ⚙️ NPM 依赖（package.json）

```json
{
  "hexo": "^6.3.0",
  "hexo-deployer-git": "^3.0.0",
  "hexo-filter-flowchart": "^1.0.4",      # Mermaid 流程图
  "hexo-filter-mermaid-diagrams": "^1.0.5",
  "hexo-filter-sequence": "^1.0.3",        # 时序图
  "hexo-generator-archive": "^2.0.0",     # 归档页面
  "hexo-generator-category": "^2.0.0",    # 分类页面
  "hexo-generator-index": "^3.0.0",       # 首页
  "hexo-generator-search": "^2.4.3",      # 搜索功能
  "hexo-generator-tag": "^2.0.0",         # 标签页
  "hexo-helper-live2d": "^3.1.1",         # Live2D 看板娘
  "live2d-widget-model-hijiki": "^1.0.5"  # 黑猫模型
}
```

### 📖 主题版本

- **NexT**: NexT (Hexo 最流行主题之一) - v8.x (根据 _config.yml 配置)
- **备份主题**: jsimple/ （2019 年安装）

---

## 🚀 快速上手指南

### 启动本地预览
```bash
hexo clean && hexo g && hexo s
```

### 部署到生产环境
```bash
hexo deploy
# 会自动推送到 Gitee 和 GitHub 两个仓库
```

---

## 📈 内容质量评估

| 维度 | 评分（1-5） | 说明 |
|------|-------------|------|
| **内容深度** | ⭐⭐⭐⭐ | 涵盖 Linux、数据库、Web 服务器全栈技术 |
| **更新频率** | ⭐⭐⭐   | 2025 年有多次新文章（Git、HAProxy） |
| **主题定制** | ⭐⭐⭐⭐ | 配置了 Live2D、Mermaid、MathJax 等高级功能 |
| **部署策略** | ⭐⭐⭐⭐⭐ | 多平台备份 + CDN 加速 |

---

## 💡 改进建议

1. **内容整理**: 可添加目录导航页，方便快速定位技术主题
2. **SEO 优化**: 完善 meta description、keywords（当前为空）
3. **社交分享**: 添加 Twitter、微信等分享按钮（NexT 支持）
4. **性能监控**: 部署 Cloudflare Analytics 或使用 Google Analytics
5. **备份机制**: 定期导出文章到 Markdown 仓库，防止数据丢失

---
