#!/bin/bash

set -e

### Configuration ###

APP_DIR=~/zeevo.me
GIT_URL=~/zeevo/zeevo.me.git
USER=$1

###

set -x

# Pull latest code
if [[ -e $APP_DIR ]]; then
  cd $APP_DIR
  git pull
else
  git clone $GIT_URL $APP_DIR
  cd $APP_DIR/
fi

# Install dependencies
npm install --production
npm prune --production

set +e
if tmux info &> /dev/null; then 
  tmux kill-session -t "zeevome"
fi
set -e

tmux new-session -d -s "zeevome" "sudo npm run prod"