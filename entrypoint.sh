#!/bin/sh

# Exit on failure
set -e

if [ -z "$RELEASE_NOTES_PATH" ]; then
  RELEASE_NOTES_PATH="__RELEASE_NOTES.md"
fi

temp_path="$HOME/pull-request-body.md"
output_path="$GITHUB_WORKSPACE/$RELEASE_NOTES_PATH"

jq .pull_request.body "$GITHUB_EVENT_PATH" > "$temp_path"

/split "$temp_path" "$output_path"

output=$(cat "$output_path")

echo "----- Release notes -----"
echo $output
echo "-------------------------"

if [ -z "$output" ]; then
  echo "Error: No release notes found"
  exit 1
fi
