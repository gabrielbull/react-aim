import findCorners, { boundaries } from './corners';
import pointInPolygon from './utils/pointInPolygon';

export function distance(source, target) {
  const a = source.x - target.x;
  const b = source.y - target.y;
  return Math.sqrt(a * a + b * b);
}

export function side(corners) {
  if (corners[0] === 'top-right' && corners[1] === 'bottom-right') return 'right';
  else if (corners[0] === 'top-left' && corners[1] === 'bottom-right') return 'top-right';
  else if (corners[0] === 'top-left' && corners[1] === 'top-right') return 'top';
  else if (corners[0] === 'bottom-left' && corners[1] === 'top-right') return 'top-left';
  else if (corners[0] === 'bottom-left' && corners[1] === 'top-left') return 'left';
  else if (corners[0] === 'bottom-right' && corners[1] === 'top-left') return 'bottom-left';
  else if (corners[0] === 'bottom-right' && corners[1] === 'bottom-left') return 'bottom';
  else if (corners[0] === 'top-right' && corners[1] === 'bottom-left') return 'bottom-right';
}

export function bullseye(corners, boundaries, mousePosition) {
  switch(side(corners)) {
  case 'right':
    return {
      x: boundaries[0].x,
      y: mousePosition.y
    };
  case 'top-right':
    return {
      x: boundaries[1].x,
      y: boundaries[0].y
    };
  case 'top':
    return {
      x: mousePosition.x,
      y: boundaries[0].y
    };
  case 'top-left':
    return {
      x: boundaries[0].x,
      y: boundaries[1].y
    };
  case 'left':
    return {
      x: boundaries[0].x,
      y: mousePosition.y
    };
  case 'bottom-left':
    return {
      x: boundaries[1].x,
      y: boundaries[0].y
    };
  case 'bottom':
    return {
      x: mousePosition.x,
      y: boundaries[0].y
    };
  case 'bottom-right':
    return {
      x: boundaries[0].x,
      y: boundaries[1].y
    };
  }
}

export default function aiming(e, mousePosition, prevMousePosition, target) {
  const corners = findCorners(e, target);
  const bound = boundaries(corners, mousePosition, target);

  if (!prevMousePosition || !bound[0] && !bound[1]) return true;

  if (
    pointInPolygon(
      [mousePosition.x, mousePosition.y],
      [[prevMousePosition.x, prevMousePosition.y], [bound[0].x, bound[0].y], [bound[1].x, bound[1].y]]
    )
  ) {
    const dist = Math.round(distance(mousePosition, bullseye(corners, bound, mousePosition)));
    return Math.max(dist, 1);
  }
  return false;
}
