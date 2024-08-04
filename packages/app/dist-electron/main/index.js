"use strict";const f=require("node:os"),m=require("node:url"),t=require("node:path"),e=require("electron");var i=typeof document<"u"?document.currentScript:null;const b=m.fileURLToPath(typeof document>"u"?require("url").pathToFileURL(__filename).href:i&&i.src||new URL("index.js",document.baseURI).href),a=t.dirname(b);process.env.DIST_ELECTRON=t.join(a,"..");process.env.DIST=t.join(process.env.DIST_ELECTRON,"../dist");process.env.PUBLIC=process.env.VITE_DEV_SERVER_URL?t.join(process.env.DIST_ELECTRON,"../public"):process.env.DIST;const w=process.env.NODE_ENV==="development";f.release().startsWith("6.1")&&e.app.disableHardwareAcceleration();process.platform==="win32"&&e.app.setAppUserModelId(e.app.getName());e.app.requestSingleInstanceLock()||(e.app.quit(),process.exit(0));let n=null;const c=t.join(a,"../preload/index.js"),p=process.env.VITE_DEV_SERVER_URL,d=t.join(process.env.DIST,"index.html");function r(o="进入全屏幕"){const l=e.Menu.buildFromTemplate(_(o));e.Menu.setApplicationMenu(l)}async function u(){n=new e.BrowserWindow({width:1024,height:768,minWidth:1024,minHeight:768,title:"Main window",icon:t.join(process.env.PUBLIC??"","favicon.ico"),webPreferences:{preload:c,nodeIntegration:!0,contextIsolation:!1}}),process.env.VITE_DEV_SERVER_URL?n.loadURL(p??""):n.loadFile(d),r(),n.webContents.on("did-finish-load",()=>{n==null||n.webContents.send("main-process-message",new Date().toLocaleString())}),n.webContents.setWindowOpenHandler(({url:o})=>(o.startsWith("https:")&&e.shell.openExternal(o),{action:"deny"})),n.on("enter-full-screen",()=>{r("退出全屏幕")}),n.on("leave-full-screen",()=>{r()})}e.app.whenReady().then(u);e.app.on("window-all-closed",()=>{n=null,process.platform!=="darwin"&&e.app.quit()});e.app.on("second-instance",()=>{n&&(n.isMinimized()&&n.restore(),n.focus())});e.app.on("activate",()=>{const o=e.BrowserWindow.getAllWindows();o.length?o[0].focus():u()});const _=o=>{const l=[{label:"关于",role:"about"},{label:"开发者工具",role:"toggleDevTools"},{label:"强制刷新",role:"forcereload"},{label:"退出",role:"quit"}];return w||l.splice(1,1),[{label:e.app.name,submenu:l},{label:"编辑",submenu:[{label:"撤销",role:"undo"},{label:"重做",role:"redo"},{type:"separator"},{label:"剪切",role:"cut"},{label:"复制",role:"copy"},{label:"粘贴",role:"paste"},{label:"删除",role:"delete"},{label:"全选",role:"selectAll"}]},{label:"显示",submenu:[{label:"加大",role:"zoomin"},{label:"默认大小",role:"resetzoom"},{label:"缩小",role:"zoomout"},{type:"separator"},{label:o,role:"togglefullscreen"}]}]};e.ipcMain.handle("open-win",(o,l)=>{const s=new e.BrowserWindow({webPreferences:{preload:c,nodeIntegration:!0,contextIsolation:!1}});process.env.VITE_DEV_SERVER_URL?s.loadURL(`${p}#${l}`):s.loadFile(d,{hash:l})});
