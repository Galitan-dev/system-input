import EventEmitter from "events";

export default class SIListener extends EventEmitter {

  private debugMode: DebugMode;

  constructor(debugMode: DebugMode = DebugMode.None) {
    super();

    this.debugMode = debugMode;
  }

}

export enum DebugMode {
  None = "none",
  Mouse = "mouse",
  Keyboard = "keyboard",
  All = "all",
}

new SIListener(DebugMode.All);
