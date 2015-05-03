window.addEventListener("load", function () {
  var myBoard = new Array(24); // holds O = 0, X = 1, or empty = -1
  var x, XScore = 0, OScore = 0, tieScore = 0; // 0 = O, 1 = X

  function updateScoreBoard(whoWon) {
    elem = document.querySelectorAll("li");
    if (whoWon === "Tie") {
      tieScore += 1;
      elem[1].innerHTML = tieScore.toString();
    }
    else if (whoWon === "O Wins") {
      OScore += 1;
      elem[0].innerHTML = OScore.toString();
    }
    else { // X wins
      XScore += 1;
      elem[2].innerHTML = XScore.toString();
    }
  }

  function isGameOver() {
    // Game over when 3 in a row or all boxes filled
    function boxesFull() {
      var notEmpty = true, i = 0;
      while (notEmpty && i < 9) {
        notEmpty = myBoard[i] !== -1;
        i += 1;
      };

      return notEmpty;
    }

    // check rows, cols, diags
    function conseqThree(num) {
      var i=0, three = false;
      while ( !three && i < 24) {
        three = myBoard.slice(i, i+3).every(function(a) {
          return a === num;
        });;
        i += 3;
      }
      return three;
    }

    function isWinner() {
      if (boxesFull()) {
        return("Tie");
      } else if (conseqThree(0)) {
        return("O Wins");
      } else if (conseqThree(1)) {
        return("X Wins");
      } else {
        return "continue";
      }
    }
      
    var result = isWinner();
    if (result !== "continue") {
      updateScoreBoard(result);
      alert("Game Over, " + result + "!");
      if (confirm("Play again?")) {
        newGame();
      }
    }
}


  function markBox(id) {
    var index = parseInt(id.match(/[0-8]/), 10);
    var elem = document.getElementById(id);
    var row = Math.floor(index / 3);
    var col = Math.floor(index % 3);
    var num;
    if (myBoard[index] === -1) {
      elem.innerHTML = (x) ? "X" : "O";
      num = (x) ? 1 : 0;
      myBoard[index] =  myBoard[col*3+row+9] = num; // update columns & rows
      if (Math.floor(index % 2) === 0) { // is token on diagonal box?
        if (index === 0) {
          myBoard[18] = num; // top left corner
        }
        else if (index === 4) {
          myBoard[19] = myBoard[22] = num;  // center box
        }
        else if (Math.floor(index % 4) === 0) { // left diag
          myBoard[col+18] = num;
        }
        else {
          myBoard[col+21] = num;  // right diag
        }
      }
      x = !x;
    }
  }
    

  function newGame() {

    function initBoard() {
      var elem;

      for (var i=0; i<24; i++) { myBoard[i] = -1; };

      for (var i=0; i<9; i++) {
        elem = document.getElementById("box"+i);
        // remove text from prev. game using back space char
        elem.innerHTML = String.fromCharCode(8);
      }

    }

    initBoard();
    x = Math.round(Math.random()); // 0 circle, 1 square
    alert(((x) ? "X" : "O") + " goes first!");
  };



  function initListeners() {
    var elem, reset, result;
    
    for (var i=0; i<9; i++) {
      elem = document.getElementById("box"+i);
      elem.addEventListener("click", function(event) {
        markBox(event.target.id);
        isGameOver();
      })
    }

    reset = document.getElementById("reset");
    reset.addEventListener("click", function(event) {
      // reset scoreboard
      elem = document.querySelectorAll("li");
      for (var i=0; i<3; i++) { elem[i].innerHTML = "0"};
      newGame();
    });
  };

    
  alert("Press Reset Button to begin playing");
  initListeners();

});


