'use strict';

let currentResult = 0;
let multiplier = 1;
let sequenceOfRightAnswers = 0;
let numOne = document.getElementById('num-1');
let numTwo = document.getElementById('num-2');

/**
 * @return Integer between 10 and 1
 */

const randomNumber = () => {
    return Math.floor(Math.random() * 9 + 1);
}

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
            ++sequenceOfRightAnswers;
            currentResult = updateNumbers(randomNumber(), randomNumber());
            updateHighScore(multiplier)

            if (multiplier < 3 && sequenceOfRightAnswers === 10) {
                multiplier = 2;
            } else if (multiplier < 3 && sequenceOfRightAnswers === 20){
                multiplier = 3;
            }

        } else {
            sequenceOfRightAnswers = 0;
            multiplier = 1;
        }
    }
})

function updateNumbers(one, two) {
    numOne.innerHTML = one;
    numTwo.innerHTML = two;

    return one * two;
}

function updateHighScore(multiplier) {
    let highscore = document.getElementById('points')
    highscore.innerHTML = parseInt(highscore.innerHTML) + multiplier;
}
