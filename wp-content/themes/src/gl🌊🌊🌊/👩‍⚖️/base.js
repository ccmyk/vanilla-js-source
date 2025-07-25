
import {
  check,
  start,
  stop,
  updateX,
  updateY,
  updateAnim

} from './position.js'

import {  Vec2 } from 'ogl'


class About {
  constructor (obj) {
    this.name = 'About'
    this.el = obj.el
    this.pos = obj.pos
    this.renderer = obj.renderer
    this.mesh = obj.mesh
    this.post = obj.post
    this.text = obj.text
    this.canvas = obj.canvas

    this.touch = obj.touch

    this.cnt = obj.el.parentNode.querySelector('.cCover')
    this.camera = obj.cam
    this.scene = obj.scene


    this.active = -1
    this.isready = 0

    this.ctr = {
      actual:0,
      current:0,
      limit:0,
      start:0,
      prog:0,
      progt:0,
      stop:0
    }
    this.animctr = gsap.timeline({paused:true})
    // .fromTo(this.post.passes[0].program.uniforms.uTime,{value:0},{value:2,duration:.3,immediateRender:false,ease:'power2.inOut',
    
    // },0)
    // .fromTo(this.post.passes[0].program.uniforms.uTime,{value:2},{value:0,duration:.3,immediateRender:false,ease:'power2.inOut',
    
    // },.7)
    // .fromTo(this.post.passes[0].program.uniforms.uStart,{value:.39},{value:.8,duration:1,immediateRender:false,ease:'power2.inOut',
    
    
    // },0)
    this.change = 0
    this.stopt = 0
    //MOUSE

    this.norm = 0
    this.end = 0
    this.lerp = .6

    this.animmouse = gsap.timeline({paused:true})
    // .fromTo(this.post.passes[0].program.uniforms.uMouseT,{value:0},{value:1,duration:.1,immediateRender:false,ease:'power2.inOut',
    
    // },.05)
    // .fromTo(this.post.passes[0].program.uniforms.uMouseT,{value:1},{value:0,duration:.1,immediateRender:false,ease:'power2.inOut',
    
    // },.95)
    .fromTo(this.post.passes[0].program.uniforms.uMouse,{value:-1},{value:1.2,duration:1,immediateRender:false,ease:'none',
    
    
    },0)
    this.animmouse.progress(0)

    this.initEvents()



  }


  update(time,speed,pos){
    if(!this.renderer){
      return false
      
    }
    this.end = lerp(this.end,this.norm,this.lerp)
    // this.end = parseFloat(this.end).toFixed(3)
    this.animmouse.progress( this.end )

    // this.calcChars()

    // console.log(this.positioncur)
    // console.log(this.positiontar)
    
    // if(this.mesh.program.uniforms.uKey.value > -1){

    //   this.mesh.program.uniforms.uKey.value = -1
    // }    

    // if(speed!= 0){
    //   this.updateY(pos)

    // }

    // this.mesh.scale.x = this.viewport[0] * (this.bound[2] )/ this.screen[0]
    // this.mesh.scale.y = this.viewport[1] * this.bound[3] / this.screen[1]    
    // this.post.passes[0].program.uniforms.uTime.value = time

    
    // this.mesh.scale.x = 12
    // this.mesh.scale.y =    


    if(this.ctr.actual != pos){
      this.ctr.actual = pos
      this.updateY(pos)

    }
    if(this.ctr.stop != 1){
      this.updateAnim()

    }
    if(this.stopt == 0){
    
      this.post.render({scene:this.mesh})
    }

    
  }
  initEvents(){
   
    this.tt = this.el.parentNode.querySelector('.Oiel')
    new window.SplitType(this.tt, { types: 'chars,words' })

    this.inFn = (e) =>{

      this.stopt = 0
      this.lerp = .02

    }
    

    this.mvFn = (e) =>{
      
      if(e.touches){
        this.norm = e.touches[0] ? (e.touches[0].pageX - this.bound[0]) : 0
        this.norm=this.norm/this.bound[3]
      }
      else{
        this.norm = e.layerY/this.bound[3]

      }
      this.norm = clamp(0,1,this.norm)
      this.norm = parseFloat(this.norm).toFixed(3)

    }

    this.lvFn = (e) =>{
      this.lerp = .01

      if(e.touches){
        this.norm = e.touches[0] ? (e.touches[0].pageX - this.bound[0]) : 0
        this.norm=this.norm/this.bound[3]
      }
      else{
        this.norm = e.layerY/this.bound[3]

      }


      this.norm = parseFloat(this.norm).toFixed(3)

    }
    


    // if(this.touch == 0){
    //   this.tt.onmouseenter = (e) => this.inFn(e)
    //   this.tt.onmousemove = (e) => this.mvFn(e)
    //   this.tt.onmouseleave = (e) => this.lvFn(e)

    // }
    // else{
    //   this.tt.ontouchstart = (e) => this.inFn(e)
    //   this.tt.ontouchmove = (e) => this.mvFn(e)
    //   this.tt.ontouchend = (e) => this.lvFn(e)
    // } 


    // this.tt.onmouseenter = (e) =>{
    //   this.stopt = 0
     
    //   this.lerp = .02

    // }
    // this.tt.onmousemove = (e) =>{
    //   this.norm = e.layerY/this.bound[3]
    //   this.norm = clamp(0,1,this.norm)
    //   this.norm = parseFloat(this.norm).toFixed(3)
    // }

    // this.tt.onmouseleave = (e) =>{
    //   this.lerp = .01
    //   this.norm = e.layerY/this.bound[3]
    //   this.norm = parseFloat(this.norm).toFixed(3)
    // }

  }



  onResize(viewport,screen){
    let bound = this.cnt.getBoundingClientRect()
    this.bound = [bound.x,bound.y,bound.width,bound.height]

    this.screen = [bound.width,bound.height]

    let calc = this.screen[1]*.5
    let fix =  this.screen[1]*.3
    

    this.ctr.start =  parseInt((bound.y - screen.h + window.scrollY + calc ))
    this.ctr.limit = parseInt((this.el.clientHeight + calc  ))
    
    
    this.renderer.setSize(bound.width,bound.height)
    // this.aspect = 4
    this.camera.perspective({
      aspect: this.renderer.gl.canvas.clientWidth / this.renderer.gl.canvas.clientHeight
    })
    this.camera.fov = 45
    this.camera.position.set(0,0,7)

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    
    this.viewport = [width,height]

    // this.renderer.setSize(window.innerWidth,window.innerHeight)
    

    this.renderer.render({scene:this.scene,camera:this.camera})
  }

  removeEvents(){
    this.active = -2
    gsap.timeline({
        onUpdate:()=>{

          this.post.render({scene:this.mesh})
        },
        onComplete:()=>{
          this.renderer.gl.getExtension('WEBGL_lose_context').loseContext()
          this.canvas.remove()

        }
      }
    )
    .to(this.post.passes[0].program.uniforms.uStart,
      {
       value:-1.,
       duration:1,
       ease:'power2.inOut'
      } 
     ,0)
     .to(this.canvas,{
      webkitFilter:'blur('+6+'px)',filter:'blur('+6+'px)',
      duration:1,
      ease:'power2.inOut'
      } 
    ,0)

    .to(this.canvas,{
      opacity:0,
      duration:.6,
    ease:'power2.inOut'
    } 
    ,.4)
  }
}



About.prototype.check = check
About.prototype.start = start
About.prototype.stop = stop
About.prototype.updateX = updateX
About.prototype.updateY = updateY
About.prototype.updateAnim = updateAnim


export default About