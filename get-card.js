"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const { CARDS } = require("./cards");

const TAROT_DIR = path.join(os.homedir(), ".claude", "tarot");
const TODAY_FILE = path.join(TAROT_DIR, "today.json");

function getToday() {
  const d = new Date();
  // 로컬 시간 기준 YYYY-MM-DD (UTC 대신 한국 시간 기준)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getTodayCard() {
  const today = getToday();

  // 오늘 이미 뽑은 카드가 있으면 그대로 반환
  try {
    if (fs.existsSync(TODAY_FILE)) {
      const data = JSON.parse(fs.readFileSync(TODAY_FILE, "utf-8"));
      if (data.date === today && data.cardId >= 0 && data.cardId < CARDS.length) {
        return CARDS[data.cardId];
      }
    }
  } catch (e) {
    console.error("[tarot] today.json 읽기 오류:", e.message);
  }

  // CARDS 배열 유효성 확인
  if (!CARDS || CARDS.length === 0) {
    throw new Error("[tarot] CARDS 배열이 비어 있습니다. cards.js를 확인하세요.");
  }

  // 새 카드 랜덤 선택 후 저장
  const cardId = Math.floor(Math.random() * CARDS.length);
  try {
    fs.writeFileSync(TODAY_FILE, JSON.stringify({ date: today, cardId }, null, 2), "utf-8");
  } catch (e) {
    console.error("[tarot] today.json 저장 오류:", e.message);
  }

  return CARDS[cardId];
}

module.exports = { getTodayCard };
