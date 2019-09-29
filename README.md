# Extract Release Notes Action

A GitHub Action that extracts release notes from pull requests.

## Use

Validate that a pull request contains a release notes section:

```
on: pull_request
name: Validate release notes
jobs:
  validateReleaseNotes:
    name: Validate release notes
    runs-on: ubuntu-latest
    steps:
    - name: Extract release notes
      uses: lee-dohm/extract-release-notes@v1.0.0
```

## Configuration

| Key | Description | Type | Required |
|-----|-------------|------|----------|
| `releaseNotesPath` | Path to store the release notes in. _(Defaults to `$GITHUB_WORKSPACE/__RELEASE_NOTES.md`)_ | `input` and `output` | No |

## License

[MIT](LICENSE.md)
