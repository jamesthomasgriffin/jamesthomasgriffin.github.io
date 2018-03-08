var testevent;
(function circlesDemo(){
  "use strict";
  var X, mouseState;
  var canvas, ctx, leafdiv;
  var centerX = 200.5, centerY = 200.5;
  function initPlane(px, py) {
    X = Object.create(Coverings().PuncturedPlane);
    X.init(px, py);
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
    var crossSize = 5;
    ctx.beginPath()
    ctx.moveTo(centerX - crossSize, centerY - crossSize);
    ctx.lineTo(centerX + crossSize, centerY + crossSize);
    ctx.moveTo(centerX - crossSize, centerY + crossSize);
    ctx.lineTo(centerX + crossSize, centerY - crossSize);
    ctx.stroke();
    window.requestAnimationFrame(update);
  }

  function initCanvas() {
    canvas = document.getElementById('baseSpace');
    ctx = canvas.getContext('2d');
    leafdiv = document.getElementById('leafdiv');
    canvas.addEventListener('mousemove', function (ev) {
      var rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left,
          y = ev.clientY - rect.top;
      var newP = [x, y];
      X.update(mouseState, newP);
      leafdiv.innerHTML = "P: (" + Math.floor(x) + ", " + Math.floor(y) + "), Label: " + mouseState.leaf;
      console.log(mouseState.leaf);
      testevent = ev;
    });
  }

  function setup() {
    initPlane(centerX, centerY);
    initCanvas();
    update();
  }
  document.addEventListener('DOMContentLoaded', setup, false);
}());
