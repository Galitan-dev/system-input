import EventEmitter from "events";
import { join } from "path";
import { EventName, KeyboardEvent, parseEvent } from "./events";
import StdoutReader from "./readStdout";
export { KeyboardEvent };

export default class SIListener extends EventEmitter {

  private debugMode: DebugMode;
  private stdoutReader: StdoutReader;

  constructor(debugMode: DebugMode = DebugMode.None) {
    super();

    this.debugMode = debugMode;
    this.stdoutReader = new StdoutReader([join(__dirname, "../bin/listener")], this.handleStdout.bind(this));
  
    this.startDebugging();
  }

  startDebugging() {
    this.on(EventName.KeyUp, (event: KeyboardEvent) => 
      this.log(`Key Up: ${event.keyCode}`, DebugMode.Keyboard));
    
    this.on(EventName.KeyDown, (event: KeyboardEvent) =>
      this.log(`Key Down: ${event.keyCode}`, DebugMode.Keyboard));
  }

  getDebugMode(): DebugMode {
    return this.debugMode;
  }

  handleStdout(str: string) {
    const event = parseEvent(str);
    
    this.emit(event.name, event);
  }

  log(message: string, debugMode: DebugMode = DebugMode.None) { 
    if (debugMode !== DebugMode.None && this.debugMode !== DebugMode.All && debugMode !== this.debugMode)
      return;
    
    console.log("[System Input]",debugMode, message);
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
