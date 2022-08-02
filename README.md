# RustyBun

Readline implementation in Rust for Bun. [RustyLine](https://github.com/kkawakam/rustyline) Bun ffi wrapper.

## Install

```bash
bun add rustybun
```

## Usage

```js
import RustyBun from 'rustybun'

const rl = new RustyBun()

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
