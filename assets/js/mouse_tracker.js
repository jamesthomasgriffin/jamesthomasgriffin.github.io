(function circlesDemo(){
  "use strict";
  var X, circles, mouseState;
  var canvas, ctx, leafTargets;
  function initPlane(px, py) {
    X = Object.create(Coverings().PuncturedPlane);
    X.init(px, py, 3);
    mouseState = {
      p: [0, 0],
      leaf: X.fundDomain([0,0]),
      draw: function (ctx) {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.p[0]-5, this.p[1]-5, 10, 0.0, 2.0 * Math.PI);
        ctx.fill();
      }
    };
    window.onmousemove = function (ev) {
      var newP = [ev.clientX, ev.clientY];
      X.update(mouseState, newP);
      console.log(mouseState.leaf);
    }
    initCircles();
  }
  function initCircles() {
    circles = [];
    var epsilon = 1.0/60;
    var Circle = {
      // An object which keeps track of a circle rotating around the
      // singularity.
      init: function() {
        // Formula for a bivariate normal distribution from uniformly
        // distributed theta and r values
        var r = Math.sqrt( -2.0 * Math.log( 1 - Math.random() ) );
        var th = 2.0 * Math.PI * Math.random();
        this.p = [100 * r * Math.cos(th) + X.px, 100 * r * Math.sin(th) + X.py];
        // Insert into the covering space
        this.leaf = X.fundDomain(this.p);
        // Angular velocity
        this.angV = Math.random() - 0.5;
        // Pre-compute these so they aren't needed every frame
        this.cosAngV = Math.cos(this.angV * epsilon);
        this.sinAngV = Math.sin(this.angV * epsilon);
        this.rad = 2;
        this.bounds = [[this.rad,this.rad],
                        [-this.rad,this.rad],
                        [this.rad,-this.rad],
                        [-this.rad,-this.rad]];
      },
      increment: function () {
        X.update(this, [X.px + (this.p[0] - X.px) * this.cosAngV
                              + (this.p[1] - X.py) * this.sinAngV,
                        X.py - (this.p[0] - X.px) * this.sinAngV
                              + (this.p[1] - X.py) * this.cosAngV]);
      },
      draw: function(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.p[0]-this.rad, this.p[1]-this.rad, 2*this.rad, 0.0, 2.0 * Math.PI);
        ctx.fill();
      }
    };
    for(let i=0; i < 100; i++) {
      let circ = Object.create(Circle);
      circ.init();
      circles.push(circ);
    }
  }

  function update() {
    for(let i=0; i < circles.length; i++) {
      circles[i].increment();
    }

    drawToTargets();
    drawTargetsToCanvas();
    window.requestAnimationFrame(update);
  }

  function drawToTargets() {
    // Draw the scene once for each neighbouring element of the
    // covering graph.
    var visibleLeaves = X.visibleFrom(mouseState.leaf);
    for(let i=0; i < visibleLeaves.length; i++) {
      let currentLeaf = visibleLeaves[i],
          target = leafTargets[i],
          ctx = target.ctx;
      target.xOffset = 0;
      target.yOffset = currentLeaf % 2 == 0 ? -200 : 0;
      target.leaf = currentLeaf;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,400,200);
      ctx.setTransform(1,0,0,1,target.xOffset, target.yOffset);
      // Draw the circles in view
      for(let i=0; i < circles.length; i++) {
        let circ = circles[i];
        if(X.boundsInLeaf(circ, currentLeaf) && X.boundsInView(mouseState, circ)) {
          // Draw circle here
          circ.draw(ctx);
        }
      }
    }
  }

  function drawTargetsToCanvas() {
    // Now draw each target to the final canvas according to visibility.
    ctx.clearRect(0,0,400,400);
    for(let i=0; i < leafTargets.length; i++) {
      let target = leafTargets[i];
      ctx.setTransform(1, 0, 0, 1, target.xOffset, -target.yOffset);
      ctx.drawImage(target.canvas, 0, 0);
    }
    // Draw overlay
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    mouseState.draw(ctx);
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(X.px-5, X.py-5, 10, 0.0, 2.0 * Math.PI);
    ctx.fill();
  }

  function initDrawingTargets() {
    canvas = document.getElementById('baseSpace');
    ctx = canvas.getContext('2d');
    leafTargets = [];
    for(let i=0; i < X.valence + 1; i++) {
      let target = {
        canvas: document.createElement('canvas')
      };
      target.canvas.width = 400;
      target.canvas.height = 200;
      target.ctx = target.canvas.getContext('2d');
      leafTargets.push(target);
//      document.body.append(target.canvas);
    }
  }

  function setup() {
    initPlane(200.5, 200.5);
    initCircles();
    initDrawingTargets();
    update();
  }
  document.addEventListener('DOMContentLoaded', setup, false);
}());
