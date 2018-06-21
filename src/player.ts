class Player extends Phaser.Sprite {
    playerState:playerStateEnum = playerStateEnum.idle;
    lastCheckPoint:levelsEnum = levelsEnum.level0;
    canWalk:playerAllowanceInterface = {
        [playerStateEnum.movingWalk]:true,
        [playerStateEnum.movingFall]:false,
        [playerStateEnum.idle]:true,
        [playerStateEnum.attack1]:false,
        [playerStateEnum.attack2]:false,
        [playerStateEnum.attack3]:false,
        [playerStateEnum.death]:false,
        [playerStateEnum.sit]:false,
        [playerStateEnum.sitDown]:false,
        [playerStateEnum.movingStartWalk]:true,
    };
    canIdle:playerAllowanceInterface = {
        [playerStateEnum.movingWalk]:true,
        [playerStateEnum.movingFall]:false,
        [playerStateEnum.idle]:false,
        [playerStateEnum.attack1]:false,
        [playerStateEnum.attack2]:false,
        [playerStateEnum.attack3]:false,
        [playerStateEnum.death]:false,
        [playerStateEnum.sit]:false,
        [playerStateEnum.sitDown]:false,
        [playerStateEnum.movingStartWalk]:true,
    };
    canAttack:playerAllowanceInterface = {
        [playerStateEnum.movingWalk]:true,
        [playerStateEnum.movingFall]:false,
        [playerStateEnum.idle]:true,
        [playerStateEnum.attack1]:false,
        [playerStateEnum.attack2]:false,
        [playerStateEnum.attack3]:false,
        [playerStateEnum.death]:false,
        [playerStateEnum.sit]:false,
        [playerStateEnum.sitDown]:false,
        [playerStateEnum.movingStartWalk]:true,
    };
    canSitDown:playerAllowanceInterface = {
        [playerStateEnum.movingWalk]:true,
        [playerStateEnum.movingFall]:false,
        [playerStateEnum.idle]:true,
        [playerStateEnum.attack1]:false,
        [playerStateEnum.attack2]:false,
        [playerStateEnum.attack3]:false,
        [playerStateEnum.death]:false,
        [playerStateEnum.sit]:false,
        [playerStateEnum.sitDown]:false,
        [playerStateEnum.movingStartWalk]:true,
    };
    facingNpc:any;
    facingBonfire:any;
    pauseMenu:any = {
        backgroundImage: null,
        continueGame: null,
        loadGame: null,
        options: null,
        githubLink: null,
    };
    fpsCounter:Phaser.Text = this.game.add.text(this.game.camera.x, 0, "FPS: " + this.game.time.fps, {
        font: "24px Arial",
        fill: "#fff"
    });
    stats:playerStatsInterface;
    playerHealthBar:any = null;
    playerStaminaBar:any = null;
    controls:any;
    currentRoom = 0;
    playerAnimations:playerAnimationInterface = {
        [playerStateEnum.movingWalk]:"walk",
        [playerStateEnum.movingFall]:"fall",
        [playerStateEnum.idle]:"idle",
        [playerStateEnum.attack1]:"attack1",
        [playerStateEnum.attack2]:"attack2",
        [playerStateEnum.attack3]:"attack3",
        [playerStateEnum.death]:"death",
        [playerStateEnum.sit]:"sit",
        [playerStateEnum.sitDown]:"sitdown",
        [playerStateEnum.movingStartWalk]:"startwalk",
    };
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "player", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.stats = {
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 150,
            luck: 1,
        };
        this.controls = {
            UP:this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            DOWN:this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            LEFT:this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            RIGHT:this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            E:this.game.input.keyboard.addKey(Phaser.Keyboard.E),
            ESC:this.game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            P:this.game.input.keyboard.addKey(Phaser.Keyboard.P),
            LMB:this.game.input.activePointer.leftButton,
            RMB:this.game.input.activePointer.rightButton,
        };

        this.game.input.onDown.add((pointer:Phaser.Pointer, event:PointerEvent) => {
            this.handleAttack();
        });

        //stop rightclick from opening a menu
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.W,
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.D,
            Phaser.Keyboard.E
        ]);

        this.animations.add("idle", [0], 3, false);
        this.animations.add("startwalk", [1,2,3], 6, false).onComplete.add(()=>{
            this.animations.stop();
            this.playerState = playerStateEnum.movingWalk;
        });
        this.animations.add("walk", [4,5,6], 6, true);
        this.animations.add("attack1", [20, 21, 22, 23], 10, false).onComplete.add(()=>{
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("attack2", [24, 25, 26], 10, false).onComplete.add(()=>{
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("attack3", [27, 28, 29], 10, false).onComplete.add(()=>{
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("sitdown",[7,8,9], 3, false).onComplete.add(()=>{
            this.animations.stop();
            this.playerState = playerStateEnum.sit;
        });
        this.animations.add("sit", [9], 3, false);
        this.animations.add("death", [51,52,54], 3, false).onComplete.add(() => {
            //kill player and respawn
        });

        this.healthBar();
        this.staminaBar();
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.playerAnimations[this.playerState]);

        this.handleInput();

        this.updateHealthBar();
        this.updateStaminaBar();

        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    }

    // tslint:disable-next-line:cyclomatic-complexity
    handleInput(){
        if (this.controls.LEFT.isDown && this.canWalk[this.playerState]) {
            this.moveLeft();
        } else if (this.controls.RIGHT.isDown && this.canWalk[this.playerState]) {
            this.moveRight();
        }else if(this.controls.E.justPressed() && this.facingBonfire && this.canSitDown[this.playerState]){
            this.handleBonfire();
        }else if(this.controls.E.justPressed() && this.facingNpc){
            this.handleNpc();
        }else if(this.canIdle[this.playerState]){
            this.idle();
        }

        if(this.controls.ESC.isDown || this.controls.P.isDown){
            this.handlePauseMenu();
        }
    }

    handleNpc(){
        this.facingNpc.nextDialogueText();
    }

    handleAttack(){
        if(this.controls.LMB.justPressed() && this.canAttack){
            this.playerState = playerStateEnum.attack1;
        }else if(this.controls.RMB.justPressed() && this.canAttack){
            console.log("right mouse button");
        }
    }

    handleBonfire(){
        console.log("using bonfire");
    }

    healthBar(){
        if(!this.playerHealthBar){
            this.playerHealthBar = this.game.add.sprite(50,50, "healthbar");
            this.playerHealthBar.height = 15;
        }
    }

    updateHealthBar(){
        if(this.stats){
            this.playerHealthBar.width = this.stats.health*2;
        }
    }

    updateStaminaBar(){
        if(this.stats){
            this.playerStaminaBar.width = this.stats.stamina*2;
        }
    }

    staminaBar(){
        if(!this.playerStaminaBar && this.playerHealthBar){
            const x = this.playerHealthBar.x;
            const y = this.playerHealthBar.y + this.playerHealthBar.width;
            this.playerStaminaBar = this.game.add.sprite(x,y, "staminabar");
            this.playerStaminaBar.height = 15;
        }
    }

    resetVelocity(){
        this.body.velocity.x = 0;
    }

    moveLeft(){
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -this.stats.movespeed;
    }

    moveRight(){
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(1, 1);
        this.body.velocity.x = this.stats.movespeed;
    }

    idle(){
        this.playerState = playerStateEnum.idle;
    }

    handlePauseMenu(){
        this.game.paused = true;
        this.pauseMenu.backgroundImage = this.game.add.image(0,0, "wall");
        this.pauseMenu.backgroundImage.width = this.game.camera.width;
        this.pauseMenu.backgroundImage.height = this.game.camera.height;
        const style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.pauseMenu.continueGame = this.game.add.text(0, 0, "Continue Game", style);
        this.pauseMenu.saveGame = this.game.add.text(0,50, "Save Game", style);
        this.pauseMenu.loadGame = this.game.add.text(0, 100, "Load Game", style);
        this.pauseMenu.options = this.game.add.text(0, 150, "Options", style);
        this.pauseMenu.githubLink = this.game.add.text(0, 300, "Github", style);

        const array = [
            this.pauseMenu.continueGame,
            this.pauseMenu.saveGame,
            this.pauseMenu.loadGame,
            this.pauseMenu.options,
            this.pauseMenu.githubLink
        ];

        array.forEach((text)=>{
            text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            text.setTextBounds(0, 200, 800, 100);
            text.inputEnabled = true;
            text.events.onInputOver.add(this.pauseMenuGlow, this);
            text.events.onInputOut.add(this.pauseMenuStopGlow, this);
            text.events.onInputUp.add(this.pauseMenuFadeOut, this);
        });
    }

    pauseMenuFadeOut(item:Phaser.Text) {
        switch(item){
            case this.pauseMenu.continueGame: this.continueTheGame();
            break;
            case this.pauseMenu.saveGame: this.savePlayer(this.x);
                this.continueTheGame();
            break;
            case this.pauseMenu.loadGame: const loadedGame = JSON.parse(window.localStorage.getItem("player")!);
                if(loadedGame){
                    this.game.state.start("level" + loadedGame.currentRoom);
                }else{
                    alert("no Saved Game Found!");
                }
                this.continueTheGame();
            break;
            case this.pauseMenu.options:
            break;
            case this.pauseMenu.githubLink: window.open("http://www.github.com/twofist");
            break;
            default:
        }
    }

    pauseMenuGlow(item:Phaser.Text){
        item.fill = "#ffff44";
    }

    pauseMenuStopGlow(item:Phaser.Text){
        item.fill = "#fff";
    }

    continueTheGame(){
        this.destroyPauseMenu();
        this.game.paused = false;
    }

    destroyPauseMenu(){
        for(const key in this.pauseMenu){
            if(this.pauseMenu[key]){
                this.pauseMenu[key].destroy();
            }
        }
    }

    savePlayer(x = 0, levelNumber = this.currentRoom){
        const savePlayer:savePlayerInterface = {
            lastCheckPoint: this.lastCheckPoint,
            currentRoom:levelNumber,
            stats:this.stats,
            y:this.y,
            x:x,
        };
        window.localStorage.setItem("player", JSON.stringify(savePlayer));
    }

    loadPlayer(playerStorage:savePlayerInterface){
        if(playerStorage){
            this.stats = playerStorage.stats;
            this.x = playerStorage.x;
            this.y = playerStorage.y;
            this.lastCheckPoint = playerStorage.lastCheckPoint;
        }else{
            this.x = 20;
            this.y = this.game.height - this.height*2;
        }
    }
}
