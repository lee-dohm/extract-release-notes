FROM elixir:1.8-alpine

LABEL "com.github.actions.name"="Extract release notes"
LABEL "com.github.actions.description"="Extracts release notes from pull requests"
LABEL "com.github.actions.icon"="download"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="https://github.com/lee-dohm/extract-release-notes"
LABEL "homepage"="https://github.com/lee-dohm/extract-release-notes"
LABEL "maintainer"="Lee Dohm"

RUN set -e \
    && apk update \
    && apk add jq

COPY ./entrypoint.sh .
COPY ./bin/split .

ENTRYPOINT ["/entrypoint.sh"]
