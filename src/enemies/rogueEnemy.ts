class RogueEnemy extends Phaser.Sprite {
    enemyState:enemyStateEnum = enemyStateEnum.idle;
    friendly = false;
    wanderRange = 100;
    player:Player;
    targetX = 0;
    targetY = 0;
    maxWanderRange = 100;
    attackRange = 5;
    spawnPositionX:number;
    spawnPositionY:number;
    aggroRange = 100;
    canWalk:enemyAllowanceInterface = {
        [enemyStateEnum.movingWalk]:true,
        [enemyStateEnum.movingFall]:false,
        [enemyStateEnum.idle]:true,
        [enemyStateEnum.idleSpecial]:true,
        [enemyStateEnum.attack1]:false,
        [enemyStateEnum.attack2]:false,
        [enemyStateEnum.attack3]:false,
        [enemyStateEnum.death]:false,
        [enemyStateEnum.sit]:false,
        [enemyStateEnum.sitDown]:false,
        [enemyStateEnum.movingChase]:false,
    };
    canIdle:enemyAllowanceInterface = {
        [enemyStateEnum.movingWalk]:false,
        [enemyStateEnum.movingFall]:false,
        [enemyStateEnum.idle]:false,
        [enemyStateEnum.idleSpecial]:false,
        [enemyStateEnum.attack1]:false,
        [enemyStateEnum.attack2]:false,
        [enemyStateEnum.attack3]:false,
        [enemyStateEnum.death]:false,
        [enemyStateEnum.sit]:false,
        [enemyStateEnum.sitDown]:false,
        [enemyStateEnum.movingChase]:false,
    };
    canChase:enemyAllowanceInterface = {
        [enemyStateEnum.movingWalk]:true,
        [enemyStateEnum.movingFall]:false,
        [enemyStateEnum.idle]:true,
        [enemyStateEnum.idleSpecial]:true,
        [enemyStateEnum.attack1]:false,
        [enemyStateEnum.attack2]:false,
        [enemyStateEnum.attack3]:false,
        [enemyStateEnum.death]:false,
        [enemyStateEnum.sit]:false,
        [enemyStateEnum.sitDown]:false,
        [enemyStateEnum.movingChase]:true,
    };
    canAttack:enemyAllowanceInterface = {
        [enemyStateEnum.movingWalk]:true,
        [enemyStateEnum.movingFall]:false,
        [enemyStateEnum.idle]:true,
        [enemyStateEnum.idleSpecial]:true,
        [enemyStateEnum.attack1]:false,
        [enemyStateEnum.attack2]:false,
        [enemyStateEnum.attack3]:false,
        [enemyStateEnum.death]:false,
        [enemyStateEnum.sit]:false,
        [enemyStateEnum.sitDown]:false,
        [enemyStateEnum.movingChase]:true,
    };
    stats:playerStatsInterface;
    enemyAnimations:enemyAnimationInterface = {
        [enemyStateEnum.movingWalk]:"walk",
        [enemyStateEnum.movingFall]:"fall",
        [enemyStateEnum.idle]:"idle",
        [enemyStateEnum.attack1]:"attack1",
        [enemyStateEnum.attack2]:"attack2",
        [enemyStateEnum.attack3]:"attack3",
        [enemyStateEnum.death]:"death",
        [enemyStateEnum.sit]:"sit",
        [enemyStateEnum.sitDown]:"sitdown",
        [enemyStateEnum.movingChase]:"walk",
        [enemyStateEnum.idleSpecial]:"butterfly",
    };
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "rogue", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.spawnPositionX = x;
        this.spawnPositionY = y;
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        this.animations.add("idle", [0,1,2,3,4,5,6,7,8,9], 3, false).onComplete.add(() => {
            const rndNumber = this.game.rnd.integerInRange(1, 100);
            if(rndNumber > 90){
                this.enemyState = enemyStateEnum.idleSpecial;
            }else if(!this.friendly && rndNumber > 20 && rndNumber < 90){
                this.wander();
            }
        });
        this.animations.add("butterfly", [10,11,12,13,14,15,16,17,18,19], 3, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("walk", [20,21,22,23,24,25,26,27,28,29], 3, true);
        this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36 ,37, 38,39], 6, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [40,41,42,43,44,45,46,47,48,49], 3, false).onComplete.add(() => {
            //kill enemy and respawn
        });
        this.health = this.maxHealth;
    }
    
    update() {
        this.resetVelocity();

        this.animations.play(this.enemyAnimations[this.enemyState]);

        if(!this.friendly){
            this.handleInput();
        }
    }

    resetVelocity(){
        if(this.enemyState !== enemyStateEnum.movingWalk){
            this.body.velocity.x = 0;
        }
    }

    // tslint:disable-next-line:cyclomatic-complexity
    handleInput(){
        if(this.enemyState === enemyStateEnum.movingWalk){
            if(this.game.physics.arcade.distanceToXY(this, this.targetX, this.targetY) < 5){
                this.x = this.targetX;
                this.y = this.targetY;
                this.body.velocity.setTo(0,0);
                this.enemyState = enemyStateEnum.idle;
            }
        }
    
        if(this.player){
            const distance = this.game.physics.arcade.distanceBetween(this, this.player);
            let fullAttackRange = this.attackRange;
            if(this.width < 0){
                fullAttackRange += (this.width/2)*-1;
            }else{
                fullAttackRange += this.width/2;
            }
            if(this.player.width < 0){
                fullAttackRange += (this.player.width/2)*-1;
            }else{
                fullAttackRange += this.player.width/2;
            }
            if(distance < fullAttackRange && this.canAttack[this.enemyState]){
                this.attack();
            }else if (distance < this.aggroRange && this.canChase[this.enemyState]) {
                this.chase();
            }
        }
        
        if(this.canIdle[this.enemyState]){
            this.idle();
        }
    }

    attack(){
        if(this.player.x > this.x){
            this.scale.setTo(1, 1);
        }else {
            this.scale.setTo(-1, 1);
        }
        this.enemyState = enemyStateEnum.attack1;
    }

    chase(){
        this.enemyState = enemyStateEnum.movingChase;
        if(this.player.x > this.x){
            this.scale.setTo(1, 1);
        }else {
            this.scale.setTo(-1, 1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    }

    wander(){
        if(this.game.physics.arcade.distanceToXY(this, this.spawnPositionX, this.spawnPositionY) > this.maxWanderRange){
            this.moveEnemyTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        const direction = this.game.rnd.integerInRange(0,1);
        const distance = this.game.rnd.integerInRange(10, this.maxWanderRange);
        if(direction){
            this.moveLeft(distance);
        }else{
            this.moveRight(distance);
        }
    }

    moveEnemyTo(toX:number, toY:number, speed:number){
        this.enemyState = enemyStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(
            this,
            toX,
            toY,
            speed
        );
        this.targetX = toX;
        this.targetY = toY;

        if(this.targetX > this.x){
            this.scale.setTo(1, 1);
        }else{
            this.scale.setTo(-1, 1);
        }
    }

    moveLeft(distance:number){
        if(this.x - distance < this.spawnPositionX - this.maxWanderRange){
            this.moveEnemyTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        }else{
            this.moveEnemyTo(this.x - distance, this.y, this.stats.movespeed);
        }
    }

    moveRight(distance:number){
        if(this.x + distance > this.spawnPositionX + this.maxWanderRange){
            this.moveEnemyTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        }else{
            this.moveEnemyTo(this.x + distance, this.y, this.stats.movespeed);
        }
    }

    idle(){
        this.enemyState = enemyStateEnum.idle;
    }
}
