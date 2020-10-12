const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const { ipcMain, app, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  // const menu = Menu.buildFromTemplate([]);
  mainWindow = new BrowserWindow({
    minWidth: 1360,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // mainWindow.webContents.openDevTools();

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.setMenu(null);
  mainWindow.setTitle(".:: Light Knight ::.");
  mainWindow.maximize();
  mainWindow.on("closed", () => (mainWindow = null));

  ipcMain.on("change_title", (e, name) => {
    mainWindow.setTitle(name);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
