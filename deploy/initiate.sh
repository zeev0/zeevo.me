#!/bin/bash
set -e

### Configuration ###

USER=ubuntu
SERVER=$USER@ec2-13-59-198-83.us-east-2.compute.amazonaws.com
REMOTE_SCRIPT_PATH=/tmp/deploy.sh
APP_DIR=~/zeevo.me
GIT_URL=~/zeevo.me.git
IDENTITY_FILE=zeevome.pem
BRANCH_NAME=$(git symbolic-ref -q HEAD)

### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}


### Automation steps ###

run scp -i deploy/$IDENTITY_FILE deploy/work.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on remote server ----"
run ssh -i deploy/$IDENTITY_FILE $SERVER bash $REMOTE_SCRIPT_PATH $BRANCH_NAME
