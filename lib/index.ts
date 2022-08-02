import { ptr } from 'bun:ffi'
import { symbols, encode } from './ffi'

class RustyBun {
  #rl: bigint

  constructor() {
    this.#rl = symbols.create()
  }

  readline(prompt = '>> ') {
    const str = symbols.readline(this.#rl, ptr(encode(prompt)))
    const signal: 'CtrlC' | 'CtrlD' | { Success: string[] } = JSON.parse(str)
    if (signal === 'CtrlC') {
      return {
        signal: 'CtrlC',
        value: null,
      }
    }
    if (signal === 'CtrlD') {
      return {
        signal: 'CtrlD',
        value: null,
      }
    }
    return {
      signal: null,
      value: signal.Success[0],
    }
  }
}

export {
  RustyBun,
  RustyBun as default
}
