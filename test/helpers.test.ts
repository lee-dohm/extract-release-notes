import { parseBody, validateEnv } from '../src/helpers'

describe('parseBody', () => {
  it('returns everything after the release notes header', () => {
    const body = `Test\n\n## Release notes\n\n* note 1\n* note 2\n`

    expect(parseBody(body)).toBe(`\n* note 1\n* note 2\n`)
  })

  it('throws an error when there is no release notes header', () => {
    const body = 'Test'

    expect(() => {
      parseBody(body)
    }).toThrow('No release notes header was found')
  })

  it('recognizes the release notes header case-insensitively', () => {
    const body = `Test\n\n### rElEaSe nOtEs\n\n* note 1\n* note 2\n`

    expect(parseBody(body)).toBe(`\n* note 1\n* note 2\n`)
  })

  it('recognizes any level markdown header', () => {
    const body = `Test\n\n###### Release notes\n\n* note 1\n* note 2\n`

    expect(parseBody(body)).toBe(`\n* note 1\n* note 2\n`)
  })

  it('recognizes plural release notes in the header', () => {
    const body = `Test\n\n# Release notes\n\n* note 1\n* note 2\n`

    expect(parseBody(body)).toBe(`\n* note 1\n* note 2\n`)
  })

  it('recognizes singular release note in the header', () => {
    const body = `Test\n\n#### Release note\n\n* note 1\n* note 2\n`

    expect(parseBody(body)).toBe(`\n* note 1\n* note 2\n`)
  })

  it('fails to recognize the header without the space after the hash marks', () => {
    const body = `Test\n\n####Release note\n\n* note 1\n* note 2\n`

    expect(() => {
      parseBody(body)
    }).toThrow('No release notes header was found')
  })
})

describe('validateEnv', () => {
  it('returns the value of the environment variable when it is set', () => {
    expect(validateEnv('PATH')).toBe(process.env['PATH'])
  })

  it('throws an exception when the environment variable is not set', () => {
    expect(() => {
      validateEnv('tHiS_sHoUlD_nOt_bE_sEt')
    }).toThrow("Environment variable 'tHiS_sHoUlD_nOt_bE_sEt' is not set but is required")
  })
})
