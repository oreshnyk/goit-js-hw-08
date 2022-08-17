
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);



player.on('play', function() {
    let seconds = localStorage.getItem("videoplayer-current-time");
    seconds = parseFloat(seconds);
    if(!seconds){
        seconds = 0;
    }
    player.setCurrentTime(seconds).then(function(seconds) {
        // seconds = the actual time that the player seeked to
        console.log('Time has set to: ' + seconds);
        player.off('play');
    });
} );

function onTimeUpdate(data) {
    localStorage.setItem("videoplayer-current-time", data.seconds);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});