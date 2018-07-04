var CURRENT_SONG_URL = "https://archive.org/download/mythium/JLS_ATI.mp3";
var playPauseToggle = false;
var playPauseButton = null;
var loadingBar = null;
var interval = null;
var song = new Audio(CURRENT_SONG_URL);

playPauseButton = document.getElementsByClassName("play-pause-btn")[0];
progressBar = document.getElementsByClassName("progressbar")[0];

playPauseButton.addEventListener('click',()=> {
    if(playPauseToggle) {
        song.pause();
        if(interval != null)
            clearInterval(interval);
    } else {
        song.play();
        interval = setInterval(()=>{
            console.log(song.currentTime);
            //mySound.currentTime = 1;
            console.log(song.duration);
            loadPercentage = (1-(song.duration - song.currentTime)/(song.duration))*100;
            console.log(loadPercentage);
            document.getElementsByClassName("progress-bar-loading")[0].
                style.width = loadPercentage+"%";
            
        },1000);
    }
    playPauseToggle = !playPauseToggle;
});

progressBar.onclick = (e)=>{
    let clickPositionX = (e.pageX - progressBar.offsetLeft)/progressBar.clientWidth;
    clickPositionX *= 100;
    clickPositionX = Math.round(clickPositionX);
    document.getElementsByClassName("progress-bar-loading")[0].
                style.width = clickPositionX+"%";
    song.currentTime = song.duration * (clickPositionX/100);
};

// pauseButtom = document.getElementById("pause");
// pauseButtom.addEventListener('click',()=> {
//     mySound.pause();
// });