#version 300 es
precision highp float;
#define varying in
#define texture2D texture
#define gl_FragColor FragColor
#define numTextures PITO
out vec4 FragColor;

uniform sampler2D tMap;
uniform float uTime;
uniform vec2 uScreen;
uniform vec2 uMouse;

uniform float uPower;
uniform float uCols;
uniform float uColor;
uniform float uStart;
uniform float uKey;
uniform float uPowers[numTextures];


varying vec2 vUv;
varying vec2 vUvR;

varying vec3 vPos;
varying float vId;
varying vec3 vIndex;

//https://www.shadertoy.com/view/XsfSRr

float ripple(float uv, float time, float prog) {
        float distance = length((uv ) + time  );
        return tan(distance * (prog) ) * (-.01);

        
      }

void main() {




    // uv.y += sin(uTime*.0005) * (vId.x + 1. )*.014;
    float time = abs(sin(uTime * 0.002));
    float time2 = (sin(uTime * 0.001));
    float time3 = abs( sin(uTime * 0.001) ) ;
    float rippleUV = 0.;
    float cols = uCols;
    float startshit = 0.;
    float halfv = (vUvR.y - 1.) * 7.; 
    float halfanim = 0.;
    vec3 tex = vec3(0.);

    float difIndex = 0.;

    float sumac = 0.;
    time3 = abs( sin(uTime * 0.0008) ) ;
    time2 = (sin(uTime * 0.0008));

    float mPos = 0.;
    float mPower = 0.;

    highp int index = int(vId);

    
    if(uKey == -2.){
      
      mPower = 1. - uStart;
      mPos = (uStart - 1.)*1. ;



      startshit =  (( (halfv * .001)) * uStart);
      sumac = (ripple(vUvR.y ,mPos, cols) * ( (.4  ) * ( 1. - mPower + (1. * uPower) ) ) );
      rippleUV = (vUv.x + (startshit)) + sumac;
      tex = texture2D(tMap, vec2(rippleUV, vUv.y) ).rgb;
      
    }
    else if(uKey != -1.){
      time2 = uMouse.x * -2. ;
      time3 = .0;
      halfanim = 1.;



        // for( float i = 0.; i <= count; i+= 1.0 ){

        //       mPos = uPowers[index] * -2. + (i * .2);
        //       mPower = abs(uPowers[index] * 2.);
              
            
        // }
          mPos = uPowers[index] * -2.;
          mPower = abs(uPowers[index] * (2. - abs(time2 * .5) ));


          // NEGATIVO A LA IZQ LA DISTO
          // mPos = -.3 * -2.;
          // mPower = abs(-.3 * 2.);
          // CENTRO ES IGUAL A 0
          // mPos = 0. * -2.;
          // mPower = abs(0. * 2.);
          // POSITIVO A LA DERECHA LA DISTO
          // mPos = .3 * -2.;
          // mPower = abs(.3 * 2.);


          // if(vId == uKey){
          //   mPos = uMouse.x * -2.;
          //   mPower = abs(uMouse.x * 2.);
          // }
          // else if((vId+1.) == uKey){

          //   mPos = -1.;
          //   // time3 = .5 + abs(uMouse.x * 2.);
          //   mPower = 1.;

          // }
          // else if((vId-1.) == uKey){

          //   mPos = 1.;
          //   // time3 = .5 + abs(uMouse.x * 2.);
          //   mPower = 1.;
            
          // }
          // else{
          //   mPos = 0.;
          //   mPower = 1.;
          // }
          sumac = (ripple(vUvR.y ,mPos, cols) * ( (.2 * (1. - mPower)  ) * ( 1. - mPower  ) ) );
          //EFECTO QUE PARECE FRACTAL
          // sumac = (ripple(vUvR.y ,mPos, cols) * ( (.2 * (1. - mPower)  ) * ( .5 - mPower  ) ) );

          
          rippleUV = (vUv.x) + sumac;
          tex = texture2D(tMap, vec2(rippleUV, vUv.y) ).rgb;
      
      
    }
    else if(uKey ==  -1.){

      
          mPos = uPowers[index] * -2.;
          mPower = abs(uPowers[index] *(2. - abs(time2 * .5) ));
          sumac = (ripple(vUv.y ,mPos, cols) * ( (.2 * (1. - mPower)  ) * ( 1. - mPower  ) ) );
          rippleUV = (vUv.x) + sumac;
          tex = texture2D(tMap, vec2(rippleUV, vUv.y) ).rgb;
      // time2 = uMouse.x * -2. ;
      // rippleUV = (vUv.x) + (ripple(vUvR.y ,mPos, cols) * ( (.2 ) * ( uPower  ) ) );
      // tex = texture2D(tMap, vec2(rippleUV, vUv.y) ).rgb;
    }


    float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
    float d = fwidth(signedDist);
    float alpha = smoothstep(-d, d, signedDist);

    
    gl_FragColor.rgb = vec3(uColor);
    // gl_FragColor.r += distance(uMouse.x + .5 ,vUvR.y * .5);
    

      // gl_FragColor.r =abs(mPower);
    gl_FragColor.a = alpha * (1. - uStart * 1.9);
    if(uKey ==  -2.){
    gl_FragColor.a -= abs(sumac * 8.);
    }
    else{
    gl_FragColor.a -= abs(sumac * 8.);

    }

}