// src/app/server.ts
import { serveDir } from "@std/http/file-server";
import type { SettingsRepository } from "../core/settingsRepository.ts";

const PUBLIC_DIR = new URL("../../public", import.meta.url).pathname;

export function createHandler(
  repo: SettingsRepository,
): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    try {
      const url = new URL(req.url);

      if (url.pathname === "/") {
        const settings = await repo.load();
        const template = await Deno.readTextFile(`${PUBLIC_DIR}/index.html`);
        const html = template.replace(
          "__INITIAL_CHARACTER__",
          settings.character,
        );
        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }

      return serveDir(req, { fsRoot: PUBLIC_DIR });
    } catch (err) {
      // ★デバッグ用: 本当のエラー内容をそのままウィンドウに表示する
      const message = err instanceof Error ? `${err.message}\n\n${err.stack}` : String(err);
      console.error("[server error]", message);
      return new Response(message, { status: 500 });
    }
  };
}