'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.extractClassNameKeys = void 0
const extractClassNameKeys = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj,
  toParseCase
) => {
  return Object.entries(obj).reduce((curr, [key, value]) => {
    const reg = new RegExp(/^(@media)/g)
    if (reg.test(key)) return curr
    const splittedKeys = key.split(/(?=[\s.:[\]><+,()])/g)
    for (const splittedKey of splittedKeys) {
      if (splittedKey.startsWith('.')) {
        if (toParseCase) {
          curr.set(toParseCase(splittedKey.replace('.', '').trim()), true)
        } else {
          curr.set(splittedKey.replace('.', '').trim(), true)
        }
      }
    }
    if (typeof value === 'object' && Object.keys(value).length > 0) {
      const map = (0, exports.extractClassNameKeys)(value, toParseCase)
      for (const key of map.keys()) {
        if (key.startsWith('.')) {
          if (toParseCase) {
            curr.set(toParseCase(key), true)
          } else {
            curr.set(key, true)
          }
        }
      }
    }
    return curr
  }, new Map())
}
exports.extractClassNameKeys = extractClassNameKeys
