// HTML se Elements ko uthana
const audio = document.getElementById("main-audio");
const playBtn = document.getElementById("play-btn");
const progress = document.getElementById("progress");

let isPlaying = false;

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
    }
});

// Agar aap khud slider ko pakad kar aage-piche karoge toh gana bhi wahi pahunch jayega
progress.addEventListener("input", () => {
    const shadowTime = (progress.value * audio.duration) / 100;
    audio.currentTime = shadowTime;
});