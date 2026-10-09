// core層: ここにはインターフェースと型だけを置く。
// 実際にどう保存するか(JSONファイル、将来的にSQLite等)はapp層の責務。

import type { CharacterId } from "./character.ts";

export interface Settings {
  character: CharacterId;
  // 将来の拡張ポイント(今はまだ使わない):
  // windowX?: number;
  // windowY?: number;
  // windowSize?: "small" | "medium" | "large";
  // mode?: "default" | "sleep" | "focus";
}

export const DEFAULT_SETTINGS: Settings = {
  character: "cat",
};

export interface SettingsRepository {
  load(): Promise<Settings>;
  save(settings: Settings): Promise<void>;
}
