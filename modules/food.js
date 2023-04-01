
let boxWidth = $('#con').width()-40;
let boxHeigth = $('#con').height()-40;;

const RandInt = (min,max) => {
    return Math.floor(Math.random()*(max-min+1))+min;
}

export function createFood() {
    let newFood = $('<div><div>');
    newFood.addClass("food")
    let ran1 = RandInt(1,3);
    newFood.css("background-image", "url('./src/f" +ran1+ ".png')");

    let ran2 = RandInt(0,boxHeigth);
    newFood.css("top", ran2 + "px")
    let ran3 = RandInt(0,boxWidth);
    newFood.css("left", ran3 + "px")

    $('#con').prepend(newFood);
}

export function moveFoodRand() {
    let food = $('.food');
    let ran2 = RandInt(0,boxHeigth);
    food.css("top", ran2 + "px")
    let ran3 = RandInt(0,boxWidth);
    food.css("left", ran3 + "px")
}