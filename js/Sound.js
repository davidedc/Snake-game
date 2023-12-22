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
            click: new Tone.MembraneSynth({
                pitchDecay: 0.005,
                envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
            }).toDestination(),
            blockFall: new Tone.MetalSynth({
                frequency: 200,
                envelope: { attack: 0.001, decay: 0.3, release: 0.3 },
                harmonicity: 5.1,
                modulationIndex: 32,
                resonance: 4000,
                octaves: 1.5
            }).toDestination(),
            // other sounds can be added here
        };

        // Predefined sequences or settings for each sound type
        this.settings = {
            move: { duration: '8n' },
            eat: { notes: ['C4', 'E4', 'C5'], duration: '16n' },
            gameOver: { notes: ['G4', 'F4', 'D4', 'C4', 'A3'], duration: '8n' },
            pause: { notes: ['C5', 'C6'], duration: '8n' },
            click: { pitch: 'C2', duration: '32n' },
            blockFall: { duration: '8n' }
        };
    }

    play(type) {
        const sound = this.sounds[type];
        const setting = this.settings[type];

        if (sound && setting) {
            if (type === 'eat' || type === 'gameOver' || type === 'pause') {
                const now = Tone.now();
                setting.notes.forEach((note, index) => {
                    sound.triggerAttackRelease(note, setting.duration, now + index * 0.05);
                });
            } else if (type === 'move' || type === 'click' || type === 'blockFall') {
                sound.triggerAttackRelease(setting.pitch || 'C4', setting.duration);
            }
            // Add more conditions for other sound types if necessary
        }
    }
}
