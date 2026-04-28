"use strict";

// settings.json에 타로 훅을 자동으로 추가하는 설치 스크립트
const fs = require("fs");
const path = require("path");
const os = require("os");

const homeDir = os.homedir();
const settingsFile = path.join(homeDir, ".claude", "settings.json");
const tarotCommand = `node ${homeDir.replace(/\\/g, "/")}/.claude/tarot/session-start.js`;

// settings.json 읽기 (없으면 기본값 생성)
let settings = {};
if (fs.existsSync(settingsFile)) {
  try {
    settings = JSON.parse(fs.readFileSync(settingsFile, "utf-8"));
  } catch (e) {
    console.error("❌ settings.json 파싱 오류:", e.message);
    process.exit(1);
  }
}

// 이미 설치되어 있는지 확인
if (JSON.stringify(settings).includes("tarot/session-start.js")) {
  console.log("ℹ️  타로 훅이 이미 설치되어 있습니다. 건너뜁니다.");
  process.exit(0);
}

// SessionStart 훅 추가
if (!settings.hooks) settings.hooks = {};
if (!settings.hooks.SessionStart) settings.hooks.SessionStart = [];

settings.hooks.SessionStart.push({
  matcher: ".*",
  hooks: [
    {
      type: "command",
      command: tarotCommand,
      timeout: 8000
    }
  ]
});

// 저장
try {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), "utf-8");
  console.log("✅ settings.json 업데이트 완료");
} catch (e) {
  console.error("❌ settings.json 저장 오류:", e.message);
  process.exit(1);
}
