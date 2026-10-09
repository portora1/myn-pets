// src/app/window.ts
export function createMainWindow(url: string): Deno.BrowserWindow {
  const bootWindow = new Deno.BrowserWindow();

  const win = new Deno.BrowserWindow({
    title: "MYN Pets",
    width: 100,
    height: 100,
    alwaysOnTop: true,
    frameless: true,
    noActivate: true,
  });

  win.navigate(url);

  bootWindow.close();

  return win;
}