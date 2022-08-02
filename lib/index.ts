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

  loadHistory(path: string) {
    const str = symbols.load_history(this.#rl, ptr(encode(path))).toString()
    if (str === '') {
      return {
        success: true
      }
    }
    return {
      success: false,
      message: str as string
    }
  }

  saveHistory(path: string) {
    const str = symbols.save_history(this.#rl, ptr(encode(path))).toString()
    if (str === '') {
      return {
        success: true
      }
    }
    return {
      success: false,
      message: str as string
    }
  }
}

export {
  RustyBun,
  RustyBun as default
}
