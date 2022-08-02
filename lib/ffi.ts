import { dlopen, suffix } from 'bun:ffi'

const filename = `../target/release/librustybun.${suffix}`
const location = new URL(filename, import.meta.url).pathname
export const {
  symbols
} = dlopen(location, {
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
