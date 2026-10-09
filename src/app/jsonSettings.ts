import {
  DEFAULT_SETTINGS,
  type Settings,
  type SettingsRepository,
} from "../core/settingsRepository.ts";
import { isCharacterId } from "../core/character.ts";

function settingsDir(): string {
  const home = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE") ?? ".";
  return `${home}/.myn-pets`;
}

function settingsPath(): string {
  return `${settingsDir()}/settings.json`;
}

export class JsonSettingsRepository implements SettingsRepository {
  async load(): Promise<Settings> {
    try {
      const text = await Deno.readTextFile(settingsPath());
      const parsed = JSON.parse(text);
      const character = isCharacterId(parsed?.character)
        ? parsed.character
        : DEFAULT_SETTINGS.character;
      return { ...DEFAULT_SETTINGS, ...parsed, character };
    } catch {
      // 初回起動 or ファイル破損時はデフォルトにフォールバック
      return DEFAULT_SETTINGS;
    }
  }

  async save(settings: Settings): Promise<void> {
    await Deno.mkdir(settingsDir(), { recursive: true });
    await Deno.writeTextFile(settingsPath(), JSON.stringify(settings, null, 2));
  }
}
