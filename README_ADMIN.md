# 即刻短文后台管理

## 功能

- 在线编辑即刻短文
- 实时预览效果
- 自动保存到 `source/_data/brevity.json`

## 使用方法

### 1. 启动管理服务器

```bash
cd C:/Users/Administrator/WorkBuddy/Claw/hexo-blog
node admin/server.js
```

或者指定端口：

```bash
node admin/server.js --port 3001
```

### 2. 访问管理页面

- **管理后台**: http://localhost:3000/admin
- **预览页面**: http://localhost:3000/essay
- **API 端点**:
  - `GET  /admin/api/data` - 获取短文数据
  - `POST /admin/api/save` - 保存短文数据

### 3. 重新生成静态页面

在管理后台保存后，运行：

```bash
hexo clean && hexo generate
```

### 4. 部署

```bash
hexo deploy
```

## 文件结构

```
admin/
├── index.html      # 管理后台页面
├── server.js       # API 服务器
└── package.json    # 包配置

themes/solitude/
└── scripts/helper/
    └── brevity_admin.js  # Hexo helper
```

## 注意事项

- 后台服务器仅用于本地开发，生产环境使用 Hexo 静态生成
- 修改 `source/_data/brevity.json` 后需要重新生成静态页面
- 所有更改会自动保存到 JSON 文件
