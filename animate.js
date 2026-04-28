"use strict";

const SHUFFLE_SYMBOLS = ["☽", "✦", "†", "☀", "★", "◈", "⊛"];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomLine(count) {
  return Array.from({ length: count }, () =>
    SHUFFLE_SYMBOLS[Math.floor(Math.random() * SHUFFLE_SYMBOLS.length)]
  ).join(" ");
}

async function shuffleAnimation() {
  try {
    process.stdout.write("\n  카드를 섞는 중...\n");

    // 빠른 셔플: 15프레임, 80ms 간격
    for (let i = 0; i < 15; i++) {
      process.stdout.write(`\r  ${randomLine(7)}   `);
      await sleep(80);
    }

    // 점점 느려짐: 5프레임, 200→600ms 증가, 기호 수 7→3으로 감소
    for (let i = 0; i < 5; i++) {
      const count = 7 - i;
      const padding = "   ".repeat(i); // 줄 길이 유지용 여백
      process.stdout.write(`\r  ${randomLine(count)}${padding}   `);
      await sleep(200 + i * 100);
    }

    // 최종 멈춤
    process.stdout.write("\r  · · · · · · ·      \n");
    await sleep(500);
  } catch (err) {
    process.stderr.write(`\n[tarot] 애니메이션 오류: ${err.message}\n`);
  }
}

module.exports = { shuffleAnimation };
