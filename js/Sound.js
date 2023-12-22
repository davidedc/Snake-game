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

        // catch any errors
        try {

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
        catch (error) {
            console.log(error);
        }
    }

    /*
    playMusic(musicData) {
        var lastNote;
        musicData.tracks.forEach((track) => {
          //create a synth for each track
          const synth = new Tone.PolySynth(Tone.Synth, {
            envelope: {
              attack: 0.02,
              decay: 0.1,
              sustain: 0.3,
              release: 1,
            },
          }).toDestination();
          synths.push(synth);
          //schedule all of the events
          track.notes.forEach((note) => {
            synth.triggerAttackRelease(
              note.name,
              note.duration,
              note.time,
              note.velocity
            );
            lastNote = note;
          });
        });
        Tone.Transport.start();
        Tone.Transport.bpm.value = 120;
        Tone.Transport.loop = true;
        //Tone.Transport.loopStart = 0;
        //Tone.Transport.loopEnd = lastNote.time + lastNote.duration + 0.01;
    }
    */

    playMusic(musicData) {
        const now = Tone.now() + 0.5;
        musicData.tracks.forEach((track) => {
          //create a synth for each track
          const synth = new Tone.PolySynth(Tone.Synth, {
            envelope: {
              attack: 0.02,
              decay: 0.1,
              sustain: 0.3,
              release: 1,
            },
          }).toDestination();
          synths.push(synth);
          //schedule all of the events
          track.notes.forEach((note) => {
            synth.triggerAttackRelease(
              note.name,
              note.duration,
              note.time + now,
              note.velocity
            );
          });
        });
        Tone.Transport.start();
        Tone.Transport.bpm.value = 120;
        Tone.Transport.loop = true;
    }
    stopMusic() {
        while (synths.length) {
            const synth = synths.shift();
            synth.disconnect();
        }
        Tone.Transport.stop();
    } 
}
