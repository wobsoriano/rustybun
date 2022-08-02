# RustyBun

Readline implementation in Rust for Bun. [RustyLine](https://github.com/kkawakam/rustyline) Bun ffi wrapper.

## Install

```bash
bun add rustybun
```

## Usage

```js
import RustyBun from 'rustybun'

const rb = new RustyBun()

const { success } = rb.loadHistory('history.txt')
if (!success) {
  console.log('No previous history.')
}

while (true) {
  const line = rb.readline();
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

rb.saveHistory('history.txt')
```

## License

MIT
