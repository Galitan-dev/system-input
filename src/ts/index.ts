import EventEmitter from "events";

class SIListener extends EventEmitter {

  private debugMode: DebugMode;

  constructor(debugMode: DebugMode = DebugMode.None) {
    super();

    this.debugMode = debugMode;
  }

  getDebugMode(): DebugMode {
    return this.debugMode;
  }

}

exports = SIListener
export default SIListener;

export enum DebugMode {
  None = "none",
  Mouse = "mouse",
  Keyboard = "keyboard",
  All = "all",
}

new SIListener(DebugMode.All);
