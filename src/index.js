const { app, BrowserWindow, Menu } = require('electron');

const path = require('path');
const os = require('node:os');


//Recarga la aplicacion actualizando los cambios tanto en las ventanas como en los archivos js, primer tienes que instalar la libreria electron reload
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })



    win.loadFile('src/views/index.html')

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu)



    //cerrar el programa si se cierra la ventana principal
    win.on('closed', () =>{
       app.quit();
    });

}

//Generamos una constante para generar un menu personalizado para eso hemos importando el modulo Menu de electron
const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New search',
                accelerator: 'Ctrl+A',
                click(){
                    newSearch();
                }
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Commmand+Q' : 'Ctrl+Q', //acorde al sistema operativo devuelve los shortcuts
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Segunda opcion',
        submenu: [
            {
                label: 'Remover productos',
                accelerator: 'Ctrl+N',
                click(){
                    newSearch();
                }
            },
            {
                label: 'Remover Correos',
                accelerator: 'Ctrl+N',
                click(){
                    newSearch();
                }
            },

        ]
    }



]


app.whenReady().then(() => {
    createWindow()
})

//Segunda ventana
function newSearch(){
    let newS = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'Add a new Product'
    })
    //newS.setMenu(null)
    newS.loadFile('src/views/busqueda-idcrm.html')

    newS.on('closed', () => {
       newS = null;
    });
}


if(process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide devTools',
                accelerator: 'F12',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })

}