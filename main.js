const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcMain } = require('electron')

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '/database/database.db'),
    },
})

let mainWindow

let isDev = false

if (
    process.env.NODE_ENV !== undefined &&
    process.env.NODE_ENV === 'development'
) {
    isDev = true
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        show: false,
        icon: `${__dirname}/assets/icon.png`,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    let indexPath

    if (isDev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:8080',
            pathname: 'index.html',
            slashes: true,
        })
    } else {
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, 'dist', 'index.html'),
            slashes: true,
        })
    }

    mainWindow.loadURL(indexPath)

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
        if (isDev) {
            mainWindow.webContents.openDevTools()
        }
    })

    ipcMain.on('mainWindowLoaded', function () {
        let result = knex.select('name').from('user')
        result.then(function (rows) {
            mainWindow.webContents.send('resultSent', rows)
        })
    })

    mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow()
    }
})

// Stop error
app.allowRendererProcessReuse = true
