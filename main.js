const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  // create the browser window
  win = new BrowserWindow({
    width: 600,
    height: 670,
    icon: `file://${__dirname}/dist/assets/logo.png`
  })

  win.loadURL(`file://${__dirname}/dist/index.html`)

  // UNCOMMENT BELOW TO OPEN THE DEVTOOLS.
  // win.webContents.openDevTools()

  // Event when the window is closed
  win.on('closed', function() {
    win = null
  })
}

// Create window on electron initialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  
  // on macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function() {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
})