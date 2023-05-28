// commands.js
export const commands = {
    'random': function(min, max) {
        min = Number(min);
        max = Number(max);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        this.outputEngine.print(`Random number between ${min} and ${max}: ${randomNumber}`);
    },
    'reverse': function(string) {
        const reversed = string.split('').reverse().join('');
        this.outputEngine.print(`Reversed string: ${reversed}`);
    },
    // add more commands as methods here
};
