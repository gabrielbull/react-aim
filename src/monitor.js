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
        }, 200);
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

  requestMouseOver(source) {
    return true;
  }

  mouseOver(event, component) {
    const rect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    return (event.pageX >= rect.left && event.pageX <= rect.left + rect.width) &&
      (event.pageY >= rect.top && event.pageY <= rect.top + rect.height);
  }
}

export default new Monitor();
