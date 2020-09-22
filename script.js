/* mode of the game (dificulty) */
const EASY = 3;
const HARD = 6;

/* initial values */
var mode = HARD;
var goalColor;
var colors = [];

/* selected elements from the document */
var h1 = document.querySelector('h1');
var resetBtn = document.querySelector('#reset');
var modeBtns = document.querySelectorAll('.mode');
var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorDisplay');
var msgDisplay = document.querySelector('#message');

/* generate a random integer between 0 and 255 (inclusive) */
function getRandomNum() {
    return Math.floor(Math.random() * 256);
}

/* generate a random RGB code */
function getRandomRGB() {
    return 'rgb(' + getRandomNum() + ', ' + getRandomNum() + ', ' + getRandomNum() + ')';
}

/* generate an array that has the given number of random RGB */
function getRandomRGBset(num) {
    var colors = [];
    for (var i = 0; i < num; i++) {
        colors[i] = getRandomRGB();
    }
    return colors;
}

/* change colors of wanted elements (squares and h1) to the given RGB color code */
function changeColors(rgb) {
    for (var i = 0; i < mode; i++) {
        squares[i].style.backgroundColor = rgb;
    }
    h1.style.backgroundColor = rgb;
}

/* initialize the game */
function init() {
    reset();
    addListenersToSquares();
    addListenersToModeButtons();
    resetBtn.addEventListener('click', init);
}

/*  reset the game
    generate and assign new colors
    pick a new goal color
    reset the messages 
    hide or show the squares according to the mode
 */
function reset() {
    colors = getRandomRGBset(mode);
    goalColor = colors[Math.floor(Math.random() * mode)];
    colorDisplay.textContent = goalColor;
    msgDisplay.textContent = '';
    resetBtn.textContent = 'New Colors';
    h1.style.backgroundColor = 'steelblue';
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].classList.add('show');
            squares[i].classList.remove('hide');
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].classList.add('hide');
            squares[i].classList.remove('show');
        }
    }
}

/*  add eventListeners to the squares
    when correct - change the color of all squares to the goal color (using changeColors function)
                 - show 'Correct!' message
    when wrong   - set the color to that of the body (so that it does not show)
                 - show 'Try again!' message
 */
function addListenersToSquares() {
    squares.forEach(function(square) {
        square.addEventListener('click', function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === goalColor) {
                msgDisplay.textContent = 'Correct!';
                resetBtn.textContent = 'Play Again';
                changeColors(goalColor);
            } else {
                this.style.backgroundColor = '#232323';
                msgDisplay.textContent = 'Try Again!';
            }
        });
    });
}

/*  add eventListeners to the mode buttons
    set the mode to the clicked one
    change the style of the buttons accordingly
 */
function addListenersToModeButtons() {
    for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener('click', function() {
            modeBtns.forEach(function(btn) {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            mode = this.textContent === 'EASY' ? EASY : HARD;
            init();
        });
    }
}

/* run the game */
init();