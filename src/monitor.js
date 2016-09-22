import ReactDOM from 'react-dom';
import aiming from './aim';

function scrollPosition() {
  const scrollTop = document.documentElement.scrollTop ?
    document.documentElement.scrollTop : document.body.scrollTop;
  const scrollLeft = document.documentElement.scrollLeft ?
    document.documentElement.scrollLeft : document.body.scrollLeft;

  return { scrollTop, scrollLeft };
}

function mousePosition(event) {
  const sPos = scrollPosition();

  const x = document.all ? event.clientX + sPos.scrollLeft : event.pageX;
  const y = document.all ? event.clientY + sPos.scrollTop : event.pageY;

  return { x, y };
}

class Monitor {
  mousePosition;
  prevMousePosition;
  targets = [];
  lastEnterRequest;
  lastLeaveRequest;

  constructor() {
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  handleMouseMove = e => {
    this.mousePosition = mousePosition(e);
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

  hasAimedTarget() {
    for (let i = 0, len = this.targets.length; i < len; ++i) {
      if (this.targets[i][0].aiming) {
        return true;
      }
    }
    return false;
  }

  get aimedTargets() {
    let targets = [];
    for (let i = 0, len = this.targets.length; i < len; ++i) {
      if (this.targets[i][0].aiming) {
        targets.push(this.targets[i][0]);
      }
    }
    return targets;

  }

  sourceIsChildrenOfAimedTarget(source) {
    let result = false;
    this.aimedTargets.forEach(target => {
      if (target.aiming && target.hasChildrenSource(source)) result = true;
    });
    return result;
  }

  requestMouseEnter(source) {
    return new Promise((resolve, reject) => {
      if (this.hasAimedTarget() && !this.sourceIsChildrenOfAimedTarget(source)) {
        this.lastEnterRequest = source;
        return reject();
      }
      this.lastEnterRequest = null;
      return resolve();
    });
  }

  requestMouseLeave(source) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (source.hasChildrenOver() || source.hasChildrenAimed()) {
          this.lastLeaveRequest = source;
          return reject();
        }
        this.lastLeaveRequest = null;
        return resolve();
      }, 0);
    });
  }

  mouseOver(event, component) {
    if (component._isMounted) {
      const mPos = mousePosition(event);
      const sPos = scrollPosition();

      const rect = ReactDOM.findDOMNode(component).getBoundingClientRect();
      const left = rect.left + sPos.scrollLeft;
      const top = rect.top + sPos.scrollTop;

      return (mPos.x >= left && mPos.x <= left + rect.width) &&
        (mPos.y >= top && mPos.y <= top + rect.height);
    }
    return false;
  }

  aimStopped() {
    if (this.lastEnterRequest) {
      if (this.mouseOver({ pageX: this.mousePosition.x, pageY: this.mousePosition.y }, this.lastEnterRequest)) {
        const enterSource = this.lastEnterRequest;
        this.requestMouseEnter(enterSource)
          .then(() => {
            this.lastEnterRequest = null;
            enterSource.forceMouseEnter();
          })
          .catch(() => null);
      }
    }

    if (this.lastLeaveRequest) {
      if (!this.mouseOver({ pageX: this.mousePosition.x, pageY: this.mousePosition.y }, this.lastLeaveRequest)) {
        const leaveSource = this.lastLeaveRequest;
        this.requestMouseLeave(this.lastLeaveRequest)
          .then(() => {
            this.lastLeaveRequest = null;
            leaveSource.forceMouseLeave();
          })
          .catch(() => null);
      }
    }
  }
}

export default new Monitor();
