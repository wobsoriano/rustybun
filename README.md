# Rustybun

Readline implementation in Rust for Bun. [Rustyline](https://github.com/kkawakam/rustyline) Bun ffi wrapper.

## Install

```bash
bun add rustybun
```

## Usage

```js
import Rustybun from 'rustybun'

const rl = new Rustybun()

while (true) {
  const line = rl.readline();
  if (line.signal === 'CtrlC') {
    console.log('CtrlC')
    break
  }
  if (line.signal === 'CtrlD') {
    console.log('CtrlD')
    break
  }
  console.log(line.value)
}
```

## License

MIT
