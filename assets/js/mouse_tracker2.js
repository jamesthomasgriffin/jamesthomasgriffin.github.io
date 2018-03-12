(function doublePointDemo(){
  "use strict";
  var X, mouseState;
  var canvas, ctx, leafdiv;
  var centerX1 = 150.5, centerX2 = 250.5, centerY = 200.5;
  function initPlane(px1, px2, py) {
    X = Object.create(Coverings().DoublyPuncturedPlane);
    X.init(px1, px2, py);
    mouseState = {
      p: [0, 0],
      leaf: X.fundDomain([0,0]),
      draw: function (ctx) {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.p[0], this.p[1], 10, 0.0, 2.0 * Math.PI);
        ctx.fill();
      }
    };
  }

  function update() {
    ctx.clearRect(0,0,400,400);
    mouseState.draw(ctx);
    function drawCross(ctx, x, y, crossSize) {
      ctx.moveTo(x - crossSize, y - crossSize);
      ctx.lineTo(x + crossSize, y + crossSize);
      ctx.moveTo(x - crossSize, y + crossSize);
      ctx.lineTo(x + crossSize, y - crossSize);
    }
    ctx.beginPath()
    drawCross(ctx, centerX1, centerY, 5);
    drawCross(ctx, centerX2, centerY, 5);
    ctx.stroke();
    window.requestAnimationFrame(update);
  }

  function initCanvas() {
    canvas = document.getElementById('baseSpace2');
    ctx = canvas.getContext('2d');
    leafdiv = document.getElementById('leafdiv2');
    canvas.addEventListener('mousemove', function (ev) {
      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left,
          y = ev.clientY - rect.top;
      var newP = [x, y];
      X.update(mouseState, newP);
      leafdiv.innerHTML = "P: (" + Math.floor(x) + ", " + Math.floor(y) + "), Label: " + mouseState.leaf;
      console.log(mouseState.leaf);
    });
  }

  function setup() {
    initPlane(centerX1, centerX2, centerY);
    initCanvas();
    update();
  }
  document.addEventListener('DOMContentLoaded', setup, false);
}());
