import ReactDOM from 'react-dom';
import aiming from './aim';

class Monitor {
  mousePosition;
  prevMousePosition;
  targets = [];
  targetsAiming = [];
  isOver = null;
  pendingMouseEnterRequest;

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

  requestMouseEnter(source) {
    const target = source.target;
    if (target) {
      for (let i = 0, len = this.targetsAiming.length; i < len; ++i) {
        if (this.targetsAiming[i] === target) {
          if (this.isOver && this.isOver !== source) this.handleMouseOut(this.isOver);
          this.isOver = source;
          return true;
        }
      }
    }
    if (this.targetsAiming.length) {
      this.addMouseEnterRequest(source);
      return false;
    }
    if (this.isOver && this.isOver !== source) this.handleMouseOut(this.isOver);
    this.isOver = source;
    return true;
  }

  requestMouseLeave(source) {
    const target = source.target;
    if (target && target.isOver) return false;
    else if (this.targetsAiming.length) {
      for (let i = 0, len = this.targetsAiming.length; i < len; ++i) {
        if (this.targetsAiming[i] === target) return false;
      }
    }
    return true;
  }

  handleMouseOut(source) {
    this.isOver = null;
    source.forceMouseLeave();
  }

  mouseOver(event, component) {
    const rect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const left = rect.left >= 0 ? rect.left : 0;
    const top = rect.top >= 0 ? rect.top : 0;
    return (event.pageX >= left && event.pageX <= left + rect.width) &&
      (event.pageY >= top && event.pageY <= top + rect.height);
  }

  addMouseEnterRequest(source) {
    this.pendingMouseEnterRequest = source;
  }

  fulfillMouseEnterRequest() {
    if (this.pendingMouseEnterRequest) {
      if (this.isOver && this.isOver !== this.pendingMouseEnterRequest) {
        console.log('outtt with you');
        this.handleMouseOut(this.isOver);
      }
      this.isOver = this.pendingMouseEnterRequest;
      this.pendingMouseEnterRequest.triggerMouseEnter();
      this.pendingMouseEnterRequest = null;
    }
  }
}

export default new Monitor();
