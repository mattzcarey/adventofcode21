const data =`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`.split("\n\n");

let nums = data[0].split(",").map(Number);
let boards = data.slice(1).map(parseBoard);

function parseBoard(s) {
  let rows = s.split("\n");
  rows = rows.map((row) => ({
    count: 0,
    numbers: row
      .split(" ")
      .filter((s) => s !== "")
      .map(Number),
  }));

  let cols = [];
  for (let row of rows) {
    let colIndex = 0;
    for (let number of row.numbers) {
      if (!cols[colIndex]) {
        cols[colIndex] = {
          count: 0,
          numbers: [],
        };
      }
      cols[colIndex].numbers.push(number);
      colIndex++;
    }
  }
  return {
    rows,
    cols,
  };
}

function calcScoreForBoard(board, dir) {
  let score = 0;
  if (dir === "r") {
    for (let row of board.rows) {
      for (let number of row.numbers) {
        if (!marked.has(number)) {
          score += number;
        }
      }
    }
  } else if (dir === "c") {
    for (let col of board.cols) {
      for (let number of col.numbers) {
        if (!marked.has(number)) {
          score += number;
        }
      }
    }
  }
  return score * lastCall;
}

let lastCall = 0;
let lastScore = 0;
let marked = new Set();
let finishedBoards = new Set();

for (let num of nums) {
  lastCall = num;
  console.log(lastCall)
  marked.add(num);
  for (let board of boards) {
    for (let row of board.rows) {
      for (let number of row.numbers) {
        if (num == number) {
          row.count++;
          if (row.count === 5 && !finishedBoards.has(boards)) {
            lastScore = calcScoreForBoard(board, "r");
            finishedBoards.add(board);
          }
        }
      }
    }
    for (let col of board.cols) {
      for (let number of col.numbers) {
        if (num == number) {
          col.count++;
          if (col.count === 5 && !finishedBoards.has(boards)) {
            lastScore = calcScoreForBoard(board, "c");
            finishedBoards.add(board);
          }
        }
      }
    }
  }
}

alert(lastScore);
