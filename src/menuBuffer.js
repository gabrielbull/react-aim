import React, { Component } from 'react';

export default function (...args) {
  return function (WrappedComponent) {
    return class extends Component {
      render() {
        return (
          <div>
            <WrappedComponent {...this.props}/>
          </div>
        );
      }
    };
  }
}
