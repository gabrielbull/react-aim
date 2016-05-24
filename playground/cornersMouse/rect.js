export default function rect(svg, width, height, x, y) {
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttributeNS(null, 'x', x);
  rect.setAttributeNS(null, 'y', y);
  rect.setAttributeNS(null, 'width', width);
  rect.setAttributeNS(null, 'height', height);
  rect.setAttributeNS(null, 'transform', 'matrix(1 0 0 1 0 0)');
  rect.setAttributeNS(null, 'style', 'fill: transparent; stroke-width: 1; stroke: rgb(0, 0, 0); cursor: move;');
  svg.appendChild(rect);

  this.currentX = 0;
  this.currentY = 0;
  this.matrix = 0;

  var event = new Event('drag');

  this.mousemove = e => {
    var dx = e.clientX - this.currentX;
    var dy = e.clientY - this.currentY;
    this.matrix[4] += dx;
    this.matrix[5] += dy;
    var newMatrix = 'matrix(' + this.matrix.join(' ') + ')';

    rect.setAttributeNS(null, 'transform', newMatrix);

    this.currentX = e.clientX;
    this.currentY = e.clientY;
    rect.dispatchEvent(event);
  };

  rect.addEventListener('mousedown', e => {
    this.currentX = e.clientX;
    this.currentY = e.clientY;
    this.matrix = rect.getAttributeNS(null, 'transform').slice(7, -1).split(' ').map(val => parseFloat(val));

    document.addEventListener('mousemove', this.mousemove);

    rect.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.mousemove);
      rect.removeEventListener('mouseup', this.mousemove);
    });

    rect.dispatchEvent(event);
  });

  return rect;
}
