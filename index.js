'use strict';

let currentResult = 0;
let multiplier = 1;
let sequenceOfRightAnswers = 0;
let numOne = document.getElementById('num-1');
let numTwo = document.getElementById('num-2');
let effect = document.getElementById('effect');
let numberOfPoints = document.getElementById('number-points');


/**
 * Generate random first numbers
 */

window.onload = event => {
    currentResult = updateNumbers(randomNumber(), randomNumber())
}

const result = document.getElementById('result-of-x*y');

result.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (result.value == currentResult) {
            result.value = "";
            isEffectGreen(true);

            ++sequenceOfRightAnswers;
            currentResult = updateNumbers(randomNumber(), randomNumber());
            updateHighScore(multiplier)

            if (multiplier < 3 && sequenceOfRightAnswers === 10) {
                multiplier = 2;
            } else if (multiplier < 3 && sequenceOfRightAnswers === 30){
                multiplier = 3;
            }

        } else {
            isEffectGreen(false);
            sequenceOfRightAnswers = 0;
            let isZero = updateHighScore(-1*multiplier);

            if(isZero) {
                numberOfPoints.innerHTML = "0";
                return;
            }

            result.value = "";
            numberOfPoints.innerHTML = -1*multiplier;
            multiplier = 1;
        }
    }
})


effect.addEventListener('webkitTransitionEnd', function(e) {
    for (const i of effect.classList) {
        if (i === 'right-answer' || i === 'wrong-answer') {
            effect.classList.remove(i);
        }
    }

    effect.style.visibility = 'hidden';
}, false);

/**
 * @return Integer between 10 and 1
 */

function randomNumber() {
    return Math.floor(Math.random() * 9 + 1);
}

/**
 * Display the effect whether the current
 * answer is right or wrong.
 */

function isEffectGreen(active) {
    effect.style.visibility = 'visible';

    if (active) {
        effect.classList.add('right-answer');
    } else {
        effect.classList.add('wrong-answer');
    }

}

function updateNumbers(one, two) {
    numOne.innerHTML = one;
    numTwo.innerHTML = two;

    return one * two;
}

function updateHighScore(number) {
    let highscore = document.getElementById('points')
    let highscoreText = document.getElementById('score');

    if (highscore.innerHTML === "0" && number < 0) {
        return true;
    }

    highscore.innerHTML = parseInt(highscore.innerHTML) + number;
    highscoreText.classList.add('blink-score');

    numberOfPoints.innerHTML = number > 0 ? `+${number}` : number;

    highscoreText.addEventListener('animationend', function(e) {
        highscoreText.classList.remove('blink-score');
    }, false);
}
