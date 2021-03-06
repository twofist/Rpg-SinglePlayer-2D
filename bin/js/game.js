"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gameStateEnum;
(function (gameStateEnum) {
    gameStateEnum[gameStateEnum["startMenu"] = 0] = "startMenu";
    gameStateEnum[gameStateEnum["inGame"] = 1] = "inGame";
})(gameStateEnum || (gameStateEnum = {}));
var playerStateEnum;
(function (playerStateEnum) {
    playerStateEnum[playerStateEnum["movingWalk"] = 0] = "movingWalk";
    playerStateEnum[playerStateEnum["movingFall"] = 1] = "movingFall";
    playerStateEnum[playerStateEnum["idle"] = 2] = "idle";
    playerStateEnum[playerStateEnum["attack1"] = 3] = "attack1";
    playerStateEnum[playerStateEnum["attack2"] = 4] = "attack2";
    playerStateEnum[playerStateEnum["attack3"] = 5] = "attack3";
    playerStateEnum[playerStateEnum["death"] = 6] = "death";
    playerStateEnum[playerStateEnum["sit"] = 7] = "sit";
    playerStateEnum[playerStateEnum["sitDown"] = 8] = "sitDown";
    playerStateEnum[playerStateEnum["movingStartWalk"] = 9] = "movingStartWalk";
    playerStateEnum[playerStateEnum["standUp"] = 10] = "standUp";
    playerStateEnum[playerStateEnum["autoWalkTo"] = 11] = "autoWalkTo";
    playerStateEnum[playerStateEnum["knockBack"] = 12] = "knockBack";
    playerStateEnum[playerStateEnum["roll"] = 13] = "roll";
})(playerStateEnum || (playerStateEnum = {}));
var itemType;
(function (itemType) {
    itemType[itemType["ring"] = 0] = "ring";
})(itemType || (itemType = {}));
var enemyStateEnum;
(function (enemyStateEnum) {
    enemyStateEnum[enemyStateEnum["movingWalk"] = 0] = "movingWalk";
    enemyStateEnum[enemyStateEnum["movingFall"] = 1] = "movingFall";
    enemyStateEnum[enemyStateEnum["idle"] = 2] = "idle";
    enemyStateEnum[enemyStateEnum["idleSpecial"] = 3] = "idleSpecial";
    enemyStateEnum[enemyStateEnum["attack1"] = 4] = "attack1";
    enemyStateEnum[enemyStateEnum["attack2"] = 5] = "attack2";
    enemyStateEnum[enemyStateEnum["attack3"] = 6] = "attack3";
    enemyStateEnum[enemyStateEnum["death"] = 7] = "death";
    enemyStateEnum[enemyStateEnum["sit"] = 8] = "sit";
    enemyStateEnum[enemyStateEnum["sitDown"] = 9] = "sitDown";
    enemyStateEnum[enemyStateEnum["movingChase"] = 10] = "movingChase";
    enemyStateEnum[enemyStateEnum["knockBack"] = 11] = "knockBack";
})(enemyStateEnum || (enemyStateEnum = {}));
var npcStateEnum;
(function (npcStateEnum) {
    npcStateEnum[npcStateEnum["movingWalk"] = 0] = "movingWalk";
    npcStateEnum[npcStateEnum["movingFall"] = 1] = "movingFall";
    npcStateEnum[npcStateEnum["idle"] = 2] = "idle";
    npcStateEnum[npcStateEnum["idleSpecial"] = 3] = "idleSpecial";
    npcStateEnum[npcStateEnum["attack1"] = 4] = "attack1";
    npcStateEnum[npcStateEnum["attack2"] = 5] = "attack2";
    npcStateEnum[npcStateEnum["attack3"] = 6] = "attack3";
    npcStateEnum[npcStateEnum["death"] = 7] = "death";
    npcStateEnum[npcStateEnum["sit"] = 8] = "sit";
    npcStateEnum[npcStateEnum["sitDown"] = 9] = "sitDown";
    npcStateEnum[npcStateEnum["movingChase"] = 10] = "movingChase";
    npcStateEnum[npcStateEnum["knockBack"] = 11] = "knockBack";
})(npcStateEnum || (npcStateEnum = {}));
var slimeBossStateEnum;
(function (slimeBossStateEnum) {
    slimeBossStateEnum[slimeBossStateEnum["regenerating"] = 0] = "regenerating";
    slimeBossStateEnum[slimeBossStateEnum["jumpingToWall"] = 1] = "jumpingToWall";
    slimeBossStateEnum[slimeBossStateEnum["jumpingToPlayer"] = 2] = "jumpingToPlayer";
    slimeBossStateEnum[slimeBossStateEnum["splattered"] = 3] = "splattered";
    slimeBossStateEnum[slimeBossStateEnum["idle"] = 4] = "idle";
    slimeBossStateEnum[slimeBossStateEnum["death"] = 5] = "death";
})(slimeBossStateEnum || (slimeBossStateEnum = {}));
var levelsEnum;
(function (levelsEnum) {
    levelsEnum[levelsEnum["level0"] = 0] = "level0";
    levelsEnum[levelsEnum["level1"] = 1] = "level1";
    levelsEnum[levelsEnum["level2"] = 2] = "level2";
    levelsEnum[levelsEnum["level3"] = 3] = "level3";
})(levelsEnum || (levelsEnum = {}));
var moveOption;
(function (moveOption) {
    moveOption[moveOption["guard"] = 0] = "guard";
    moveOption[moveOption["wander"] = 1] = "wander";
    moveOption[moveOption["patrol"] = 2] = "patrol";
})(moveOption || (moveOption = {}));
var SimpleGame = /** @class */ (function (_super) {
    __extends(SimpleGame, _super);
    function SimpleGame() {
        var _this = _super.call(this, 800, 600, Phaser.AUTO, "content", null) || this;
        _this.state.add("boot", new BootState());
        _this.state.add("preload", new PreloadState());
        _this.state.add("title", new TitleState());
        _this.state.add("level0", new Level0());
        _this.state.add("level1", new Level1());
        _this.state.add("level2", new Level2());
        _this.state.add("level3", new Level3());
        _this.state.start("boot");
        return _this;
    }
    return SimpleGame;
}(Phaser.Game));
window.onload = function () {
    var game = new SimpleGame();
};
var MasterEnemy = /** @class */ (function (_super) {
    __extends(MasterEnemy, _super);
    function MasterEnemy(game, x, y, key, frame) {
        var _a;
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.enemyState = enemyStateEnum.idle;
        _this.friendly = false;
        _this.player = null;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.defaultScaleWidth = 1;
        _this.defaultScaleHeight = 1;
        _this.defaultDirection = 1;
        _this.maxWanderRange = 100;
        _this.maxRestRange = 40;
        _this.maxAggroRange = 100;
        _this.attackCooldown = 2000;
        _this.attackTimer = null;
        _this.allowAttack = true;
        _this.canWalk = enemyAllowance([
            enemyStateEnum.idle,
            enemyStateEnum.idleSpecial,
        ]);
        _this.canIdle = enemyAllowance([
            enemyStateEnum.movingChase
        ]);
        _this.canChase = enemyAllowance([
            enemyStateEnum.movingWalk,
            enemyStateEnum.idle,
            enemyStateEnum.idleSpecial,
            enemyStateEnum.movingChase
        ]);
        _this.canAttack = enemyAllowance([
            enemyStateEnum.movingWalk,
            enemyStateEnum.idle,
            enemyStateEnum.idleSpecial,
            enemyStateEnum.movingChase
        ]);
        _this.enemyAnimations = (_a = {},
            _a[enemyStateEnum.movingWalk] = "walk",
            _a[enemyStateEnum.movingFall] = "fall",
            _a[enemyStateEnum.idle] = "idle",
            _a[enemyStateEnum.attack1] = "attack1",
            _a[enemyStateEnum.attack2] = "attack2",
            _a[enemyStateEnum.attack3] = "attack3",
            _a[enemyStateEnum.death] = "death",
            _a[enemyStateEnum.sit] = "sit",
            _a[enemyStateEnum.sitDown] = "sitdown",
            _a[enemyStateEnum.movingChase] = "walk",
            _a[enemyStateEnum.idleSpecial] = "idlespecial",
            _a[enemyStateEnum.knockBack] = "knockback",
            _a);
        _this.hitBox1 = null;
        _this.invincible = false;
        _this.patrolDirection = 1;
        _this.damageFrames = [];
        _this.moveOption = moveOption.guard;
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.spawnPositionX = x;
        _this.spawnPositionY = y;
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 150,
            luck: 1,
        };
        _this.hitBoxes = _this.game.add.group();
        _this.addChild(_this.hitBoxes);
        return _this;
    }
    MasterEnemy.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.enemyAnimations[this.enemyState]);
        if (!this.friendly) {
            this.handleInput();
            this.stopMovingTo();
        }
        this.checkForHitting();
        this.checkForGettingHit();
        this.handleDeath();
        this.updateHitbox();
    };
    MasterEnemy.prototype.handleInput = function () {
        if (this.player) {
            var distance = this.game.physics.arcade.distanceBetween(this, this.player);
            if (this.isAllowedToAttack()) {
                this.attack();
            }
            else if (this.isAllowedToChase(distance)) {
                this.chase();
            }
            else if (this.isAllowedToWander()) {
                if (this.moveOption === moveOption.patrol) {
                    this.patrol();
                }
                else if (this.moveOption === moveOption.wander) {
                    this.wander();
                }
            }
            else {
                this.idle();
            }
        }
    };
    MasterEnemy.prototype.isAllowedToWander = function () {
        if (this.canWalk[this.enemyState]) {
            return true;
        }
        return false;
    };
    MasterEnemy.prototype.isAllowedToChase = function (distance) {
        if (!this.allowRestRange(distance) &&
            this.betweenAggroRange(distance) &&
            this.canChase[this.enemyState]) {
            return true;
        }
        return false;
    };
    MasterEnemy.prototype.isAllowedToAttack = function () {
        if (this.game.physics.arcade.overlap(this.player, this.hitBox1) &&
            this.canAttack[this.enemyState] &&
            this.allowAttack) {
            return true;
        }
        return false;
    };
    MasterEnemy.prototype.allowRestRange = function (distance) {
        if (!this.allowAttack && distance < this.maxRestRange) {
            return true;
        }
        return false;
    };
    MasterEnemy.prototype.betweenAggroRange = function (distance) {
        if (!this.game.physics.arcade.overlap(this.player, this.hitBox1) && distance < this.maxAggroRange) {
            return true;
        }
        return false;
    };
    MasterEnemy.prototype.stopMovingTo = function () {
        if (this.enemyState === enemyStateEnum.movingWalk) {
            if (Math.abs(this.targetX - this.x) < 5) {
                this.x = this.targetX;
                this.y = this.y;
                this.body.velocity.setTo(0, 0);
                this.enemyState = enemyStateEnum.idle;
            }
        }
    };
    MasterEnemy.prototype.updateHitbox = function () {
        var _this = this;
        this.hitBoxes.forEach(function (v) {
            if (_this.width < 0) {
                v.scale.setTo(_this.defaultDirection * _this.defaultScaleWidth * -1, _this.defaultScaleHeight);
            }
            else {
                v.scale.setTo(_this.defaultDirection * _this.defaultScaleWidth, _this.defaultScaleHeight);
            }
        });
    };
    // tslint:disable-next-line:cyclomatic-complexity
    MasterEnemy.prototype.checkForGettingHit = function () {
        if (this.player && this.player.damageFrames.indexOf(this.player.animations.frame) >= 0) {
            if (this.player.playerState === playerStateEnum.attack1 && this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
            else if (this.player.playerState === playerStateEnum.attack2 && this.game.physics.arcade.overlap(this, this.player.hitBox2)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
            else if (this.player.playerState === playerStateEnum.attack3 && this.game.physics.arcade.overlap(this, this.player.hitBox3)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    };
    MasterEnemy.prototype.handleDeath = function () {
        if (this.stats.health <= 0 && this.enemyState !== enemyStateEnum.death) {
            this.invincible = true;
            this.enemyState = enemyStateEnum.death;
        }
    };
    MasterEnemy.prototype.takeDamage = function (damage, objPositionX) {
        if (this.canTakeDamage()) {
            this.stats.health -= this.calculateDamage(damage);
            this.invincible = true;
            if (this.stats.health > 0) {
                this.game.time.events.add(1000, this.resetInvincable, this);
                //this.hurt();
                //fix knockback
                this.knockBack(objPositionX);
            }
        }
    };
    MasterEnemy.prototype.hurt = function () {
        var _this = this;
        this.enemyState = enemyStateEnum.knockBack;
        setTimeout(function () {
            _this.enemyState = enemyStateEnum.idle;
        }, 750);
    };
    MasterEnemy.prototype.knockBack = function (objPositionX) {
        this.enemyState = enemyStateEnum.knockBack;
        if (this.x > objPositionX) {
            this.updateScale(-1);
            this.moveNpcTowards(this.x - this.width * this.defaultDirection, this.y, 0.2, 700, enemyStateEnum.idle);
        }
        else {
            this.updateScale(1);
            this.moveNpcTowards(this.x - this.width * this.defaultDirection, this.y, 0.2, 700, enemyStateEnum.idle);
        }
    };
    MasterEnemy.prototype.moveNpcTowards = function (toX, toY, speed, time, endState) {
        var _this = this;
        if (time === void 0) { time = 0; }
        if (endState === void 0) { endState = enemyStateEnum.idle; }
        this.game.physics.arcade.moveToXY(this, toX, toY, speed, time);
        this.game.time.events.add(time, function () {
            _this.body.velocity.x = 0;
            _this.body.velocity.y = 0;
            _this.x = toX;
            _this.y = toY;
            _this.enemyState = endState;
        }, this);
    };
    MasterEnemy.prototype.checkForHitting = function () {
        if (this.player &&
            this.damageFrames.indexOf(this.animations.frame) >= 0 &&
            this.game.physics.arcade.overlap(this.hitBox1, this.player)) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    };
    MasterEnemy.prototype.resetInvincable = function () {
        this.invincible = false;
    };
    MasterEnemy.prototype.calculateDamage = function (damage) {
        if (this.stats.health - damage < 0) {
            return this.stats.health;
        }
        return damage;
    };
    MasterEnemy.prototype.canTakeDamage = function () {
        if (this.invincible || this.enemyState === enemyStateEnum.death) {
            return false;
        }
        return true;
    };
    MasterEnemy.prototype.resetVelocity = function () {
        if (this.enemyState !== enemyStateEnum.movingWalk &&
            this.enemyState !== enemyStateEnum.knockBack) {
            this.body.velocity.x = 0;
        }
    };
    MasterEnemy.prototype.attack = function () {
        var _this = this;
        if (this.player && this.player.x > this.x) {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth, this.defaultScaleHeight);
        }
        else {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * -1, this.defaultScaleHeight);
        }
        this.enemyState = enemyStateEnum.attack1;
        this.allowAttack = false;
        this.attackTimer = setTimeout(function () {
            _this.allowAttack = true;
        }, this.attackCooldown);
    };
    MasterEnemy.prototype.chase = function () {
        if (!this.player) {
            return;
        }
        this.enemyState = enemyStateEnum.movingChase;
        if (this.player.x > this.x) {
            this.updateScale(1);
        }
        else {
            this.updateScale(-1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    };
    MasterEnemy.prototype.patrol = function () {
        if (this.x > this.spawnPositionX + this.maxWanderRange) {
            this.patrolDirection = 1;
        }
        else if (this.x < this.spawnPositionX - this.maxWanderRange) {
            this.patrolDirection = 0;
        }
        if (this.patrolDirection) {
            this.moveLeft(this.maxWanderRange);
        }
        else {
            this.moveRight(this.maxWanderRange);
        }
    };
    MasterEnemy.prototype.wander = function () {
        if (this.x > this.spawnPositionX + this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        else if (this.x < this.spawnPositionX - this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        var direction = this.game.rnd.integerInRange(0, 1);
        var distance = this.game.rnd.integerInRange(20, this.maxWanderRange);
        if (direction) {
            this.moveLeft(distance);
        }
        else {
            this.moveRight(distance);
        }
    };
    MasterEnemy.prototype.moveEnemyTo = function (toX, toY, speed) {
        this.enemyState = enemyStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(this, toX, toY, speed);
        this.targetX = toX;
        this.targetY = toY;
        if (this.targetX > this.x) {
            this.updateScale(1);
        }
        else {
            this.updateScale(-1);
        }
    };
    MasterEnemy.prototype.moveLeft = function (distance) {
        if (this.x - distance < this.spawnPositionX - this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveEnemyTo(this.x - distance, this.y, this.stats.movespeed);
        }
    };
    MasterEnemy.prototype.moveRight = function (distance) {
        if (this.x + distance > this.spawnPositionX + this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveEnemyTo(this.x + distance, this.y, this.stats.movespeed);
        }
    };
    MasterEnemy.prototype.idle = function () {
        if (this.canIdle[this.enemyState]) {
            var rndNumber = this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                this.enemyState = enemyStateEnum.idleSpecial;
            }
            else {
                this.enemyState = enemyStateEnum.idle;
            }
        }
    };
    MasterEnemy.prototype.updateScale = function (direction, upsideDown) {
        if (direction === void 0) { direction = 1; }
        if (upsideDown === void 0) { upsideDown = 1; }
        this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * direction, this.defaultScaleHeight * upsideDown);
    };
    return MasterEnemy;
}(Phaser.Sprite));
function enemyAllowance(array) {
    var _a;
    var obj = (_a = {},
        _a[enemyStateEnum.movingWalk] = false,
        _a[enemyStateEnum.movingFall] = false,
        _a[enemyStateEnum.idle] = false,
        _a[enemyStateEnum.idleSpecial] = false,
        _a[enemyStateEnum.attack1] = false,
        _a[enemyStateEnum.attack2] = false,
        _a[enemyStateEnum.attack3] = false,
        _a[enemyStateEnum.death] = false,
        _a[enemyStateEnum.sit] = false,
        _a[enemyStateEnum.sitDown] = false,
        _a[enemyStateEnum.movingChase] = false,
        _a[enemyStateEnum.knockBack] = false,
        _a);
    array.forEach(function (v) {
        obj[v] = true;
    });
    return obj;
}
/// <reference path="./masterEnemy.ts"/>
var AdventurerEnemy = /** @class */ (function (_super) {
    __extends(AdventurerEnemy, _super);
    function AdventurerEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "adventurer", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [45, 46];
        _this.moveOption = moveOption.wander;
        _this.bodyWidth = 10;
        _this.bodyHeight = 30;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("idlespecial", [38, 39, 40, 41], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("walk", [8, 9, 10], 3, true);
        _this.animations.add("attack1", [42, 43, 44, 45, 46, 47, 48, 49], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [62, 63, 64, 65, 66, 67, 68], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [57, 58, 59, 60, 61], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(25, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return AdventurerEnemy;
}(MasterEnemy));
var BossOverlay = /** @class */ (function (_super) {
    __extends(BossOverlay, _super);
    function BossOverlay(game, x, y, boss) {
        var _this = _super.call(this, game, x, y, "") || this;
        _this.maxHpBar = 830;
        _this.scale.setTo(0.4, 0.4);
        _this.boss = boss;
        _this.healthBar = _this.game.add.image(66, 12, "healthbar");
        _this.healthBar.height = 50;
        _this.healthBar.width = _this.maxHpBar;
        _this.addChild(_this.healthBar);
        _this.overlay = _this.game.add.image(0, 0, "bossoverlay");
        _this.addChild(_this.overlay);
        _this.fixedToCamera = true;
        return _this;
    }
    BossOverlay.prototype.update = function () {
        this.updateHealthBar(this.boss.stats.maxHealth, this.boss.stats.health);
    };
    BossOverlay.prototype.updateHealthBar = function (max, current) {
        this.healthBar.width = this.maxHpBar / max * current;
    };
    return BossOverlay;
}(Phaser.Image));
/// <reference path="./masterEnemy.ts"/>
var DjinnBanditEnemy = /** @class */ (function (_super) {
    __extends(DjinnBanditEnemy, _super);
    function DjinnBanditEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "djinnbandit", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [13, 14];
        _this.bodyWidth = 10;
        _this.bodyHeight = 32;
        _this.defaultDirection = -1;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.3, 8);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7, 8, 9], 10, true);
        _this.animations.add("attack1", [10, 11, 12, 13, 14, 15], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [20, 21, 22, 23, 24, 25, 26], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [15, 16, 17, 18, 19], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(5, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(20, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return DjinnBanditEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var KoboldEnemy = /** @class */ (function (_super) {
    __extends(KoboldEnemy, _super);
    function KoboldEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "kobold", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.defaultDirection = -1;
        _this.damageFrames = [12, 13, 14];
        _this.attackCount = 0;
        _this.resetAttackCount = null;
        _this.attackCooldown = 5000;
        _this.moveOption = moveOption.patrol;
        _this.bodyWidth = 18;
        _this.bodyHeight = 28;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2 + 10, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 150,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7, 8, 9], 3, true);
        _this.animations.add("attack1", [10, 11, 12, 13, 14], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("knockback", [15, 16, 17, 18,], 10, false);
        _this.animations.add("death", [19, 20, 21, 22, 23, 24], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(32, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    KoboldEnemy.prototype.attack = function () {
        var _this = this;
        if (this.player && this.player.x > this.x) {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth, this.defaultScaleHeight);
        }
        else {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * -1, this.defaultScaleHeight);
        }
        this.enemyState = enemyStateEnum.attack1;
        this.attackCount++;
        if (this.attackCount >= 3) {
            this.allowAttack = false;
        }
        if (this.resetAttackCount) {
            clearTimeout(this.resetAttackCount);
        }
        this.resetAttackCount = setTimeout(function () {
            _this.attackCount = 0;
        }, 3000);
        this.attackTimer = setTimeout(function () {
            _this.allowAttack = true;
            _this.attackCount = 0;
        }, this.attackCooldown);
    };
    return KoboldEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var MandrakeEnemy = /** @class */ (function (_super) {
    __extends(MandrakeEnemy, _super);
    function MandrakeEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "mandrake", 0) || this;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [19, 20];
        _this.defaultDirection = -1;
        _this.bodyWidth = 10;
        _this.bodyHeight = 32;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.5, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
        _this.animations.add("attack1", [15, 16, 17, 18, 19, 20, 21], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [29, 30, 31, 32, 33, 34], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [22, 23, 24, 25, 26, 27, 28, 29], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(10, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(25, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return MandrakeEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var MinotaurEnemy = /** @class */ (function (_super) {
    __extends(MinotaurEnemy, _super);
    function MinotaurEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "minotaur", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [17, 18];
        _this.defaultDirection = -1;
        _this.bodyWidth = 25;
        _this.bodyHeight = 46;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.6, 30);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [6, 7, 8, 9, 10, 11], 3, true);
        _this.animations.add("attack1", [12, 13, 14, 15, 16, 17, 18, 19, 20], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [37, 38, 39, 40, 41, 42], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [31, 32, 33, 34, 35, 36], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(-10, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(36, 36);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return MinotaurEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var OgreEnemy = /** @class */ (function (_super) {
    __extends(OgreEnemy, _super);
    function OgreEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "ogre", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [13, 14];
        _this.defaultDirection = -1;
        _this.bodyWidth = 15;
        _this.bodyHeight = 36;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.6, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7, 8, 9], 3, true);
        _this.animations.add("attack1", [10, 11, 12, 13, 14, 15, 16], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [23, 24, 25, 26, 27, 28], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [18, 19, 20, 21, 22], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(26, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return OgreEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var RatEnemy = /** @class */ (function (_super) {
    __extends(RatEnemy, _super);
    function RatEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "rat", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [12, 13];
        _this.defaultDirection = -1;
        _this.bodyWidth = 20;
        _this.bodyHeight = 15;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 3, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7], 3, true);
        _this.animations.add("attack1", [8, 9, 10, 11, 12, 13], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [20, 21], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [18, 19], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(22, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return RatEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var RedOgreEnemy = /** @class */ (function (_super) {
    __extends(RedOgreEnemy, _super);
    function RedOgreEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "redogre", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [16, 17];
        _this.defaultDirection = -1;
        _this.bodyWidth = 15;
        _this.bodyHeight = 40;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.6, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7, 8, 9, 10], 10, true);
        _this.animations.add("attack1", [11, 12, 13, 14, 15, 16, 17, 18], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [25, 26, 27, 28, 29], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [20, 21, 22, 23, 24], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(25, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return RedOgreEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var RogueEnemy = /** @class */ (function (_super) {
    __extends(RogueEnemy, _super);
    function RogueEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "rogue", 0) || this;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [34, 35, 36];
        _this.bodyWidth = 16;
        _this.bodyHeight = 32;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, _this.height - _this.bodyHeight);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false).onComplete.add(function () {
        });
        _this.animations.add("idlespecial", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, true);
        _this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [40], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(15, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return RogueEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var SatyrEnemy = /** @class */ (function (_super) {
    __extends(SatyrEnemy, _super);
    function SatyrEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "satyr", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [13, 14];
        _this.defaultDirection = -1;
        _this.bodyWidth = 10;
        _this.bodyHeight = 36;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.4, 8);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7, 8, 9], 3, true);
        _this.animations.add("attack1", [10, 11, 12, 13, 14, 15, 16], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [23, 24, 25, 26, 27], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [18, 19, 20, 21, 22], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(5, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(30, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return SatyrEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var Slime = /** @class */ (function (_super) {
    __extends(Slime, _super);
    function Slime(game, x, y) {
        var _this = _super.call(this, game, x, y, "slime", 0) || this;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.defaultDirection = -1;
        _this.damageFrames = [10, 11];
        _this.moveOption = moveOption.wander;
        _this.bodyWidth = 16;
        _this.bodyHeight = 15;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, _this.height - _this.bodyHeight);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 50,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("idlespecial", [0, 1, 2, 3], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("walk", [4, 5, 6, 7], 10, true);
        _this.animations.add("attack1", [8, 9, 10, 11, 12], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [13, 14, 15, 16], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(15, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return Slime;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var SlimeBaby = /** @class */ (function (_super) {
    __extends(SlimeBaby, _super);
    function SlimeBaby(game, x, y, parentBoss, player) {
        var _this = _super.call(this, game, x, y, "slime", 0) || this;
        _this.defaultDirection = -1;
        _this.isMoving = false;
        _this.merged = false;
        _this.canStartMovingToParent = false;
        _this.canMerge = false;
        _this.player = player;
        _this.parentBoss = parentBoss;
        _this.bodyWidth = 16;
        _this.bodyHeight = 15;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, _this.height - _this.bodyHeight);
        _this.maxHealth = 1;
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 40,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7], 10, true);
        _this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(function () {
            _this.parentBoss.stats.health -= 1;
            _this.kill();
        });
        _this.health = _this.maxHealth;
        _this.body.velocity.y = -_this.game.rnd.integerInRange(200, 1000);
        _this.body.velocity.x = _this.game.rnd.integerInRange(-500, 500);
        return _this;
    }
    SlimeBaby.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.enemyAnimations[this.enemyState]);
        this.moveToParent();
        this.mergeWithParent();
        this.checkForGettingHit();
        this.handleDeath();
        this.updateHitbox();
    };
    // tslint:disable-next-line:cyclomatic-complexity
    SlimeBaby.prototype.checkForGettingHit = function () {
        if (this.player && this.player.playerState === playerStateEnum.attack1) {
            if (!this.merged && this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
        else if (this.player && this.player.playerState === playerStateEnum.attack2) {
            if (!this.merged && this.game.physics.arcade.overlap(this, this.player.hitBox2)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
        else if (this.player && this.player.playerState === playerStateEnum.attack3) {
            if (!this.merged && this.game.physics.arcade.overlap(this, this.player.hitBox3)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    };
    SlimeBaby.prototype.mergeWithParent = function () {
        if (this.stats.health > 0 && this.canMerge && !this.merged && this.game.physics.arcade.overlap(this, this.parentBoss)) {
            this.parentBoss.fakeHealth += this.stats.health;
            this.merged = true;
            this.kill();
            this.destroy();
        }
    };
    SlimeBaby.prototype.resetVelocity = function () {
        if (this.merged) {
            this.body.velocity.x = 0;
        }
    };
    SlimeBaby.prototype.moveToParent = function () {
        if (this.isMoving) {
            return;
        }
        if (this.body.y < this.parentBoss.body.y) {
            return;
        }
        if (this.parentBoss.body.x > this.body.x) {
            this.updateScale(1);
        }
        else {
            this.updateScale(-1);
        }
        this.enemyState = enemyStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(this, this.parentBoss.centerX, this.body.y, this.stats.movespeed);
        this.isMoving = true;
        this.canMerge = true;
    };
    return SlimeBaby;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var SlimeBoss = /** @class */ (function (_super) {
    __extends(SlimeBoss, _super);
    function SlimeBoss(game, x, y, ground, walls, player, enemyGroup) {
        var _a;
        var _this = _super.call(this, game, x, y, "slimeboss", 0) || this;
        _this.slimeBossAnimations = (_a = {},
            _a[slimeBossStateEnum.jumpingToPlayer] = "jump",
            _a[slimeBossStateEnum.jumpingToWall] = "jump",
            _a[slimeBossStateEnum.idle] = "idle",
            _a[slimeBossStateEnum.death] = "death",
            _a[slimeBossStateEnum.regenerating] = "regenerating",
            _a[slimeBossStateEnum.splattered] = "splatter",
            _a);
        _this.canJumpToPlayer = slimeBossAllowance([
            slimeBossStateEnum.idle
        ]);
        _this.canJumpToWall = slimeBossAllowance([
            slimeBossStateEnum.idle
        ]);
        _this.canSplatter = slimeBossAllowance([
            slimeBossStateEnum.jumpingToPlayer
        ]);
        _this.canRegenerate = slimeBossAllowance([
            slimeBossStateEnum.regenerating,
            slimeBossStateEnum.splattered
        ]);
        _this.canDoNothing = slimeBossAllowance([
            slimeBossStateEnum.regenerating
        ]);
        _this.defaultDirection = -1;
        _this.isDoingJumpAttack = false;
        _this.goingToJump = false;
        _this.canSpawnNormalEnemy = true;
        _this.damageFrames = [26];
        _this.enemyGroup = enemyGroup;
        _this.player = player;
        _this.slimeBossState = slimeBossStateEnum.idle;
        _this.ground = ground;
        _this.walls = walls;
        _this.bodyWidth = 75;
        _this.bodyHeight = 60;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, _this.height - _this.bodyHeight - 6);
        _this.maxHealth = 250;
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 60,
            luck: 1,
        };
        _this.fakeHealth = _this.maxHealth;
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7], 10, true);
        _this.animations.add("jump", [26], 10, false);
        _this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(function () {
            _this.bossOverlay.destroy();
            _this.kill();
        });
        _this.animations.add("splatter", [17, 18, 19, 20], 10, false).onComplete.add(function () {
        });
        _this.animations.add("regenerating", [21, 22, 23, 24, 25], 1, false).onComplete.add(function () {
        });
        _this.health = _this.maxHealth;
        _this.bossOverlay = _this.game.add.group();
        _this.bossOverlay.add(new BossOverlay(_this.game, _this.game.camera.width / 4, _this.game.camera.height - 29, _this));
        _this.game.world.bringToTop(_this.bossOverlay);
        return _this;
    }
    SlimeBoss.prototype.update = function () {
        this.resetVelocity();
        if (this.slimeBossState !== slimeBossStateEnum.regenerating) {
            this.animations.play(this.slimeBossAnimations[this.slimeBossState]);
        }
        this.checkForHitting();
        this.handleInput();
        this.handleDeath();
        this.handleRotation();
        this.updateHitbox();
    };
    SlimeBoss.prototype.handleDeath = function () {
        if (this.stats.health <= 0 && this.slimeBossState !== slimeBossStateEnum.death) {
            this.invincible = true;
            this.slimeBossState = slimeBossStateEnum.death;
        }
    };
    SlimeBoss.prototype.handleRotation = function () {
        if (this.onGround()) {
            this.angle = 0;
        }
        if (this.onWall()) {
            this.anchor.setTo(0.5, 0.5);
            if (this.body.x < 300) {
                this.updateScale(-1, 1);
                this.angle = 90;
            }
            else {
                this.updateScale(1, -1);
                this.angle = -90;
            }
        }
        if (!this.onWall() && !this.onGround() && this.body.velocity.x > 0) {
            this.updateScale(1);
        }
        else {
            this.updateScale(-1);
        }
    };
    SlimeBoss.prototype.checkForHitting = function () {
        if (this.damageFrames.indexOf(this.animations.frame) >= 0 &&
            this.game.physics.arcade.overlap(this, this.player) &&
            this.slimeBossState === slimeBossStateEnum.jumpingToPlayer) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    };
    SlimeBoss.prototype.jumpToWall = function () {
        this.slimeBossState = slimeBossStateEnum.jumpingToWall;
        var arrayX = [];
        var arrayY = [];
        this.walls.forEach(function (v) {
            arrayX.push(v.body.x);
            arrayY.push(v.body.height);
        });
        var wall = this.game.rnd.integerInRange(0, this.walls.length - 1);
        var tx = arrayX[wall];
        var ty = arrayY[wall];
        var angle = this.game.physics.arcade.angleToXY(this, tx, ty);
        var arrayD = [-1, 1];
        var direction = this.game.rnd.integerInRange(0, arrayD.length - 1);
        this.body.velocity.x = -(this.body.x + Math.cos(angle) * this.width / 2) * arrayD[direction] * 2;
        this.body.velocity.y = -(this.body.y + Math.sin(angle) * this.height / 2);
        this.goingToJump = false;
    };
    SlimeBoss.prototype.resetVelocity = function () {
        if (this.onGround()) {
            this.body.gravity.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        if (this.onWall() && this.slimeBossState !== slimeBossStateEnum.jumpingToPlayer) {
            this.body.gravity.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        if (!this.onWall() && !this.onGround() && this.slimeBossState !== slimeBossStateEnum.jumpingToPlayer) {
            this.body.gravity.y = 1000;
        }
    };
    // tslint:disable-next-line:cyclomatic-complexity
    SlimeBoss.prototype.handleInput = function () {
        var _this = this;
        if (this.canJumpToWall[this.slimeBossState] && this.onGround() && !this.goingToJump) {
            this.goingToJump = true;
            setTimeout(function () {
                _this.jumpToWall();
            }, this.game.rnd.integerInRange(1000, 2000));
        }
        if (this.canJumpToPlayer[this.slimeBossState] && this.onWall() && !this.goingToJump) {
            this.goingToJump = true;
            setTimeout(function () {
                _this.jumpAttack();
            }, this.game.rnd.integerInRange(500, 2500));
        }
        if (this.canSplatter[this.slimeBossState] && this.onGround()) {
            this.splatter();
        }
        if (this.canRegenerate[this.slimeBossState]) {
            this.regenerate();
        }
        if (this.slimeBossState === slimeBossStateEnum.jumpingToWall &&
            this.canSpawnNormalEnemy &&
            this.x < this.player.x &&
            this.x + this.width > this.player.x + this.player.width) {
            this.spawnNormalEnemy();
        }
        this.idle();
    };
    SlimeBoss.prototype.spawnNormalEnemy = function () {
        var _this = this;
        this.canSpawnNormalEnemy = false;
        setTimeout(function () {
            _this.canSpawnNormalEnemy = true;
        }, 1000);
        this.stats.health -= 5;
        this.fakeHealth = this.stats.health;
        var slime = new Slime(this.game, this.centerX, this.y - 30);
        slime.player = this.player;
        this.enemyGroup.add(slime);
    };
    SlimeBoss.prototype.idle = function () {
        if ((this.onWall() && this.slimeBossState !== slimeBossStateEnum.jumpingToPlayer) ||
            (this.onGround() && this.canDoNothing[this.slimeBossState] && this.stats.health === this.fakeHealth)) {
            this.slimeBossState = slimeBossStateEnum.idle;
        }
    };
    SlimeBoss.prototype.regenerate = function () {
        this.slimeBossState = slimeBossStateEnum.regenerating;
        var num = this.stats.health / 5;
        if (this.fakeHealth < num) {
            this.animations.frame = 21;
        }
        else if (this.fakeHealth < num * 2) {
            this.animations.frame = 22;
        }
        else if (this.fakeHealth < num * 3) {
            this.animations.frame = 23;
        }
        else if (this.fakeHealth < num * 4) {
            this.animations.frame = 24;
        }
        else if (this.fakeHealth < num * 5) {
            this.animations.frame = 25;
        }
    };
    SlimeBoss.prototype.onGround = function () {
        return this.game.physics.arcade.overlap(this, this.ground);
    };
    SlimeBoss.prototype.jumpAttack = function () {
        this.jumpToPlayer();
        this.isDoingJumpAttack = true;
        if (this.isDoingJumpAttack && this.game.physics.arcade.overlap(this, this.player)) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
        this.goingToJump = false;
    };
    SlimeBoss.prototype.jumpToPlayer = function () {
        var _this = this;
        this.slimeBossState = slimeBossStateEnum.jumpingToPlayer;
        var px = this.player.body.x + this.player.width / 2;
        var py = this.player.body.y - this.player.height / 2;
        this.game.physics.arcade.moveToXY(this, px, py, 1000, 500);
        setTimeout(function () {
            _this.x = px;
            _this.y = py;
        }, 500);
    };
    SlimeBoss.prototype.onWall = function () {
        return this.game.physics.arcade.overlap(this, this.walls);
    };
    SlimeBoss.prototype.splatter = function () {
        this.slimeBossState = slimeBossStateEnum.splattered;
        for (var ii = 0; ii < this.stats.health; ii++) {
            this.fakeHealth -= 1;
            this.enemyGroup.add(new SlimeBaby(this.game, this.centerX, this.y - 30, this, this.player));
        }
    };
    return SlimeBoss;
}(MasterEnemy));
function slimeBossAllowance(array) {
    var _a;
    var obj = (_a = {},
        _a[slimeBossStateEnum.jumpingToPlayer] = false,
        _a[slimeBossStateEnum.jumpingToWall] = false,
        _a[slimeBossStateEnum.idle] = false,
        _a[slimeBossStateEnum.death] = false,
        _a[slimeBossStateEnum.regenerating] = false,
        _a[slimeBossStateEnum.splattered] = false,
        _a);
    array.forEach(function (v) {
        obj[v] = true;
    });
    return obj;
}
/// <reference path="./masterEnemy.ts"/>
var WerewolfEnemy = /** @class */ (function (_super) {
    __extends(WerewolfEnemy, _super);
    function WerewolfEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "werewolf", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [13, 14];
        _this.defaultDirection = -1;
        _this.bodyWidth = 20;
        _this.bodyHeight = 37;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.4, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7, 8, 9], 10, true);
        _this.animations.add("attack1", [10, 11, 12, 13, 14, 15, 16], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [21, 22, 23, 24, 25, 26, 27], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [16, 17, 18, 19, 20], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(35, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(70, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return WerewolfEnemy;
}(MasterEnemy));
/// <reference path="./masterEnemy.ts"/>
var YetiEnemy = /** @class */ (function (_super) {
    __extends(YetiEnemy, _super);
    function YetiEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "yeti", 0) || this;
        _this.minWanderRange = 100;
        _this.maxWanderRange = 100;
        _this.maxAggroRange = 100;
        _this.damageFrames = [12];
        _this.defaultDirection = -1;
        _this.bodyWidth = 20;
        _this.bodyHeight = 50;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 1.4, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(function () {
        });
        _this.animations.add("walk", [4, 5, 6, 7, 8, 9], 10, true);
        _this.animations.add("attack1", [10, 11, 12, 13, 14], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [28, 29, 30, 31, 32, 33], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.animations.add("knockback", [23, 24, 25, 26, 27], 10, false);
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(25, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    return YetiEnemy;
}(MasterEnemy));
var MasterLevel = /** @class */ (function (_super) {
    __extends(MasterLevel, _super);
    function MasterLevel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level0;
        _this.playerStorage = JSON.parse(window.localStorage.getItem("player"));
        _this.debugMode = false;
        return _this;
    }
    MasterLevel.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.npcs, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);
        this.game.physics.arcade.collide(this.items, this.platforms);
        this.game.physics.arcade.collide(this.signs, this.platforms);
        this.game.physics.arcade.collide(this.player, this.gates);
        this.game.physics.arcade.collide(this.enemies, this.gates);
        this.game.physics.arcade.collide(this.npcs, this.gates);
        this.game.physics.arcade.collide(this.player, this.grounds);
        this.game.physics.arcade.collide(this.enemies, this.grounds);
        this.game.physics.arcade.collide(this.npcs, this.grounds);
        this.game.physics.arcade.collide(this.bonfires, this.grounds);
        this.game.physics.arcade.collide(this.items, this.grounds);
        this.game.physics.arcade.collide(this.signs, this.grounds);
        this.game.physics.arcade.collide(this.player, this.walls);
        this.game.physics.arcade.collide(this.enemies, this.walls);
        this.game.physics.arcade.collide(this.npcs, this.walls);
        this.game.physics.arcade.collide(this.bonfires, this.walls);
        this.game.physics.arcade.collide(this.items, this.walls);
        this.game.physics.arcade.collide(this.signs, this.walls);
        this.game.physics.arcade.collide(this.player, this.ceilings);
        this.game.physics.arcade.collide(this.enemies, this.ceilings);
        this.game.physics.arcade.collide(this.npcs, this.ceilings);
        this.game.physics.arcade.collide(this.bonfires, this.ceilings);
        this.game.physics.arcade.collide(this.items, this.ceilings);
        this.game.physics.arcade.collide(this.signs, this.ceilings);
        this.playerFacingBonfire();
        this.playerFacingNpc();
        this.playerFacingItem();
        this.playerFacingSign();
        if (this.debugMode) {
            this.debug();
        }
    };
    MasterLevel.prototype.enablePhysics = function () {
        this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.physics.enable(this.gates, Phaser.Physics.ARCADE);
    };
    MasterLevel.prototype.updateFpsTimer = function () {
        this.game.time.advancedTiming = true;
    };
    MasterLevel.prototype.addGroups = function () {
        this.enemies = this.game.add.group();
        this.platforms = this.game.add.group();
        this.ceilings = this.game.add.group();
        this.walls = this.game.add.group();
        this.grounds = this.game.add.group();
        this.gates = this.game.add.group();
        this.npcs = this.game.add.group();
        this.bonfires = this.game.add.group();
        this.items = this.game.add.group();
        this.signs = this.game.add.group();
    };
    MasterLevel.prototype.addPlayerToNpcs = function () {
        var _this = this;
        this.npcs.forEach(function (v) {
            v.player = _this.player;
        });
    };
    MasterLevel.prototype.addPlayerToGates = function () {
        var _this = this;
        this.gates.forEach(function (v) {
            v.player = _this.player;
        });
    };
    MasterLevel.prototype.addPlayerToEnemies = function () {
        var _this = this;
        this.enemies.forEach(function (v) {
            v.player = _this.player;
        });
    };
    MasterLevel.prototype.playerFacingNpc = function () {
        var _this = this;
        this.npcs.forEach(function (v) {
            if (_this.game.physics.arcade.overlap(_this.player, v)) {
                v.canInteract = true;
                _this.player.facingNpc = v;
            }
            else {
                v.canInteract = false;
                _this.player.facingNpc = null;
            }
        });
    };
    MasterLevel.prototype.playerFacingItem = function () {
        var _this = this;
        this.items.forEach(function (v) {
            if (_this.game.physics.arcade.overlap(_this.player, v)) {
                v.canInteract = true;
                _this.player.facingItem = v;
            }
            else {
                v.canInteract = false;
                _this.player.facingItem = null;
            }
        });
    };
    MasterLevel.prototype.playerFacingBonfire = function () {
        var _this = this;
        this.bonfires.forEach(function (v) {
            if (_this.game.physics.arcade.overlap(_this.player, v)) {
                v.canInteract = true;
                _this.player.facingBonfire = v;
            }
            else {
                v.canInteract = false;
                _this.player.facingBonfire = null;
            }
        });
    };
    MasterLevel.prototype.playerFacingSign = function () {
        var _this = this;
        this.signs.forEach(function (v) {
            if (_this.game.physics.arcade.overlap(_this.player, v)) {
                v.canInteract = true;
                _this.player.facingSign = v;
            }
            else {
                v.canInteract = false;
                _this.player.facingSign = null;
            }
        });
    };
    MasterLevel.prototype.roomIsClear = function () {
        if (this.enemies.children.length === 0) {
            this.gates.forEach(function (v) {
                v.roomIsClear = true;
            });
            return true;
        }
        return false;
    };
    MasterLevel.prototype.debug = function () {
        var _this = this;
        this.game.debug.body(this.player);
        this.game.debug.physicsGroup(this.player.hitBoxes);
        this.npcs.forEach(function (v) {
            _this.game.debug.body(v);
            _this.game.debug.physicsGroup(v.hitBoxes);
        });
        this.enemies.forEach(function (v) {
            _this.game.debug.body(v);
            _this.game.debug.physicsGroup(v.hitBoxes);
        });
        this.bonfires.forEach(function (v) {
            _this.game.debug.body(v);
        });
        this.signs.forEach(function (v) {
            _this.game.debug.body(v);
        });
        this.gates.forEach(function (v) {
            _this.game.debug.body(v);
        });
        this.items.forEach(function (v) {
            _this.game.debug.body(v);
        });
    };
    return MasterLevel;
}(Phaser.State));
/// <reference path="./masterLevel.ts"/>
var Level0 = /** @class */ (function (_super) {
    __extends(Level0, _super);
    function Level0() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level0;
        return _this;
    }
    Level0.prototype.preload = function () {
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.addGroups();
        this.background = this.game.add.image(0, 0, "darkbackground");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.game.world.sendToBack(this.background);
        this.game.add.text(100, 0, "Everything you see is a Placeholder");
        this.platforms.enableBody = true;
        this.grounds.enableBody = true;
        this.ceilings.enableBody = true;
        this.walls.enableBody = true;
        var ground = this.grounds.create(0, this.game.world.bounds.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.world.bounds.width;
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.grounds.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.ceilings.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.walls.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.npcs.add(new RogueNpc(this.game, 600, ground.y - ground.height));
        this.items.add(new Item(this.game, 450, ground.y - ground.height, new RingOfStrength()));
        this.signs.add(new Sign(this.game, 200, ground.y - ground.height));
        this.updateFpsTimer();
        this.enablePhysics();
    };
    Level0.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.player = new Player(this.game, 0, 0);
        this.player.y -= this.player.height * 2;
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToNpcs();
        this.addPlayerToEnemies();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    return Level0;
}(MasterLevel));
/// <reference path="./masterLevel.ts"/>
var Level1 = /** @class */ (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level1;
        return _this;
    }
    Level1.prototype.preload = function () {
        this.game.world.setBounds(0, 0, this.game.world.width + 1000, this.game.world.height);
        this.addGroups();
        this.background = 0x49801;
        this.platforms.enableBody = true;
        this.grounds.enableBody = true;
        this.ceilings.enableBody = true;
        this.walls.enableBody = true;
        var ground = this.grounds.create(0, this.game.world.bounds.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.world.bounds.width;
        var ceiling = this.ceilings.create(0, 0, "ceiling");
        ceiling.width = this.game.world.bounds.width;
        var wall = this.walls.create(0, ceiling.height, "wall");
        wall.height = this.game.world.bounds.height - wall.height * 2 - ceiling.height * 2;
        var wall2 = this.walls.create(this.world.bounds.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.world.bounds.height - wall2.height * 2 - ceiling.height * 2;
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.grounds.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.ceilings.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.walls.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.enemies.add(new Slime(this.game, 300, ground.y - ground.height * 2));
        this.enemies.add(new RogueEnemy(this.game, 400, ground.y - ground.height));
        this.enemies.add(new Slime(this.game, 500, ground.y - ground.height * 2));
        this.enemies.add(new AdventurerEnemy(this.game, 600, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 700, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 750, ground.y - ground.height * 2));
        this.enemies.add(new KoboldEnemy(this.game, 800, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 1000, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 1100, ground.y - ground.height * 2));
        this.enemies.add(new KoboldEnemy(this.game, 1200, ground.y - ground.height * 2));
        this.enemies.add(new KoboldEnemy(this.game, 1400, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 1600, ground.y - ground.height * 2));
        this.bonfires.add(new Bonfire(this.game, 500, ground.y - ground.height * 2));
        this.updateFpsTimer();
        this.enablePhysics();
    };
    Level1.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToEnemies();
        this.addPlayerToNpcs();
        this.addPlayerToGates();
    };
    return Level1;
}(MasterLevel));
/// <reference path="./masterLevel.ts"/>
var Level2 = /** @class */ (function (_super) {
    __extends(Level2, _super);
    function Level2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level2;
        return _this;
    }
    Level2.prototype.preload = function () {
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.addGroups();
        this.background = 0x49801;
        this.platforms.enableBody = true;
        this.grounds.enableBody = true;
        this.ceilings.enableBody = true;
        this.walls.enableBody = true;
        var ground = this.grounds.create(0, this.game.world.bounds.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.world.bounds.width;
        var ceiling = this.ceilings.create(0, 0, "ceiling");
        ceiling.width = this.game.world.bounds.width;
        var wall = this.walls.create(0, ceiling.height, "wall");
        wall.height = this.game.world.bounds.height - wall.height * 2 - ceiling.height * 2;
        var wall2 = this.walls.create(this.game.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.world.bounds.height - wall2.height * 2 - ceiling.height * 2;
        this.gates.enableBody = true;
        this.gates.add(new Gate(this.game, wall.x, wall.height));
        this.gates.add(new Gate(this.game, wall2.x, wall2.height));
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.grounds.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.ceilings.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.walls.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.gates.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.updateFpsTimer();
        this.enablePhysics();
    };
    Level2.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        new SlimeBoss(this.game, 600, 200, this.grounds, this.walls, this.player, this.enemies);
        this.addPlayerToEnemies();
        this.addPlayerToNpcs();
        this.addPlayerToGates();
    };
    return Level2;
}(MasterLevel));
/// <reference path="./masterLevel.ts"/>
var Level3 = /** @class */ (function (_super) {
    __extends(Level3, _super);
    function Level3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level1;
        return _this;
    }
    Level3.prototype.preload = function () {
        this.game.world.setBounds(0, 0, this.game.world.width + 1000, this.game.world.height);
        this.addGroups();
        this.background = 0x49801;
        this.platforms.enableBody = true;
        this.grounds.enableBody = true;
        this.ceilings.enableBody = true;
        this.walls.enableBody = true;
        var ground = this.grounds.create(0, this.game.world.bounds.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.world.bounds.width;
        var ceiling = this.ceilings.create(0, 0, "ceiling");
        ceiling.width = this.game.world.bounds.width;
        var wall = this.walls.create(0, ceiling.height, "wall");
        wall.height = this.game.world.bounds.height - wall.height * 2 - ceiling.height * 2;
        var wall2 = this.walls.create(this.world.bounds.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.world.bounds.height - wall2.height * 2 - ceiling.height * 2;
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.grounds.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.ceilings.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.walls.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.enemies.add(new RatEnemy(this.game, 200, ground.y - ground.height * 2));
        this.enemies.add(new MandrakeEnemy(this.game, 400, ground.y - ground.height * 2));
        this.enemies.add(new SatyrEnemy(this.game, 600, ground.y - ground.height * 2));
        this.enemies.add(new DjinnBanditEnemy(this.game, 800, ground.y - ground.height * 2));
        this.enemies.add(new WerewolfEnemy(this.game, 1000, ground.y - ground.height * 2));
        this.enemies.add(new YetiEnemy(this.game, 1200, ground.y - ground.height * 2));
        this.enemies.add(new MinotaurEnemy(this.game, 1400, ground.y - ground.height * 3));
        this.enemies.add(new RedOgreEnemy(this.game, 1600, ground.y - ground.height * 2));
        this.enemies.add(new OgreEnemy(this.game, 1800, ground.y - ground.height * 2));
        this.bonfires.add(new Bonfire(this.game, 500, ground.y - ground.height * 2));
        this.bonfires.add(new Bonfire(this.game, 1500, ground.y - ground.height * 2));
        this.updateFpsTimer();
        this.enablePhysics();
    };
    Level3.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToEnemies();
        this.addPlayerToNpcs();
        this.addPlayerToGates();
    };
    return Level3;
}(MasterLevel));
var Inventory = /** @class */ (function (_super) {
    __extends(Inventory, _super);
    function Inventory(game, x, y, player) {
        var _this = _super.call(this, game, x, y, "") || this;
        _this.MenuStyle = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.InventoryList = [];
        _this.player = player;
        _this.game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.addOnce(function () {
            _this.destroyInventory();
        });
        _this.inventoryBars = _this.game.add.group();
        var bar1 = new InventoryBar(_this.game, _this.x, _this.y, _this.player, "armor", 4);
        var bar2 = new InventoryBar(_this.game, bar1.x, bar1.y + bar1.height, _this.player, itemType.ring, 4);
        var bar3 = new InventoryBar(_this.game, bar2.x, bar2.y + bar2.height, _this.player, "belt", 4);
        var bar4 = new InventoryBar(_this.game, bar2.x, bar3.y + bar3.height, _this.player, "belt", 4);
        _this.inventoryBars.add(bar1);
        _this.inventoryBars.add(bar2);
        _this.inventoryBars.add(bar3);
        _this.inventoryBars.add(bar4);
        _this.inventoryStats = _this.game.add.group();
        var stats = new InventoryStats(_this.game, bar1.x + bar1.width, bar1.y, _this.player);
        _this.inventoryStats.add(stats);
        return _this;
    }
    Inventory.prototype.destroyInventory = function () {
        var _this = this;
        //silly phaser bug skips randomly when doing foreach so filter instead
        this.inventoryBars.filter(function (v) { return true; }).callAll("destroy");
        this.inventoryStats.forEach(function (v) {
            v.destroy();
        });
        setTimeout(function () {
            _this.player.inventory = null;
        }, 100);
        this.destroy();
    };
    return Inventory;
}(Phaser.Image));
var InventoryBar = /** @class */ (function (_super) {
    __extends(InventoryBar, _super);
    function InventoryBar(game, x, y, player, slotType, amount) {
        var _this = _super.call(this, game, x, y, "inventorybar") || this;
        _this.slots = {
            type: 0,
            amount: 0,
            array: [],
        };
        _this.scale.setTo(0.5, 0.5);
        _this.player = player;
        _this.slots = {
            type: slotType,
            amount: amount,
            array: [],
        };
        _this.itemSlot = _this.game.add.group();
        _this.equiptSlot = _this.game.add.group();
        _this.addSlots(_this.slots.array, amount);
        _this.addChild(_this.itemSlot);
        _this.itemSlot.scale.setTo(2, 2);
        _this.addChild(_this.equiptSlot);
        _this.equiptSlot.scale.setTo(2, 2);
        return _this;
    }
    InventoryBar.prototype.addSlots = function (obj, amount) {
        for (var ii = 0; ii < amount; ii++) {
            var image = this.game.add.image(0, 0, "inventoryslot");
            obj.push({
                backgroundImage: image,
                item: this.player.equipment.getEquiptItem(this.slots.type, ii),
                itemImage: null,
                trigger: function () {
                    console.log("hi");
                }
            });
            image.x += ii * (image.width + 20) + 10;
            image.y += image.height / 3;
            image.inputEnabled = true;
            if (obj[ii].item) {
                obj[ii].itemImage = this.game.add.image(image.x, image.y, "ring");
                obj[ii].itemImage.width = image.width;
                obj[ii].itemImage.height = image.height;
                obj[ii].itemImage.events.onInputOver.add(this.showToolTip, this);
                obj[ii].itemImage.events.onInputOut.add(this.hideToolTip, this);
                this.equiptSlot.add(obj[ii].itemImage);
            }
            image.events.onInputUp.add(obj[ii].trigger, this);
            this.itemSlot.add(image);
        }
    };
    InventoryBar.prototype.showToolTip = function () {
    };
    InventoryBar.prototype.hideToolTip = function () {
    };
    return InventoryBar;
}(Phaser.Image));
var InventoryStats = /** @class */ (function (_super) {
    __extends(InventoryStats, _super);
    function InventoryStats(game, x, y, player) {
        var _this = _super.call(this, game, x, y, "inventory") || this;
        _this.nameStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "left",
            boundsAlignV: "middle"
        };
        _this.valueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            align: "right",
            boundsAlignH: "right",
            boundsAlignV: "middle"
        };
        _this.scale.setTo(0.5, 0.5);
        _this.player = player;
        _this.nameText = _this.game.add.group();
        _this.valueText = _this.game.add.group();
        _this.createText();
        _this.addChild(_this.nameText);
        _this.addChild(_this.valueText);
        _this.nameText.scale.setTo(2, 2);
        _this.valueText.scale.setTo(2, 2);
        return _this;
    }
    InventoryStats.prototype.createText = function () {
        var ii = 0;
        var offsetx = 10;
        var offsety = 10;
        for (var key in this.player.stats) {
            ii++;
            var name_1 = this.game.add.text(offsetx, ii * offsety, "" + key, this.nameStyle);
            this.nameText.add(name_1);
            var value = this.game.add.text(this.width, ii * offsety, "" + this.player.stats[key], this.valueStyle);
            value.x -= value.width + offsetx;
            this.valueText.add(value);
        }
    };
    return InventoryStats;
}(Phaser.Image));
var PauseMenu = /** @class */ (function (_super) {
    __extends(PauseMenu, _super);
    function PauseMenu(game, x, y, player) {
        var _this = _super.call(this, game, x, y) || this;
        _this.MenuStyle = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.MenuText = {
            "Continue Game": {
                trigger: function () {
                    _this.continueTheGame();
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 0,
            },
            "Save Game": {
                trigger: function () {
                    _this.player.savePlayer(_this.player.x);
                    alert("Game Saved");
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 50,
            },
            "Load Game": {
                trigger: function () {
                    var loadedGame = JSON.parse(window.localStorage.getItem("player"));
                    if (loadedGame) {
                        _this.game.state.start("level" + loadedGame.currentRoom);
                        _this.continueTheGame();
                    }
                    else {
                        alert("no Saved Game Found!");
                    }
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 100,
            },
            "Options": {
                trigger: function () {
                    alert("Options not yet Implemented");
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 150,
            },
            "Github": {
                trigger: function () {
                    window.open("http://www.github.com/twofist");
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 300,
            },
        };
        _this.player = player;
        _this.game.paused = true;
        _this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.addOnce(function () {
            _this.continueTheGame();
        });
        _this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.addOnce(function () {
            _this.continueTheGame();
        });
        _this.backgroundImage = _this.game.add.image(0, 0, "wall");
        _this.backgroundImage.width = _this.game.camera.width;
        _this.backgroundImage.height = _this.game.camera.height;
        _this.addMenu();
        return _this;
    }
    PauseMenu.prototype.addMenu = function () {
        for (var key in this.MenuText) {
            var obj = this.MenuText[key];
            obj.text = this.game.add.text(obj.x, obj.y, key, obj.style);
            obj.text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            obj.text.setTextBounds(0, 200, 800, 100);
            obj.text.inputEnabled = true;
            obj.text.events.onInputOver.add(this.pauseMenuGlow, this);
            obj.text.events.onInputOut.add(this.pauseMenuStopGlow, this);
            obj.text.events.onInputUp.add(obj.trigger, this);
        }
    };
    PauseMenu.prototype.pauseMenuGlow = function (item) {
        item.fill = "#ffff44";
    };
    PauseMenu.prototype.pauseMenuStopGlow = function (item) {
        item.fill = "#fff";
    };
    PauseMenu.prototype.continueTheGame = function () {
        this.game.paused = false;
        if (!this.game.paused) {
            this.destroyPauseMenu();
        }
    };
    PauseMenu.prototype.destroyPauseMenu = function () {
        this.backgroundImage.destroy();
        for (var key in this.MenuText) {
            var obj = this.MenuText[key];
            if (obj.text) {
                obj.text.destroy();
            }
        }
    };
    return PauseMenu;
}(Phaser.Sprite));
var MasterNpc = /** @class */ (function (_super) {
    __extends(MasterNpc, _super);
    function MasterNpc(game, x, y, key, frame) {
        var _a;
        var _this = _super.call(this, game, x, y, key, frame) || this;
        _this.npcState = npcStateEnum.idle;
        _this.npcDialogue = [
            "..."
        ];
        _this.npcDialogueLine = 0;
        _this.player = null;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.defaultScaleWidth = 1;
        _this.defaultScaleHeight = 1;
        _this.defaultDirection = 1;
        _this.maxWanderRange = 100;
        _this.attackRange = 0;
        _this.aggroRange = 100;
        _this.canInteract = false;
        _this.maxRestRange = 40;
        _this.maxAggroRange = 100;
        _this.attackCooldown = 2000;
        _this.attackTimer = null;
        _this.allowAttack = true;
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.friendly = true;
        _this.canWalk = npcAllowance([
            npcStateEnum.idle,
            npcStateEnum.idleSpecial
        ]);
        _this.canIdle = npcAllowance([
            npcStateEnum.movingChase
        ]);
        _this.canChase = npcAllowance([
            npcStateEnum.movingWalk,
            npcStateEnum.idle,
            npcStateEnum.idleSpecial,
            npcStateEnum.movingChase
        ]);
        _this.canAttack = npcAllowance([
            npcStateEnum.movingWalk,
            npcStateEnum.idle,
            npcStateEnum.idleSpecial,
            npcStateEnum.movingChase
        ]);
        _this.npcAnimations = (_a = {},
            _a[npcStateEnum.movingWalk] = "walk",
            _a[npcStateEnum.movingFall] = "fall",
            _a[npcStateEnum.idle] = "idle",
            _a[npcStateEnum.attack1] = "attack1",
            _a[npcStateEnum.attack2] = "attack2",
            _a[npcStateEnum.attack3] = "attack3",
            _a[npcStateEnum.death] = "death",
            _a[npcStateEnum.sit] = "sit",
            _a[npcStateEnum.sitDown] = "sitdown",
            _a[npcStateEnum.movingChase] = "walk",
            _a[npcStateEnum.idleSpecial] = "idlespecial",
            _a[npcStateEnum.knockBack] = "knockback",
            _a);
        _this.invincible = false;
        _this.hitBox1 = null;
        _this.patrolDirection = 1;
        _this.damageFrames = [];
        _this.moveOption = moveOption.guard;
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.spawnPositionX = x;
        _this.spawnPositionY = y;
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        _this.hitBoxes = _this.game.add.group();
        _this.addChild(_this.hitBoxes);
        return _this;
    }
    MasterNpc.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.npcAnimations[this.npcState]);
        if (!this.friendly) {
            this.handleInput();
            this.stopMovingTo();
            this.canInteract = false;
        }
        this.interaction();
        this.checkForHitting();
        this.checkForGettingHit();
        this.handleDeath();
        this.updateHitbox();
    };
    MasterNpc.prototype.handleInput = function () {
        if (this.player) {
            var distance = this.game.physics.arcade.distanceBetween(this, this.player);
            if (this.isAllowedToAttack()) {
                this.attack();
            }
            else if (this.isAllowedToChase(distance)) {
                this.chase();
            }
            else if (this.isAllowedToWander()) {
                if (this.moveOption === moveOption.patrol) {
                    this.patrol();
                }
                else if (this.moveOption === moveOption.wander) {
                    this.wander();
                }
            }
            else {
                this.idle();
            }
        }
    };
    MasterNpc.prototype.isAllowedToWander = function () {
        if (this.canWalk[this.npcState]) {
            return true;
        }
        return false;
    };
    MasterNpc.prototype.isAllowedToChase = function (distance) {
        if (!this.allowRestRange(distance) &&
            this.betweenAggroRange(distance) &&
            this.canChase[this.npcState]) {
            return true;
        }
        return false;
    };
    MasterNpc.prototype.isAllowedToAttack = function () {
        if (this.game.physics.arcade.overlap(this.player, this.hitBox1) &&
            this.canAttack[this.npcState] &&
            this.allowAttack) {
            return true;
        }
        return false;
    };
    MasterNpc.prototype.allowRestRange = function (distance) {
        if (!this.allowAttack && distance < this.maxRestRange) {
            return true;
        }
        return false;
    };
    MasterNpc.prototype.betweenAggroRange = function (distance) {
        if (!this.game.physics.arcade.overlap(this.player, this.hitBox1) && distance < this.maxAggroRange) {
            return true;
        }
        return false;
    };
    MasterNpc.prototype.stopMovingTo = function () {
        if (this.npcState === npcStateEnum.movingWalk) {
            if (Math.abs(this.targetX - this.x) < 5) {
                this.x = this.targetX;
                this.y = this.y;
                this.body.velocity.setTo(0, 0);
                this.npcState = npcStateEnum.idle;
            }
        }
    };
    // tslint:disable-next-line:cyclomatic-complexity
    MasterNpc.prototype.checkForGettingHit = function () {
        if (this.player && this.player.damageFrames.indexOf(this.player.animations.frame) >= 0) {
            if (this.player.playerState === playerStateEnum.attack1 && this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.friendly = false;
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
            else if (this.player.playerState === playerStateEnum.attack2 && this.game.physics.arcade.overlap(this, this.player.hitBox2)) {
                this.friendly = false;
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
            else if (this.player.playerState === playerStateEnum.attack3 && this.game.physics.arcade.overlap(this, this.player.hitBox3)) {
                this.friendly = false;
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    };
    MasterNpc.prototype.checkForHitting = function () {
        if (this.player &&
            this.damageFrames.indexOf(this.animations.frame) >= 0 &&
            this.game.physics.arcade.overlap(this.hitBox1, this.player)) {
            this.player.takeDamage(this.stats.attack * 50, this.x);
        }
    };
    MasterNpc.prototype.updateHitbox = function () {
        var _this = this;
        this.hitBoxes.forEach(function (v) {
            if (_this.width < 0) {
                v.scale.setTo(-1, 1);
            }
            else {
                v.scale.setTo(1, 1);
            }
        });
    };
    MasterNpc.prototype.handleDeath = function () {
        if (this.stats.health <= 0 && this.npcState !== npcStateEnum.death) {
            this.invincible = true;
            this.npcState = npcStateEnum.death;
        }
    };
    MasterNpc.prototype.takeDamage = function (damage, objPositionX) {
        if (this.canTakeDamage()) {
            this.stats.health -= this.calculateDamage(damage);
            this.invincible = true;
            if (this.stats.health > 0) {
                this.game.time.events.add(1000, this.resetInvincable, this);
                //this.hurt();
                //fix knockback
                this.knockBack(objPositionX);
            }
        }
    };
    MasterNpc.prototype.hurt = function () {
        var _this = this;
        this.npcState = npcStateEnum.knockBack;
        setTimeout(function () {
            _this.npcState = npcStateEnum.idle;
        }, 750);
    };
    MasterNpc.prototype.knockBack = function (objPositionX) {
        this.npcState = npcStateEnum.knockBack;
        if (this.x > objPositionX) {
            this.scale.setTo(-1, 1);
            this.moveNpcTowards(this.x - this.width, this.y, 0.2, 700, npcStateEnum.idle);
        }
        else {
            this.scale.setTo(1, 1);
            this.moveNpcTowards(this.x - this.width, this.y, 0.2, 700, npcStateEnum.idle);
        }
    };
    MasterNpc.prototype.moveNpcTowards = function (toX, toY, speed, time, endState) {
        var _this = this;
        if (time === void 0) { time = 0; }
        if (endState === void 0) { endState = npcStateEnum.idle; }
        this.game.physics.arcade.moveToXY(this, toX, toY, speed, time);
        this.game.time.events.add(time, function () {
            _this.body.velocity.x = 0;
            _this.body.velocity.y = 0;
            _this.x = toX;
            _this.y = toY;
            _this.npcState = endState;
        }, this);
    };
    MasterNpc.prototype.resetInvincable = function () {
        this.invincible = false;
    };
    MasterNpc.prototype.calculateDamage = function (damage) {
        if (this.stats.health - damage < 0) {
            return this.stats.health;
        }
        return damage;
    };
    MasterNpc.prototype.canTakeDamage = function () {
        if (this.invincible || this.npcState === npcStateEnum.death) {
            return false;
        }
        return true;
    };
    MasterNpc.prototype.attack = function () {
        var _this = this;
        if (this.player && this.player.x > this.x) {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth, this.defaultScaleHeight);
        }
        else {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * -1, this.defaultScaleHeight);
        }
        this.npcState = npcStateEnum.attack1;
        this.allowAttack = false;
        this.attackTimer = setTimeout(function () {
            _this.allowAttack = true;
        }, this.attackCooldown);
    };
    MasterNpc.prototype.chase = function () {
        if (!this.player) {
            return;
        }
        this.npcState = npcStateEnum.movingChase;
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    };
    MasterNpc.prototype.patrol = function () {
        if (this.x > this.spawnPositionX + this.maxWanderRange) {
            this.patrolDirection = 1;
        }
        else if (this.x < this.spawnPositionX - this.maxWanderRange) {
            this.patrolDirection = 0;
        }
        if (this.patrolDirection) {
            this.moveLeft(this.maxWanderRange);
        }
        else {
            this.moveRight(this.maxWanderRange);
        }
    };
    MasterNpc.prototype.wander = function () {
        if (this.x > this.spawnPositionX + this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        else if (this.x < this.spawnPositionX - this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        var direction = this.game.rnd.integerInRange(0, 1);
        var distance = this.game.rnd.integerInRange(20, this.maxWanderRange);
        if (direction) {
            this.moveLeft(distance);
        }
        else {
            this.moveRight(distance);
        }
    };
    MasterNpc.prototype.moveNpcTo = function (toX, toY, speed) {
        this.npcState = npcStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(this, toX, toY, speed);
        this.targetX = toX;
        this.targetY = toY;
        if (this.targetX > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
    };
    MasterNpc.prototype.interaction = function () {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract) {
            if (this.npcDialogueLine >= this.npcDialogue.length) {
                this.npcDialogueLine = this.npcDialogue.length - 1;
            }
            this.canInteractText.setText(this.npcDialogue[this.npcDialogueLine]);
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
            if (this.npcDialogueLine > 0) {
                this.npcDialogueLine = 1;
            }
        }
    };
    MasterNpc.prototype.nextDialogueText = function () {
        if (this.canInteract && this.friendly) {
            this.npcDialogueLine++;
        }
    };
    MasterNpc.prototype.resetVelocity = function () {
        if (this.npcState !== npcStateEnum.movingWalk &&
            this.npcState !== npcStateEnum.knockBack) {
            this.body.velocity.x = 0;
        }
    };
    MasterNpc.prototype.moveLeft = function (distance) {
        if (this.x - distance < this.spawnPositionX - this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveNpcTo(this.x - distance, this.y, this.stats.movespeed);
        }
    };
    MasterNpc.prototype.moveRight = function (distance) {
        if (this.x + distance > this.spawnPositionX + this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveNpcTo(this.x + distance, this.y, this.stats.movespeed);
        }
    };
    MasterNpc.prototype.idle = function () {
        if (this.canIdle[this.npcState]) {
            var rndNumber = this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                this.npcState = npcStateEnum.idleSpecial;
            }
            else {
                this.npcState = npcStateEnum.idle;
            }
        }
    };
    MasterNpc.prototype.updateScale = function (direction, upsideDown) {
        if (direction === void 0) { direction = 1; }
        if (upsideDown === void 0) { upsideDown = 1; }
        this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * direction, this.defaultScaleHeight * upsideDown);
    };
    return MasterNpc;
}(Phaser.Sprite));
function npcAllowance(array) {
    var _a;
    var obj = (_a = {},
        _a[npcStateEnum.movingWalk] = false,
        _a[npcStateEnum.movingFall] = false,
        _a[npcStateEnum.idle] = false,
        _a[npcStateEnum.idleSpecial] = false,
        _a[npcStateEnum.attack1] = false,
        _a[npcStateEnum.attack2] = false,
        _a[npcStateEnum.attack3] = false,
        _a[npcStateEnum.death] = false,
        _a[npcStateEnum.sit] = false,
        _a[npcStateEnum.sitDown] = false,
        _a[npcStateEnum.movingChase] = false,
        _a[npcStateEnum.knockBack] = false,
        _a);
    array.forEach(function (v) {
        obj[v] = true;
    });
    return obj;
}
/// <reference path="./masterNpc.ts"/>
var RogueNpc = /** @class */ (function (_super) {
    __extends(RogueNpc, _super);
    function RogueNpc(game, x, y) {
        var _this = _super.call(this, game, x, y, "rogue", 0) || this;
        _this.npcDialogue = [
            "Press E to Talk",
            "hello there traveler",
            "i am A",
            "*Cough*",
            "Aron",
            "it's tough out here you know",
            "hmmm...",
            "it looks like you're new to this place",
            "this place is quite dangerous",
            "heh hehe he",
            "you should be careful",
            "here take this",
            "..."
        ];
        _this.maxWanderRange = 100;
        _this.attackRange = 0;
        _this.aggroRange = 100;
        _this.damageFrames = [34, 35, 36];
        _this.bodyWidth = 16;
        _this.bodyHeight = 32;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, _this.height - _this.bodyHeight);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false).onComplete.add(function () {
        });
        _this.animations.add("idlespecial", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, false).onComplete.add(function () {
            _this.animations.stop();
        });
        _this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, true);
        _this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.npcState = npcStateEnum.idle;
        });
        _this.animations.add("death", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 10, false).onComplete.add(function () {
            _this.kill();
        });
        _this.health = _this.maxHealth;
        _this.hitBox1 = _this.hitBoxes.create(0, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(15, 10);
        _this.hitBox1.name = "attack1";
        return _this;
    }
    RogueNpc.prototype.interaction = function () {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract) {
            if (this.npcDialogueLine >= this.npcDialogue.length) {
                this.npcDialogueLine = this.npcDialogue.length - 1;
            }
            this.canInteractText.setText(this.npcDialogue[this.npcDialogueLine]);
            if (this.npcDialogueLine >= this.npcDialogue.length - 1) {
                this.friendly = false;
            }
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
            if (this.npcDialogueLine > 0) {
                this.npcDialogueLine = 1;
            }
        }
    };
    return RogueNpc;
}(MasterNpc));
var Bonfire = /** @class */ (function (_super) {
    __extends(Bonfire, _super);
    function Bonfire(game, x, y) {
        var _this = _super.call(this, game, x, y, "bonfire", 0) || this;
        _this.bonfireDialogue = {
            lit: "Press E to rest at bonfire",
            unlit: "Press E to light bonfire",
        };
        _this.canInteract = false;
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        _this.bodyWidth = _this.width;
        _this.bodyHeight = _this.height - _this.height / 15;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, -100);
        _this.scale.setTo(0.05, 0.05);
        game.add.existing(_this);
        _this.body.collideWorldBounds = true;
        _this.body.gravity.y = 1000;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.animations.add("bonfire_not_lit", [0]);
        _this.animations.add("bonfire_lit", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, true);
        _this.isLit = false;
        return _this;
    }
    Bonfire.prototype.update = function () {
        if (this.isLit) {
            this.animations.play("bonfire_lit");
        }
        else {
            this.animations.play("bonfire_not_lit");
        }
        this.interaction();
    };
    Bonfire.prototype.interaction = function () {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract && this.isLit) {
            this.canInteractText.setText(this.bonfireDialogue.lit);
        }
        else if (this.canInteract && !this.isLit) {
            this.canInteractText.setText(this.bonfireDialogue.unlit);
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
        }
    };
    return Bonfire;
}(Phaser.Sprite));
var Gate = /** @class */ (function (_super) {
    __extends(Gate, _super);
    function Gate(game, x, y) {
        var _this = _super.call(this, game, x, y, "gate", 0) || this;
        _this.roomIsClear = false;
        _this.isClosed = false;
        _this.height = _this.height * 2;
        _this.y -= (_this.height / 2);
        return _this;
    }
    Gate.prototype.update = function () {
        if (this.player) {
            this.closeGate();
            this.openGate();
        }
    };
    Gate.prototype.openGate = function () {
        var _this = this;
        if (this.isClosed && this.roomIsClear) {
            this.isClosed = false;
            var endX_1 = this.x;
            var endY_1 = this.y -= this.height;
            this.game.physics.arcade.moveToXY(this, endX_1, endY_1, 0.1, 500);
            this.game.time.events.add(500, function () {
                _this.body.velocity.x = 0;
                _this.body.velocity.y = 0;
                _this.x = endX_1;
                _this.y = endY_1;
            }, this);
        }
    };
    Gate.prototype.closeGate = function () {
        var _this = this;
        var distance = this.game.physics.arcade.distanceToXY(this, this.player.x, this.y);
        if (!this.isClosed && !this.roomIsClear && distance > this.width * 2) {
            this.isClosed = true;
            var endX_2 = this.x;
            var endY_2 = this.y + this.height;
            this.game.physics.arcade.moveToXY(this, endX_2, endY_2, 0.2, 500);
            this.game.time.events.add(500, function () {
                _this.body.velocity.x = 0;
                _this.body.velocity.y = 0;
                _this.x = endX_2;
                _this.y = endY_2;
            }, this);
        }
    };
    return Gate;
}(Phaser.Sprite));
var Sign = /** @class */ (function (_super) {
    __extends(Sign, _super);
    function Sign(game, x, y) {
        var _this = _super.call(this, game, x, y, "sign", 0) || this;
        _this.signDialogue = [
            "Press E to interact",
            "i am the mighty sign of knowledge",
            "you seem like a worthy adventurer",
            "hmmm, yes, yes",
            "i've decided!",
            "hear me out, and i shall bless you with power",
            "Press A to walk left",
            "Press D to walk right",
            "Press SPACE to dodge",
            "Press E to interact with things",
            "Press Left Mouse Button to attack",
            "Press I to open inventory",
            "Press Escape or P to pause",
            "Bonfires will heal you",
            "now shoo you're wasting my precious time",
            "*mumbles i hate this job*",
            "..."
        ];
        _this.signDialogueLine = 0;
        _this.canInteract = false;
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.collideWorldBounds = true;
        _this.body.gravity.y = 1000;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        return _this;
    }
    Sign.prototype.update = function () {
        this.interaction();
    };
    Sign.prototype.interaction = function () {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 0, 0, 0);
        }
        if (this.canInteract) {
            if (this.signDialogueLine >= this.signDialogue.length) {
                this.signDialogueLine = this.signDialogue.length - 1;
            }
            this.canInteractText.setText(this.signDialogue[this.signDialogueLine]);
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
            if (this.signDialogueLine > 0) {
                this.signDialogueLine = 1;
            }
        }
    };
    Sign.prototype.nextDialogueText = function () {
        if (this.canInteract) {
            this.signDialogueLine++;
        }
    };
    return Sign;
}(Phaser.Sprite));
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(game, x, y, obj) {
        var _this = _super.call(this, game, x, y, "item", 0) || this;
        _this.canInteract = false;
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.item = obj;
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        _this.body.gravity.y = 1000;
        game.add.existing(_this);
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
        return _this;
    }
    Item.prototype.update = function () {
        this.animations.play("idle");
        this.interaction();
    };
    Item.prototype.interaction = function () {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract) {
            this.canInteractText.setText("press E to pick up");
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
        }
    };
    Item.prototype.remove = function () {
        this.canInteract = false;
        this.canInteractText.setText("");
        this.destroy();
    };
    return Item;
}(Phaser.Sprite));
var MasterRing = /** @class */ (function () {
    function MasterRing() {
        this.effect = {};
        this.itemType = itemType.ring;
        this.image = "ring";
    }
    return MasterRing;
}());
var RingOfStrength = /** @class */ (function (_super) {
    __extends(RingOfStrength, _super);
    function RingOfStrength() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.effect = {};
        _this.itemType = itemType.ring;
        _this.image = "ring";
        return _this;
    }
    return RingOfStrength;
}(MasterRing));
var Equipment = /** @class */ (function () {
    function Equipment() {
        this.ringSlots = [];
        this.beltSlots = [];
        this.armorSlots = [];
        this.equiptRings = [new RingOfStrength()];
        this.equiptBelts = [];
        this.equiptArmors = [];
    }
    Equipment.prototype.addToInventory = function (item) {
        if (item.itemType === itemType.ring) {
            this.ringSlots.push(item);
        }
        if (item.itemType === "armor") {
            this.armorSlots.push(item);
        }
        if (item.itemType === "belt") {
            this.beltSlots.push(item);
        }
    };
    Equipment.prototype.equiptRing = function (item) {
        this.equiptRings.push(item);
    };
    Equipment.prototype.equiptBelt = function (item) {
        this.equiptBelts.push(item);
    };
    Equipment.prototype.equiptArmor = function (item) {
        this.equiptArmors.push(item);
    };
    Equipment.prototype.getEquiptItem = function (type, num) {
        if (type === itemType.ring) {
            return this.equiptRings[num];
        }
        if (type === "belt") {
            return this.equiptBelts[num];
        }
        if (type === "armor") {
            return this.equiptArmors[num];
        }
        return null;
    };
    return Equipment;
}());
var OverlayBar = /** @class */ (function (_super) {
    __extends(OverlayBar, _super);
    function OverlayBar(game, x, y, player) {
        var _this = _super.call(this, game, x, y, "") || this;
        _this.maxHpBar = 300;
        _this.maxStamBar = 288;
        _this.player = player;
        _this.healthBar = _this.game.add.image(52, 7, "healthbar");
        _this.healthBar.height = 30;
        _this.healthBar.width = _this.maxHpBar;
        _this.addChild(_this.healthBar);
        _this.staminaBar = _this.game.add.image(52, 43, "staminabar");
        _this.staminaBar.height = 10;
        _this.staminaBar.width = _this.maxStamBar;
        _this.addChild(_this.staminaBar);
        _this.overlay = _this.game.add.image(0, 0, "overlay");
        _this.addChild(_this.overlay);
        _this.fixedToCamera = true;
        return _this;
    }
    OverlayBar.prototype.update = function () {
        this.updateHealthBar(this.player.stats.maxHealth, this.player.stats.health);
        this.updateStaminaBar(this.player.stats.maxStamina, this.player.stats.stamina);
    };
    OverlayBar.prototype.updateHealthBar = function (max, current) {
        this.healthBar.width = this.maxHpBar / max * current;
    };
    OverlayBar.prototype.updateStaminaBar = function (max, current) {
        this.staminaBar.width = this.maxStamBar / max * current;
    };
    return OverlayBar;
}(Phaser.Image));
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(game, x, y) {
        var _a;
        var _this = _super.call(this, game, x, y, "player", 0) || this;
        _this.playerState = playerStateEnum.idle;
        _this.lastCheckPoint = levelsEnum.level0;
        _this.invincible = false;
        _this.equipment = new Equipment();
        _this.canWalk = playerAllowance([
            playerStateEnum.movingWalk,
            playerStateEnum.idle,
            playerStateEnum.movingStartWalk
        ]);
        _this.canIdle = playerAllowance([
            playerStateEnum.movingWalk,
            playerStateEnum.movingStartWalk
        ]);
        _this.canAttack = playerAllowance([
            playerStateEnum.movingWalk,
            playerStateEnum.idle,
            playerStateEnum.movingStartWalk
        ]);
        _this.canSitDown = playerAllowance([
            playerStateEnum.movingWalk,
            playerStateEnum.idle,
            playerStateEnum.movingStartWalk
        ]);
        _this.canRoll = playerAllowance([
            playerStateEnum.movingWalk,
            playerStateEnum.idle,
            playerStateEnum.movingStartWalk
        ]);
        _this.fpsCounter = _this.game.add.text(_this.game.camera.x, 0, "FPS: " + _this.game.time.fps, {
            font: "24px Arial",
            fill: "#fff"
        });
        _this.currentRoom = 0;
        _this.EnterLevelHandler = {
            Next: false,
            Previous: false,
            Text: null,
            EnterText: "Press E to go to Next Level",
            PreviousText: "Press E to go to Previous Level",
        };
        _this.playerAnimations = (_a = {},
            _a[playerStateEnum.movingWalk] = "walk",
            _a[playerStateEnum.movingFall] = "fall",
            _a[playerStateEnum.idle] = "idle",
            _a[playerStateEnum.attack1] = "attack1",
            _a[playerStateEnum.attack2] = "attack2",
            _a[playerStateEnum.attack3] = "attack3",
            _a[playerStateEnum.death] = "death",
            _a[playerStateEnum.sit] = "sit",
            _a[playerStateEnum.sitDown] = "sitdown",
            _a[playerStateEnum.standUp] = "standup",
            _a[playerStateEnum.movingStartWalk] = "walk",
            _a[playerStateEnum.autoWalkTo] = "walk",
            _a[playerStateEnum.knockBack] = "knockback",
            _a[playerStateEnum.roll] = "rolling",
            _a);
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.damageFrames = [45, 46, 50, 51, 56, 57, 58];
        _this.game.camera.follow(_this, Phaser.Camera.FOLLOW_PLATFORMER, 0.05, 0.05);
        _this.anchor.setTo(0.5, 0);
        //this.scale.setTo(1.5, 1.5);
        _this.inventory = null;
        _this.game.physics.arcade.enableBody(_this);
        _this.game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.bodyWidth = 12;
        _this.bodyHeight = 30;
        _this.body.setSize(_this.bodyWidth / _this.scale.x, _this.bodyHeight / _this.scale.y, (_this.width - _this.bodyWidth) / 2, 5);
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 130,
            luck: 1,
        };
        _this.controls = {
            UP: _this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            DOWN: _this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            LEFT: _this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            RIGHT: _this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            E: _this.game.input.keyboard.addKey(Phaser.Keyboard.E),
            ESC: _this.game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            P: _this.game.input.keyboard.addKey(Phaser.Keyboard.P),
            I: _this.game.input.keyboard.addKey(Phaser.Keyboard.I),
            SPACE: _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            LMB: _this.game.input.activePointer.leftButton,
            RMB: _this.game.input.activePointer.rightButton,
        };
        _this.game.input.onDown.add(function (pointer, event) {
            if (!_this.game.paused) {
                _this.handleAttack();
            }
        });
        //stop rightclick from opening a menu
        _this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
        _this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.W,
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.D,
            Phaser.Keyboard.E
        ]);
        _this.animations.add("idle", [0, 1, 2, 3], 10, false);
        _this.animations.add("startwalk", [1, 2, 3], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.movingWalk;
        });
        _this.animations.add("walk", [8, 9, 10], 10, true);
        _this.animations.add("attack1", [42, 43, 44, 45, 46, 47, 48, 49], 10, false).onComplete.add(function () {
            _this.animations.stop();
            if (_this.controls.LMB.justPressed(500) || _this.controls.LMB.justReleased(500)) {
                _this.playerState = playerStateEnum.attack2;
            }
            else {
                _this.playerState = playerStateEnum.idle;
            }
        });
        _this.animations.add("attack2", [49, 50, 51, 52, 52], 10, false).onComplete.add(function () {
            _this.animations.stop();
            if (_this.controls.LMB.justPressed(500) || _this.controls.LMB.justReleased(500)) {
                _this.playerState = playerStateEnum.attack3;
            }
            else {
                _this.playerState = playerStateEnum.idle;
            }
        });
        _this.animations.add("attack3", [53, 54, 55, 56, 57, 58, 59], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("sitdown", [62, 63, 64, 65], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.savePlayer(_this.x);
            _this.playerState = playerStateEnum.sit;
        });
        _this.animations.add("sit", [65], 3, false);
        _this.animations.add("standup", [65, 64, 63, 62], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("death", [62, 63, 64, 65, 66, 67, 68], 10, false).onComplete.add(function () {
            _this.kill();
            _this.game.state.start("title");
        });
        _this.animations.add("rolling", [24, 25, 26, 27, 28], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("knockback", [62], 10, true);
        _this.hitBoxes = _this.game.add.group();
        _this.addChild(_this.hitBoxes);
        _this.hitBox1 = _this.hitBoxes.create(0, 0);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox1.body.setSize(25, _this.height);
        _this.hitBox1.name = "attack1";
        _this.hitBox2 = _this.hitBoxes.create(-15, 0);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox2.body.setSize(40, _this.height);
        _this.hitBox2.name = "attack2";
        _this.hitBox3 = _this.hitBoxes.create(-25, _this.height / 2);
        _this.game.physics.enable(_this.hitBoxes, Phaser.Physics.ARCADE);
        _this.hitBox3.body.setSize(50, _this.height / 2);
        _this.hitBox3.name = "attack3";
        _this.playerOverlay = _this.game.add.group();
        _this.playerOverlay.add(new OverlayBar(_this.game, 50, 50, _this));
        _this.game.world.bringToTop(_this.playerOverlay);
        _this.fpsCounter.fixedToCamera = true;
        return _this;
    }
    Player.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.playerAnimations[this.playerState]);
        this.handleInput();
        this.handleRoll();
        this.handleEnteringLevel();
        this.handleDeath();
        this.updateHitbox();
        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    };
    Player.prototype.handleItem = function () {
        this.equipment.addToInventory(this.facingItem.item);
        this.facingItem.remove();
    };
    Player.prototype.updateHitbox = function () {
        var _this = this;
        this.hitBoxes.forEach(function (v) {
            if (_this.width < 0) {
                v.scale.setTo(-1, 1);
            }
            else {
                v.scale.setTo(1, 1);
            }
        });
    };
    Player.prototype.handleRoll = function () {
        if (this.playerState === playerStateEnum.roll) {
            this.invincible = true;
        }
        else if (this.playerState !== playerStateEnum.knockBack) {
            this.resetInvincable();
        }
    };
    Player.prototype.handleDeath = function () {
        if (this.stats.health <= 0 && this.playerState !== playerStateEnum.death) {
            this.invincible = true;
            this.playerState = playerStateEnum.death;
        }
    };
    Player.prototype.takeDamage = function (damage, objPositionX) {
        if (this.canTakeDamage()) {
            this.stats.health -= this.calculateDamage(damage);
            this.invincible = true;
            if (this.stats.health > 0) {
                this.game.time.events.add(1000, this.resetInvincable, this);
                this.knockBack(objPositionX);
            }
        }
    };
    Player.prototype.knockBack = function (objPositionX) {
        this.playerState = playerStateEnum.knockBack;
        if (this.x > objPositionX) {
            this.scale.setTo(-1, 1);
            this.movePlayerTo(this.x - this.width, this.y, 0.2, 700, playerStateEnum.idle);
        }
        else {
            this.scale.setTo(1, 1);
            this.movePlayerTo(this.x - this.width, this.y, 0.2, 700, playerStateEnum.idle);
        }
    };
    Player.prototype.resetInvincable = function () {
        this.invincible = false;
    };
    Player.prototype.calculateDamage = function (damage) {
        if (this.stats.health - damage < 0) {
            return 0;
        }
        return damage;
    };
    Player.prototype.canTakeDamage = function () {
        if (this.invincible || this.playerState === playerStateEnum.death) {
            return false;
        }
        return true;
    };
    // tslint:disable-next-line:cyclomatic-complexity
    Player.prototype.handleInput = function () {
        if (this.controls.LEFT.isDown && this.canWalk[this.playerState]) {
            this.moveLeft();
        }
        else if (this.controls.RIGHT.isDown && this.canWalk[this.playerState]) {
            this.moveRight();
        }
        else if (this.controls.E.justPressed() && this.facingBonfire && this.canSitDown[this.playerState]) {
            this.handleBonfire();
        }
        else if (this.controls.E.justPressed() && this.facingNpc) {
            this.handleNpc();
        }
        else if (this.controls.E.justPressed() && this.facingSign) {
            this.handleSign();
        }
        else if (this.controls.E.justPressed() && this.facingItem) {
            this.handleItem();
        }
        else if (this.canIdle[this.playerState]) {
            this.idle();
        }
        if (this.controls.SPACE.justPressed() && this.canRoll[this.playerState]) {
            this.playerState = playerStateEnum.roll;
            this.game.physics.arcade.moveToXY(this, this.x + this.scale.x, this.y, this.stats.movespeed * 1.5);
        }
        if ((this.controls.LEFT.justPressed() || this.controls.RIGHT.justPressed()) && this.playerState === playerStateEnum.sit) {
            this.playerState = playerStateEnum.standUp;
        }
        if (this.controls.ESC.isDown || this.controls.P.isDown) {
            new PauseMenu(this.game, 0, 0, this);
        }
        if (this.controls.I.isDown && !this.inventory) {
            this.inventory = new Inventory(this.game, this.game.camera.x + this.game.camera.width / 4, this.game.camera.y + this.game.camera.height / 4, this);
        }
    };
    // tslint:disable-next-line:cyclomatic-complexity
    Player.prototype.handleEnteringLevel = function () {
        if (!this.EnterLevelHandler.Text) {
            this.EnterLevelHandler.Text = this.game.add.text(this.game.camera.x + (this.game.camera.width / 2), this.game.camera.height, "", this.DialogueStyle);
            this.EnterLevelHandler.Text.setTextBounds(30, -20, 0, 0);
        }
        else {
            this.EnterLevelHandler.Text.x = this.game.camera.x + (this.game.camera.width / 2);
            this.EnterLevelHandler.Text.y = this.game.camera.height;
        }
        if (this.game.physics.arcade.distanceToXY(this, this.game.world.bounds.width, this.y) < this.width) {
            this.EnterLevelHandler.Next = true;
        }
        else {
            this.EnterLevelHandler.Next = false;
        }
        if (this.game.physics.arcade.distanceToXY(this, 0, this.y) < -this.width && this.currentRoom > 0) {
            this.EnterLevelHandler.Previous = true;
        }
        else {
            this.EnterLevelHandler.Previous = false;
        }
        if (this.EnterLevelHandler.Next) {
            this.EnterLevelHandler.Text.setText(this.EnterLevelHandler.EnterText);
            if (this.controls.E.justPressed()) {
                this.EnterNextLevel();
            }
        }
        if (this.EnterLevelHandler.Previous) {
            this.EnterLevelHandler.Text.setText(this.EnterLevelHandler.PreviousText);
            if (this.controls.E.justPressed()) {
                this.EnterPreviousLevel();
            }
        }
        if (!this.EnterLevelHandler.Previous && !this.EnterLevelHandler.Next) {
            this.EnterLevelHandler.Text.setText("");
        }
    };
    Player.prototype.EnterNextLevel = function () {
        this.scale.setTo(1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.game.world.bounds.width + this.width, this.y, this.stats.movespeed, 700, playerStateEnum.idle, "nextLevel");
    };
    Player.prototype.EnterPreviousLevel = function () {
        this.scale.setTo(-1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.width, this.y, this.stats.movespeed, 700, playerStateEnum.idle, "previousLevel");
    };
    Player.prototype.movePlayerTo = function (toX, toY, speed, time, endState, nextLevel) {
        var _this = this;
        if (time === void 0) { time = 0; }
        if (endState === void 0) { endState = playerStateEnum.idle; }
        if (nextLevel === void 0) { nextLevel = ""; }
        this.game.physics.arcade.moveToXY(this, toX, toY, speed, time);
        this.game.time.events.add(time, function () {
            _this.body.velocity.x = 0;
            _this.body.velocity.y = 0;
            _this.x = toX;
            _this.y = toY;
            _this.playerState = endState;
            if (nextLevel === "nextLevel") {
                _this.nextLevel();
            }
            else if (nextLevel === "previousLevel") {
                _this.previousLevel();
            }
        }, this);
    };
    Player.prototype.handleNpc = function () {
        this.facingNpc.nextDialogueText();
    };
    Player.prototype.handleSign = function () {
        this.facingSign.nextDialogueText();
    };
    Player.prototype.handleAttack = function () {
        if (this.controls.LMB.justPressed() && this.canAttack[this.playerState]) {
            this.playerState = playerStateEnum.attack1;
        }
        else if (this.controls.RMB.justPressed() && this.canAttack[this.playerState]) {
            console.log("right mouse button");
        }
        if ((this.controls.LMB.justPressed() || this.controls.RMB.justPressed()) && this.playerState === playerStateEnum.sit) {
            this.playerState = playerStateEnum.standUp;
        }
    };
    Player.prototype.handleBonfire = function () {
        if (this.facingBonfire.isLit) {
            this.stats.health = this.stats.maxHealth;
            this.stats.stamina = this.stats.maxStamina;
            this.playerState = playerStateEnum.sitDown;
        }
        else if (!this.facingBonfire.isLit) {
            this.facingBonfire.isLit = true;
            this.lastCheckPoint = this.currentRoom;
        }
    };
    Player.prototype.resetVelocity = function () {
        if (this.playerState !== playerStateEnum.autoWalkTo &&
            this.playerState !== playerStateEnum.knockBack &&
            this.playerState !== playerStateEnum.roll) {
            this.body.velocity.x = 0;
        }
    };
    Player.prototype.moveLeft = function () {
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -this.stats.movespeed;
    };
    Player.prototype.moveRight = function () {
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(1, 1);
        this.body.velocity.x = this.stats.movespeed;
    };
    Player.prototype.idle = function () {
        this.playerState = playerStateEnum.idle;
    };
    Player.prototype.savePlayer = function (x, levelNumber) {
        if (x === void 0) { x = 0; }
        if (levelNumber === void 0) { levelNumber = this.currentRoom; }
        var savePlayer = {
            lastCheckPoint: this.lastCheckPoint,
            currentRoom: levelNumber,
            stats: this.stats,
            y: this.y,
            x: x,
        };
        window.localStorage.setItem("player", JSON.stringify(savePlayer));
    };
    Player.prototype.loadPlayer = function (playerStorage) {
        if (playerStorage) {
            this.stats = playerStorage.stats;
            this.x = playerStorage.x;
            this.y = playerStorage.y;
            this.lastCheckPoint = playerStorage.lastCheckPoint;
        }
        else {
            this.x = -this.width;
            this.y = this.game.height - this.height * 2;
        }
    };
    Player.prototype.nextLevel = function () {
        this.savePlayer(0, this.currentRoom + 1);
        this.game.state.start("level" + (this.currentRoom + 1), true, false);
    };
    Player.prototype.previousLevel = function () {
        this.savePlayer(this.x, this.currentRoom - 1);
        this.game.state.start("level" + (this.currentRoom - 1), true, false);
    };
    return Player;
}(Phaser.Sprite));
function playerAllowance(array) {
    var _a;
    var obj = (_a = {},
        _a[playerStateEnum.movingWalk] = false,
        _a[playerStateEnum.movingFall] = false,
        _a[playerStateEnum.idle] = false,
        _a[playerStateEnum.attack1] = false,
        _a[playerStateEnum.attack2] = false,
        _a[playerStateEnum.attack3] = false,
        _a[playerStateEnum.death] = false,
        _a[playerStateEnum.sit] = false,
        _a[playerStateEnum.sitDown] = false,
        _a[playerStateEnum.standUp] = false,
        _a[playerStateEnum.movingStartWalk] = false,
        _a[playerStateEnum.autoWalkTo] = false,
        _a[playerStateEnum.knockBack] = false,
        _a[playerStateEnum.roll] = false,
        _a);
    array.forEach(function (v) {
        obj[v] = true;
    });
    return obj;
}
var BootState = /** @class */ (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootState.prototype.preload = function () {
        this.background = 0xA00999;
    };
    BootState.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start("preload", true, false);
    };
    return BootState;
}(Phaser.State));
var PreloadState = /** @class */ (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloadState.prototype.preload = function () {
        this.game.load.onLoadStart.add(this.assets, this);
        //need one here for it to work apparently
        this.game.load.spritesheet("player", "bin/assets/player/adventurer.png", 50, 37);
        this.game.load.onFileComplete.add(this.progressBar, this);
        this.game.load.onLoadComplete.add(this.finishedLoading, this);
    };
    PreloadState.prototype.create = function () {
        this.loadingText.destroy();
        this.startTitleMenu();
    };
    PreloadState.prototype.startTitleMenu = function () {
        this.game.state.start("title", true, false);
    };
    PreloadState.prototype.progressBar = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    };
    PreloadState.prototype.assets = function () {
        this.loadingText = this.game.add.text(this.game.camera.x, this.game.camera.height / 2, "loading...", {
            fill: "#ffffff",
        });
        this.game.stage.backgroundColor = 0xB20059;
        this.game.load.image("overlay", "bin/assets/UI/overlay.png");
        this.game.load.image("bossoverlay", "bin/assets/UI/bossoverlay.png");
        this.game.load.image("healthbar", "bin/assets/UI/healthbar.png");
        this.game.load.image("staminabar", "bin/assets/UI/staminabar.png");
        this.game.load.image("darkbackground", "bin/assets/backgrounds/background.png");
        this.game.load.image("floor", "bin/assets/foundations/floor.png");
        this.game.load.image("wall", "bin/assets/foundations/wall.png");
        this.game.load.image("gate", "bin/assets/foundations/gate.png");
        this.game.load.image("ceiling", "bin/assets/foundations/ceiling.png");
        this.game.load.image("ring", "bin/assets/items/ring.png");
        this.game.load.image("inventoryslot", "bin/assets/UI/inventoryslot.png");
        this.game.load.image("inventory", "bin/assets/UI/inventory.png");
        this.game.load.image("inventorybar", "bin/assets/UI/inventorybar.png");
        this.game.load.image("bubble", "bin/assets/UI/bubble.png");
        this.game.load.image("sign", "bin/assets/sign/sign.png");
        this.game.load.spritesheet("item", "bin/assets/items/item.png", 15, 15);
        this.game.load.spritesheet("rogue", "bin/assets/rogue/rogue.png", 32, 32);
        this.game.load.spritesheet("bonfire", "bin/assets/bonfire/bonfire.png", 500, 740);
        this.game.load.spritesheet("chest", "bin/assets/chest/chest.png", 30, 30);
        this.game.load.spritesheet("explosion", "bin/assets/explosion/explosion.png", 30, 30);
        this.game.load.spritesheet("adventurer", "bin/assets/adventurer/adventurer.png", 50, 37);
        this.game.load.spritesheet("djinnbandit", "bin/assets/djinnbandit/djinnbandit.png", 48, 42);
        this.game.load.spritesheet("earthwhisp", "bin/assets/earthwhisp/earthwhisp.png", 32, 32);
        this.game.load.spritesheet("firewhisp", "bin/assets/firewhisp/firewhisp.png", 32, 32);
        this.game.load.spritesheet("waterwhisp", "bin/assets/waterwhisp/waterwhisp.png", 32, 32);
        this.game.load.spritesheet("windwhisp", "bin/assets/windwhisp/windwhisp.png", 32, 32);
        this.game.load.spritesheet("goblin", "bin/assets/goblin/goblin.png", 32, 32);
        this.game.load.spritesheet("golem", "bin/assets/golem/golem.png", 32, 32);
        this.game.load.spritesheet("kobold", "bin/assets/kobold/kobold.png", 68, 35);
        this.game.load.spritesheet("mandrake", "bin/assets/mandrake/mandrake.png", 56, 38);
        this.game.load.spritesheet("mimic", "bin/assets/mimic/mimic.png", 32, 32);
        this.game.load.spritesheet("minotaur", "bin/assets/minotaur/minotaur.png", 96, 77);
        this.game.load.spritesheet("oculothorax", "bin/assets/oculothorax/oculothorax.png", 32, 32);
        this.game.load.spritesheet("ogre", "bin/assets/ogre/ogre.png", 58, 42);
        this.game.load.spritesheet("rat", "bin/assets/rat/rat.png", 42, 22);
        this.game.load.spritesheet("redogre", "bin/assets/redogre/redogre.png", 73, 46);
        this.game.load.spritesheet("satyr", "bin/assets/satyr/satyr.png", 68, 46);
        this.game.load.spritesheet("shade", "bin/assets/shade/shade.png", 32, 32);
        this.game.load.spritesheet("slime", "bin/assets/slime/slime.png", 32, 25);
        this.game.load.spritesheet("slimeboss", "bin/assets/slime/slimeboss.png", 128, 100);
        this.game.load.spritesheet("wasp", "bin/assets/wasp/wasp.png", 32, 32);
        this.game.load.spritesheet("werewolf", "bin/assets/werewolf/werewolf.png", 73, 43);
        this.game.load.spritesheet("yeti", "bin/assets/yeti/yeti.png", 73, 57);
    };
    PreloadState.prototype.finishedLoading = function () {
        this.loadingText.setText("Load Complete");
    };
    return PreloadState;
}(Phaser.State));
var TitleState = /** @class */ (function (_super) {
    __extends(TitleState, _super);
    function TitleState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MenuStyle = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.MenuText = {
            "Start New Game": {
                trigger: function () {
                    window.localStorage.setItem("player", "null");
                    _this.switchState("level" + levelsEnum.level0);
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 0,
            },
            "Load Game": {
                trigger: function () {
                    var loadedGame = JSON.parse(window.localStorage.getItem("player"));
                    if (loadedGame) {
                        _this.switchState("level" + loadedGame.currentRoom);
                    }
                    else {
                        alert("no Saved Game Found!");
                    }
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 50,
            },
            "Options": {
                trigger: function () {
                    alert("Options not yet Implemented");
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 100,
            },
            "Github": {
                trigger: function () {
                    window.open("http://www.github.com/twofist");
                },
                style: _this.MenuStyle,
                text: null,
                x: 0,
                y: 300,
            },
        };
        return _this;
    }
    TitleState.prototype.preload = function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.backgroundImage = 0x055550;
        for (var key in this.MenuText) {
            var obj = this.MenuText[key];
            obj.text = this.game.add.text(obj.x, obj.y, key, obj.style);
            obj.text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            obj.text.setTextBounds(0, 200, 800, 100);
            obj.text.inputEnabled = true;
            obj.text.events.onInputOver.add(this.glow, this);
            obj.text.events.onInputOut.add(this.stopGlow, this);
            obj.text.events.onInputUp.add(obj.trigger, this);
        }
    };
    TitleState.prototype.create = function () {
        this.game.stage.backgroundColor = this.backgroundImage;
    };
    TitleState.prototype.glow = function (item) {
        item.fill = "#ffff44";
    };
    TitleState.prototype.stopGlow = function (item) {
        item.fill = "#fff";
    };
    TitleState.prototype.switchState = function (state) {
        this.game.state.start(state);
    };
    return TitleState;
}(Phaser.State));
//# sourceMappingURL=game.js.map