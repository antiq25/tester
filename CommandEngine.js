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
        return `
         commands:
         [search] - google, brave, bing for now. type google to open google, or google <query> to search etc
         [info]   - displays what terminal can see via platform.js
         [ip]     - gets ip address 
         [help]   - displays available commands
         [links]  -  displays links + your links  
         [link.add] - prompts you to create a link, then adds it to link tree.
         [txt]    - creates txt edit (lots of work to do still on this)
         [save]   - saves contents inside of txt editor into local storage
         [load]   - loads local storage , displays into prompt
         [cls]   - exits + clears prompt. (this is your reset)
        created by antiq [github.com/antiq25]
    `;
    }
  
    date() {
        // returns the current date
        return new Date().toString();
    }
  }
  

  