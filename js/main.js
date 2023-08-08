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

//Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")


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
        link.addEventListener('click', () => loadSong(index))
        //Añadir a li
        li.appendChild(link)
        //Añadir li a ul
        songs.appendChild(li)
    })
}

//Cargar canción seleccionada
function loadSong(songIndex){
    audio.src = `audio/${songList[songIndex].file}`
    audio.play()
   changeCover(songIndex)
   changeSongTitle(songIndex)
   
}

//Cambiar el cover de la cancion
function changeCover(songIndex){
    cover.src = `img/${songList[songIndex].cover}`
}

//Cambiar el título de la canción
function changeSongTitle(songIndex){
    title.textContent = `${songList[songIndex].title}`
}

//Go!
loadSongs()