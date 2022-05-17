// fix the position of the food becuase its not a multiple of 20 which is the snake size
const canvas = document.querySelector('.gameBored');
const ctx = canvas.getContext('2d');


let snakeWidth = 20;
let snakeHeight = 20;

var dx = 0;
var dy = -20;

let food_x = randomLoaction(20,canvas.width-20)
let food_y = randomLoaction(20,canvas.height-20);

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var didEat = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


let snake = [{x:20,y:10},
			   {x:40,y:10},
			   {x:60,y:10}]
			  

gen_food();
console.log(food_x);
console.log(food_y);

main();
function main()
{
   setTimeout(function onClick()
   {
		ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
		snake.forEach(drawSnake);
		const head = {x: snake[0].x + dx, y: snake[0].y + dy};
		snake.unshift(head);
		snake.pop();
		checkBounds();
		changeDirection();
		drawFood();
		gen_food();
		for(var i = 1; i < snake.length; i++)
		{
			if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
				window.alert('YOU LOSE');
				
				snake = [{x:20,y:10},
					{x:40,y:10},
					{x:60,y:10},
					{x:80,y:10}];
			}
		}
		
		main();
   },50)
}

function keyDownHandler(e) {
	switch(e.key) {
		case 'ArrowUp':
		case 'Up':
			upPressed = true;
			break;
			

		case 'ArrowDown':
		case 'Down':
			downPressed = true;
			break;
			
			
		
		case 'ArrowLeft':
		case 'Left':
			leftPressed = true;
			break;
			
		
		case 'ArrowRight':
		case 'Right':
			rightPressed = true;
			break;
		
			
	}
}

function keyUpHandler(e) {

	switch(e.key) {
		case 'ArrowUp':
		case 'Up':
			upPressed = false;
			break;
			

		case 'ArrowDown':
		case 'Down':
			downPressed = false;
			break;
			
		
		case 'ArrowLeft':
		case 'Left':
			leftPressed = false;
			break;
			
		
		case 'ArrowRight':
		case 'Right':
			rightPressed = false;
			break;
			
			
	}
}

function drawSnake(part)
{
	ctx.beginPath();
	ctx.rect(part.x,part.y,snakeWidth,snakeHeight);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.stroke();
	ctx.closePath();

}
function randomLoaction(min,max)
{
	return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}

function gen_food() {
	
	if(snake[0].x === food_x && snake[0].y === food_y) {
		didEat = true;
	}

	if(didEat===true) {
		
		food_x = randomLoaction(20,canvas.width-20)
		food_y = randomLoaction(20,canvas.height-20);

		
		snake.push({x:snake[0].x + dx,
					y:snake[0].y + dy})
		didEat = false
	}
	console.log(didEat)
	drawFood();
	
  }


function drawFood()
{
	ctx.beginPath();
	ctx.rect(food_x,food_y,20,20)
	ctx.fillStyle = 'lightGreen';
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function checkBounds()
{

	if(snake[0].x > canvas.width+snakeWidth) {
		snake[0].x = 0;
	} else if(snake[0].x < 0+snakeWidth) {
		snake[0].x = canvas.width+snakeWidth;
	} else if(snake[0].y > canvas.height+snakeHeight) {
		snake[0].y = 0;
	} else if (snake[0].y < 0) {
		snake[0].y = canvas.height+snakeHeight;
	}
}
function changeDirection()
{
	if(upPressed && dy != 20) {
		
			dx = 0;
			dy = -20;
		
		
	} else if (downPressed && dy != -20) {
		
			dx = 0;
			dy = 20;
		
		
	} else if (leftPressed && dx != 20) {
		
			dx = -20;
			dy = 0;
		
	} else if (rightPressed && dx != -20) {

			dx = 20;
			dy = 0;
		
	}
}
