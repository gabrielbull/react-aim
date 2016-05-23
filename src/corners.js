function inside(source, target) {
  if (source === target) return 0;
  else if (source > target) return -1;
  else return 1;
}

export function lines(source, target) {
  source = source.getBoundingClientRect();
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

  let finalLines = [];
  lines.forEach(line => {
    let el = source;
    let finalLine = [];
    line.forEach(point => {
      switch (point) {
      case 'top-right':
        finalLine.push({ x: el.left + el.width, y: el.top });
        break;
      case 'top-left':
        finalLine.push({ x: el.left, y: el.top });
        break;
      case 'bottom-right':
        finalLine.push({ x: el.left + el.width, y: el.top + el.height });
        break;
      case 'bottom-left':
        finalLine.push({ x: el.left, y: el.top + el.height });
        break;
      }
      el = target;
    });
    finalLines.push(finalLine);
  });

  return finalLines;
}
