import ReactDOM from 'react-dom';

export default function mouseOnElement(event, component) {
  const rect = ReactDOM.findDOMNode(component).getBoundingClientRect();
  return (event.pageX >= rect.left && event.pageX <= rect.left + rect.width) &&
    (event.pageY >= rect.top && event.pageY <= rect.top + rect.height);
}
