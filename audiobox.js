document.addEventListener('DOMContentLoaded', function () {
    const audioBoxes = document.querySelectorAll('.audio-box');

    audioBoxes.forEach((box, index) => {
        const audio = box.querySelector('audio');
        const playPauseBtn = box.querySelector('.playPauseBtn');
        const playPauseIcon = box.querySelector('.playPauseIcon');
        const songProgress = box.querySelector('.progress-bar progress');
        const currentTime = box.querySelector('.currentTime');
        const totalTime = box.querySelector('.totalTime');
        const volumeSlider = box.querySelector('.volumeSlider');

        let isPlaying = false;

        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playPauseIcon.src = 'playicon.png';
                isPlaying = false;
            } else {
                audio.play();
                playPauseIcon.src = 'pauseicon.png';
                isPlaying = true;
            }
        });

        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            songProgress.value = progress;
            currentTime.textContent = formatTime(audio.currentTime);
            totalTime.textContent = formatTime(audio.duration);
        });

        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
        });

        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    });
});
