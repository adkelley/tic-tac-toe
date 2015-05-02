// wait for the DOM to finish loading
window.addEventListener("load", function () {
  // all your code should go in here.
  var boxes = new Array(9);   // holds event listeners
  var myBoard = new Array(9); // holds circle, square, or empty
  var nextPerson;

  function markSquare() {};


  function renderBoard() {
    for (var i=0; i<9; i++) {
      elem = document.getElementById("box"+i);
      if (myBoard[i] === "circle") {
        elem.innerHTML = "O"
      } else if (myBoard[i] === "square") {
        elem.innerHTML = "X";
      }
      else " ";
    }
  }

  function processBox(index) {
    function circleOrSquare() {
      if (myBoard[index] === "empty") {
        if (nextPerson) {
          return "square"
        } else return "circle"
      }
    }
    myBoard[index] = circleOrSquare();
    renderBoard();
    nextPerson = !nextPerson;
  }
    
  function initBoard() {
    // clear the board, listen for events
    var elem;

    for (var i=0; i<9; i++) {
      elem = document.getElementById("box"+i);
      boxes[i] = (elem.addEventListener("click", function(event) {
        processBox(parseInt(event.target.id.match(/[0-8]/),10));
      }));
      myBoard[i] = "empty";
    }
  };
    
  function newGame() {
    function whoGoesFirst() {
      // randomly pick circle 0 or square 1
      return Math.round(Math.random());
    };

    initBoard();
    nextPerson = whoGoesFirst();
    alert(((nextPerson) ?
           "Square" : "Circle") + " goes first!");
  };

  newGame();

});
