#!/bin/bash

set -e

### Configuration ###

APP_DIR=~/shaneoneill.io
GIT_URL=~/shaneoneill.io.git
BRANCH_NAME=$1

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
  tmux kill-session -t "shaneoneill.io"
fi
set -e

tmux new-session -d -s "shaneoneill.io" "npm run prod"