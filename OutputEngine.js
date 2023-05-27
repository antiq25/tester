export class OutputEngine {
    constructor(renderer) {
        this.renderer = renderer;
    }
  
    print(text, location) {
        if (location) {
            // handle logic to print text at a specific location
            // this will depend on your specific UI implementation
        } else {
            this.renderer.renderOutput(text);
        }
    }
  }