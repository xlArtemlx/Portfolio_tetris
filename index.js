const main = document.querySelector('.main');
const scroeElem = document.getElementById("score");
const levelElem = document.getElementById("level");
const nextTetroElem = document.getElementById("next-tetro");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const gameOver = document.getElementById("game-over");

let playfield = [
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];


let score = 0;
let gameTimerID;
let currentLevel = 1;
let isPaused = true;
let possibleLevels = {
  1: {
    scorePerLine: 10,
    speed: 400,
    nextLevelScore: 20,
  },
  2: {
    scorePerLine: 15,
    speed: 300,
    nextLevelScore: 500,
  },
  3: {
    scorePerLine: 20,
    speed: 200,
    nextLevelScore: 1000,
  },
  4: {
    scorePerLine: 30,
    speed: 100,
    nextLevelScore: 2000,
  },
  5: {
    scorePerLine: 50,
    speed: 50,
    nextLevelScore: Infinity,
  },
};

let figures = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0], 
    [0, 0, 0], 
  ],
};

let activeTetro = getNewTetro();
let nextTetro = getNewTetro();

function draw(){
    let mainInnerHTML = "";

    for(let i = 0; i < playfield.length; i++){
        for(let k = 0; k < playfield[i].length; k++){
            if(playfield[i][k] === 1){
                mainInnerHTML += '<div class="cell moving-cell"> </div>'
            } else if(playfield[i][k] === 2){
                mainInnerHTML += '<div class="cell fixed-cell"> </div>'
            } else {
                mainInnerHTML += '<div class="cell"> </div>'
            }
    }
 }
main.innerHTML = mainInnerHTML
}

function drawNextTetro() {
  let nextTetroInnerHTML = "";
  for (let i = 0; i < nextTetro.shape.length; i++) {
    for (let k = 0; k < nextTetro.shape[i].length; k++) {
      if (nextTetro.shape[i][k]) {
        nextTetroInnerHTML += '<div class="cell moving-cell"></div>';
      } else {
        nextTetroInnerHTML += '<div class="cell"></div>';
      }
    }
    nextTetroInnerHTML += "<br/>";
  }
  nextTetroElem.innerHTML = nextTetroInnerHTML;
}

function removePrevActiveTetro() {
  for (let i = 0; i < playfield.length; i++) {
    for (let k = 0; k < playfield[i].length; k++) {
      if (playfield[i][k] === 1) {
        playfield[i][k] = 0;
      }
    }
  }
}

function addActiveTetro() {
  removePrevActiveTetro();
  for (let i = 0; i < activeTetro.shape.length; i++) {
    for (let k = 0; k <  activeTetro.shape[i].length; k++) {
      if (activeTetro.shape[i][k] === 1) {
        playfield[activeTetro.y + i][activeTetro.x + k] =
          activeTetro.shape[i][k];
      }
    }
  }
}


function rotateTetro() {
  const prevTetroState = activeTetro.shape;

  activeTetro.shape = activeTetro.shape[0].map((val, index) =>
    activeTetro.shape.map((row) => row[index]).reverse()
  );

  if (hasCollisions()) {
    activeTetro.shape = prevTetroState;
  }
}

function hasCollisions() {
  for (let i = 0; i < activeTetro.shape.length; i++) {
    for (let k = 0; k < activeTetro.shape[i].length; k++) {
      if (
        activeTetro.shape[i][k] &&
        (playfield[activeTetro.y + i] === undefined ||
          playfield[activeTetro.y + i][activeTetro.x + k] === undefined ||
          playfield[activeTetro.y + i][activeTetro.x + k] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}

function removeFullLines() {
  let canRemoveLine = true,
    filledLines = 0;
  for (let i = 0; i < playfield.length; i++) {
    for (let k = 0; k < playfield[i].length; k++) {
      if (playfield[i][k] !== 2) {
        canRemoveLine = false;
        break;
      }
    }
    if (canRemoveLine) {
      playfield.splice(i, 1);
      playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      filledLines += 1;
    }
    canRemoveLine = true;
  }

  switch (filledLines) {
    case 1:
      score += 10;
      break;
    case 2:
      score += 10 * 3;
      break;
    case 3:
      score += 10 * 6;
      break;
    case 4:
      score += 10 * 12;
      break;
  }

  scroeElem.innerHTML = score;

  if (score >= possibleLevels[currentLevel].nextLevelScore) {
    currentLevel++;
    levelElem.innerHTML = currentLevel;
  }
}

function getNewTetro() {
  const possibleFigures = "IOLJTSZ";
  const rand = Math.floor(Math.random() * 7);
  const newTetro = figures[possibleFigures[rand]];

  return {
    x: Math.floor((10 - newTetro[0].length) / 2),
    y: 0,
    shape: newTetro,
  }
}

function fixTetro() {
  for (let i = 0; i < playfield.length; i++) {
    for (let k = 0; k < playfield[i].length; k++) {
      if (playfield[i][k] === 1) {
        playfield[i][k] = 2;
      }
    }
  }
}

function moveTetroDown() {
  activeTetro.y += 1;
  if (hasCollisions()) {
    activeTetro.y -= 1;
    fixTetro();
    removeFullLines();
    activeTetro = nextTetro;
    if (hasCollisions()) {
      reset();
    }
    nextTetro = getNewTetro();
  }
}

function dropTetro() {
  for (let i = activeTetro.y; i < playfield.length; i++) {
    activeTetro.y += 1;
    if (hasCollisions()) {
      activeTetro.y -= 1;
      break;
    }
  }
}

function reset() {
  isPaused = true;
  clearTimeout(gameTimerID);
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  draw();
  gameOver.style.display = "block";
}

document.onkeydown = function (e) {
  if (!isPaused) {
    if (e.keyCode === 37) {
      activeTetro.x -= 1;
      if (hasCollisions()) {
        activeTetro.x += 1;
      }
    } else if (e.keyCode === 39) {
      activeTetro.x += 1;
      if (hasCollisions()) {
        activeTetro.x -= 1;
      }
    } else if (e.keyCode === 40) {
      moveTetroDown();
    } else if (e.keyCode === 38) {
      rotateTetro();
    } else if (e.keyCode === 32) {
      dropTetro();
    }

    updateGameState();
  }
};

function updateGameState() {
  if (!isPaused) {
    addActiveTetro();
    draw();
    drawNextTetro();
  }
}
pauseBtn.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Pause") {
    e.target.innerHTML = "Keep Playing...";
    clearTimeout(gameTimerID);
  } else {
    e.target.innerHTML = "Pause";
    gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
  }
  isPaused = !isPaused;
});
startBtn.addEventListener("click", (e) => {
  e.target.innerHTML = "Start again";
  isPaused = false;
  gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
  gameOver.style.display = "none";
});

scroeElem.innerHTML = score;
levelElem.innerHTML = currentLevel;

draw();

function startGame() {
  moveTetroDown();
  if (!isPaused) {
    updateGameState();
    gameTimerID = setTimeout(startGame, possibleLevels[currentLevel].speed);
  }
}

