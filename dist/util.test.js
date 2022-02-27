'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const vitest_1 = require('vitest')
const util_1 = require('../src/util')
const path_1 = __importDefault(require('path'))
;(0, vitest_1.describe)('getRelativePath()', () => {
  ;(0, vitest_1.it)(
    'returns the source code root (based on baseUrl tsconfig) when from is undefined',
    () => {
      ;(0, vitest_1.expect)(
        (0, util_1.getRelativePath)(
          undefined,
          path_1.default.resolve(__dirname, './util.ts')
        )
      ).toEqual('src/')
    }
  )
  ;(0, vitest_1.it)('returns .. when from defined and to not defined', () => {
    ;(0, vitest_1.expect)(
      (0, util_1.getRelativePath)(
        path_1.default.resolve(__dirname, './util.ts'),
        undefined
      )
    ).toEqual('../')
  })
  ;(0, vitest_1.it)('returns ./ when both are undefined', () => {
    ;(0, vitest_1.expect)(
      (0, util_1.getRelativePath)(undefined, undefined)
    ).toEqual('./')
  })
  ;(0, vitest_1.it)('returns ../.. when from is two levels deep', () => {
    ;(0, vitest_1.expect)(
      (0, util_1.getRelativePath)(
        path_1.default.resolve(__dirname, './util/some/file.ts'),
        path_1.default.resolve(__dirname, './file.ts')
      )
    ).toEqual('../../')
  })
})
