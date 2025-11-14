const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 600 }, debug: false }
    },
    scene: { preload, create, update }
};

let player, cursors, coins;

function preload() {
    // <-- сюда вставь свои PNG!!!
    this.load.image('player', 'player.png'); 
    this.load.image('ground', '');
    this.load.image('coin', 'coin.png'); 
}

function create() {
    // пол
    const ground = this.physics.add.staticGroup();
    ground.create(400, 380, 'ground').setScale(4, 1).refreshBody();

    // игрок (уменьшенный)
    player = this.physics.add.sprite(100, 300, 'player');
    player.setScale(0.25);   // <-- размер меняется здесь
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, ground);

    // монетки (банки пива)
    coins = this.physics.add.group({
        key: 'coin',
        repeat: 5,
        setXY: { x: 150, y: 200, stepX: 120 }
    });

    coins.children.iterate(coin => {
        coin.setScale(0.15); // <-- уменьшение банок
        coin.setBounce(0.3);
    });

    this.physics.add.overlap(player, coins, (player, coin) => {
        coin.destroy();
    });

    // управление
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    player.setVelocityX(0);

    if (cursors.left.isDown) player.setVelocityX(-200);
    if (cursors.right.isDown) player.setVelocityX(200);

    if (cursors.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-400);
    }
}

new Phaser.Game(config);
