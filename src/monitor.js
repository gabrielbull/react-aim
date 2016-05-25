import ReactDOM from 'react-dom';
import aiming from './aim';

class Monitor {
  mousePosition;
  prevMousePosition;
  targets = [];
  targetsAiming = [];
  isOver = null;
  mouseEnterRequests = [];

  constructor() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = e => {
    this.prevMousePosition = this.mousePosition;
    this.mousePosition = { x: e.pageX, y: e.pageY };
    this.checkAim(e);
  };

  checkAim(e) {
    this.targetsAiming = [];
    this.targets.forEach(([target, element]) => {
      const distance = aiming(e, this.mousePosition, this.prevMousePosition, element);
      if (target.moveTimeout) clearTimeout(target.moveTimeout);
      if (distance === true) {
        this.targetsAiming.push(target);
      } else if (distance) {
        this.targetsAiming.push(target);
        target.skipped = 0;
        target.triggerAimMove(distance);
        target.moveTimeout = setTimeout(() => {
          target.triggerAimStop();
          target.skipped = 0;
          this.rerunRequests();
        }, 200);
      } else {
        if (target.aiming) {
          if (target.skipped < 20) {
            target.skipped++;
            target.moveTimeout = setTimeout(() => {
              target.triggerAimStop();
              target.skipped = 0;
              this.rerunRequests();
            }, 200);
          } else {
            target.triggerAimStop();
            this.rerunRequests();
          }
        }
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
    else if (this.mouseEnterRequests.length === 0 && this.targetsAiming.length === 0) {
      return true;
    }
    return false;
  }

  handleMouseOut(source) {
    source.handleMouseLeave();
  }

  mouseOver(event, component) {
    const rect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const left = rect.left >= 0 ? rect.left : 0;
    const top = rect.top >= 0 ? rect.top : 0;
    return (event.pageX >= left && event.pageX <= left + rect.width) &&
      (event.pageY >= top && event.pageY <= top + rect.height);
  }

  addMouseEnterRequest(source) {

  }

  rerunRequests() {
    //console.log(this.mouseEnterRequests);
  }
}

export default new Monitor();
