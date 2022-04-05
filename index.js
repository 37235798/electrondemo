
const electron = require('electron')
const path = require('path')

const { app, BrowserWindow, ipcMain, Tray, Menu, screen, dialog } = electron
const { autoUpdater } = require('electron-updater')
const iconPath = path.join(__dirname, './src/img/icon.png')

let mainWindow, tray, remindWindow
//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {
	
  console.log('just test console.log')
  

  //创建一个窗口
  const mainWindow = new BrowserWindow({
	resizable: false,   //不允许用户改变窗口大小
    width: 800,        //设置窗口宽高
    height: 600,
    icon: iconPath,     //应用运行时的标题栏图标
    webPreferences:{    
      backgroundThrottling: false,   //设置应用在后台正常运行
      nodeIntegration:true,     //设置能在页面使用nodejs的API
      contextIsolation: false
      //preload: path.join(__dirname, './preload.js')
    }
  })
  
  //窗口加载html文件
  mainWindow.loadFile('./src/main.html')
  //mainWindow.removeMenu()
  
  tray = new Tray(iconPath)      //实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url  
  
  tray.setToolTip('Tasky')       //鼠标移到托盘中应用程序的图标上时，显示的文本
  
  tray.on('click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
    if(mainWindow.isVisible()){
      mainWindow.hide()
    }else{
      mainWindow.show()
    }
  })
  
  tray.on('right-click', () => {    //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ])
    tray.popUpContextMenu(menuConfig)
  })
  
  ipcMain.on('mainWindow:close', () => {
	mainWindow.hide()
  })
})
/*
ipcMain.on('remindWindow:close', () => {
  remindWindow.close()
})

ipcMain.on('setTaskTimer', (event, time, task) => {
  const now = new Date()
  const date = new Date()
  date.setHours(time.slice(0,2), time.slice(3),0)
  const timeout = date.getTime() - now.getTime()
  setTimeout(() => {
    createRemindWindow(task)
  }, timeout)
})

function createRemindWindow (task) {
  if(remindWindow) remindWindow.close()
  remindWindow = new BrowserWindow({
    height: 450,
    width: 360,
    resizable: false,
    frame: false,
    icon: iconPath,
    show: false,
    webPreferences:{
      nodeIntegration:true,
      contextIsolation: false,
      // preload: path.join(__dirname, './preload.js')
    }
  })
  remindWindow.removeMenu()
  const size = screen.getPrimaryDisplay().workAreaSize
  const { y } = tray.getBounds()
  const { height, width } = remindWindow.getBounds()
  const yPosition = process.platform === 'darwin' ? y : y - height
  remindWindow.setBounds({
    x: size.width - width,
    y: yPosition,
    height,
    width 
  })
  remindWindow.setAlwaysOnTop(true)
  remindWindow.loadURL('./src/main.html')
  remindWindow.show()
  remindWindow.webContents.send('setTask', task)
  remindWindow.on('closed', () => { remindWindow = null })
  setTimeout( () => {
    remindWindow && remindWindow.close()
  }, 50 * 1000)
}
})
*/
/*
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
*/