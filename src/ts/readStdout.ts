import { ChildProcess, spawn } from "child_process";

export default class StdoutReader {

    private command: string;
    private handler: (line: string) => void;
    private cp?: ChildProcess;
    
    constructor(command: string[], handler: (line: string) => void) {
        this.command = command.join(" ");
        this.handler = handler;
    }

    start() {
        if (this.cp)
            throw new Error("StdoutReader already started");

        const cp = spawn(this.command, [], {
            stdio: "pipe",
        });

        cp.stdout.on("data", (data: Buffer) => {
            this.handler(data.toString("utf8"));
        });
        
        cp.stdout.on("error", (data: Buffer) => {
            throw new Error(data.toString("utf8"));
        });
        
        this.cp = cp;
    }

    stop() {
        if (!this.cp)
            throw new Error("StdoutReader already stopped");
     
        this.cp.kill("SIGTERM");
        delete this.cp;
    }

}