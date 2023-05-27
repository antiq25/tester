export class CommandEngine {
    constructor() {
        this.commands = {
            'help': this.help,
            'date': this.date,
            // add more commands as methods here
        };
    }
  
    processCommand(command) {
        if (this.commands[command]) {
            return this.commands[command]();
        } else {
            return `Unknown command: ${command}`;
        }
    }
  
    help() {
        // returns a help message
        return "Available commands: help, date";
    }
  
    date() {
        // returns the current date
        return new Date().toString();
    }
  }
  