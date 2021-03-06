const electron = require('electron');
let window;

function createWindow(height, width) {
    window = new electron.BrowserWindow({
        height,
        width,
        backgroundColor: '#ffffff',
        icon: 'file://${__dirname}/dist/cecytea-frontend/assets/logo.png'
    });
    window.loadURL(`file://${__dirname}/dist/cecytea-frontend/index.html`);
    window.show();
    window.on('closed', function() {
        window = null;
    });

    //window.webContents.openDevTools();
}

electron.app.on('ready', () => {
    const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize;
    createWindow(height, width);
    window
});

electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron.app.quit();
    }
});

electron.app.on('activate', () => {
    if (window == null) {
        const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize;
        createWindow(height, width);
    }
});