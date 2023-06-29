@echo off
call winget install Git.Git
call git clone https://github.com/slmnio/companion-module-slmngg
cd companion-module-slmngg
call winget install OpenJS.NodeJS.LTS
call npm install
