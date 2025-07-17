@echo off

git add .
git commit -m "deploy: update app"
git push origin main

echo Đã deploy lên main! 