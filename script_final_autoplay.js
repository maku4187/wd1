
// Enhanced Audio Control with Autoplay Attempt
function toggleMusic() {
    const music = document.getElementById('weddingMusic');
    const toggleBtn = document.getElementById('musicToggle');

    if (music.paused) {
        music.play()
            .then(() => {
                toggleBtn.textContent = '🔊';
            })
            .catch(error => {
                console.error('Audio playback failed:', error);
                alert('Please interact with the page first to allow audio');
            });
    } else {
        music.pause();
        toggleBtn.textContent = '🔇';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('weddingMusic');
    const toggleBtn = document.getElementById('musicToggle');

    // Set volume
    music.volume = 0.5;

    // Attempt autoplay
    music.play()
        .then(() => {
            toggleBtn.textContent = '🔊';
        })
        .catch(err => {
            console.log('Autoplay blocked until user interacts');
            toggleBtn.textContent = '🔇';
        });

    // Button toggle
    toggleBtn.addEventListener('click', toggleMusic);
});
