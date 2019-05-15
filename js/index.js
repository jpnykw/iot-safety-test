const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// start
let mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 1000, height: 800 });
    mainWindow.loadURL('file://' + __dirname.replace(/\\js/, '') + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});