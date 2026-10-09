import type { CharacterId } from "./character.ts";
import type { Settings, SettingsRepository } from "./settingsRepository.ts";

/**
 * キャラクターを切り替えて永続化する。
 * 呼び出し側(app層)が、保存後にウィンドウ表示の更新などを行う。
 */
export async function switchCharacter(
  repo: SettingsRepository,
  current: Settings,
  next: CharacterId,
): Promise<Settings> {
  const updated: Settings = { ...current, character: next };
  await repo.save(updated);
  return updated;
}
