const { app, BrowserWindow, Menu, shell } = require('electron')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

let mainWindow = null
let backend = null

const hasSingleInstanceLock = app.requestSingleInstanceLock()

if (!hasSingleInstanceLock) {
  app.quit()
}

function showMainWindow () {
  if (!mainWindow) return
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.show()
  mainWindow.focus()
}

function installMenu () {
  const template = [
    {
      label: 'ClueMesh',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: '设置…',
          accelerator: 'CommandOrControl+,',
          click: () => mainWindow?.webContents.executeJavaScript(
            "document.getElementById('open-settings')?.click()"
          )
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: '显示',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: '窗口',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

async function startBackend () {
  process.env.CLUEMESH_DESKTOP = '1'
  process.env.CLUEMESH_DATA_DIR = app.getPath('userData')

  const backendPath = path.join(app.getAppPath(), 'app.js')
  const backendModule = await import(pathToFileURL(backendPath).href)
  backend = await backendModule.startServer({ host: '127.0.0.1', port: 0 })
  return backend.url
}

async function createWindow () {
  const applicationUrl = await startBackend()
  const applicationOrigin = new URL(applicationUrl).origin

  mainWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 980,
    minHeight: 680,
    show: false,
    backgroundColor: '#212222',
    title: 'ClueMesh',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (new URL(url).origin !== applicationOrigin) {
      event.preventDefault()
      if (url.startsWith('http://') || url.startsWith('https://')) {
        shell.openExternal(url)
      }
    }
  })

  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.on('closed', () => { mainWindow = null })

  await mainWindow.loadURL(applicationUrl)
}

app.setName('ClueMesh')
app.on('second-instance', showMainWindow)

app.whenReady().then(async () => {
  installMenu()
  await createWindow()
}).catch(error => {
  console.error('[Desktop] Startup failed:', error)
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch(error => console.error('[Desktop] Window failed:', error))
  } else {
    showMainWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
  backend?.server?.close()
})
