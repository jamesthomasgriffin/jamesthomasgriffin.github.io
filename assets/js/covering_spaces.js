function Coverings() {
  "use strict";

  var GenericCovering = {
    // A covering should implement fundDomain, trivial, lift, compose,
    // action and visibleFrom methods
    liftAlongPath: function(P) {
      total = this.trivial();
      for(i=0; i < P.len-1; i++) {
        total = this.compose(total, this.lift(P[i],P[i+1]));
      }
      return total;
    },
    move: function(m, a, b) {
      return this.action(m, this.lift(a, b));
    },
    moveAlongPath: function(m, P) {
      return this.action(m, this.liftAlongPath(P));
    },
    inView: function(point1, point2) {
      return this.move(point1.leaf, point1.p, point2.p) == point2.leaf;
    },
    boundsInView: function(view, bObj) {
      function addPosition(v) {
        for(let i=0; i < bObj.p.length; i++) {
          v[i] += bObj.p[i];
        }
      }
      function boundInView(bound) {
        return this.moveAlongPath(view.leaf, [view.p, bound.p, bObj.p]) == bObj.leaf;
      }
      return bObj.bounds.map(addPosition).some(boundInView.bind(this));
    },
    boundsInLeaf: function(leaf, bObj) {
      function addPosition(v) {
        for(let i=0; i < bObj.p.length; i++) {
          v[i] += bObj.p[i];
        }
      }
      function boundInLeaf(bound) {
        return this.move(bObj.m, bObj.p, addPosition(bObj.p, bound)) == leaf;
      }
      return bObj.bounds.some(boundInLeaf);
    },
    neighbouring: function(m) {
      return this.generators.map((x) => { return this.action(m, x); });
    },
    update: function(point, p) {
      point.leaf = this.move(point.leaf, point.p, p);
      point.p = p;
      return point;
    },
    updateAlongPath: function(point, path) {
      point.leaf = this.moveAlongPath(point.leaf, Array.concat([point.p], p));
      point.p = path[path.length - 1];
      return point;
    }
  };

  var PuncturedPlane = Object.create(GenericCovering);
  PuncturedPlane.init = function(x, y, m) {
    this.px = x; this.py = y;
    this.m = m;
    if (m == undefined) {
      this.modm = function (n) { return n; }
    } else {
      m = 2 * m;
      this.modm = function (n) {
        n = n % m;
        return n >= 0 ? n : n + m;
      }
    }
  };
  PuncturedPlane.fundDomain = function(a) {
    return a[1] - this.py > 0 ? 0 : 1;
  };
  PuncturedPlane.trivial = 0;
  PuncturedPlane.lift = function(a, b) {
    var pa = [a[0] - this.px, a[1] - this.py],
        pb = [b[0] - this.px, b[1] - this.py];
    if (pa[1]*pb[1] > 0) {
      return 0;
    } else {
      return pa[0]*pb[1] > pa[1]*pb[0] ? 1 : -1;
    }
  };
  PuncturedPlane.compose = function(x, y) {
    return x + y;
  };
  PuncturedPlane.action = function(m, x) {
    return this.modm(m + x);
  };
  PuncturedPlane.visibleFrom = function(m) {
    return [this.modm(m-1), this.modm(m), this.modm(m+1)];
  }
  PuncturedPlane.valence = 2;

  var DoublyPuncturedPlane = Object.create(GenericCovering);

  DoublyPuncturedPlane.init = function(x1, x2, y) {
    this.px2 = x2; this.px1 = x1; this.py = y;
    this.reduce = function(L) {
      var reducables = ['aA', 'Aa', 'Bb', 'bB', 'cC', 'Cc'];
      for (let i=0; i < reducables.length; i++) {
        var splitL = L.split(reducables[i]);
        if(splitL.length > 1) { return this.reduce(splitL.join('')); }
      }
      return L;
    };
  };
  DoublyPuncturedPlane.fundDomain = function(a) {
    return a[1] - this.py > 0 ? 'A' : '';
  };
  DoublyPuncturedPlane.trivial = {};
  DoublyPuncturedPlane.lift = function(a, b) {
    var t, x_ic;
    if (b[1] - a[1] == 0) { return ''; }
    t = (this.py - a[1]) / (b[1] - a[1]);
    if (t < 0 || t > 1) { return ''; }  // Potential problem if t = 0 or 1
    if (t == 0 || t == 1) {
      console.log("Warning: Problem with points lying on boundary.");
    }
    x_ic = a[0] + t * (b[0] - a[0]);
    if (x_ic < this.px1) {
      return b[1] < a[1] ? 'a' : 'A';
    } else if (x_ic < this.px2) {
      return b[1] < a[1] ? 'b' : 'B';
    } else {
      return b[1] < a[1] ? 'c' : 'C';
    }
  };
  DoublyPuncturedPlane.compose = function(x, y) {
    return this.reduce(x.concat(y));
  };
  DoublyPuncturedPlane.action = function(m, x) {
    return this.compose(m,x);
  };
  DoublyPuncturedPlane.visibleFrom = function(m) {
    l = m.length
    if(l==0 || m[l-1] in ['a','b','c']) {
      possibleSteps = ['A','B','C'];
    } else { possibleSteps = ['a', 'b', 'c'] }
    function incr_m_by(step) { return this.action(m, step); }
    return possibleSteps.map(incr_m_by);
  }
  DoublyPuncturedPlane.valence = 3;

  return {
    GenericCovering: GenericCovering,
    PuncturedPlane: PuncturedPlane,
    DoublyPuncturedPlane: DoublyPuncturedPlane
  };
}
