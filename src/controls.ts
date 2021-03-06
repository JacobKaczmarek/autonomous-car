export class Controls {
    forward: boolean;
    reverse: boolean;
    left: boolean;
    right: boolean;

    constructor() {
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;

        this.addKeyboardListeners()
    }

    private addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case 'w':
                    this.forward = true;
                    break;
                case 's':
                    this.reverse = true;
                    break;
                case 'a':
                    this.left = true;
                    break;
                case 'd':
                    this.right = true;
                    break;
            }
        }

        document.onkeyup = (event) => {
            switch (event.key) {
                case 'w':
                    this.forward = false;
                    break;
                case 's':
                    this.reverse = false;
                    break;
                case 'a':
                    this.left = false;
                    break;
                case 'd':
                    this.right = false;
                    break;
            }
        }
    }
}
