const playlistSongs = document.querySelectorAll(".playlist-song");
const totTime = document.getElementById("tot-time");
const albumCover = document.getElementById("album-cover");
const songTitle = document.getElementById("song-title");
const currTime = document.getElementById("curr-time");
const songArtist = document.getElementById("song-artist");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const volumeSlider = document.getElementById("volume-slider");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");

// HTML se Elements ko uthana
const audio = document.getElementById("main-audio");
const playBtn = document.getElementById("play-btn");
const progress = document.getElementById("progress");

let isPlaying = false;
let repeatMode = false;
const songs = [
    "./assets/song1.mp3",
    "./assets/song2.mp3",
    "./assets/song3.mp3"
];

const songNames = [
    "Adventure",
    "Samba(Latin)",
    "Afrobeat"
];
const songImages = [
    "./assets/card1img.jpeg",
    "./assets/card2img.jpeg",
    "./assets/card3img.jpeg"
];
const songArtists = [
    "Audio Library",
    "Latin Beats",
    "Afro Music"
];

let currentSong = 0;
function updateSongInfo() {
    songTitle.innerText = songNames[currentSong];
    songArtist.innerText = songArtists[currentSong];
    albumCover.src = songImages[currentSong];
}
function highlightSong() {

    playlistSongs.forEach((song) => {
        song.classList.remove("active");
    });

    playlistSongs[currentSong].classList.add("active");
}
repeatBtn.addEventListener("click", () => {

    repeatMode = !repeatMode;

    if (repeatMode) {
        repeatBtn.style.color = "#1DB954";
    } else {
        repeatBtn.style.color = "white";
    }

});

// Play aur Pause karne ka dimaag

function togglePlay() {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        
        // Gana chalne par pause icon set karna
        playBtn.src = "./assets/pause_icon.png"; 
        playBtn.style.transform = "scale(1.1)"; 
    } else {
        audio.pause();
        isPlaying = false;
        
        // Gana pause hone par wapas play icon set karna
        playBtn.src = "./assets/player_icon3.png"; 
        playBtn.style.transform = "scale(1)";
    }
}
// Play button par click ka intezar karna
playBtn.addEventListener("click", togglePlay);

// Jaise-jaise gana chalega, slider (progress bar) apne aap aage badhegi
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
        let minutes = Math.floor(audio.currentTime / 60);
let seconds = Math.floor(audio.currentTime % 60);

if (seconds < 10) {
    seconds = "0" + seconds;
}

currTime.innerText = `${minutes}:${seconds}`;
    }
});

// Agar aap khud slider ko pakad kar aage-piche karoge toh gana bhi wahi pahunch jayega
progress.addEventListener("input", () => {
    const shadowTime = (progress.value * audio.duration) / 100;
    audio.currentTime = shadowTime;
});

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    audio.src = songs[currentSong];
    audio.play();
updateSongInfo();
highlightSong();
    isPlaying = true;
    
    playBtn.src = "./assets/pause_icon.png";
});

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    audio.src = songs[currentSong];
    audio.play();
updateSongInfo();
highlightSong();
    isPlaying = true;
    playBtn.src = "./assets/pause_icon.png";
});

audio.addEventListener("ended", () => {
if (repeatMode) {
    audio.currentTime = 0;
    audio.play();
    return;
}

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    audio.src = songs[currentSong];
audio.play();
updateSongInfo();
highlightSong();
isPlaying = true;
    playBtn.src = "./assets/pause_icon.png";
});
updateSongInfo();
highlightSong();

audio.addEventListener("loadedmetadata", () => {

    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    totTime.innerText = `${minutes}:${seconds}`;
});

playlistSongs.forEach((song) => {

    song.addEventListener("click", () => {

        currentSong = Number(song.dataset.index);

        audio.src = songs[currentSong];
        audio.play();

        updateSongInfo();
        highlightSong();

        isPlaying = true;
        playBtn.src = "./assets/pause_icon.png";
    });

});
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
});

shuffleBtn.addEventListener("click", () => {

    currentSong = Math.floor(Math.random() * songs.length);

    audio.src = songs[currentSong];
    audio.play();

    updateSongInfo();
    highlightSong();

    isPlaying = true;
    playBtn.src = "./assets/pause_icon.png";
});