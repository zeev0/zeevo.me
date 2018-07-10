#!/bin/bash

set -e

### Configuration ###

APP_DIR=~/zeevo.io
GIT_URL=~/zeevo/zeevo.io.git
BRANCH_NAME=$1

echo $BRANCH_NAME

###

set -x

# Pull latest code
if [[ -e $APP_DIR ]]; then
  cd $APP_DIR
  git pull
  git checkout $BRANCH_NAME
else
  git clone $GIT_URL $APP_DIR
  cd $APP_DIR/
  git checkout $BRANCH_NAME
fi

# Install dependencies
npm install --production
npm prune --production

set +e
if tmux info &> /dev/null; then 
  tmux kill-session -t "zeevoio"
fi
set -e

tmux new-session -d -s "zeevoio" "sudo npm run prod"