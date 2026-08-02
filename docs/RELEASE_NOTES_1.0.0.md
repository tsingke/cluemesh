# ClueMesh 1.0.0

ClueMesh 的首个 macOS 桌面版发行。

## 主要内容

- 本地优先的公开主页发现与身份线索关联。
- Apple Silicon 支持，最低系统版本为 macOS 12。
- 使用随机 `127.0.0.1` 端口运行本地分析 API。
- 日志写入 `~/Library/Application Support/cluemesh/logs/`。
- 外部候选主页在系统默认浏览器中打开。
- Renderer 启用沙箱和上下文隔离。
- 内置快速扫描、Firefox 深度扫描、字符串分析、元数据提取、统计与图谱。
- 提供完整中文使用教程。

## 下载文件

- `ClueMesh-1.0.0-arm64.dmg`：macOS 安装镜像。
- `ClueMesh-1.0.0-arm64.zip`：压缩版应用。

## 校验值（SHA-256）

```text
f0545e40857f35b5653c5f68e0d52b609fdc7f764ff0aadb0048cd5db9a0459f  ClueMesh-1.0.0-arm64.dmg
57521a863392034e0bfa6de4c9069b9f00c87c6e85fb304f121f460496714e77  ClueMesh-1.0.0-arm64.zip
```

## 注意事项

- 当前构建未进行 Apple Developer ID 签名和公证。
- 慢速扫描、截图和特殊扫描需要安装 Firefox。
- 检测评分不是身份确认，候选结果需要人工核实。
- 请仅在合法、获授权的公开信息调查中使用本软件。

ClueMesh 遵循 GNU AGPL-3.0；第三方代码说明见 `NOTICE.md`。
