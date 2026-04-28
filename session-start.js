"use strict";

// Claude Code 훅 타임아웃 안전장치 (8초 내 종료)
const TIMEOUT = setTimeout(() => process.exit(0), 8000);
TIMEOUT.unref();

const { getTodayCard } = require("./get-card");
const { shuffleAnimation } = require("./animate");

const RESET  = "\x1b[0m";
const DIM    = "\x1b[2m";
const BOLD   = "\x1b[1m";
const CYAN   = "\x1b[36m";

function displayCard(card) {
  console.log("");
  console.log(`  ${DIM}✦ Today's Tarot ✦${RESET}`);
  console.log("");
  console.log(`  ${CYAN}${card.art[0]}${RESET}`);
  console.log(`  ${CYAN}${card.art[1]}${RESET}`);
  console.log(`  ${CYAN}${card.art[2]}${RESET}`);
  console.log("");
  console.log(`  ${BOLD}[${card.name}]${RESET}`);
  console.log(`  ${DIM}${card.message}${RESET}`);
  console.log("");
}

async function main() {
  try {
    const card = getTodayCard();
    await shuffleAnimation();
    displayCard(card);
  } catch (e) {
    // 오류 시 조용히 종료 — Claude Code 시작을 막지 않음
  }
}

main();
