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

const gameSpeed = 200;

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
    playfield[0] = [0,0,0,0,0,1,0,0,0,0];
    playfield[1] = [0,0,0,0,1,1,1,0,0,0];
}
   

draw()
//Двигаем Фигурку влево 
function canTetroMoveLeft() {
    for (let i = 0; i < playfield.length; i++) {
      for (let k = 0; k < playfield[i].length; k++) {
        if (playfield[i][k] === 1) {
            if (k === 0 || playfield[i][k - 1] === 2) {
              return false;
            }
          }
        }
      }
      return true;
}
    

  function moveTetroLeft() {
    if (canTetroMoveLeft()) {
      for (let i = playfield.length - 1; i >= 0; i--) {
        for (let k = 0; k < playfield[i].length; k++) {
            if (playfield[i][k] === 1) {
                playfield[i][k - 1] = 1;
                playfield[i][k] = 0;
              }
        }
      }
    } 
  }

// ДВигаем фигуру вправо

function canTetroMoveRight() {
    for (let i = 0; i < playfield.length; i++) {
      for (let k = 0; k < playfield[i].length; k++) {
        if (playfield[i][k] === 1) {
          if (k === 9 || playfield[i][k + 1] === 2) {
            return false;
          }
        }
      }
    }
  
    return true;
  }
  
  function moveTetroRight() {
    if (canTetroMoveRight()) {
      for (let i = playfield.length - 1; i >= 0; i--) {
        for (let k = 9; k >= 0; k--) {
          if (playfield[i][k] === 1) {
            playfield[i][k + 1] = 1;
            playfield[i][k] = 0;
          }
        }
      }
    }
  }


  function removeFullLines() {
    let canRemoveLine = true;
    for (let y = 0; y < playfield.length; y++) {
      for (let x = 0; x < playfield[y].length; x++) {
        if (playfield[y][x] !== 2) {
          canRemoveLine = false;
        }
      }
      if (canRemoveLine) {
        playfield.splice(y, 1);
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
}
function startGame(){
    moveTetroDown()
    draw()
    setTimeout(startGame, gameSpeed)
}
setTimeout(startGame, gameSpeed)


