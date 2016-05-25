import ReactDOM from 'react-dom';
import aiming from './aim';

class Monitor {
  mousePosition;
  prevMousePosition;
  targets = [];

  constructor() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    this.prevMousePosition = this.mousePosition;
    this.mousePosition = { x: e.pageX, y: e.pageY };
    this.checkAim(e);
  };

  checkAim(e) {
    this.targets.forEach(([target, element]) => {
      const distance = aiming(e, this.mousePosition, this.prevMousePosition, element);
      if (target.moveTimeout) clearTimeout(target.moveTimeout);
      if (distance === true) {
      } else if (distance) {
        target.skipped = 0;
        target.triggerAimMove(distance);

        target.moveTimeout = setTimeout(() => {
          target.triggerAimStop();
          target.skipped = 0;
        }, 100);
      } else {
        if (target.aiming) {
          if (target.skipped < 2) {
            target.skipped++;
            target.moveTimeout = setTimeout(() => {
              target.triggerAimStop();
              target.skipped = 0;
            }, 100);
          } else {
            target.triggerAimStop();
          }
        }
      }
    });
  }

  addTarget(target) {
    this.targets.push([target, ReactDOM.findDOMNode(target)]);
  }
}

export default new Monitor();
