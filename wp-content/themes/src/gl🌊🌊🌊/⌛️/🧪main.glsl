precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uStart0;
uniform float uStart1;
uniform float uStart2;

uniform float uStartX;
uniform float uStartY;
uniform float uMultiX;
uniform float uMultiY;



varying vec2 vUv;
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  float prog = 0.5;
  float time = uStart1;
  // float time2 = (sin(uTime * .001) * -.51 );
  float time2 = uStart1 * 2.;
  // time *= -1.;
  prog = 0.4;
  // time = uStart0;
  // time2 = uStart1;

  // float noise = cnoise((vec2(vUv.x*.6,vUv.y) * time2) + (time * 3.6) + time)*3.;
  // float noise = cnoise(
  //   vec2(
  //   0.,
  //   ((vUv.y*.85)+.35)
  //   )
  // )*3.;

  // float noise = cnoise(
  //   vec2(
  //   vUv.x*(.6 * time2),
  //    ((vUv.x * (.1 + ( time * .5) )) + .5 - time) - (.12 * vUv.y)
  //   )
  // )*3.;


  // float noise = cnoise(
  //   vec2(
  //   vUv.x+(1. * uStartX),
  //   vUv.y+(1. * uStartY),
  //   )
  // )*3.;

  // float noise = cnoise(
  //   vec2(
  //   (vUv.x * ( -.25 )) + uStartX,
  //   vUv.y +(1. +  uStartY)
  //   )
  // )*3.;


  float noise = cnoise(
    vec2(
    (vUv.x * ( uMultiX )) + uStartX,
    (vUv.y * ( uMultiY )) + uStartY
    )
  )*3.;

  gl_FragColor.rgb = vec3(0.);
  // gl_FragColor.a = (( uStart1 ) - (noise + prog)) * ( uStart0);



  // gl_FragColor.a = uStart0 - ((noise + prog) * (1. - uStart1));
  // gl_FragColor.a = uStart0 + (noise + prog);
  


  gl_FragColor.a = mix(1., (noise + prog),uStart0);
  

  gl_FragColor.a *= uStart2; 
}