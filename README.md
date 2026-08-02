# ClueMesh

<p align="center"><img src="build/icon-source.png" width="180" alt="ClueMesh app icon"></p>

<p align="center"><strong>Clues, connected.</strong></p>

ClueMesh 是一款本地优先的公开身份线索分析工具。它可以拆解用户名和昵称，在近千个公开网站中查找候选主页，提取公开元数据，并把分散线索整理为统计结果和关系图谱。

- [下载最新版本](https://github.com/tsingke/cluemesh/releases/latest)
- [中文使用教程](docs/中文使用教程.md)
- [发行说明](docs/RELEASE_NOTES_1.0.0.md)
- [许可说明](NOTICE.md)

> 本工具只能生成候选线索，不能证明不同账号属于同一人。请仅用于合法、获授权的公开信息调查。

## 功能

- 在近千个公开网站中执行并发用户名检测。
- 使用 HTTP 快速扫描或 Firefox/Selenium 深度扫描。
- 分析用户名中的姓名、数字、符号、年份和单词边界。
- 提取页面公开元数据、URL 和预定义模式。
- 生成类别、国家和元数据统计。
- 根据提取结果生成交互式关系图谱。
- 支持多用户名关联分析、代理和自定义 User-Agent。
- 导出结构化 JSON 调查结果。
- 提供 macOS 原生窗口、菜单、单实例和安全外链处理。

## 系统要求

预编译版本：

- Apple Silicon Mac；
- macOS 12 或更高版本；
- 可用的互联网连接。

快速扫描和字符串分析可直接使用。慢速扫描、页面截图和特殊检测需要安装 Firefox：

```text
/Applications/Firefox.app
```

## 安装

从 [GitHub Releases](https://github.com/tsingke/cluemesh/releases/latest) 下载：

- `ClueMesh-1.0.0-arm64.dmg`：安装镜像；
- `ClueMesh-1.0.0-arm64.zip`：压缩版应用。

打开 DMG 后，将 ClueMesh 拖入“应用程序”文件夹。

当前社区构建未进行 Apple Developer ID 签名和公证。请只打开你确认来自本仓库 Release 的文件，不要关闭 macOS 的全局安全保护。

## 快速开始

1. 启动 ClueMesh。
2. 点击齿轮，在 `Available websites` 中选择 `Top 50`。
3. 输入用户名，例如 `janedoe_2024`。
4. 点击 `Fast Options`，或者只选择 `Find profiles in fast mode`。
5. 点击 `Analyze`。
6. 人工核实候选主页，并在页面底部导出 JSON。

多个用户名使用英文逗号分隔：

```text
johndoe,john_doe,jdoe2024
```

详细选项、结果字段和故障排查请阅读[中文使用教程](docs/中文使用教程.md)。

## 从源码运行

要求 Node.js 20.18.1 或更高版本：

```bash
git clone https://github.com/tsingke/cluemesh.git
cd cluemesh
npm ci
npm run desktop
```

启动浏览器版：

```bash
npm start
```

构建 Apple Silicon DMG 和 ZIP：

```bash
npm run build:mac
```

构建产物写入 `release/`。

## 命令行

Node.js 快速扫描：

```bash
node app.js --username "johndoe" --top 50 --metadata
```

Python CLI：

```bash
python3 app.py --username "johndoe" --top 50 --metadata
```

查看完整参数：

```bash
node app.js --help
python3 app.py --help
```

## 工作机理

```text
macOS Electron window
        │
        ▼
random 127.0.0.1 port
        │
        ▼
Express API ──► string and name analysis
        │
        ├─────► HTTP fast scan
        ├─────► Firefox slow/special scan
        ├─────► metadata and pattern extraction
        └─────► statistics and evidence graph
```

桌面进程在随机回环端口启动本地 API。Renderer 启用沙箱和上下文隔离，不开放 Node.js API；外部候选主页交由系统默认浏览器打开。运行日志保存在：

```text
~/Library/Application Support/cluemesh/logs/
```

## 开发命令

```bash
npm ci
node --check app.js
node --check desktop/main.cjs
for file in modules/*.js; do node --check "$file"; done
npm run build:mac:dir
```

GitHub Actions 会在推送和 Pull Request 时安装锁定依赖并检查 JavaScript 语法。

## 安全与隐私

- 输入的用户名会发送给用户选择的网站和搜索接口。
- 代理服务可能看到目标域名和连接元数据。
- 日志和 JSON 报告可能包含公开个人资料，应在分享前检查和脱敏。
- 检测 `Rate` 表示规则匹配比例，不是身份置信概率。
- 网站验证码、地区限制和页面更新可能导致失败或误判。

## License

ClueMesh 以 [GNU AGPL-3.0](LICENSE) 发布。本仓库包含在 AGPL-3.0 条款下取得并修改的第三方开源代码；详情见 [NOTICE.md](NOTICE.md)。
