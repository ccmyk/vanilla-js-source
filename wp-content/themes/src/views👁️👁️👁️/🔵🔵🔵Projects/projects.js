import Page from '/js🧠🧠🧠/page👁️/pagemain.js'

//COMPS
import Intro from './0Intro'



class Home extends Page {
  constructor (main) {
    super(main)
  }

  async create(content,main,temp=undefined) {
    super.create(content,main)
    if(temp!=undefined){

      document.querySelector('#content').insertAdjacentHTML('afterbegin',temp)
    }
    else{
      let data = await this.loadRestApi(this.main.base+'/wp-json/wp/v2/pages/',content.dataset.id,content.dataset.template)
      
      
      document.querySelector('#content').insertAdjacentHTML('afterbegin',data.csskfields.main)
    }
    this.el = document.querySelector('main')
    

    this.DOM = {
      el:this.el
    }

    if(this.main.webgl == 0){
      await this.loadImages()
      await this.loadVideos()
    }
    


    await this.createComps()
    await this.createIos()
    

    await this.getReady()
  }
  iOpage(animobj){
    if(animobj.el.classList.contains('iO-scroll')){
      animobj.class = new Scroll(animobj,this.main.device) 
      

    }

    
    return animobj
  }

  
  
  async createComps(){
   


    await super.createComps()
    if(this.DOM.el.querySelector('.projects_intro')){
      this.components.intro = new Intro(this.DOM.el.querySelector('.projects_intro'),this.main.device)
    
    }
    this.components.accordion = this.DOM.el.querySelector('.toAc')
    this.components.list = this.DOM.el.querySelector('.toLs')



    this.components.list.onclick = () =>{
      this.components.accordion.classList.remove('act')
      
      //Esto mejor al final, que le dé drama y te dé la sensación de 
      //que se está cargando

      this.main.events.anim.detail.state = 1
      this.main.events.anim.detail.style = 1
      document.dispatchEvent(this.main.events.anim)
      this.main.events.anim.detail.style = 0
      
      this.components.list.classList.add('act')
    }
    

    this.components.accordion.onclick = () =>{
      this.components.list.classList.remove('act')
      

      this.main.events.anim.detail.state = 0
      this.main.events.anim.detail.style = 1
      document.dispatchEvent(this.main.events.anim)
      this.main.events.anim.detail.style = 0
      
      this.components.accordion.classList.add('act')
    }
  }

  async start(val = 0){

    this.isVisible = 1
    this.callIos()
    let result = await this.animIntro(val)
    return result

}
  async animIntro(val){
    // if(this.components.intro){
    //   this.components.intro.start()
    // }

    this.components.accordion.classList.add('act')
    document.querySelector('.nav_blur').classList.add('up')
    if(this.DOM.el.querySelector('.fCanvas')){
      this.DOM.el.querySelector('.fCanvas').classList.remove('fCanvas')

      await window.waiter(1100)
    }
    return val
   
  }

  async animOut(btn,lenis){
    let t = ''
    let n = ''
    let time = 1200
    const anim = gsap.timeline({paused:true})
    if(btn == null){
        super.animOut()
        document.querySelector('.nav_blur').classList.remove('up')
        return true
  
    }
    else if(btn.dataset.ids){
      if(this.main.device < 2){
      
        if(btn.classList.contains('single')){
          btn = this.DOM.el.querySelector('.cnt_el[data-ids="'+btn.dataset.ids+'"]')
          n = btn.querySelector('.nfo_n')
          t = btn.querySelector('.nfo_t')
          anim
          .to(n,{x:+0+'rem',duration:.8,ease:'power2.inOut'},.7)
          .to(t,{x:+34.4+'rem',duration:.4,ease:'power2.inOut'},.6)
          time = 1400
        }
        else if(btn.classList.contains('cnt_el_sld')){
          
          btn = this.DOM.el.querySelector('.cnt_el[data-ids="'+btn.dataset.ids+'"]')
          n = btn.querySelector('.nfo_n')
          t = btn.querySelector('.nfo_t')

          if(this.components.accordion.classList.contains('act')){

            anim
            .to(t,{x:+34.4+'rem',duration:.6,ease:'power2.inOut'},.2)
            time = 1000
          }
          else{
            anim
            .to(n,{x:+0+'rem',duration:1,ease:'power2.inOut'},.2)
            .to(t,{x:+34.4+'rem',duration:.8,ease:'power2.inOut'},.2)
          }
        }
        else{
          n = btn.querySelector('.nfo_n')
          t = btn.querySelector('.nfo_t')


          anim
          .to(n,{x:+0+'rem',duration:1,ease:'power2.inOut'},.2)
          .to(t,{x:+34.4+'rem',duration:.8,ease:'power2.inOut'},.2)
        }

      }
      else{
        if(!btn.classList.contains('cnt_el_sld')){
          
          btn = btn.parentNode.parentNode.parentNode
        }
        else{
          btn = btn.parentNode
        }


        n = btn.querySelector('.nfo_n')
        t = btn.querySelector('.nfo_t')
      }

      btn.classList.add('noOut')


      super.animOut()


      // console.log(window.getComputedStyle(document.querySelector('.Size')).paddingTop)

      lenis.scrollTo(btn,{force:true,offset:document.querySelector('.Size').clientHeight*-1,duration:.9})
      
      anim.play()

      await window.waiter(time)
      // await gsap.to(this.DOM.el,{opacity:0})



      document.querySelector('.nav_blur').classList.remove('up')
      const arr = [n,t]
      return arr
    }
    else{
      super.animOut()
      return true

    }
    
  }

}




export default Home