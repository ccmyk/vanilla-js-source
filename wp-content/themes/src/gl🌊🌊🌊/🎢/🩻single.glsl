
attribute vec2 uv;
attribute vec2 position;


uniform sampler2D tMap;
uniform sampler2D tMap2;
uniform vec2 uTextureSize;
uniform vec2 uTextureSize2;
uniform vec2 uCover;
uniform float uChange;
uniform float uStart;
uniform float uEnd;
uniform float uPos;


varying vec2 vUv;
varying vec2 vUv1;
varying vec2 vUv2;

vec2 resizeUvCover(vec2 uv, vec2 size, vec2 resolution) {
    vec2 ratio = vec2(
        min((resolution.x / resolution.y) / (size.x / size.y), 1.0),
        min((resolution.y / resolution.x) / (size.y / size.x), 1.0)
    );

    return vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
}
void main() {

//  + ((1.2 -  uStart) * 2.4)
  vUv = uv;
  vUv1 = resizeUvCover(vec2(uv.x,uv.y), vec2(uTextureSize.x,uTextureSize.y), vec2(uCover.x ,uCover.y));
  vUv2 = resizeUvCover(vec2(uv.x,uv.y), vec2(uTextureSize2.x * (1. - uEnd),uTextureSize2.y), vec2(uCover.x ,uCover.y));

  
  gl_Position = vec4(position, 0, 1);
}