#!/bin/bash


read -p "Please enter the git comment: " gitComment


git add .

git commit -m "$gitComment"

git push https://codekanva@github.com/HafizHussain31/blync-next.git react-code