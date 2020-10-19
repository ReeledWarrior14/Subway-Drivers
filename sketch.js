var player;

var rocks;

var track

var r, r2, p1, o1, x1, x2, x3;

var speed, score;

var gamestate = 'play';

function preload(){
  tracks1 = loadImage('tracks.png');
  train1 = loadAnimation('train.png');
  car1 = loadAnimation('car.png');
}

function setup(){
  createCanvas(windowWidth/2, windowHeight - 20);

  player = createSprite(width/2, height - 125, 100, 100);
  player.shapeColor = 'black';
  player.addAnimation('car', car1);
  player.rotation = -90;
  player.scale = 0.25;
  player.setCollider('rectangle', 0, 0, 750, 300);
  player.debug = true;

  rocks = new Group();

  p1 = 2;

  score = 0;
  speed = 0;

  x1 = height;
  x2 = 0;
  x3 = -width + width/20;
}

function draw(){
  background(250);

  image(tracks1, x3, x1, 3 * width, height + height/4);
  image(tracks1, x3, x2, 3 * width, height + height/4);

  if (x1 > height){
    x1 = -height;
  }
  if (x2 > height){
    x2 = -height;
  }

  // console.log(x1, x2);

  if (p1 == 1){
    player.x = width * 0.2265;
  }
  else if(p1 == 2){
    player.x = width/2;
  }
  else if(p1 == 3){
    player.x = width * 0.8154;
  }

  if (p1 > 3){
    p1 = p1 - 1;
  }
  if (p1 <= 0){
    p1 = p1 - 1;
  }

  r = Math.round(random(1, 3));
  // r = 3;
  o1 = rocks.length;
  // console.log(r2);

  switch (r){
    case 1: r2 = width * 0.2265; break
    case 2: r2 = width/2; break
    case 3: r2 = width * 0.8154; break
  }

  if (gamestate == 'play'){

    x1 += 5 + speed;  
    x2 += 5 + speed;

    if (o1 < 2 && gamestate == 'play'){
      redRocks();
      o1 = rocks.length;
    }

    if (keyWentDown(LEFT_ARROW)){
      p1 = p1 - 1;

			if (p1 > 3){
        p1 = p1 - 1;
      }
      if (p1 <= 0){
        p1 = p1 + 1;
      }
    }
    if (keyWentDown(RIGHT_ARROW)){
      p1 = p1 + 1;
      
      if (p1 > 3){
				p1 = p1 - 1;
      }
      if (p1 <= 0){
        p1 = p1 + 1;
      }
    }

    if (score % 100 == 0){
      speed++;
    }

    score++;
  }

  if (gamestate == 'crash' && keyWentDown('space')){
    reset();
    gamestate = 'play';  
  }

  if (gamestate == 'crash'){
    textSize(50);
    fill('red');
    stroke(5);
    text('Your score is ' + score, width/3, height/3);
  }

  drawSprites();

  player.overlap(rocks, crash);

  textSize(20);
  fill('blue');
  text(score, 10, 25);

  // textSize(10);
  // text(mouseX, 10, 15);
  // text(mouseY, 30, 15);
}

function redRocks(){   
  rock = createSprite(r2, -100, 100, 100);
  rock.velocityY = 5 + speed;
  rock.addAnimation('train', train1);
  rock.scale = 0.3;
  rock.setCollider('rectangle', 0, 0, 750, 250);
  rock.debug = true;
  rock.rotation = 90;
  rock.lifetime = 200;
  rocks.add(rock);
}

function crash(){
  gamestate = 'crash';
  speed = 0;
  rocks.setVelocityYEach(-5);
  rocks.setLifetimeEach(-1);
}

function reset(){
  rocks.setLifetimeEach(1);
  speed = 0;
  score = 0;
}

//Anay Nagar 2020