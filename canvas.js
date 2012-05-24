var canvas, ctx, tremor = 2.0;
var W = window.innerWidth;
var H = window.innerHeight;
onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.addEventListener('click', function () {
    if (tremor >= 10) {
      document.location = 'https://twitter.com/#!/uiureo/'
    }
    tremor += 2.0;
  });

  setInterval(draw, 10);
};

Array.prototype.sample = function () {
  return this[Math.floor(Math.random()*this.length)];
};

var createLines = function (amount) {
  var i, lines = [];
  for (i = 0; i < amount; i++) {
    var rgb = [null,null,null].map(function(i) { return Math.floor(Math.random()*256).toString() }),
    base = [true,false].sample();
    var line = {
      baseX: base ? 0 : W,
      baseY: base ? 0 : H,
      x0: Math.floor(W*Math.random()),
      y0: Math.floor(H*Math.random()),
      width: 40,
      speedX: 5.0*Math.random(),
      speedY: 5.0*Math.random(),
      color: 'rgb('+rgb.join(',')+')'
    };
    lines.push(line);
  }
  return lines;
};

var draw = (function () {
  var lines = createLines(40);

  var drawPolygon = function (points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(function(point) {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[0].x, points[0].y);
    ctx.closePath();
    ctx.fill();
  };

  var drawLine = function (line) {
    drawPolygon([{x:line.baseX,y:line.y0},{x:line.baseX,y:line.y0+line.width},{x:line.x0+line.width,y:line.baseY},{x:line.x0,y:line.baseY}], line.color);
  };

  var image = new Image();
  image.src = './image.jpg'

  return function() {
    // reset
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, W, H);
    lines.forEach(function(line) {
      drawLine(line);

      line.x0 += line.speedX; line.y0 += line.speedY;
      if (line.x0 <= 0 || W <= line.x0) 
        line.speedX *= -1;
      if (line.y0 <= 0 || H <= line.y0) 
        line.speedY *= -1;
    });

    ctx.drawImage(image, (W - 100)/2+Math.random()*tremor, (H - 100)/2+Math.random()*tremor, 100, 100);

  }
})();
