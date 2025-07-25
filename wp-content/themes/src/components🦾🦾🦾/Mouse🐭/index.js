'use strict';



export default class {
  constructor(main){

    this.main = main
    this.animev = main.events.anim
    
    
    this.position = [
      window.innerWidth / 2,
       window.innerHeight / 2
    ]

    // this.current = {
    //   x: window.innerWidth / 2,
    //   y: window.innerHeight / 2
    // }
    this.active = 0
    this.speed = 0

    
  }
  async create () {
    
    this.el = document.createElement('div')
    this.el.className = 'mouse'



    // this.ball = document.createElement('div')
    // this.ball.className = 'mouse_ball'
    

    // this.element.appendChild(this.ball)

    const pH = document.querySelector('.pHide')
    pH.onmouseenter = () =>{
      
    if(this.chd){
        gsap.to(this.chd,{width:0,duration:.2,onComplete:()=>{
          
          if(this.chd){
            this.chd.remove()
            delete this.chd
          }
        }})
      }
    }

    document.body.appendChild(this.el)
    this.initEvents()
  
  }
  clean() {
    if(this.chd){
      gsap.to(this.chd,{width:0,duration:.2,onComplete:()=>{
        
          this.chd.remove()
          delete this.chd
      }})
  }
  }
  update () {
    if(this.active==0){
      return false
    }
    let targetX = this.position[0]
    let targetY = this.position[1]
    // this.current.x = lerp(this.current.x, targetX, .08)
    // this.current.y = lerp(this.current.y, targetY, .08)
    
    // gsap.set(this.element,  {
    //   x:this.current.x,
    //   y:this.current.y
    // })


    this.lightX((targetX ))
    this.lightY((targetY ))



  }


  async start(){
    // await gsap.set(this.element,  {
    //   x:this.main.screen.w*.5,
    //   y:this.main.screen.h*.5
    // })
    // this.active = 1
  }
  

  initEvents() {
    window.addEventListener('mousedown',()=>{
      document.documentElement.classList.add('mouse-down')
    })
    window.addEventListener('mouseup',()=>{
      document.documentElement.classList.remove('mouse-down')
    })

    this.lightX = gsap.quickTo(document.querySelector('.mouse'), "x", {duration: .05, ease: "none"})
    this.lightY = gsap.quickTo(document.querySelector('.mouse'), "y", {duration: .05, ease: "none"})

  


    this.followIn = async (el,ev) =>{
      this.active = 1
      if(this.chd){
        await window.waiter(300)

      }
      else{
        await window.waiter(6)

      }
      if(this.chd){
        this.chd.remove()
        delete this.chd
      }

      if(this.active == 0) return false
      this.chd = document.createElement('div')
      let aW = document.createElement('div')
      this.chd.classList.add(['mouse_el'])
      aW.classList.add('Awrite','Awrite-inv','Ms')
      if(el.dataset.w){

        aW.classList.add('Awrite-w')
      }
      aW.classList.add()
      aW.innerHTML = el.dataset.tt
      this.animev.detail.state = 0
      this.animev.detail.el = aW
      document.dispatchEvent(this.animev)

      
      this.chd.appendChild(aW)
      this.el.appendChild(this.chd)
    
      
      this.animev.detail.state = 1
      document.dispatchEvent(this.animev)

    }

    this.followOut = (el,ev) =>{
      this.active = 0
      if(!this.chd){
        return false
      }
      gsap.to(this.chd,{width:0,duration:.2,onComplete:()=>{
        if(this.chd){
          this.chd.remove()
          delete this.chd
        }
      }})
    }

  }










  getRelPos(x,y){
    let posx = this.followOb.bound.width/2
    let posy = this.followOb.bound.height/2
    
    posx -= x
    posy -= y

    posx = (posx*this.followOb.max)/this.followOb.bound.width
    posy = (posy*this.followOb.max)/this.followOb.bound.height
    let ret = [posx,posy]

    return ret
  }

  reset(){
    document.documentElement.classList.remove("mouse-follow")
    this.cleanEvs()
    
    document.body.onmousemove = (e) =>{
      if(this.active==0){
        
        return false
      }
        this.position[0] = e.clientX
        this.position[1] = e.clientY
      

    }
    this.mWrite = document.querySelectorAll('.MW')
    if(this.mWrite){
      for(let el of this.mWrite ){
        if(!el.classList.contains('evt')){
          el.addEventListener('mouseenter',(e)=>this.followIn(el,e))


          el.addEventListener('mouseleave',(e)=>this.followOut(el,e))

          el.classList.add('evt')
        }
      }


    }



    
  }



  cleanEvs(){
  //   if(this.mouseFollow){
  //     for(let el of this.mouseFollow ){
  //       if(!el){
  //         el.removeEventListener('mouseenter',(e)=>this.mouseFollowIn(e,el))
  //         el.removeEventListener('mousemove',(e)=>this.mouseFollowMove(e,el))
  //         el.removeEventListener('mouseleave',()=>this.mouseFollowOut(el))
  //       }
  //     }
  //   }
  }


}
