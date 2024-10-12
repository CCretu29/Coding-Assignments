const audioPlayer = document.getElementById('audioPlayer');

function playMusic() {
    audioPlayer.play();
}

function pauseMusic() {
    audioPlayer.pause();
}

function stopMusic() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}
