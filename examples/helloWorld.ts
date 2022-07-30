import SIL, { KeyboardEvent } from "../dist";
// import SIL, { KeyboardEvent } azfrom "system-input";

const sil = new SIL();

sil.on("keydown", (event: KeyboardEvent) => {
    console.log("You pressed the key with the keycode:", event.keyCode);
});

sil.start();

process.on("exit", () => {
    sil.stop();
})