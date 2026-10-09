# MYN Pets

> お気に入りの空間を、もっと心地よく。

Deno (`deno desktop`) で作るデスクトップ常駐マスコットアプリ。

## 必要なもの

`deno desktop` は現時点(Deno 2.9)でまだ実験的機能のため、canaryビルドが必要です。

```sh
deno upgrade canary
deno --version
```

## 開発中の起動確認

```sh
deno task dev
# 実体は: deno desktop main.ts
```

ウィンドウが開いて棒人間(仮素材)が表示されれば成功です。

## 全ターゲットビルド

```sh
deno desktop --all-targets main.ts
```

macOS(.app/.dmg) / Windows(.exeディレクトリ) / Linux(.AppImage) が
一括で生成されます。

## やることリスト(抜粋)

- [ ] `deno.json` の `desktop.app.identifier` を実際のバンドルIDに差し替える
- [ ] `public/assets/tray-icon.png` を追加する(32x32 or 64x64、背景透過)
- [ ] `public/assets/{cat,dog,chinchilla}/` に本番スプライトを配置し、`public/app.js` の
      表示ロジックを棒人間→実素材に差し替える
- [ ] ウィンドウの背景透過が実際に効くか確認する(`public/app.css` 冒頭のコメント参照)
- [ ] クリックスルー対応を調査する
- [ ] 設定ウィンドウ(`public/settings.html`)を実装し、`main.ts` の `onOpenSettings` から開く
- [ ] `jsr:@fry69/release-init` を導入し、GitHub Actionsでのビルド・リリース自動化を構築する

## ライセンス

- コード: [LICENSE](./LICENSE)(MIT)
- 画像素材: [ASSETS-LICENSE.md](./ASSETS-LICENSE.md)(使い回し・AI利用禁止)
