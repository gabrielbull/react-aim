import ReactDOM from 'react-dom';
import aiming from './aim';

class Monitor {
  mousePosition;
  prevMousePosition;
  targets = [];
  currentSourceOver = null;
  lastEnterRequest;
  lastLeaveRequest;

  constructor() {
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseMove = e => {
    this.mousePosition = { x: e.pageX, y: e.pageY };
    this.checkAim(e);
    this.prevMousePosition = this.mousePosition;
  };

  checkAim(e) {
    this.targets.forEach(([target, element]) => {
      const distance = aiming(e, this.mousePosition, this.prevMousePosition, element, target.aiming);
      if (distance !== true && distance) {
        target.triggerAimMove(distance);
      } else if (!distance) {
        target.triggerAimStop();
      }
    });
  }

  addTarget(target) {
    this.targets.push([target, ReactDOM.findDOMNode(target)]);
  }

  removeTarget(target) {
    let index;
    for (let i = 0, len = this.targets.length; i < len; ++i) {
      if (this.targets[i][0] === target) {
        index = i;
        break;
      }
    }
    return this.targets = [
      ...this.targets.slice(0, index),
      ...this.targets.slice(index + 1)
    ];
  }

  hasTargetAiming() {
    for (let i = 0, len = this.targets.length; i < len; ++i) {
      if (this.targets[i][0].aiming) {
        return true;
      }
    }
    return false;
  }

  requestMouseEnter(source) {
    return new Promise((resolve, reject) => {
      if (this.currentSourceOver && this.hasTargetAiming()) {
        this.lastEnterRequest = source;
        return reject();
      }
      this.lastEnterRequest = null;
      this.currentSourceOver = source;
      return resolve();
    });
  }

  requestMouseLeave(source) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (source.target && (source.target.isOver || source.target.aiming)) {
          this.lastLeaveRequest = source;
          return reject();
        }
        this.lastLeaveRequest = null;
        return resolve();
      }, 0);
    });
  }

  mouseOver(event, component) {
    const rect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const left = rect.left >= 0 ? rect.left : 0;
    const top = rect.top >= 0 ? rect.top : 0;
    return (event.pageX >= left && event.pageX <= left + rect.width) &&
      (event.pageY >= top && event.pageY <= top + rect.height);
  }

  aimStopped() {
    if (this.lastEnterRequest && this.lastLeaveRequest) {
      if (this.mouseOver({ pageX: this.mousePosition.x, pageY: this.mousePosition.y }, this.lastEnterRequest)) {
        const enterSource = this.lastEnterRequest;
        this.requestMouseEnter(enterSource)
          .then(() => {
            enterSource.forceMouseEnter();
          })
          .catch(() => null);

        const leaveSource = this.lastLeaveRequest;
        this.requestMouseLeave(this.lastLeaveRequest)
          .then(() => {
            leaveSource.forceMouseLeave();
          })
          .catch(() => null);
      } else if (!this.mouseOver({ pageX: this.mousePosition.x, pageY: this.mousePosition.y }, this.lastLeaveRequest)) {
        const leaveSource = this.lastLeaveRequest;
        this.requestMouseLeave(this.lastLeaveRequest)
          .then(() => {
            leaveSource.forceMouseLeave();
          })
          .catch(() => null);
      }
    }
  }
}

export default new Monitor();
