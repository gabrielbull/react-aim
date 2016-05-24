export function position(line, x1, y1, x2, y2) {
  line.setAttributeNS(null, 'x1', x1);
  line.setAttributeNS(null, 'y1', y1);
  line.setAttributeNS(null, 'x2', x2);
  line.setAttributeNS(null, 'y2', y2);
}

export default function rect(svg, color = 'rgb(200, 200, 200)') {
  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttributeNS(null, 'style', 'stroke-width: 2; stroke: ' + color + ';');
  svg.appendChild(line);
  return line;
}
