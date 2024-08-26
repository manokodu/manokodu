document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const currentTrackTitle = document.getElementById('currentTrackTitle');
    const songProgress = document.getElementById('songProgress');
    const currentTime = document.getElementById('currentTime');
    const totalTime = document.getElementById('totalTime');
    const volumeSlider = document.getElementById('volumeSlider');
    const playlistItems = document.querySelectorAll('#playlist li');
    const wavesIcon = document.getElementById('wavesIcon');

    let currentTrackIndex = -1;
    let isPlaying = false;
    let pauseTime = 0;

    function playTrack(index) {
        if (currentTrackIndex !== index) {
            const track = playlistItems[index];
            audio.src = track.getAttribute('data-src');
            currentTrackTitle.textContent = track.textContent;
            audio.currentTime = 0;
            pauseTime = 0;
            currentTrackIndex = index;
        }
        audio.play();
        playPauseIcon.src = 'pauseicon.png';
        isPlaying = true;
        updateWavesIcon(true);
    }

    function pauseTrack() {
        audio.pause();
        playPauseIcon.src = 'playicon.png';
        isPlaying = false;
        pauseTime = audio.currentTime;
        updateWavesIcon(false);
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseTrack();
        } else {
            if (currentTrackIndex !== -1) {
                playTrack(currentTrackIndex);
            }
        }
    }

    function updateProgress() {
        const progress = (audio.currentTime / audio.duration) * 100;
        songProgress.value = progress;
        currentTime.textContent = formatTime(audio.currentTime);
        totalTime.textContent = formatTime(audio.duration);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function adjustVolume() {
        audio.volume = volumeSlider.value;
    }

    function updateWavesIcon(isPlaying) {
        if (isPlaying) {
            wavesIcon.src = 'playingwaves.gif';
        } else {
            wavesIcon.src = 'staticwaves.gif';
        }
    }

    playPauseBtn.addEventListener('click', togglePlayPause);

    volumeSlider.addEventListener('input', adjustVolume);

    audio.addEventListener('timeupdate', updateProgress);

  
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            playTrack(index);
        });
    });

    currentTrackTitle.textContent = 'なにかんがえてるの？';
});
