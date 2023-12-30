const { contextBridge, ipcRenderer } = require('electron');
console.log('Preload script loaded.');

contextBridge.exposeInMainWorld('electronAPIs', {
  ipcRenderer: {
    on: (channel, func) => ipcRenderer.on(channel, func),
    send: (channel, args) => ipcRenderer.send(channel, args),
  },
});

