/* Cria e mostra os elementos do jogo na tela */
function createAssets(scene) {
  /* cenario */
  scene.add.image(500, 210, "fundo");
  plataforma = scene.physics.add.staticGroup();
  plataforma.create(500, 479, "plat");

  /* Player */
  player = scene.physics.add.sprite(500,250, "player");
  player.setCollideWorldBounds(true);
  player.setBounce(0.2);
  criarAnimations(scene);
  player.anims.play("parado", true);
  
  /* star: coletavel */
  var pos = Phaser.Math.FloatBetween(100,900);
  star = scene.physics.add.sprite(pos,0, "star");
  star.setBounce(0.5);

  /* bombs */
  bombs = scene.physics.add.group();

  /* colliders (colissão) */
  scene.physics.add.collider(player, plataforma);
  scene.physics.add.collider(star, plataforma);
  scene.physics.add.overlap(star, player, coletarStar);
  scene.physics.add.collider(bombs, plataforma);
  scene.physics.add.overlap(bombs, player, gameOver);

  /* entradas do teclado */
  teclado = scene.input.keyboard.createCursorKeys();

  /* HUD - Head Ups Display */
  var configTxT = {
    fontSize: "25px",
    fontFamily: "Arial Black",
  }
  pontosTxT = scene.add.text(20, 20, "ponto: 0", configTxT)
}

function coletarStar(star, player) {
  let pos = Phaser.Math.FloatBetween(100,900);
  star.setX(pos);
  star.setY(0);
  star.setVelocityY(pos);
  
  pontos = pontos + 10;
  pontosTxT.setText("Pontos: " + pontos);

  /* criar bombas */
  let bomb = bombs.create(pos, 0, "bombs");
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(50);
}

function gameOver(player, bombs) {
  player.setVisible(false);
  isGameOver = true;
  var configTxT = {
    fontSize: "45px",
    fontFamily: "Arial Black",
  }
   player.scene.add.text(150, 250, "Game Over", configTxT);

   player.scene.input.once("pointerdown", () => {
   player.scene.start("Game");
   });
}

function criarAnimations(scene){
  var parado = {
    key: "parado",
    frames: [{key: "player", frame: 4}],
  }
  scene.anims.create(parado);

  var left = {
    key: "left",
    frames: scene.anims.generateFrameNumbers("player", {start: 0, end: 3}),
    frameRate: 8,
    repeat: -1,
  }
  scene.anims.create(left);

  var right = {
    key: "right",
    frames: scene.anims.generateFrameNumbers("player", {start: 5, end: 8}),
    frameRate: 8,
    repeat: -1,
  }
  scene.anims.create(right);
}