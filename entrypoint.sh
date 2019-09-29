#!/bin/sh

# Exit on failure
set -e

if [ -z "$INPUT_RELEASENOTESPATH" ]; then
  INPUT_RELEASENOTESPATH="$GITHUB_WORKSPACE/__RELEASE_NOTES.md"
fi

temp_path="$HOME/pull-request-body.md"
output_path="$INPUT_RELEASENOTESPATH"

jq --raw-output .pull_request.body "$GITHUB_EVENT_PATH" > "$temp_path"

body=`cat $temp_path`
echo "##[info]----- Pull Request body -----"
echo "##[info]$body"
echo "##[info]-----------------------------"

/split "$temp_path" "$output_path"

output=`cat "$output_path"`

echo "##[info]----- Release notes -----"
echo "##[info]$output"
echo "##[info]-------------------------"

if [ -z "$output" ]; then
  echo "##[error]No release notes found"
  exit 1
else
  echo "##[set-output name=releaseNotesPath]$output_path"
fi
