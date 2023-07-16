
//minesweeper game by 101computing.net - www.101computing.et/minesweeper-in-javascript/
var grid = document.getElementById("grid");
var testMode = false; //Turn this variable to true to see where the mines are
const ROW_SIZE = 10;
const COL_SIZE = 20;
const NUM_MINES_MAX = 200;
generateGrid();

function generateGrid() {
  //generate ROW_SIZE by COL_SIZE grid
  grid.innerHTML="";
  for (var i=0; i<ROW_SIZE; i++) {
    row = grid.insertRow(i);
    for (var j=0; j<COL_SIZE; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var mine = document.createAttribute("data-mine");       
      mine.value = "false";             
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() {
  //Add mines randomly
  for (var i=0; i<NUM_MINES_MAX; i++) {
    var row = Math.floor(Math.random() * ROW_SIZE);
    var col = Math.floor(Math.random() * COL_SIZE);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine","true");
    if (testMode) cell.innerHTML="X";
  }
}

function revealMines() {
    //Highlight all mines in red
    for (var i=0; i<ROW_SIZE; i++) {
      for(var j=0; j<COL_SIZE; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-mine")=="true") cell.className="mine";
      }
    }
}

function checkLevelCompletion() {
  var levelComplete = true;
    for (var i=0; i<ROW_SIZE; i++) {
      for(var j=0; j<COL_SIZE; j++) {
        if ((grid.rows[i].cells[j].getAttribute("data-mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
      }
  }
  if (levelComplete) {
    alert("You Win!");
    revealMines();
  }
}

function clickCell(cell) {
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine")=="true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.className="clicked";
    //Count and display the number of adjacent mines
    var mineCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    //alert(cellRow + " " + cellCol);
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,ROW_SIZE-1); i++) {
      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,COL_SIZE-1); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
      }
    }
    cell.innerHTML=mineCount;
    if (mineCount==0) { 
      //Reveal all adjacent cells as they do not have a mine
      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,ROW_SIZE); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,COL_SIZE); j++) {
          //Recursive Call
          if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}