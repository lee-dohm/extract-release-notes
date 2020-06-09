# Extract Release Notes Action

A GitHub Action that extracts release notes from pull requests.

## Format

Release notes are extracted from the body of the pull request. It looks for content starting after a [Markdown header](https://spec.commonmark.org/0.29/#atx-headings) of `Release notes`, case insensitive and the trailing `s` is optional. Everything after that header is considered to be release notes content.

> **Please note:** The space after the one to six `#` characters _is required._

Example:

```markdown
This is the body of a pull request. Describe everything necessary to do with the PR here.

## Release notes

- Fixed the thingamabob
- Tweaked the whoosywhatsis
- Added a foozle
```

If no release notes section is found, the Action returns a failure exit code.

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
      uses: lee-dohm/extract-release-notes@v1.0.3
```

## Configuration

| Key                | Description                                                                                | Type                 | Required |
| ------------------ | ------------------------------------------------------------------------------------------ | -------------------- | -------- |
| `releaseNotesPath` | Path to store the release notes in. _(Defaults to `$GITHUB_WORKSPACE/__RELEASE_NOTES.md`)_ | `input` and `output` | No       |

## License

[MIT](LICENSE.md)
