import findCorners, { position } from './corners';
import pointInPolygon from './utils/pointInPolygon';

export default function aiming(e, mousePosition, prevMousePosition, target) {
  const corners = findCorners(e, target);
  const positions = position(corners, target);

  if (!prevMousePosition || !positions[0] && !positions[1]) return true;

  return(
    pointInPolygon(
      [mousePosition.x, mousePosition.y],
      [[prevMousePosition.x, prevMousePosition.y], [positions[0].x, positions[0].y], [positions[1].x, positions[1].y]]
    )
  );
}
