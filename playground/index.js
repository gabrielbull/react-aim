import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';

document.documentElement.style.width = '100%';
document.documentElement.style.height = '100%';
document.body.style.background = 'white';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.width = '100%';
document.body.style.height = '100%';

document.body.innerHTML = `
  <div id="main" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center"></div>
`;

ReactDOM.render(<Menu/>, document.getElementById('main'));
