const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var backgroundImg, backgroundImg2;
var sharko, sharkImg;
var ground, fish1, fish2, fish3;
var stonesGroup, foodGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var stoneImg;
var gameOver,
	gameOverImg;
var score = 0;
function preload() {
	backgroundImg = loadImage("../images/sea.png");
	sharkImg = loadImage("../images/shark.png");
	stoneImg = loadImage("../images/iceStone.png")
	fish1 = loadImage("../images/food1.png")
	fish2 = loadImage("../images/food2.png")
	fish3 = loadImage("../images/food3.png")
	gameOverImg = loadImage("../images/gameOver.png")
}

function setup() {
	createCanvas(870, 700)


	ground = createSprite(780, 200, 870, 10);
	ground.addImage("background", backgroundImg);
	ground.velocityX = -2.5;
	ground.scale = 2.5;

	gameOver = createSprite(430, 350, 30, 30);
	gameOver.addImage(gameOverImg)

	engine = Engine.create();
	world = engine.world;

	sharko = createSprite(150, 245);
	sharko.addImage(sharkImg);
	sharko.scale = 0.25;

	stonesGroup = createGroup();
	foodGroup = createGroup();

	Engine.run(engine);

}

function draw() {
	rectMode(CENTER);
	background(255);

	if (gameState === PLAY) {
		gameOver.visible = false;
		stones();
		food();
		//	score=0;
		if (ground.x < 100) {
			ground.velocityX = -2.5;
			ground.x = ground.width / 2;
		}
		for (var i = 0; i < foodGroup.length; i++) {
			if (foodGroup.get(i).isTouching(sharko)) {
				foodGroup.get(i).destroy();
				score = score + 1;
			}
		}
		if (score != 0 && score % 10 == 0) {
			sharko.scale += 0.001
		}

		if (stonesGroup.isTouching(sharko)) {
			gameState = END
		}
	}
	if (gameState === END) {
		stonesGroup.setVelocityXEach(0)
		foodGroup.setVelocityXEach(0)

		sharko.velocityX = 0;
		ground.velocityX = 0;
		foodGroup.destroyEach()
		stonesGroup.destroyEach()



	}
	if (keyCode == 32) {
		gameState = PLAY;
		score = 0;
		ground.velocityX = -2.5;

	}
	drawSprites();
	if (gameState == END) {
		gameOver.visible = true

		fill("black")
		textSize(30)
		text("Press 'SPACE BAR' to restart", 330, 450)
	}

	fill("white")
	textSize(30)
	text("Score :0" + score, 250, 30)

}
function keyPressed() {
	if (keyCode == 38) {
		sharko.y -= 7

	}
	if (keyCode == 40) {
		sharko.y += 7;

	}
	if (keyCode == 39) {
		sharko.y -= 7
		sharko.x += 7
	}
	if (keyCode == 37) {

		sharko.x -= 7
	}
}
function stones() {
	if (frameCount % 100 == 0) {
		var stone = createSprite(600, 600, 30, 15)
		stone.y = Math.round(random(110, 650))
		stone.addImage(stoneImg);
		stone.velocityX = -3;
		stone.scale = 0.2;

		stonesGroup.add(stone)
	}
}
function food() {
	if (frameCount % 70 == 0) {
		var fish = createSprite(500, 600, 25, 17)
		fish.y = Math.round(random(95, 570))

		fish.velocityX = -3.2;
		var rand = Math.round(random(1, 3));
		switch (rand) {
			case 1: fish.addImage(fish1);
				fish.scale = 0.4;
				break;
			case 2: fish.addImage(fish2);
				fish.scale = 0.12;
				break;
			case 3: fish.addImage(fish3);
				fish.scale = 0.2;
				break;
		}
		foodGroup.add(fish)

	}
}
