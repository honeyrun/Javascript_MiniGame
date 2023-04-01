import { character, moveCharacter, detectCharacterMovement, detectCharacterSize, characterReset } from './modules/character.js';
import { createFood, moveFoodRand } from './modules/food.js'

let gameOver=true;
let endTime;
let time = 0;
let isTimerOn = false;
let isHardMode = false;

let foodCount = 17;

var bgm = new Audio('./src/bgm.mp3');

function levelCtrl(e) {
    switch($(e.target).text()) {
        case "Easy":    // 3min
            endTime = 180600;
        break;
        case "Medium":  // 1min 30sec
            endTime = 90400;
        break;
        case "Hard":    // 50sec
            endTime = 50400;
            isHardMode = true;
        break;
    }
    isTimerOn = true;
    bgm.play();

    $('#levelSelect').hide();

    moveCharacter();
    // create first food
    createFood();

    gameOver = false;
    window.requestAnimationFrame(main);
}

function gameReset(e) {
    $('.timer').hide();
    $("#success").hide();
    $("#gameover").hide();
    $('#levelSelect').css("display", "flex");
    characterReset();
}

function endGame() {
    $(".food").remove();
    // reset timer value
    time = 0;
    endTime = 0;
    gameOver = true;
    isTimerOn = false;
    isHardMode = false;

    bgm.pause();
    bgm.currentTime = 0;
}

function gameSuccess() {
    $('#success').css("display", 'flex');
    endGame();
}

function gameTimeOut() {
    $('#gameover').css("display", 'flex');
    endGame();
}

function detectHit() {
    let food = $(".food");
    if (food.length != 0) {
        let foodL = food.position().left+5,
            foodR = food.position().left+food.width()-5,
            foodT = food.position().top+5,
            foodB = food.position().top+food.height()-5;
    
        let chaL = character.position().left,
            chaR = character.position().left+character.width(),
            chaT = character.position().top+character.height()*0.1,
            chaB = character.position().top+character.height();
    
        if (foodL <= chaR && foodR >= chaL) {
            if(foodT <= chaB && foodB >= chaT) {
                var audio = new Audio('./src/eat.mp3');
                audio.play();
                food.remove();
                createFood();
                //after hitting with food, make character bigger
                character.height(character.height()+10);
                character.width(character.width()+10);
                console.log("Hit!!!");  // log
                
                // check the character size
                if(detectCharacterSize()) {
                    gameSuccess();
                }
            }
        }
    }
}

// TIMER  & UPDATE FUNCTION --------------
function timer (deltaTime) {
    time += deltaTime;
    if (time >= endTime) {
        gameTimeOut();
        time = 0;
    }
}

function showTimer() {
    $('h2').text(((endTime - time)/1000).toFixed(1));
    $('.timer').css("display", 'flex');
}

function updateFunction(fn, runEvery) {
    let counter = 0;
    return function (deltaTime) {
        counter += deltaTime;
        if (counter >= runEvery) {
            fn();
            counter = 0;
        }
    }
}
const hardModeCtrl = updateFunction(moveFoodRand, 5000);


function main(timestamp) {
    // subtract from previous timestamp to get the delta-time gap
    var timeGap = (timestamp - lastRender);

    // make a record of time
    lastRender = timestamp;

    if(!gameOver) {

        if (isTimerOn) {
            // send each delta-time to use as timer
            timer(timeGap);
            showTimer();
    
            detectCharacterMovement();
            detectHit();
    
            if(isHardMode) {
                hardModeCtrl(timeGap);
            }
        }

        // request the new frame unless its game over
        requestAnimationFrame(main);
    }
}

// make the first record of time
let lastRender = performance.now();

$('.level').click(levelCtrl);
$('.replay').click(gameReset);