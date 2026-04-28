#!/bin/bash
# 타로 플러그인 설치 스크립트 (macOS / Linux)
# 사용법: curl -fsSL https://raw.githubusercontent.com/yjjung-9511/tarot-plugin/master/install.sh | bash

BASE_URL="https://raw.githubusercontent.com/yjjung-9511/tarot-plugin/master"
TAROT_DIR="$HOME/.claude/tarot"
COMMANDS_DIR="$HOME/.claude/commands"

echo ""
echo "  ✦ 타로 플러그인 설치 중..."
echo ""

# 폴더 생성
mkdir -p "$TAROT_DIR"
mkdir -p "$COMMANDS_DIR"

# JS 파일 다운로드
FILES=("cards.js" "get-card.js" "animate.js" "session-start.js" "slash-command.js" "setup.js")
for file in "${FILES[@]}"; do
  curl -fsSL "$BASE_URL/$file" -o "$TAROT_DIR/$file"
  echo "  다운로드: $file"
done

# 슬래시 커맨드 파일 생성 (/타로, /tarot 둘 다)
CMD_CONTENT="오늘의 타로카드를 확인합니다.

아래 명령을 Bash 도구로 실행하고, 출력 결과를 그대로 사용자에게 보여주세요. 추가 설명은 하지 마세요.

node $HOME/.claude/tarot/slash-command.js"

printf '%s' "$CMD_CONTENT" > "$COMMANDS_DIR/타로.md"
printf '%s' "$CMD_CONTENT" > "$COMMANDS_DIR/tarot.md"

# settings.json 업데이트 (Node.js 사용)
echo "  settings.json 업데이트 중..."
node "$TAROT_DIR/setup.js"

echo ""
echo "  ✅ 설치 완료!"
echo "  Claude Code를 재시작하면 오늘의 타로카드가 표시됩니다."
echo "  /타로 또는 /tarot 으로 낮 중에도 재확인 가능합니다."
echo ""
