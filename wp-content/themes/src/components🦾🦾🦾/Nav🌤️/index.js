
import './index.scss'

import WriteHover from '/atoms🧿🧿🧿/WriteHover'



class Nav {
  constructor (main) {
   
    this.main = main
    this.isOpen = 0

  }

  async create (temp) {

    document.querySelector('body').insertAdjacentHTML('afterbegin',temp)

   let el = document.querySelector('.nav')
    this.DOM = {
      el:el,
      burger:el.querySelector('.nav_burger'),
      els:el.querySelectorAll('.nav_right a'),
      city:el.querySelector('.nav_clock_p'),
      c:el.querySelector('.nav_logo'),
      h:el.querySelector('.nav_clock_h'),
      m:el.querySelector('.nav_clock_m'),
      a:el.querySelector('.nav_clock_a'),
    }


    this.DOM.el.style.opacity = 0
    
    let date = new Date()


    this.time  = performance.now()
    // let h = 5
    // let m = 9
    let h = date.getHours()
    let m = date.getMinutes()
    
    this.clockact = 0

    //LOGO

    this.main.events.anim.detail.state = 0
    this.main.events.anim.detail.el = this.DOM.c
    document.dispatchEvent(this.main.events.anim)

    //CITY

    this.main.events.anim.detail.state = 0
    this.main.events.anim.detail.el = this.DOM.city
    document.dispatchEvent(this.main.events.anim)



    // this.main.events.animcreate.detail.el = this.DOM.c
    // document.dispatchEvent(this.main.events.animcreate)
    //HOUR


    this.main.events.anim.detail.state = 0
    this.main.events.anim.detail.el = this.DOM.h
    document.dispatchEvent(this.main.events.anim)

    // this.main.events.animcreate.detail.el = this.DOM.h
    // document.dispatchEvent(this.main.events.animcreate)
    
    //MINUTE


    this.main.events.anim.detail.state = 0
    this.main.events.anim.detail.el = this.DOM.m
    document.dispatchEvent(this.main.events.anim)

    // this.main.events.animcreate.detail.el = this.DOM.m
    // document.dispatchEvent(this.main.events.animcreate)
    
    //AMPM
    this.main.events.anim.detail.state = 0
    this.main.events.anim.detail.el = this.DOM.a
    document.dispatchEvent(this.main.events.anim)


    // this.main.events.animcreate.detail.el = this.DOM.a
    // document.dispatchEvent(this.main.events.animcreate)



    
    this.searchAMPM()
    this.setTime(h,m)



    
    // this.setTime(9,5)
    this.initEvents()
  }
  setTime(hour=null,minute=null){
    let m = minute
    if(minute == null){
      m = parseInt(this.DOM.m.querySelectorAll('.char')[0].querySelector('.n').innerHTML+this.DOM.m.querySelectorAll('.char')[1].querySelector('.n').innerHTML)
      m++
      
      let mi = new Date().getMinutes()
      if(mi != m){
        m = mi
      }
    }

    let h = hour
    
    if(hour == null || m == 60){
      
      this.searchAMPM()
      
      if(m == 60 && minute==null){
        m = 0
      }
      

    }

      

      if(m < 10){
        m = '0'+m
      }
      


      // this.DOM.m.innerHTML = m
      m = m.toString()




      this.DOM.m.querySelectorAll('.char')[0].querySelector('.n').classList.add('eee1')


      this.DOM.m.querySelectorAll('.char')[0].querySelector('.n').innerHTML = m[0]
      this.DOM.m.querySelectorAll('.char')[1].querySelector('.n').innerHTML = m[1]


      if(this.clockact == 1){

        this.main.events.anim.detail.state = 1
        this.main.events.anim.detail.el = this.DOM.m
        document.dispatchEvent(this.main.events.anim)

        // this.main.events.animshow.detail.el = this.DOM.m
        // document.dispatchEvent(this.main.events.animshow)
      }
  }
  searchAMPM(h=null){

    if(h==null){
      let date = new Date()
      h = date.getHours()
    }
    
    
    
    if(h>=12){
    this.DOM.a.querySelectorAll('.char')[1].querySelector('.n').innerHTML = 'M'
      if(h > 12 ){
        h = h - 12


          this.DOM.a.querySelectorAll('.char')[0].querySelector('.n').innerHTML = 'P'


      }
    }
    else{

      this.DOM.a.querySelectorAll('.char')[0].querySelector('.n').innerHTML = 'A'

    }

    if(h < 10){
      h = '0'+h
    }

    const actualh = parseInt(this.DOM.h.querySelectorAll('.char')[0].querySelector('.n').innerHTML+this.DOM.h.querySelectorAll('.char')[1].querySelector('.n').innerHTML)


    this.DOM.h.querySelectorAll('.char')[0].querySelector('.n').innerHTML = h.toString()[0]
    this.DOM.h.querySelectorAll('.char')[1].querySelector('.n').innerHTML = h.toString()[1]



    if(h == actualh){
      return h
    }

    if(this.clockact == 1){


      this.main.events.anim.detail.state = 1
      this.main.events.anim.detail.el = this.DOM.h
      document.dispatchEvent(this.main.events.anim)
      // this.main.events.animshow.detail.el = this.DOM.h
      // document.dispatchEvent(this.main.events.animshow)
    }

    return h
  }
  async openMenu(){
    

    document.documentElement.classList.add('act-menu')
    document.dispatchEvent(this.main.events.openmenu)
  }
  async closeMenu(){
    document.documentElement.classList.remove('act-menu')
    document.dispatchEvent(this.main.events.closemenu)
    
  }

  async show(){

    this.DOM.el.style.opacity = 1


    this.main.events.anim.detail.state = 1
    this.main.events.anim.detail.el = this.DOM.c
    document.dispatchEvent(this.main.events.anim)

    // this.main.events.animshow.detail.el = this.DOM.c
    // document.dispatchEvent(this.main.events.animshow)


    this.DOM.c.onmouseenter = () =>{


      this.main.events.anim.detail.state = 1
      this.main.events.anim.detail.el = this.DOM.c
      document.dispatchEvent(this.main.events.anim)

      // this.main.events.animshow.detail.el = this.DOM.c
      // document.dispatchEvent(this.main.events.animshow)

    }
    // await this.timeout(820)

    this.DOM.el.querySelector('.nav_clock_s').style.opacity = 1


    this.main.events.anim.detail.state = 1
    this.main.events.anim.detail.el = this.DOM.city
    document.dispatchEvent(this.main.events.anim)


    this.main.events.anim.detail.state = 1
    this.main.events.anim.detail.el = this.DOM.h
    document.dispatchEvent(this.main.events.anim)


    this.main.events.anim.detail.state = 1
    this.main.events.anim.detail.el = this.DOM.m
    document.dispatchEvent(this.main.events.anim)


    this.main.events.anim.detail.state = 1
    this.main.events.anim.detail.el = this.DOM.a
    document.dispatchEvent(this.main.events.anim)


    // this.main.events.animshow.detail.el = this.DOM.h
    // document.dispatchEvent(this.main.events.animshow)

    // this.main.events.animshow.detail.el = this.DOM.m
    // document.dispatchEvent(this.main.events.animshow)


    // this.main.events.animshow.detail.el = this.DOM.a
    // document.dispatchEvent(this.main.events.animshow)

    // await this.timeout(800)

    for(let [i,a] of this.DOM.els.entries()){

      this.main.events.anim.detail.el = a
      this.main.events.anim.detail.state = 0
      document.dispatchEvent(this.main.events.anim)
      this.main.events.anim.detail.state = 1
      document.dispatchEvent(this.main.events.anim)

      

      // this.main.events.animcreate.detail.el = a
      // document.dispatchEvent(this.main.events.animcreate)
      // this.main.events.animshow.detail.el = a
      // document.dispatchEvent(this.main.events.animshow)

      
      a.onmouseenter = () =>{


        this.main.events.anim.detail.el = a
        this.main.events.anim.detail.state = 1
        document.dispatchEvent(this.main.events.anim)

        // this.main.events.animshow.detail.el = a
        // document.dispatchEvent(this.main.events.animshow)

      }
    
      
    }






    this.clockact = 1

  }
  async hide(){
    
    this.DOM.el.style.opacity = 0
  }

  initEvents(){
    if(this.DOM.burger){
      this.DOM.burger.onclick = () =>{
        if(this.isOpen == 1){
          this.closeMenu()
          this.isOpen = 0
        }
        else{
          this.openMenu()
          this.isOpen = 1
        }
      }
    }
    if(this.DOM.els){
      this.els = []
      // for(let [i,a] of this.DOM.els.entries()){
      //   this.els.push(new WriteHover(a))
      // }
    }
  }
  

  onResize(){
  }
  update(time){
    // console.log(performance.now())
    // console.log(time)
    // 60000
    if(this.time + 60010 <= time){
      this.time = time

      this.setTime()
    }
  }


  timeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}



export default Nav