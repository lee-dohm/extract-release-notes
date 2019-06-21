#!/bin/sh

# Exit on failure
set -e

if [ -n "$RELEASE_NOTES_PATH" ]; then
  RELEASE_NOTES_PATH="$GITHUB_WORKSPACE/__RELEASE_NOTES.md"
fi

jq .pull_request.body "$GITHUB_EVENT_PATH" > "$HOME/pull-request-body.md"

./split "$HOME/pull-request-body.md" "$RELEASE_NOTES_PATH"
