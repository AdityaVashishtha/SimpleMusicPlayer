var CURRENT_SONG_URL = "https://archive.org/download/mythium/JLS_ATI.mp3";
var playPauseToggle = false;
var playPauseButton = null;
var loadingBar = null;
var interval = null;
var loadedTimeElement = null;
var remainingTimeElement = null;

var song = new Audio(CURRENT_SONG_URL);
song.preload = true;
playPauseButton = document.getElementsByClassName("play-pause-btn")[0];
progressBar = document.getElementsByClassName("progressbar")[0];
loadedTimeElement = document.getElementsByClassName("loaded-time")[0];
remainingTimeElement = document.getElementsByClassName("remaining-time")[0];

playPauseButton.addEventListener('click',()=> {
    togglePlayPauseBtn();
    if(playPauseToggle) {
        song.pause();
        if(interval != null)
            clearInterval(interval);
    } else {
        //console.log(song.buffered.end(0));
        song.play();
        interval = setInterval(()=>{
            loadPercentage = (1-(song.duration - song.currentTime)/(song.duration))*100;
            //console.log(loadPercentage);
            let loadedTime = (( (song.currentTime / 60) < 10 ) ? "0"+Math.floor(song.currentTime/60) : ""+Math.floor(song.currentTime/60) ) +
                               ":" + (( (song.currentTime % 60) < 9 ) ? "0"+Math.ceil(song.currentTime % 60) : ""+Math.ceil(song.currentTime % 60) ) ;
            let remainSecond = song.duration - song.currentTime;
            let remainingTime = (( (remainSecond / 60) < 10 ) ? "0"+Math.floor(remainSecond/60) : ""+Math.floor(remainSecond/60) ) +
            ":" + (( (remainSecond % 60) < 9 ) ? "0"+Math.ceil(remainSecond % 60) : ""+Math.ceil(remainSecond % 60) ) ;

            loadedTimeElement.innerHTML = loadedTime;
            remainingTimeElement.innerHTML = remainingTime;
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

togglePlayPauseBtn = ()=>{
    if(playPauseToggle) {
        playPauseButton.innerHTML = "<i class='fa fa-play'></i>";
    } else {
        playPauseButton.innerHTML = "<i class='fa fa-pause'></i>";
    }
}