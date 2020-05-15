let main = document.querySelector('.main');
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

let gameSpeed = 200;
let activeTetro = {
  x:0,
  y:0,
  shape:[
    [1,1,1],
    [0,1,0],
    [0,1,0]
  ]
}

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

function canTetroMoveDown() {
    for (let i = 0; i < playfield.length; i++) {
      for (let k = 0; k < playfield[i].length; k++) {
        if (playfield[i][k] === 1) {
          if (i === playfield.length - 1 || playfield[i + 1][k] === 2) {
            return false;
          }
        }
      }
    }
  
    return true;
  }
  
  function moveTetroDown() {
    if (canTetroMoveDown()) {
      for (let i = playfield.length - 1; i >= 0; i--) {
        for (let k = 0; k < playfield[i].length; k++) {
          if (playfield[i][k] === 1) {
            playfield[i + 1][k] = 1;
            playfield[i][k] = 0;
          }
        }
      }
    } else {
      fixTetro();
    }
  }

function fixTetro(){
    for (let i = 0; i < playfield.length; i++) {
        for (let k = 0; k < playfield[i].length; k++){
            if(playfield[i][k] === 1){
                playfield[i][k] = 2;
            }
        }
    }
    playfield[0] = [0,0,0,0,1,1,0,0,0,0];
    playfield[1] = [0,0,0,0,1,1,0,0,0,0];
}
   



// проверка на выход за поля
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
    let canRemoveLine = true;
    let summ = 0;
    for (let i = 0; i < playfield.length; i++) {
      for (let k = 0; k < playfield[i].length; k++) {
        summ = summ += k
        if (playfield[i] !== 2) {
          canRemoveLine = false;
<<<<<<< HEAD
        } 
      }
    }
    for (let i = 0; i < playfield.length; i++){
      for (let k = 0; k < playfield[i].length; k++){
        if(canRemoveLine){
          playfield[i].splice(k, 1, 0);
      }
    }
  }
}
  removeFullLines()

document.onkeydown = function(e){
    if(e.keyCode === 37){
        moveTetroLeft();
    } else if(e.keyCode === 39){
        moveTetroRight()
    } else if(e.keyCode === 40){
        // ускоряем фигурку
    }
=======
          break;
        }
      }
      if (canRemoveLine) {
        playfield.splice(y, 1);
     }
    canRemoveLine = true;
  }
>>>>>>> 26023328f86fb3bfe363f131bcd6d52f7c01f8fb
}
addActiveTetro()
draw()
  

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
removeFullLines()
function startGame(){
    moveTetroDown()
    draw()
    setTimeout(startGame, gameSpeed)
}
setTimeout(startGame, gameSpeed)

