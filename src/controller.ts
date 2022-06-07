export class Controls {
  constructor () {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }

  setupKeyboardListener() {
    window.addEventlistener('k')
  }
}
