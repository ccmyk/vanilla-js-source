
import { timeout } from '/js🧠🧠🧠/defaults/math🧮.js'
import './index.scss'



class Loader {
  constructor (main,temp,device) {
    
    this.main = main
    this.counter = 0
    this.index = 0
    this.temp = {init:temp,pop:temp}
    this.device = device
    
  }
  async create(){
    document.querySelector('body').insertAdjacentHTML('afterbegin',this.temp.init)
    
    this.DOM = {
      el: document.documentElement.querySelector('.loader'),
      
    }


    this.DOM.bg = this.DOM.el.querySelector('.loader_bg')
    this.DOM.cnt = this.DOM.el.querySelector('.loader_cnt')
    this.DOM.n = this.DOM.el.querySelector('.loader_tp')

    this.createAnim()
  }
  
  createAnim(){
    // this.anim = new Interpol({
    //   paused:true,
    //   duration:1200,
    //   props: {
    //     x: [-100, 0, "%"],
    //     opacity: [1, 0],
    //   },
    //   onUpdate: ({ x, opacity }) => {
    //     this.DOM.el.style.opacity = opacity
    //   },
    
    // })

    this.obj = {
      num:0
    }
    this.anim = gsap.timeline({paused:true})
    .fromTo(this.obj,{num:0},{num:42,ease:'none',duration:2,
    onUpdate:()=>{

      
      let num = this.obj.num.toFixed(0)
      this.calcNum(num)
    }},0)
    .to(this.obj,{num:90,ease:'power2.inOut',duration:8,
    onUpdate:()=>{

      
      let num = this.obj.num.toFixed(0)
      this.calcNum(num)
    }},2.2)


    let aw = this.DOM.el.querySelectorAll('.Awrite')

    this.main.events.anim.detail.state = 0
    this.main.events.anim.detail.el = aw[0]
    document.dispatchEvent(this.main.events.anim)

    this.main.events.anim.detail.state = 0
    this.main.events.anim.detail.el = aw[1]
    document.dispatchEvent(this.main.events.anim)
   
  }
  
  calcNum(num){
      if(num < 10){
        num = '00'+num
      }
      else if(num < 100){
        num = '0'+num
      }
      
      this.DOM.n.innerHTML = num
  }

  async hide(){

  }
  async show(){
  }
  async start () {

    let aw = this.DOM.el.querySelectorAll('.Awrite')

    
    this.main.events.anim.detail.state = 1
    this.main.events.anim.detail.el = aw[0]
    document.dispatchEvent(this.main.events.anim)

    this.main.events.anim.detail.state = 1
    this.main.events.anim.detail.el = aw[1]
    document.dispatchEvent(this.main.events.anim)
    this.anim.play()
  }

  async showPop(){

    if(this.device > 1){
      
    }
  }

  async hidePop(){
    if(this.device > 1){
      this.DOM.el.remove()
    }
  }

  async hideIntro(template = ''){
    this.anim.pause()

    gsap
    .to(this.obj,{num:100,ease:'power2.inOut',duration:.49,
    onUpdate:()=>{

      
      let num = this.obj.num.toFixed(0)
      this.calcNum(num)
    
    }
    })
    // this.anim.seek(1)
    // gsap.to(this.DOM.cnt,{opacity:0,duration:.3,ease:'power2.inOut',
    //   onComplete:()=>{
      
    //   }
    // })
    gsap.to(this.DOM.el,{opacity:0,duration:.5,delay:.2,ease:'power2.inOut',
      onComplete:()=>{
        this.DOM.el.remove()
      
      }
    })


    // gsap.fromTo(document.querySelector('.mousebg_el'),{scale:.6,yoyo:true,duration:.6,ease:Power2.easeInOut})
    
    // await gsap.to(this.DOM.el,{opacity:0,duration:.6,ease:Power2.easeInOut})
   
  }

}

export default Loader
