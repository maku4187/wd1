// Audio control functionality
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

// Initialize music toggle button
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('weddingMusic');
    const toggleBtn = document.getElementById('musicToggle');
    
    // Set initial volume to 50%
    music.volume = 0.5;
    
    // Add click handler
    toggleBtn.addEventListener('click', toggleMusic);
});
