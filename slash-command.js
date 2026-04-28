"use strict";

const { getTodayCard } = require("./get-card");

const RESET = "\x1b[0m";
const DIM   = "\x1b[2m";
const BOLD  = "\x1b[1m";
const CYAN  = "\x1b[36m";

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

try {
  const card = getTodayCard();
  displayCard(card);
} catch (e) {
  process.stderr.write(`[tarot] ${e.message}\n`);
}
