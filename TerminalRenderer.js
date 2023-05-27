export class TerminalRenderer {
  constructor(terminalElement) {
      this.terminalElement = terminalElement;
  }

  renderOutput(text) {
      let outputElement = document.createElement('p');
      outputElement.textContent = text;
      this.terminalElement.appendChild(outputElement);
  }
}
