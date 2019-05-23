const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

require("electron-reload")(__dirname, {
   electron: path.resolve(__dirname, "./node_modules/.bin/electron") 
});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

let mainWindow = null;
app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 1000, height: 800, 
        webPreferences: {
            contentIsolation: true,
            nodeIntegration: true 
        }
    });
    mainWindow.loadFile(path.resolve(__dirname, "./index.html"));
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
