#!/bin/sh

# Exit on failure
set -e

if [ -n "$RELEASE_NOTES_PATH" ]; then
  RELEASE_NOTES_PATH="__RELEASE_NOTES.md"
fi

jq .pull_request.body "$GITHUB_EVENT_PATH" > "$HOME/pull-request-body.md"

./split "$HOME/pull-request-body.md" "$GITHUB_WORKSPACE/$RELEASE_NOTES_PATH"

if [ -z "$(cat $GITHUB_WORKSPACE/$RELEASE_NOTES_PATH)" ]; then
  echo "Error: No release notes found"
  exit 1
fi
