const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
    mainWindow = new BrowserWindow();

    mainWindow.loadURL('http://localhost:8080/');
    // mainWindow.loadURL('file://${__dirname}/dist/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
})
