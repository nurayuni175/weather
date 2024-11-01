// Import required modules from Electron
const { app, BrowserWindow } = require('electron'); // Import app and BrowserWindow to manage the application and create windows
const path = require('path'); // Import path module for handling file paths

// Function to create a new browser window
function createWindow() {
  const win = new BrowserWindow({
    width: 800, // Set the width of the window
    height: 600, // Set the height of the window
    webPreferences: {
      nodeIntegration: true, // Allows Node.js integration in the renderer process
      contextIsolation: false, // Disable context isolation for simplicity (not recommended for production)
      enableRemoteModule: true // Enables use of remote module if necessary
    }
  });

  // Load the index.html file
  win.loadFile(path.join(__dirname, 'indexw.html')); // Load the specified HTML file into the window

  // Open Developer Tools to debug if needed
  win.webContents.openDevTools(); // Open Developer Tools for debugging
}

// Initialize the app
app.whenReady().then(createWindow); // When the app is ready, create the window

// Close the app on all windows closed, except for macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit(); // Quit the app if not on macOS
});
