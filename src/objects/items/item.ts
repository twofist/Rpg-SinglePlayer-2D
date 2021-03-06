class Item extends Phaser.Sprite {
    canInteract = false;
    canInteractText!: Phaser.Text | null;
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
    item: MasterRing;
    constructor(game: Phaser.Game, x: number, y: number, obj: MasterRing) {
        super(game, x, y, "item", 0);
        this.item = obj;
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        this.body.gravity.y = 1000;
        game.add.existing(this);
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
    }

    update() {
        this.animations.play("idle");

        this.interaction();
    }

    interaction() {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract) {
            this.canInteractText.setText("press E to pick up");
        } else if (!this.canInteract) {
            this.canInteractText.setText("");
        }
    }

    remove() {
        this.canInteract = false;
        this.canInteractText!.setText("");
        this.destroy();
    }
}
