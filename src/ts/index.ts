import EventEmitter from "events";
import { join } from "path";
import StdoutReader from "./readStdout";

export default class SIListener extends EventEmitter {

  private debugMode: DebugMode;
  private stdoutReader: StdoutReader;

  constructor(debugMode: DebugMode = DebugMode.None) {
    super();

    this.debugMode = debugMode;
    this.stdoutReader = new StdoutReader([join(__dirname, "../bin/listener")], this.stdoutHandler.bind(this));
  }

  getDebugMode(): DebugMode {
    return this.debugMode;
  }

  stdoutHandler(line: string) {
    this.log("Received keypress: " + line.substring(0, line.length - 1), DebugMode.Keyboard);
  }

  log(message: string, debugMode: DebugMode = DebugMode.None) { 
    if (debugMode !== DebugMode.None && this.debugMode !== DebugMode.All && debugMode !== this.debugMode)
      return;
    
    console.log(debugMode, message);
  }

  start() {
    this.stdoutReader.start();
    this.log("Started listening inputs", DebugMode.All);
  }

  stop() {
    this.stdoutReader.stop();
    this.log("Stopped listening inputs", DebugMode.All);
  }

}

export enum DebugMode {
  None = "[INFO]",
  Mouse = "[MOUSE]",
  Keyboard = "[KEYBOARD]",
  All = "[DEBUG]",
}
