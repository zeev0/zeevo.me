tmux kill-session -t "zeevome"
tmux new-session-d -s "zeevome" "sudo npm run prod"