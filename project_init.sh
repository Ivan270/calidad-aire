#!/bin/sh
mkdir -p assets/{css,img,js}
touch index.html && touch assets/css/styles.css && touch assets/js/index.js

git init
git add .
git commit -m "Project initialized"
git branch -M main
code ./
