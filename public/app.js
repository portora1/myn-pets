// public/app.js (これに戻す)
(function () {
  const CHARACTERS = ["cat", "dog", "chinchilla"];

  // 今はどのキャラ・動きも1コマ(静止画)
  // 複数コマの画像が来たら、ここの数字をコマ数に変えるだけでアニメ化する
  const FRAME_COUNTS = {
    cat: { idle: 1, walk: 1, sit: 1, drag: 1 },
    dog: { idle: 1, walk: 1, sit: 1, drag: 1 },
    chinchilla: { idle: 1, walk: 1, sit: 1, drag: 1 },
  };

  const sprite = document.getElementById("sprite");
  let currentCharacter = "cat";
  let currentMotion = "idle";

  function render(character, motion) {
    currentCharacter = character;
    currentMotion = motion;

    const frameCount = FRAME_COUNTS[character]?.[motion] ?? 1;
    sprite.style.backgroundImage = `url(/assets/${character}/${motion}.png)`;
    sprite.style.setProperty("--frame-count", frameCount);
    sprite.classList.toggle("playing", frameCount > 1); // 1コマなら止め絵のまま
  }

  window.setCharacter = function (character) {
    if (!CHARACTERS.includes(character)) {
      return;
    }
    render(character, currentMotion);
  };

  render(currentCharacter, currentMotion);
})();