import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import monitor from './monitor'

export default function (source, spec = null) {
  if (spec === null && typeof source === 'object') {
    spec = source;
    source = null;
  }

  return function (WrappedComponent) {
    return class extends Component {
      _source;
      aiming = false;
      skippedStops = 0;
      stopTimeout;
      _isOver = false;
      maxDistance;
      prevDistance;
      childrenSources = [];
      _isMounted = false;

      static childContextTypes = {
        target: PropTypes.object
      };

      static contextTypes = {
        source: PropTypes.object
      };

      getChildContext() {
        return {
          target: this
        };
      }

      constructor() {
        super();
        this._source = source;
        this.spec = spec;
      }

      addChildrenSource(source) {
        this.childrenSources.push(source);
      }

      removeChildrenSource(source) {
        this.childrenSources = this.childrenSources.filter(item => item !== source);
      }

      get source() {
        if (typeof this._source === 'function' && this.refs.wrappedComponent) return this._source(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        return null;
      }

      isOver() {
        return this._isOver;
      }

      hasChildrenOver() {
        for (let i = 0, len = this.childrenSources.length; i < len; ++i) {
          if (this.childrenSources[i].isOver() || this.childrenSources[i].hasChildrenOver()) return true;
        }
        return false;
      }

      isAimed() {
        return this.aiming;
      }

      hasChildrenAimed() {
        for (let i = 0, len = this.childrenSources.length; i < len; ++i) {
          if (this.childrenSources[i].hasChildrenAimed()) return true;
        }
        return false;
      }

      hasChildrenSource(source) {
        if (this.childrenSources.includes(source)) return true;

        let result = false;
        this.childrenSources.forEach(item => {
          item.childrenTargets.forEach(target => {
            if (target.hasChildrenSource(source)) result = true;
          })
        });

        return result;
      }

      componentDidMount() {
        if (this.context.source) {
          this.context.source.addChildrenTarget(this);
        }

        this._isMounted = true;
        monitor.addTarget(this);
        const element = ReactDOM.findDOMNode(this);
        element.addEventListener('mousemove', this.handleMouseMove);
      }

      componentWillUnmount() {
        if (this.context.source) {
          this.context.source.removeChildrenTarget(this);
        }

        this._isMounted = false;
        monitor.removeTarget(this);
        const element = ReactDOM.findDOMNode(this);
        element.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseout', this.handleMouseOut);
        clearTimeout(this.stopTimeout);
      }

      trackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseout', this.handleMouseOut);
        element.removeEventListener('mousemove', this.handleMouseMove);
      }

      untrackMouseLeave() {
        const element = ReactDOM.findDOMNode(this);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseout', this.handleMouseOut);
        element.addEventListener('mousemove', this.handleMouseMove);
      }

      handleMouseOut = e => {
        if (e.toElement == null && e.relatedTarget == null) {
          this.handleMouseLeave(e);
        } else {
          this.handleMouseMove(e);
        }
      };

      handleMouseMove = e => {
        if (monitor.mouseOver(e, this)) this.handleMouseEnter(e);
        else this.handleMouseLeave(e);
      };

      handleMouseEnter = () => {
        if (!this._isOver) {
          this._isOver = true;
          this.trackMouseLeave();
          this.triggerMouseEnter();
        }
      };

      handleMouseLeave = () => {
        if (this._isOver) {
          this._isOver = false;
          this.untrackMouseLeave();
          this.triggerMouseLeave();
        }
      };

      triggerAimMove(distance) {
        if (!this.maxDistance) this.maxDistance = distance;
        distance = Math.round((1 - 1 / this.maxDistance * distance) * 1000) / 1000;
        if (this.prevDistance === null || this.prevDistance < distance || this.aiming) {
          if (!this.aiming) {
            this.aiming = true;
            if (typeof this.spec === 'object' && this.spec && typeof this.spec.aimStart === 'function') {
              this.spec.aimStart(this.refs.wrappedComponent.props, this.refs.wrappedComponent, distance);
            }
          }

          this.skippedStops = 0;
          if (this.stopTimeout) clearTimeout(this.stopTimeout);

          this.stopTimeout = setTimeout(() => {
            this.triggerAimStop(true);
            if (!this._isOver) monitor.aimStopped();
          }, 100);

          if (typeof this.spec === 'object' && this.spec && typeof this.spec.aimMove === 'function') {
            this.spec.aimMove(this.refs.wrappedComponent.props, this.refs.wrappedComponent, distance);
          }
        }

        this.prevDistance = distance;
      }

      triggerAimStop(force = false) {
        if (this.stopTimeout) clearTimeout(this.stopTimeout);
        if (this.aiming) {
          const doStop = () => {
            this.prevDistance = null;
            this.skippedStops = 0;
            this.maxDistance = null;
            this.aiming = false;
            if (typeof this.spec === 'object' && this.spec && typeof this.spec.aimStop === 'function') {
              if (this.refs.wrappedComponent) {
                this.spec.aimStop(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
              }
            }
          };

          if (!force && this.skippedStops < 10) {
            this.skippedStops++;
            this.stopTimeout = setTimeout(() => {
              doStop();
              if (!this._isOver) monitor.aimStopped();
            }, 100);
          } else {
            doStop();
          }
        }
      }

      triggerMouseEnter() {
        if (typeof this.spec === 'object' && this.spec && typeof this.spec.mouseEnter === 'function') {
          this.spec.mouseEnter(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        }
      }

      triggerMouseLeave() {
        if (typeof this.spec === 'object' && this.spec && typeof this.spec.mouseLeave === 'function') {
          this.spec.mouseLeave(this.refs.wrappedComponent.props, this.refs.wrappedComponent);
        }
      }

      render() {
        return (
          <WrappedComponent
            ref="wrappedComponent"
            {...this.props}
          />
        );
      }
    };
  }
}
