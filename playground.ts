import Rustybun from "./lib";

const rl = new Rustybun()

while (true) {
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
}
