export let character = $('#character');

let boxWidth = $('#con').width();
let boxHeigth = $('#con').height();;

let centerX = (boxWidth-character.width())/2;
let centerY = (boxHeigth-character.height())/2;

let characterVal = {
    x: centerX,
    y: centerY,
    speedMultiplier: 2
};

/// store key codes and currently pressed ones
let keys = {};
    keys.UP = 38;
    keys.LEFT = 37;
    keys.RIGHT = 39;
    keys.DOWN = 40;

function keyUp(e) {
    keys[e.keyCode] = null;    
}

function keyCtrl(e) {
    if(e.keyCode==37 || e.keyCode==38 || e.keyCode==39 || e.keyCode==40) {
        e.preventDefault();
        keys[e.keyCode] = true;
        character.css("background-image", "url('./src/pacmanM.gif')");
    }
    switch(e.keyCode){
        case 37: // left
            character.addClass("flip");
        break;
        case 39: // right
            character.removeClass("flip");
        break;
    }
}

// character movement update
export function moveCharacter (dx, dy){
    characterVal.x += (dx||0) * characterVal.speedMultiplier;
    characterVal.y += (dy||0) * characterVal.speedMultiplier;
    if(characterVal.x < 0) { characterVal.x = 0;}
    if(characterVal.y < 0) { characterVal.y = 0;}
    if(characterVal.x + character.width() > boxWidth) { characterVal.x = boxWidth - character.width();}
    if(characterVal.y + character.width() > boxHeigth) { characterVal.y = boxHeigth - character.width();}
    character.css("left", characterVal.x + 'px');
    character.css("top", characterVal.y + 'px');
};

// character control
export function detectCharacterMovement (){
    if (keys[keys.LEFT])    { moveCharacter(-1, 0); }
    if (keys[keys.RIGHT])   { moveCharacter(1, 0); }
    if (keys[keys.UP])      { moveCharacter(0, -1); }
    if (keys[keys.DOWN])    { moveCharacter(0, 1); }
    if (!keys[keys.LEFT] && !keys[keys.RIGHT] && !keys[keys.UP] && !keys[keys.DOWN]) {
        character.css("background-image", "url('./src/pacman.png')");
    }
};

export function detectCharacterSize() {
    if (character.width()==200 && character.height()==200) {
        return true;
    }
    return false;
};

export function characterReset() {
    // move character to default position
    characterVal.x = centerX;
    characterVal.y = centerY;
    character.width(30);
    character.height(30);
};


$(window).keydown(keyCtrl);
$(window).keyup(keyUp);
// window.addEventListener("keydown", keyCtrl);
// window.addEventListener("keyup", keyUp);