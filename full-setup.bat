@echo off
call winget install Git.Git OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
start cmd "git clone https://github.com/slmnio/companion-module-slmngg && cd companion-module-slmngg && npm install"
