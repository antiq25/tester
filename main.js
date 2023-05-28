// Assuming you have used ES6 modules for your files
// and exported your classes
import { TerminalRenderer } from './TerminalRenderer.js';
import { OutputEngine } from './OutputEngine.js';
import { InputEngine } from './inputEngine.js';
import { CommandEngine } from './CommandEngine.js';

// Get terminal and input elements from DOM
const terminalElement = document.querySelector('#terminal');
const inputElement = document.querySelector('#terminal-input');

// Initialize all components
const terminalRenderer = new TerminalRenderer(terminalElement);
const outputEngine = new OutputEngine(terminalRenderer);
const commandEngine = new CommandEngine(outputEngine);
const inputEngine = new InputEngine(outputEngine, commandEngine);

// Attach input engine's keypress handler to the input event of the terminal
inputElement.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // to prevent the default form submission
        inputEngine.handleKeyPress(event);
        inputElement.value = ''; // to clear the input after processing
    }
});
