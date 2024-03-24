# wallhavenExplorer

```
npm install
npm install puppeteer
```

---



遇到安装 Puppeteer 时出现网络问题导致的错误是相对常见的情况，以下是一些可能的解决方案：

### 1. 设置环境变量跳过下载

如果你已经有了 Chromium 或 Chrome 的本地安装，你可以设置环境变量 `PUPPETEER_SKIP_DOWNLOAD` 来跳过下载过程。这可以通过在命令行中设置环境变量来实现：

- **Windows (命令行)**:

  ```cmd
  set PUPPETEER_SKIP_DOWNLOAD=true
  npm install puppeteer
  ```

- **Windows (PowerShell)**:

  ```powershell
  $env:PUPPETEER_SKIP_DOWNLOAD="true"
  npm install puppeteer
  ```

注意：跳过下载意味着你需要手动指定 Chromium 或 Chrome 的执行路径。你可以在启动 Puppeteer 时通过 `executablePath` 选项来指定：

```code
const browser = await puppeteer.launch({
  executablePath: '/path/to/your/Chrome'
});
```

### 2. 使用代理或VPN

如果你处于网络受限环境（例如，某些资源在国内访问受限），尝试使用 VPN 或代理来访问互联网。

### 3. 使用 cnpm 安装

在中国大陆，可以使用淘宝 NPM 镜像（cnpm）来加速依赖的安装。首先安装 cnpm：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

然后使用 `cnpm` 来安装 Puppeteer：

```bash
cnpm install puppeteer
```

### 4. 手动下载并指定 Chromium

1. **手动下载** Chromium 并解压到你的项目中或任何你喜欢的位置。

2. **指定 `executablePath`**：在你的 Puppeteer 脚本中指定下载的 Chromium 执行文件的路径。例如：

   ```javascript
   Copy codeconst browser = await puppeteer.launch({
     executablePath: 'path/to/your/Chromium'
   });
   ```