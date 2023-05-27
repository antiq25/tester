export class InputEngine {
  constructor(outputEngine, commandEngine) {
      this.outputEngine = outputEngine;
      this.commandEngine = commandEngine;
  }

  handleKeyPress(event) {
      // process the key press event
      // send command to the command engine and print output
      let command = event.target.value;
      let output = this.commandEngine.processCommand(command);
      this.outputEngine.print(output);
  }
}
