const {BrowserWindow} = require('electron')
const path = require('path');
//default properties
const defaultOptions = {
  width: 800,
  height: 600,
  show:false,
}

class Window extends BrowserWindow {
  constructor({ file, ...options }) {
    super({
      ...defaultOptions,
      ...options,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, './preload.js'),
      },
    });
    this.loadFile(file);
    this.webContents.openDevTools();

    this.on('ready-to-show', (event)=> {
      this.show();
    });
  }
}

module.exports = Window;