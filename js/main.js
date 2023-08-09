//song data

const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover:"1.jpg"
    },
    {
        title: "A New Beginning",
        file: "anewbegining.mp3",
        cover:"2.jpg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover:"3.jpg"
    }
]

//Canción actual
let actualSong = null

//Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play =  document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

//Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress)//Evento que sigue el currentTime del audio a cada momento

//Escuchar clicks en los controles
play.addEventListener("click", () => audio.paused ? playSong() : pauseSong())

prev.addEventListener("click", () => prevSong())
next.addEventListener("click", () => nextSong())

//Cargar canciones y mostrar el listado
function loadSongs(){
    songList.forEach((song, index) =>{
        //Crear li
        const li = document.createElement("li")
        //Crear a
        const link = document.createElement("a")
        //Hidratar a
        link.textContent = song.title
        link.href="#"
        //Escuchar clicks
        link.addEventListener('click', () => {
            loadSong(index)
        })
        //Añadir a li
        li.appendChild(link)
        //Añadir li a ul
        songs.appendChild(li)
    })
}

//Actualizar barra de progreso de la cancion
function updateProgress(event){
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime/duration) * 100
    progress.style.width = `${percent}%`
}

//Hacerla barra de progreso clicable
function setProgress(event){
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current//current dependera de donde doy click en la barra y por ende este sera el currentTime
}

//Cargar canción seleccionada
function loadSong(songIndex){
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        console.log(actualSong)
        audio.src = `audio/${songList[songIndex].file}`
        playSong()
       changeCover(songIndex)
       changeSongTitle(songIndex) 
       
    }
}

//Actualizar controles
function updateControls(){
    if(audio.paused){
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    }else{
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

//Reproducir cancion
function playSong(){
    if(actualSong !== null){
     audio.play()
    updateControls()
    }
    
}

//Pausar cancion
function pauseSong(){
    audio.pause()
    updateControls()
}

//Cambiar clase activa(No es la solucion mas elegante ver otra posibilidad)
function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll("a")  
    if (actualSong !== null){
        links[lastIndex].classList.remove("active")    
    }

    links[newIndex].classList.add("active") 
}

//Cambiar el cover de la cancion
function changeCover(songIndex){
    cover.src = `img/${songList[songIndex].cover}`
}

//Cambiar el título de la canción
function changeSongTitle(songIndex){
    title.textContent = `${songList[songIndex].title}`
}

//Anterior cancion
function prevSong(){
    if(actualSong > 0){
        loadSong(actualSong - 1)
    }else{
        loadSong(songList.length - 1)
    }
    
}

//Siguiente cancion
function nextSong(){
    if(actualSong < songList.length - 1){
        loadSong(actualSong + 1)
    }else{
        loadSong(0)
    }
   
}

// Lanzar siguente cancion cuando se acaba la actual
audio.addEventListener("ended", nextSong)

//Go!
loadSongs()