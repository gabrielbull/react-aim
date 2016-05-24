function inside(source, target) {
  if (source === target) return 0;
  else if (source > target) return -1;
  else return 1;
}

export function lines(source, target) {
  if (source instanceof Event) {
    source = {
      left: source.pageX,
      top: source.pageY,
      width: 0,
      height: 0
    };
  } else {
    source = source.getBoundingClientRect();
  }
  target = target.getBoundingClientRect();

  let point1, point2;

  let ver;
  let hor = inside(source.left + source.width, target.left);
  if (hor !== 1) hor = inside(source.left, target.left);

  if (hor === 1) {
    ver = inside(source.top, target.top);
    if (ver === 0) point1 = ['top-right', 'top-left'];
    else if (ver === 1) point1 = ['top-right', 'top-right'];
    else if (ver === -1) point1 = ['top-left', 'top-left'];

    ver = inside(source.top + source.height, target.top + target.height);
    if (ver === 0) point2 = ['bottom-right', 'bottom-left'];
    else if (ver === 1) point2 = ['bottom-left', 'bottom-left'];
    else if (ver === -1) point2 = ['bottom-right', 'bottom-right'];
  } else {
    ver = inside(source.top, target.top);
    if (ver === 0) point1 = ['top-left', 'top-right'];
    else if (ver === 1) point1 = ['top-left', 'top-left'];
    else if (ver === -1) point1 = ['top-right', 'top-right'];

    ver = inside(source.top + source.height, target.top + target.height);
    if (ver === 0) point2 = ['bottom-left', 'bottom-right'];
    else if (ver === 1) point2 = ['bottom-right', 'bottom-right'];
    else if (ver === -1) point2 = ['bottom-left', 'bottom-left'];
  }

  return [point1, point2];
}

export function coordinates(lines, source, target) {
  source = source.getBoundingClientRect();
  target = target.getBoundingClientRect();

  var doc = document.documentElement;
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);


  let finalLines = [];
  lines.forEach(line => {
    let el = source;
    let finalLine = [];
    line.forEach(point => {
      switch (point) {
      case 'top-right':
        finalLine.push({ x: el.left + el.width + left, y: el.top + top });
        break;
      case 'top-left':
        finalLine.push({ x: el.left + left, y: el.top + top });
        break;
      case 'bottom-right':
        finalLine.push({ x: el.left + el.width + left, y: el.top + el.height + top });
        break;
      case 'bottom-left':
        finalLine.push({ x: el.left + left, y: el.top + el.height + top });
        break;
      }
      el = target;
    });
    finalLines.push(finalLine);
  });

  return finalLines;
}

export default lines;
