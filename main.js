const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
const Window = require('./window');
const {getTodos, addTodo, updateTodo} = require('./DataStore');
let mainWindow;

function main(){
     mainWindow = new Window({
        file: path.join(__dirname, 'renderer', 'index.html'),
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.once('show', event => {
        mainWindow.webContents.send('fetch-todos', getTodos());
    });

    let menu = Menu.buildFromTemplate([
        {
            label: process.platform === 'darwin' ? app.getName() : 'Electron To-Do',
            submenu: [
                {
                    label: 'Add To-Do',
                    click: () => {
                        const addTodoWin = new Window({
                            file: path.join(__dirname, 'renderer', 'todo-form.html'),
                            width: 500,
                            height: 500,
                            parent: mainWindow,
                            webPreferences: {
                                contextIsolation: true,
                                preload: path.join(__dirname, 'preload.js')
                            }
                        });
                    }
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
}

app.on('ready', main);

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('save-todo', (event, todo) => {
    addTodo(todo);
    mainWindow.send('fetch-todos', getTodos());
})

ipcMain.on('update-todo', (event, todoID) => {
    updateTodo(todoID);
    mainWindow.send('fetch-todos', getTodos());
  }
)

// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true,
//         },
//     });
//
//     mainWindow.loadFile('index.html');
//
//     mainWindow.on('closed', function () {
//         mainWindow = null;
//     });
// }

// app.on('window-all-closed', function () {
//     if (process.platform !== 'darwin') app.quit();
// });
//
// app.on('activate', function () {
//     if (mainWindow === null) createWindow();
// });
//
// let tray;
//
// app.whenReady().then(() => {
//     createWindow();
//     tray = new Tray(path.join(__dirname, 'images', 'logo.png'));
//     const contextMenu = Menu.buildFromTemplate([
//         { label: 'Item1', type: 'radio' },
//         { label: 'Item2', type: 'radio', checked: true },
//     ]);
//     tray.setToolTip('This is my application.');
//     tray.setContextMenu(contextMenu);
// });