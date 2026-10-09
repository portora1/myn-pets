import { CHARACTER_ORDER, type CharacterId } from "../core/character.ts";
import { switchCharacter } from "../core/switchCharacter.ts";
import type { Settings, SettingsRepository } from "../core/settingsRepository.ts";

const LABELS: Record<CharacterId, string> = {
  cat: "Cat",
  dog: "Dog",
  chinchilla: "Chinchilla",
};

const TRAY_ICON_URL = new URL(
  "../../public/assets/tray-icon.png",
  import.meta.url,
);

export function buildTray(
  repo: SettingsRepository,
  initial: Settings,
  onSwitch: (character: CharacterId) => void,
  onOpenSettings: () => void,
): Deno.Tray {
  const tray = new Deno.Tray();
  let current = initial;

  // tray-icon.pngがまだ無くても起動できるようにしておく(後で public/assets/tray-icon.png を追加してください)
  Deno.readFile(TRAY_ICON_URL)
    .then((icon) => tray.setIcon(icon))
    .catch(() => {
      console.warn(
        "[tray] public/assets/tray-icon.png が見つかりません。アイコン未設定のまま起動します。",
      );
    });

  tray.setTooltip("MYN Pets");

  const render = () => {
    tray.setMenu([
      ...CHARACTER_ORDER.map((id) => ({
        item: {
          label: `${id === current.character ? "✓ " : "   "}${LABELS[id]}`,
          id,
          enabled: true,
        },
      })),
      "separator",
      { item: { label: "設定...", id: "settings", enabled: true } },
      { item: { label: "終了", id: "quit", enabled: true } },
    ] as Deno.MenuItem[]);
  };

  render();

  tray.addEventListener("menuclick", async (e) => {
    const id = (e as CustomEvent<{ id?: string }>).detail?.id;

    if (id === "quit") {
      Deno.exit(0);
    }

    if (id === "settings") {
      onOpenSettings();
      return;
    }

    if (id === "cat" || id === "dog" || id === "chinchilla") {
      current = await switchCharacter(repo, current, id);
      render();
      onSwitch(id);
    }
  });

  return tray;
}
