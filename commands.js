// commands.js

// Define your functions
function random(min, max) {
    min = Number(min);
    max = Number(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return `Random number between ${min} and ${max}: ${randomNumber}`;
}

function reverse(string) {
    const reversed = string.split('').reverse().join('');
    return `Reversed string: ${reversed}`;
}

// Add the two functions you provided
function getIPData() {
  // ... your function logic
}

function displayPlatformInfo() {
  // ... your function logic
}

// Export an object that references your functions
export const commands = {
    random,
    reverse,
    getIPData,
    displayPlatformInfo
};
