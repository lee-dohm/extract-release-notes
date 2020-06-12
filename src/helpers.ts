/**
 * Parses the body text of the pull request and returns only the release notes section.
 *
 * @param body Body text of the pull request
 */
export function parseBody(body: string): string {
  const pattern = new RegExp('^#{1,6}\\s+release\\s+notes?\\s+$', 'im')
  const result = body.split(pattern)[1]

  if (result) {
    return result
  }

  throw new Error('No release notes header was found')
}

/**
 * Validates an environment variable is set and returns its value.
 *
 * @param name Name of the environment variable to validate
 */
export function validateEnv(name: string): string {
  const value = process.env[name]

  if (value) {
    return value
  }

  throw new Error(`Environment variable '${name}' is not set but is required`)
}
