
// Enhanced Audio Control with Autoplay Attempt and Prompt
function toggleMusic() {
    const music = document.getElementById('weddingMusic');
    const toggleBtn = document.getElementById('musicToggle');

    if (music.paused) {
        music.play()
            .then(() => {
                toggleBtn.textContent = '🔊';
                hideMusicPrompt();
            })
            .catch(error => {
                console.error('Audio playback failed:', error);
                showMusicPrompt();
            });
    } else {
        music.pause();
        toggleBtn.textContent = '🔇';
    }
}

function showMusicPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'musicPrompt';
    prompt.textContent = '🔔 Tap anywhere to enable music';
    prompt.style.position = 'fixed';
    prompt.style.bottom = '100px';
    prompt.style.left = '50%';
    prompt.style.transform = 'translateX(-50%)';
    prompt.style.background = 'rgba(0, 0, 0, 0.7)';
    prompt.style.color = '#fff';
    prompt.style.padding = '10px 20px';
    prompt.style.borderRadius = '20px';
    prompt.style.zIndex = '9999';
    prompt.style.fontSize = '1rem';
    document.body.appendChild(prompt);

    // Dismiss on first interaction
    const enableMusic = () => {
        toggleMusic();
        hideMusicPrompt();
        document.removeEventListener('click', enableMusic);
    };

    document.addEventListener('click', enableMusic);
}

function hideMusicPrompt() {
    const prompt = document.getElementById('musicPrompt');
    if (prompt) {
        prompt.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('weddingMusic');
    const toggleBtn = document.getElementById('musicToggle');

    music.volume = 0.5;

    // Attempt autoplay
    music.play()
        .then(() => {
            toggleBtn.textContent = '🔊';
        })
        .catch(() => {
            toggleBtn.textContent = '🔇';
            showMusicPrompt();
        });

    toggleBtn.addEventListener('click', toggleMusic);
});
