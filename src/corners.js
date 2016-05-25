function inside(source, targetMin, targetMax) {
  if (source >= targetMin && source <= targetMax) return 0;
  else if (source > targetMin) return -1;
  else return 1;
}

export function corners(source, target) {
  source = { left: source.pageX, top: source.pageY };
  target = target.getBoundingClientRect();

  let ver, hor;

  hor = inside(source.left, target.left, target.left + target.width);
  ver = inside(source.top, target.top, target.top + target.height);

  if (hor === -1 && ver === -1) return ['top-right', 'bottom-left'];
  if (hor === -1 && ver === 0) return ['top-right', 'bottom-right'];
  if (hor === -1 && ver === 1) return ['top-left', 'bottom-right'];

  if (hor === 0 && ver === -1) return ['bottom-right', 'bottom-left'];
  if (hor === 0 && ver === 0) return [];
  if (hor === 0 && ver === 1) return ['top-left', 'top-right'];

  if (hor === 1 && ver === -1) return ['bottom-right', 'top-left'];
  if (hor === 1 && ver === 0) return ['bottom-left', 'top-left'];
  if (hor === 1 && ver === 1) return ['bottom-left', 'top-right'];
}

export function boundaries(corners, target) {
  target = target.getBoundingClientRect();

  var doc = document.documentElement;
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  let positions = [];
  corners.forEach(corner => {
    switch (corner) {
    case 'top-right':
      positions.push({ x: target.left + target.width + left, y: target.top + top });
      break;
    case 'top-left':
      positions.push({ x: target.left + left, y: target.top + top });
      break;
    case 'bottom-right':
      positions.push({ x: target.left + target.width + left, y: target.top + target.height + top });
      break;
    case 'bottom-left':
      positions.push({ x: target.left + left, y: target.top + target.height + top });
      break;
    }
  });

  return positions;
}

export function lines(corners, source, target) {
  source = {
    left: source.pageX,
    top: source.pageY
  };
  target = target.getBoundingClientRect();

  var doc = document.documentElement;
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  let lines = [];
  corners.forEach(corner => {
    const line = [{ x: source.left, y: source.top }];
    switch (corner) {
    case 'top-right':
      line.push({ x: target.left + target.width + left, y: target.top + top });
      break;
    case 'top-left':
      line.push({ x: target.left + left, y: target.top + top });
      break;
    case 'bottom-right':
      line.push({ x: target.left + target.width + left, y: target.top + target.height + top });
      break;
    case 'bottom-left':
      line.push({ x: target.left + left, y: target.top + target.height + top });
      break;
    }
    lines.push(line);
  });

  return lines;
}

export default corners;
