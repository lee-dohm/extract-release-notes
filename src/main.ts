import fs from 'fs'
import path from 'path'
import util from 'util'

import * as core from '@actions/core'

import { parseBody, validateEnv } from './helpers'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function run(): Promise<void> {
  try {
    const workspace = validateEnv('GITHUB_WORKSPACE')
    const eventPath = validateEnv('GITHUB_EVENT_PATH')

    const fromFile = core.getInput('fromFile')
    const releaseNotesPath =
      core.getInput('releaseNotesPath') ?? path.join(workspace, '__RELEASE_NOTES.md')

    let body: string

    if (fromFile) {
      body = await readFile(fromFile, { encoding: 'utf8' })
    } else {
      const event = JSON.parse(await readFile(eventPath, { encoding: 'utf8' }))
      body = event.pull_request.body
    }

    const releaseNotes = parseBody(body)
      .trim()
      .concat('\n')

    await writeFile(releaseNotesPath, releaseNotes)

    core.setOutput('releaseNotesPath', releaseNotesPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
