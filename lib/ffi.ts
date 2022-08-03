import { dlopen } from 'bun:ffi'

const { platform, arch } = process

let filename = ''

if (arch === 'x64') {
  if (platform === 'linux') {
    filename = `../target/x86_64-unknown-linux-gnu/release/librustybun.so`
  } else if (platform === 'darwin') {
    filename = `../target/x86_64-apple-darwin/release/librustybun.dylib`
  }
} else {
  if (platform === 'darwin') {
    filename = `../target/aarch64-apple-darwin/release/librustybun.dylib`
  }
}

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
  load_history: {
    args: ['pointer', 'pointer'],
    returns: 'cstring'
  },
  save_history: {
    args: ['pointer', 'pointer'],
    returns: 'cstring'
  }
})

const utf8e = new TextEncoder()

export function encode<T>(data: T): Uint8Array {
  return utf8e.encode(data + '\0')
}
