interface Dictionary<T> {
  [index: string]: T;
}

class CubicBezier {
  
  static easings: Dictionary<CubicBezier> = {};
  name: string;
  
  cx: number = 3.0 * this.p1x;
  cy: number = 3.0 * this.p1y;

  bx: number = 3.0 * (this.p2x - this.p1x) - this.cx;
  by: number = 3.0 * (this.p2y - this.p1y) - this.cy;

  ax: number = 1.0 - this.cx - this.bx;    
  ay: number = 1.0 - this.cy - this.by;
  
  constructor(
    public p1x: number = 0, 
    public p1y: number = 0, 
    public p2x: number = 1, 
    public p2y: number = 1
  ) {    
    
    this.ease = this.ease.bind(this);
  }

  static create(name: string, p1x: number = 0, p1y: number = 0, p2x: number = 1, p2y: number = 1): Function {
    var easing = new CubicBezier(p1x, p1y, p2x, p2y);
    if (typeof name === "string") CubicBezier.easings[name] = easing;
    return easing.ease;
  }

  static config(p1x: number = 0, p1y: number = 0, p2x: number = 1, p2y: number = 1): Function {
    return new CubicBezier(p1x, p1y, p2x, p2y).ease;
  }

  static get(name: string): Function {
    return CubicBezier.easings[name].ease;
  }
  
  getEpsilon(duration: number = 400): number {
    return 1 / (200 * duration);
  }

  ease(time: number, start: number, change: number, duration: number): number {
    return this.solve(time, this.getEpsilon(duration));
  }

  solve(x: number, epsilon: number): number {
    return this.sampleCurveY(this.solveCurveX(x, epsilon));
  }

  sampleCurveX(t: number): number {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  }

  sampleCurveY(t: number): number {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  }

  sampleDerivX(t: number): number {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  }

  solveCurveX(x: number, epsilon: number): number {
    var t0: number; 
    var t1: number;
    var t2: number;
    var x2: number;
    var d2: number;

    for (var i = 0, t2 = x; i < 8; i++) {
      x2 = this.sampleCurveX(t2) - x;
      
      if (Math.abs (x2) < epsilon) return t2;
      d2 = this.sampleDerivX(t2);
      
      if (Math.abs(d2) < epsilon) break;
      t2 = t2 - x2 / d2;
    }

    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;

      t2 = (t1 - t0) * 0.5 + t0;
    }

    return t2;
  }
}