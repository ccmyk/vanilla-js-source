export function timeout(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function loadRestApi(url,id='',temp=''){
  
  if(import.meta.env.DEV == true){

    console.log(url+id+'?device='+this.main.device+'&webp='+this.main.webp+'&template='+temp)
  }

  let formData = new FormData()
  let info = {
    device:this.main.device,
    webp:this.main.webp,
    webgl:this.main.webgl
    
  }

  if(temp!=''){
    info.template=temp
  }

  formData.set("form", JSON.stringify(info))


  if(document.body.dataset.nonce){

    

    const response = await fetch(url+id,{
      method: "POST",
      body: formData,
      headers: {
        'X-WP-Nonce': document.body.dataset.nonce,
        // 'Content-Type': 'application/json',
      }
    })

    const data = await response.json()


    return data
  }
  else{
    url +=id
    url +='?device='+this.main.device
    url +='&webp='+this.main.webp
    url +='&webgl='+this.main.webgl
    if(temp!=''){
     
      url +='&template='+temp 
    }
    const response = await fetch(url,{
      method: "GET",
     
    })
    const data = await response.json()
    if(import.meta.env.DEV == true && data.csskfields){
      
    }
    return data
  }

}
//Images
export async function loadImages(){
  this.DOM.images = document.querySelectorAll('img')
  const imageswait = document.querySelectorAll('img.Wait')
  const imagesnowait = document.querySelectorAll('img:not(.Wait)')
  let promiseswait = []
  for(let path of imageswait){
    
    promiseswait.push(this.loadImage(path))
    

  }

  await Promise.all(promiseswait)
  this.scaleLoads(imagesnowait)
}


export async function scaleLoads(elswait){

  for(let path of elswait){

    if(path.tagName=='IMG'){
      if(!path.dataset.lazy){
        await this.loadImage(path)

      }
    }
    else if(path.tagName=='VIDEO'){
      if(!path.dataset.lazy){
        await this.loadVideo(path)
        path.classList.add('Ldd')
      }
    }
  }
  
}


export async function newImages(){
  const newimages = document.querySelectorAll('img')
  let images1 = Array.prototype.slice.call(newimages)
  let images2 = Array.prototype.slice.call(this.DOM.images)
  // // console.log(array1)
  // // console.log(array2)
  let imagesfiltered = images1.filter(val => !images2.includes(val))
  let promises = []
  for(let path of imagesfiltered){
    if(path.classList.contains('Wait')){
      promises.push(this.loadImage(path))

    }
    else{
      this.loadImage(path,1)
    }

  }

  await Promise.all(promises)
  this.DOM.images = this.DOM.el.querySelectorAll('img')
}


export async function loadImage(elem,nowait = null) {
  
    return new Promise((resolve, reject) => {
      
      if(elem.getAttribute('src')){
        resolve(elem)
        return false
      }
      let img = new Image()
      let url = ''
      if(elem.dataset.src){
        
        url = elem.dataset.src
      }
     


      
      let gif=0
      if(/\.(gif)$/.test(url)){
        gif=1
      }

      elem.onload = () => {
        elem.classList.add('Ldd')
        delete elem.dataset.src
        resolve(elem)
      }

      elem.onerror = () => {
        resolve(elem)
      }

      img.onload = () =>{
        elem.src = url
      }

      img.onerror = () =>{
        elem.src = url
        resolve(elem)
      }

      img.src = url
      if(gif==1){
        elem.src = url
        elem.classList.add('Ldd')
      }
      
      
    })


}

export async function loadVideos(){
  this.DOM.videos = this.DOM.el.querySelectorAll('video')
  const videoswait = this.DOM.el.querySelectorAll('video.Wait')
  const videosnowait = this.DOM.el.querySelectorAll('video:not(.Wait)')
  
  let promiseswait = []
  for(let path of videoswait){
   
    promiseswait.push(this.loadVideo(path))

  }
  await Promise.all(promiseswait)
  this.scaleLoads(videosnowait)
}


export async function newVideos(){
  const newvideos = this.DOM.el.querySelectorAll('video')
  let videos1 = Array.prototype.slice.call(newvideos)
  let videos2 = Array.prototype.slice.call(this.DOM.videos)
  // // console.log(array1)
  // // console.log(array2)
  let videosfiltered = videos1.filter(val => !videos2.includes(val))
  let promises = []

  for(let path of videosfiltered){
    if(path.classList.contains('Wait')){
      promises.push(this.loadVideo(path))

    }
    else{
      this.loadVideo(path,1)
    }

  }
  await Promise.all(promises)
  this.DOM.videos = this.DOM.el.querySelectorAll('video')
}


function cleanVid(elem){
  elem.oncanplay = null
  elem.onplay = null
  elem.currentTime=0

  let isPlaying = elem.currentTime > 0 && !elem.paused && !elem.ended 
  && elem.readyState > elem.HAVE_CURRENT_DATA


  if(!isPlaying && !elem.dataset.auto){
    elem.pause()
  }
}
export async function loadVideo(elem, nowait = false) {
  // Add preload="metadata" to video tag and then listen to loadedmetadata event. It works in IOS Safari as well


  return new Promise((resolve, reject) => {
    if(elem.dataset.loop){
      elem.loop = false
    }
    else{
      elem.loop = true
    }
    elem.muted = true
    elem.autoplay = true
    elem.setAttribute('webkit-playsinline', 'webkit-playsinline')
    elem.setAttribute('playsinline', 'playsinline')
    elem.onplay = () => {

      elem.isPlaying = true
      
    }
    
    elem.oncanplay = () => {
      if (elem.isPlaying) {
        elem.classList.add('Ldd')
        cleanVid(elem)
        resolve(elem)
      }
    }
    if(elem.dataset.opac){
      if(this.main.webm==true){
        elem.src = elem.dataset.src+'.webm'
      }
      else{
        elem.src = elem.dataset.src+'.mp4'

      }
    }
    else{
      elem.src = elem.dataset.src

    }
    elem.onerror = () =>{
      resolve(elem)
    }
    
    elem.play()
    
  })

}