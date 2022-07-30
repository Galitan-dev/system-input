import SIL, { DebugMode } from "../dist";
// import SIL from "system-input";

const sil = new SIL(DebugMode.All);

sil.start();

process.on("exit", () => {
    sil.stop();
})