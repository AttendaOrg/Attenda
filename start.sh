#!/bin/bash
# Set Session Name
SESSION="Attenda"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

# Only create tmux session if it doesn't already exist
if [ "$SESSIONEXISTS" = "" ]
then
    # Start New Session with our name
    tmux new-session -d -s $SESSION

    tmux rename-window -t 0 'Firebase Emulator'
    tmux send-keys -t 'Firebase Emulator' 'firebase emulators:start' C-m 
    
    tmux new-window -t $SESSION:1 -n 'Yarn Web'
    tmux send-keys -t 'Yarn Web' 'yarn web' C-m 
fi

# Attach Session, on the Main window
tmux attach-session -t "$SESSION";