let main = document.querySelector('.main');
let playfield = [
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
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0]
];

const gameSpeed = 500;

function draw(){
    let mainInnerHTML = "";

    for(let i = 0; i < playfield.length; i++){
        for(let k = 0; k < playfield[i].length; k++){
        if(playfield[i][k] === 1){
            mainInnerHTML += '<div class="cell"> </div>'
        } else {
            mainInnerHTML += '<div class="cell moving-cell"> </div>'
        }
    }
 }
main.innerHTML = mainInnerHTML
}

function canTetroMoveDown() {
    for(let i = 0; i < playfield.length; i++){
        for(let k = 0; k < playfield[i].length; k++){
            if(playfield.length[i][k] === 1){
                if( i === playfield.length - 1){
                    return false;
                }
            }
        }  
    }
    return true;
}

function moveTetroDown() {
    if(canTetroMoveDown()){
        for(let i = playfield.length - 1; i >= 0; i--){
            for(let k = 0; k < playfield[i].length; k++){
                if(playfield[i][k] === 1){
                    playfield[i + 1][k] = 1;
                    playfield[i][k] = 0;
                }
            }  
        }
    }
}

draw()
function startGame(){
    moveTetroDown()
    draw()
    setTimeout(startGame, gameSpeed)
}
setTimeout(startGame, gameSpeed)


