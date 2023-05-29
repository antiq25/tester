// CommandEngine.js
import { commands } from './commands.js';

export class CommandEngine {
    constructor(outputEngine) {
        this.outputEngine = outputEngine;
        this.commands = commands;
    }

    processCommand(input) {
        // Split the input into a command and its arguments
        let parts = input.split(' ');
        let commandName = parts[0];
        let args = parts.slice(1);

        // Check if the command exists in the commands object
        if (this.commands[commandName]) {
            // If it does, execute the command with the provided arguments
            const output = this.commands[commandName](...args);

            // Print the output
            this.outputEngine.print(output);
        } else {
            // If it doesn't, return an error message
            this.outputEngine.print(`Unknown command: ${commandName}`);
        }
    }
}
