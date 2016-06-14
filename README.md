# React Aim

[![Build Status](https://travis-ci.org/gabrielbull/react-aim.svg?branch=master)](https://travis-ci.org/gabrielbull/react-aim)
[![Code Climate](https://codeclimate.com/github/gabrielbull/react-aim/badges/gpa.svg)](https://codeclimate.com/github/gabrielbull/react-aim)
[![Dependency Status](https://david-dm.org/gabrielbull/react-aim.svg)](https://david-dm.org/gabrielbull/react-aim)
[![devDependency Status](https://david-dm.org/gabrielbull/react-aim/dev-status.svg)](https://david-dm.org/gabrielbull/react-aim#info=devDependencies)
[![npm downloads](http://img.shields.io/npm/dt/react-aim.svg)](https://www.npmjs.org/package/react-aim)
[![npm version](https://img.shields.io/npm/v/react-aim.svg)](https://www.npmjs.org/package/react-aim)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gabrielbull/react-aim?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Determine the cursor aim for triggering mouse events.

## Demo

Try the [demo here](http://gabrielbull.github.io/react-aim/).

![Example](https://rawgit.com/gabrielbull/react-aim/master/example.gif)

## Installation

> npm install react-aim --save

## Usage

```jsx
import React, { Component } from 'react';
import { target } from 'react-aim';

@target(
  {
    mouseEnter: (props, component) => {
      console.log('mouse enter');
    },
    mouseLeave: (props, component) => {
      console.log('mouse leave');
    },
    aimMove: (props, component, distance) => {
      console.log('aim move ' + Math.round(distance * 100)  + '%');
    },
    aimStart: (props, component, distance) => {
      console.log('aim start');
    },
    aimStop: (props, component) => {
      console.log('aim stop');
    }
  }
)
export default class extends Component {
  render() {
    return (
      <div/>
    );
  }
}
```

## Submenu Example

Fire mouse events on menus and submenus that takes into account the user's cursor aim.

#### Menu

```jsx
import React, { Component, PropTypes } from 'react';
import MenuItem from './path/to/menuItem';

export default class extends Component {
  render() {
    return (
        <ul>
          <Item name="item 1"/>
          <Item name="item 2"/>
          <Item name="item 3"/>
          <Item name="item 4"/>
          <Item name="item 5"/>
        </ul>
    );
  }
}
```

#### Menu Item

```jsx
import React, { Component, PropTypes } from 'react';
import { source } from 'react-aim';
import Submenu from './path/to/submenu';

@source(
  {
    mouseEnter: (props, component) => component.setState({ over: true }),
    mouseLeave: (props, component) => component.setState({ over: false })
  }
)
export default class extends Component {
  constructor() {
    super();
    this.state = { over: false };
  }

  render() {
    let submenu;
    if (this.state.over) submenu = <Submenu ref="submenu"/>;

    return (
      <li>
        {this.props.name}
        {submenu}
      </li>
    );
  }
}
```

#### Submenu

```jsx
import React, { Component, PropTypes } from 'react';
import { target } from 'react-aim';

@target()
export default class extends Component {
  render() {
    return (
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
        <li>item 5</li>
      </ul>
    );
  }
}
```
