let inputDirection = {
  x: 0,
  y: 0,
};
const foodSound = new Audio("./music/food.mp3");
const gamOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
let lastscreenRenderTime = 0;
let speed = 9;
let score = 0;
let hiscoreval = 0;

let snakeArray = [
  {
    x: 13,
    y: 15,
  },
];

food = { x: 5, y: 7 };
//Game functions
function main(currTime) {
  window.requestAnimationFrame(main);
  // console.log(currTime);
  if ((currTime - lastscreenRenderTime) / 1000 < 1 / speed) {
    return;
  }
  lastscreenRenderTime = currTime;
  gameLogic();
}
function isCollide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameLogic() {
  //updating snake array and food
  if (isCollide(snakeArray)) {
    gamOverSound.play();

    musicSound.pause();
    inputDirection = { x: 0, y: 0 };
    alert("GAME OVER! press any key to restart");
    musicSound.play();
    snakeArray = [{ x: 13, y: 15 }];
    score = 0;
    scorecard.innerHTML = "Score: " + score;
  }
  //if you have eaten the food
  if (snakeArray[0].x == food.x && snakeArray[0].y == food.y) {
    // increment snake size
    foodSound.play();
    score++;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      highscoreCard.innerHTML = "High Score: " + hiscoreval;
    }
    scorecard.innerHTML = "Score: " + score;
    snakeArray.unshift({
      x: snakeArray[0].x + inputDirection.x,
      y: snakeArray[0].y + inputDirection.y,
    });
    randomNum1 = Math.floor(Math.random() * 15) + 2;
    randomNum2 = Math.floor(Math.random() * 15) + 2;
    //regenerate food
    food = { x: randomNum1, y: randomNum2 };
  }

  //Moving the snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += inputDirection.x;
  snakeArray[0].y += inputDirection.y;

  //Display the Snake
  const board = document.getElementById("board");
  board.innerHTML = "";
  snakeArray.forEach((element, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake_body");
    }
    board.appendChild(snakeElement);
  });

  //   display food
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main Logic
musicSound.muted = "true";
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  highscoreCard.innerHTML = "High Score: " + hiscoreval;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;

    case "ArrowDown":
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;

    case "ArrowLeft":
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;

    case "ArrowRight":
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;

    default:
      break;
  }
});
