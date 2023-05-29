// Define your functions
function random(outputEngine, min, max) {
    min = Number('10');
    max = Number('20');
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    outputEngine.print(`Random number between ${min} and ${max}: ${randomNumber}`);
}


function reverse(outputEngine, string) {
    const reversed = string.split('').reverse().join('');
    outputEngine.print(`Reversed string: ${reversed}`);
}

// Add the two functions you provided
function getIPData(outputEngine) {
  // ... your function logic
  // remember to use outputEngine.print to display any output
}

function displayPlatformInfo(outputEngine) {
  // ... your function logic
  // remember to use outputEngine.print to display any output
}

function displayHelp(outputEngine) {
  // your function logic here
  outputEngine.print("Help information");
}

export const commands = {
    "random": random,
    "reverse": reverse,
    "getip": getIPData,
    "info": displayPlatformInfo,
    "help": displayHelp
};
