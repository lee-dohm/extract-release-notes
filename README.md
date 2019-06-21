# Extract Release Notes Action

A GitHub Action that extracts release notes from pull requests.

## Use

Publish release notes on merged pull requests:

```
workflow "Publish release notes" {
  on = "pull_request"
  resolves = ["Post release notes"]
}

action "On merged pull requests" {
  uses = "actions/bin/filter@master"
  args = "merged true"
}

action "Extract release notes" {
  needs = ["On merged pull requests"]
  uses = "lee-dohm/extract-release-notes@master"
}

action "Post release notes" {
  needs = ["Extract release notes"]
  uses = "some-user/some-repo@master"
}
```

## Configuration

| Key | Description | Type | Required |
|-----|-------------|------|----------|
| `RELEASE_NOTES_PATH` | Path relative to `GITHUB_WORKSPACE` to store the release notes in. _(Defaults to `__RELEASE_NOTES.md`)_ | `env` | No |

## License

[MIT](LICENSE.md)
