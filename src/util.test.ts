import { describe, expect, it } from 'vitest'
import { getRelativePath } from '../src/util'
import path from 'path'

describe('getRelativePath()', () => {
  it('returns the source code root (based on baseUrl tsconfig) when from is undefined', () => {
    expect(
      getRelativePath(undefined, path.resolve(__dirname, './util.ts'))
    ).toEqual('src/')
  })

  it('returns .. when from defined and to not defined', () => {
    expect(
      getRelativePath(path.resolve(__dirname, './util.ts'), undefined)
    ).toEqual('../')
  })

  it('returns ./ when both are undefined', () => {
    expect(getRelativePath(undefined, undefined)).toEqual('./')
  })

  it('returns ../.. when from is two levels deep', () => {
    expect(
      getRelativePath(
        path.resolve(__dirname, './util/some/file.ts'),
        path.resolve(__dirname, './file.ts')
      )
    ).toEqual('../../')
  })
})
