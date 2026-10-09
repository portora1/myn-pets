// core層: Deno / deno desktop 固有のAPIを一切importしないこと。

export type CharacterId = "cat" | "dog" | "chinchilla";

export const CHARACTER_ORDER: readonly CharacterId[] = [
  "cat",
  "dog",
  "chinchilla",
];

export function isCharacterId(value: unknown): value is CharacterId {
  return (
    typeof value === "string" &&
    (CHARACTER_ORDER as readonly string[]).includes(value)
  );
}
