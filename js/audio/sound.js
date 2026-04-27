class SoundFX {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        // Добавить флаг готовности
        this.ready = false;
        this.loadAllSounds();
    }
    
    loadAllSounds() {
        const soundPaths = window.CONFIG?.SOUNDS || {};
        let loadedCount = 0;
        const totalSounds = Object.keys(soundPaths).length;
        
        for (let key in soundPaths) {
            const audio = new Audio();
            audio.src = soundPaths[key];
            audio.preload = 'auto';
            audio.addEventListener('canplaythrough', () => {
                loadedCount++;
                if (loadedCount === totalSounds) {
                    this.ready = true;
                    console.log('✅ Все звуки загружены');
                }
            });
            this.sounds[key] = audio;
        }
    }
    
    play(soundName) {
        if (!this.enabled || !this.ready) return;
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log(`🔇 Звук ${soundName} заблокирован`));
        }
    }
}
