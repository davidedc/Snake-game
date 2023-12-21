class Sound {
    constructor() {
        this.sounds = {
            move: new Tone.NoiseSynth({
                noise: { type: 'white' },
                envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
            }).toDestination(),
            eat: new Tone.Synth({}).toDestination(),
            gameOver: new Tone.Synth({}).toDestination(),
            pause: new Tone.Synth({ oscillator: {type: 'sine'}}).toDestination(),
            // other sounds can be added here
        };

        // Predefined sequences or settings for each sound type
        this.settings = {
            move: { duration: '8n' },
            eat: { notes: ['C4', 'E4', 'C5'], duration: '16n' },
            gameOver: { notes: ['G4', 'F4', 'D4', 'C4', 'A3'], duration: '8n' },
            pause: { notes: ['C5', 'C6'], duration: '8n' }
        };
    }

    play(type) {
        const sound = this.sounds[type];
        const setting = this.settings[type];

        if (sound && setting) {
            if (type === 'eat' || type === 'gameOver') {
                const now = Tone.now();
                setting.notes.forEach((note, index) => {
                    sound.triggerAttackRelease(note, setting.duration, now + index * 0.05);
                });
            } else if (type === 'move') {
                sound.triggerAttackRelease(setting.duration);
            } else if (type === 'pause') {
                setting.notes.forEach((note, index) => {
                    sound.triggerAttackRelease(note, setting.duration, Tone.now() + index * 0.05);
                });
            }
            // Add more conditions for other sound types if necessary
        }
    }
}
