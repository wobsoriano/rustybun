import { dlopen, suffix } from 'bun:ffi'

export const {
  symbols
} = dlopen(`./target/release/librustybun.${suffix}`, {
  create: {
    args: [],
    returns: 'pointer'
  },
  readline: {
    args: ['pointer', 'pointer'],
    returns: 'cstring'
  },
})

const utf8e = new TextEncoder()

export function encode<T>(data: T): Uint8Array {
  return utf8e.encode(data + '\0')
}
