
const electron = require('electron')
const path = require('path')

const { app, BrowserWindow, ipcMain, Tray, Menu, screen, dialog } = electron
const { autoUpdater } = require('electron-updater')
const iconPath = path.join(__dirname, './src/img/icon.png')

let mainWindow, tray, remindWindow
//�� Electron �У�ֻ���� app ģ��� ready �¼�����������ܴ������������
app.on('ready', () => {
	
  console.log('just test console.log')
  

  //����һ������
  const mainWindow = new BrowserWindow({
	resizable: false,   //�������û��ı䴰�ڴ�С
    width: 800,        //���ô��ڿ��
    height: 600,
    icon: iconPath,     //Ӧ������ʱ�ı�����ͼ��
    webPreferences:{    
      backgroundThrottling: false,   //����Ӧ���ں�̨��������
      nodeIntegration:true,     //��������ҳ��ʹ��nodejs��API
      contextIsolation: false
      //preload: path.join(__dirname, './preload.js')
    }
  })
  
  //���ڼ���html�ļ�
  mainWindow.loadFile('./src/main.html')
  //mainWindow.removeMenu()
  
  tray = new Tray(iconPath)      //ʵ����һ��tray���󣬹��캯����Ψһ��������Ҫ����������ʾ��ͼ��url  
  
  tray.setToolTip('Tasky')       //����Ƶ�������Ӧ�ó����ͼ����ʱ����ʾ���ı�
  
  tray.on('click', () => {       //���ͼ�����Ӧ�¼����������л������ڵ���ʾ������
    if(mainWindow.isVisible()){
      mainWindow.hide()
    }else{
      mainWindow.show()
    }
  })
  
  tray.on('right-click', () => {    //�Ҽ����ͼ��ʱ�����ֵĲ˵���ͨ��Menu.buildFromTemplate���ƣ�����ֻ�����˳������ѡ�
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