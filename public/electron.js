const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { fork } = require("child_process");
const serverProcess = fork(path.resolve(__dirname, "./backend/server.js"));

try {
  serverProcess.stdout.on("data", console.log);
  serverProcess.stderr.on("data", console.error);
} catch (e) {}

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: "./icon.png",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  // mainWindow.setMenuBarVisibility(false);
}

electron.protocol.registerSchemesAsPrivileged([
  {
    scheme: "file",
    privileges: { secure: true, standard: true },
  },
]);

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
