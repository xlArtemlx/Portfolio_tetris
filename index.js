const main = document.querySelector('.main');
const scroeElem = document.getElementById("score");
const levelElem = document.getElementById("level");
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
    [0,0,0,0,2,2,0,0,0,0],
    [0,0,0,0,2,2,0,0,0,0]
];

let score = 0;
let currentLevel = 1;
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

let activeTetro = {
  x: 0,
  y: 0,
  shape: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
};

let figures = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
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
  return figures[possibleFigures[rand]];
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
    activeTetro.shape = getNewTetro();
    activeTetro.x = Math.floor((10 - activeTetro.shape[0].length) / 2);
    activeTetro.y = 0;
  }
}

document.onkeydown = function (e) {
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
  }

  addActiveTetro();
  draw();
};

scroeElem.innerHTML = score;
levelElem.innerHTML = currentLevel;

addActiveTetro();
draw();

function startGame() {
  moveTetroDown();
  addActiveTetro();
  draw();
  setTimeout(startGame, possibleLevels[currentLevel].speed);
}

setTimeout(startGame, possibleLevels[currentLevel].speed);

