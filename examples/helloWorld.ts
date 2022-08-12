import SIL, { KeyboardEvent } from "../dist";
// import SIL, { KeyboardEvent } azfrom "system-input";

const sil = new SIL();

sil.on("keydown", (event: KeyboardEvent) => {
    console.log("You pressed the key with the keycode:", event.keyCode);
    // Stop on delete key pressed
    if (event.keyCode === 51) sil.stop();
});

sil.on("ready", () => {
    console.log("I am all ears");
});

sil.on("close", () => {
    console.log("Bye, have a good day!");
});

sil.start();
