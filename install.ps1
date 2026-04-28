# 타로 플러그인 원클릭 설치 스크립트
# 사용법: PowerShell에서 아래 명령어 실행
#   irm https://raw.githubusercontent.com/yjjung-9511/tarot-plugin/master/install.ps1 | iex

$baseUrl      = "https://raw.githubusercontent.com/yjjung-9511/tarot-plugin/master"
$userHome     = $env:USERPROFILE
$tarotDest    = "$userHome\.claude\tarot"
$commandsDest = "$userHome\.claude\commands"

Write-Host ""
Write-Host "  ✦ 타로 플러그인 설치 중..." -ForegroundColor Cyan
Write-Host ""

# 1. 폴더 생성
New-Item -ItemType Directory -Path $tarotDest    -Force | Out-Null
New-Item -ItemType Directory -Path $commandsDest -Force | Out-Null

# 2. JS 파일 다운로드
$files = @("cards.js", "get-card.js", "animate.js", "session-start.js", "slash-command.js", "setup.js")
foreach ($file in $files) {
    try {
        Invoke-WebRequest -Uri "$baseUrl/$file" -OutFile "$tarotDest\$file" -UseBasicParsing -ErrorAction Stop
        Write-Host "  다운로드: $file" -ForegroundColor DarkGray
    } catch {
        Write-Host "  ❌ 다운로드 실패: $file — $_" -ForegroundColor Red
        exit 1
    }
}

# 3. 슬래시 커맨드 파일 생성 (/타로, /tarot 둘 다)
$normalizedHome = $userHome.Replace('\', '/')
$cmdContent = @"
오늘의 타로카드를 확인합니다.

아래 명령을 Bash 도구로 실행하고, 출력 결과를 그대로 사용자에게 보여주세요. 추가 설명은 하지 마세요.

node $normalizedHome/.claude/tarot/slash-command.js
"@
Set-Content -Path "$commandsDest\타로.md" -Value $cmdContent -Encoding UTF8
Set-Content -Path "$commandsDest\tarot.md" -Value $cmdContent -Encoding UTF8

# 4. settings.json에 SessionStart 훅 등록
Write-Host "  settings.json 업데이트 중..." -ForegroundColor DarkGray
node "$tarotDest\setup.js"

Write-Host ""
Write-Host "  ✅ 설치 완료!" -ForegroundColor Green
Write-Host "  Claude Code를 재시작하면 오늘의 타로카드가 표시됩니다." -ForegroundColor Cyan
Write-Host "  /타로 또는 /tarot 으로 낮 중에도 재확인 가능합니다." -ForegroundColor Cyan
Write-Host ""
