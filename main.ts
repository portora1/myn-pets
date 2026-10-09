import { createHandler } from "./src/app/server.ts";
import { createMainWindow } from "./src/app/window.ts";
import { JsonSettingsRepository } from "./src/app/jsonSettings.ts";
import { buildTray } from "./src/app/tray.ts";

// main.ts の修正イメージ
const repo = new JsonSettingsRepository();
const settings = await repo.load();

const server = Deno.serve({ port: 0 }, createHandler(repo));
const port = server.addr.port;

// const win = createMainWindow(`http://127.0.0.1:${port}/`);
// main.ts: createMainWindow(...)の直後に一時的に追加
const win = createMainWindow(`http://localhost:${port}/`);
// main.ts: win作成後に追加
win.openDevtools();
// main.ts: win作成後に追加
// main.ts
win.bind("moveWindowBy", async (...args: unknown[]) => {
  const [dx, dy] = args as [number, number];
  const [x, y] = win.getPosition();
  win.setPosition(x + dx, y + dy);
});

await Deno.writeTextFile(
  "/tmp/win-debug.txt",
  Deno.inspect(win) + "\n\n--- メソッド一覧 ---\n" +
    Object.getOwnPropertyNames(Object.getPrototypeOf(win)).join("\n"),
);
buildTray(
  repo,
  settings,
  (next) => {
    // トレイでキャラが切り替わったら、既に開いているwebviewに即反映する
    win.executeJs(`window.setCharacter(${JSON.stringify(next)})`);
  },
  () => {
    // TODO: 設定ウィンドウ(public/settings.html)をnew Deno.BrowserWindow()で開く
    console.log("[tray] 設定画面は未実装です");
  },
);
