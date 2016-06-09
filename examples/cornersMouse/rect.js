export default function rect(svg, width, height, x, y, color = 'transparent') {
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttributeNS(null, 'x', x);
  rect.setAttributeNS(null, 'y', y);
  rect.setAttributeNS(null, 'width', width);
  rect.setAttributeNS(null, 'height', height);
  rect.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
  rect.setAttributeNS(null, 'style', 'fill: ' + color + '; stroke-width: 1; stroke: rgb(0, 0, 0);');
  svg.appendChild(rect);
  return rect;
}
