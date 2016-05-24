import findCorners, { position } from './corners';
import pointInPolygon from './utils/pointInPolygon';

function distance(source, target) {
  const a = source.x - target.x;
  const b = source.y - target.y;
  return Math.sqrt(a * a + b * b);
}

function side(corners) {
  if (corners[0] === 'top-right' && corners[1] === 'bottom-right') return 'right';
  else if (corners[0] === 'top-left' && corners[1] === 'bottom-right') return 'top-right';
  else if (corners[0] === 'top-left' && corners[1] === 'top-right') return 'top';
  else if (corners[0] === 'bottom-left' && corners[1] === 'top-right') return 'top-left';
  else if (corners[0] === 'bottom-left' && corners[1] === 'top-left') return 'left';
  else if (corners[0] === 'bottom-right' && corners[1] === 'top-left') return 'bottom-left';
  else if (corners[0] === 'bottom-right' && corners[1] === 'bottom-left') return 'bottom';
  else if (corners[0] === 'top-right' && corners[1] === 'bottom-left') return 'bottom-right';
}

function bullseye(corners, positions, mousePosition) {
  switch(side(corners)) {
  case 'right':
    return {
      x: positions[0].x,
      y: mousePosition.y
    };
  case 'top-right':
    return {
      x: positions[1].x,
      y: positions[0].y
    };
  case 'top':
    return {
      x: mousePosition.x,
      y: positions[0].y
    };
  case 'top-left':
    return {
      x: positions[0].x,
      y: positions[1].y
    };
  case 'left':
    return {
      x: positions[0].x,
      y: mousePosition.y
    };
  case 'bottom-left':
    return {
      x: positions[1].x,
      y: positions[0].y
    };
  case 'bottom':
    return {
      x: mousePosition.x,
      y: positions[0].y
    };
  case 'bottom-right':
    return {
      x: positions[0].x,
      y: positions[1].y
    };
  }
}

export default function aiming(e, mousePosition, prevMousePosition, target) {
  const corners = findCorners(e, target);
  const positions = position(corners, target);

  if (!prevMousePosition || !positions[0] && !positions[1]) return true;

  if (
    pointInPolygon(
      [mousePosition.x, mousePosition.y],
      [[prevMousePosition.x, prevMousePosition.y], [positions[0].x, positions[0].y], [positions[1].x, positions[1].y]]
    )
  ) {
    const dist = Math.round(distance(mousePosition, bullseye(corners, positions, mousePosition)));
    return Math.max(dist, 1);
  }
  return false;
}
