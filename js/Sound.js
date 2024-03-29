class Sound {
    constructor() {
        this.snakeMusic = new Howl({
            src: ['./music-data/snake-music.mp3'],
            html5: true,
            loop: true
        });

        this.dogMusic = new Howl({
            src: ['./music-data/dog-music.mp3'],
            html5: true,
            loop: true
        });

        this.topLevelMenuMusic = new Howl({
            src: ['./music-data/topl-level-menu-music.mp3'],
            html5: true,
            loop: true
        });

        this.tetrisMusic = new Howl({
            src: ['./music-data/tetris-music.mp3'],
            html5: true,
            loop: true
        });

        // ./sounds-data/blockFall.mp3
        // ./sounds-data/click.mp3
        // ./sounds-data/eat.mp3
        // ./sounds-data/gameOver.mp3
        // ./sounds-data/pause.mp3

        this.blockFall = new Howl({
            src: ['./sounds-data/blockFall.mp3'],
            html5: true
        });

        this.click = new Howl({
            src: ['./sounds-data/click.mp3'],
            html5: true
        });

        this.eat = new Howl({
            src: ['./sounds-data/eat.mp3'],
            html5: true
        });

        this.gameOver = new Howl({
            src: ['./sounds-data/gameOver.mp3'],
            html5: true
        });

        this.pause = new Howl({
            src: ['./sounds-data/pause.mp3'],
            html5: true
        });

        this.ballBrick = new Howl({
            src: ['./sounds-data/ball-brick.mp3'],
            html5: true
        });

        this.ballPaddle = new Howl({
            src: ['./sounds-data/ball-paddle.mp3'],
            html5: true
        });

        this.ballWall = new Howl({
            src: ['./sounds-data/ball-wall.mp3'],
            html5: true
        });



    }

    play(type) {

        // catch any errors
        try {

                // switch based on
                // type === 'eat' || type === 'gameOver' || type === 'pause' || type === 'click' || type === 'blockFall'
                switch(type) {
                    case 'eat':
                        this.eat.play();
                        break;
                    case 'gameOver':
                        this.gameOver.play();
                        break;
                    case 'pause':
                        this.pause.play();
                        break;
                    case 'click':
                        this.click.play();
                        break;
                    case 'blockFall':
                        this.blockFall.play();
                        break;
                    case 'ballBrick':
                        this.ballBrick.play();
                        break;
                    case 'ballPaddle':
                        this.ballPaddle.play();
                        break;
                    case 'ballWall':
                        this.ballWall.play();
                        break;
                }
        }
        catch (error) {
            console.log(error);
        }
    }


    playTetrisMusic() {
        this.tetrisMusic.play();
    }

    stopTetrisMusic() {
        this.tetrisMusic.stop();
    }

    //

    playTopLevelMenuMusic() {
        this.topLevelMenuMusic.play();
    }

    stopTopLevelMenuMusic() {
        this.topLevelMenuMusic.stop();
    }

    //

    playSnakeMusic() {
        this.snakeMusic.play();
    }

    stopSnakeMusic() {
        this.snakeMusic.stop();
    }

    //

    playDogMusic() {
        this.dogMusic.play();
    }

    stopDogMusic() {
        this.dogMusic.stop();
    }
}
