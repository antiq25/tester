import { commands } from './commands.js';

export class CommandEngine {
    constructor(outputEngine) {
        this.outputEngine = outputEngine;
    }

    processCommand(input) {
        // Split the input into a command and its arguments
        let parts = input.split(' ');
        let commandName = parts[0].toLowerCase(); // case-insensitive command name
        let args = parts.slice(1);

        // Check if the command exists in the commands object
        if (commands[commandName]) {
            // If it does, execute the command with the output engine and the provided arguments
            commands[commandName](this.outputEngine, ...args);
        } else {
            // If it doesn't, return an error message
            this.outputEngine.print(`Unknown command: ${commandName}`);
        }
    }
}
