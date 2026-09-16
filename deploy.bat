@echo off
REM =====================================================================
REM  爱科技 Hexo(Solitude) 站点 -> Cloudflare Pages 一键部署
REM  用法（先设置令牌，再跑本脚本）：
REM      set CLOUDFLARE_API_TOKEN=cfat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REM      deploy.bat
REM  令牌要求：Cloudflare 账户级 API Token，权限 = Account / Cloudflare Pages / Edit
REM  （只读令牌会报 Authentication error [code: 10000]，无法部署）
REM =====================================================================
setlocal EnableDelayedExpansion

set NODE=C:/Users/Administrator/.workbuddy/binaries/node/versions/22.22.2-3/node.exe
set HEXO=C:/Users/Administrator/WorkBuddy/Claw/hexo-blog
set WRANGLER=%HEXO%\node_modules\wrangler\bin\wrangler.js
set PROJECT=aikeji
set ACCOUNT=31a6aa87c8de088086194f7e2ca07cab

if "%CLOUDFLARE_API_TOKEN%"=="" (
  echo [ERROR] 请先设置 CLOUDFLARE_API_TOKEN 环境变量（带 Cloudflare Pages:Edit 权限）
  echo         例如： set CLOUDFLARE_API_TOKEN=cfat_xxxxxxxx
  exit /b 1
)

REM 让 wrangler 知道账户（避免多账户时选错）
set CLOUDFLARE_ACCOUNT_ID=%ACCOUNT%

echo [1/3] 构建 Hexo 静态文件（hexo clean + generate，走 gen.js 规避本机 hexo-cli 异常）...
cd /d %HEXO%
%NODE% gen.js
if errorlevel 1 (
  echo [ERROR] 构建失败，终止部署
  exit /b 1
)

echo [2/3] 创建 Pages 项目（若已存在会忽略报错）...
%NODE% %WRANGLER% pages project create %PROJECT% --production-branch main 2>nul

echo [3/3] 上传 public/ 到 Cloudflare Pages...
%NODE% %WRANGLER% pages deploy public --project-name %PROJECT% --branch main --commit-dirty=true
if errorlevel 1 (
  echo [ERROR] 部署失败，请检查令牌权限与网络
  exit /b 1
)

echo [DONE] 站点已上线： https://%PROJECT%.pages.dev/
endlocal
