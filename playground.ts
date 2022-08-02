import Rustybun from "./lib";

const rl = new Rustybun()

const filename = `./history.txt`
const location = new URL(filename, import.meta.url).pathname
console.log(location)
while (true) {
  let result = rl.loadHistory(location)
  console.log(result)
  const line = rl.readline();
  if (line.signal === "CtrlC") {
    console.log("CtrlC");
    break;
  }
  if (line.signal === "CtrlD") {
    console.log("CtrlD");
    break;
  }
  console.log(line.value);
  result = rl.saveHistory(location);
  console.log(result)
}
