export type Board = number[][];

export function setBoardColumns(board: Board): Board {
    const boardColumns: Board = [];
    for (let i = 0; i < board.length; i++) {
        boardColumns.push([])
        for (let j = 0; j < board.length; j++) {
            boardColumns[i].push(board[j][i]);
        }
    }
    return boardColumns;
}

export function setBoardBoxes(board: Board): Board {
    const boardBoxes: Board = [];
    for (let i = 0; i < Math.pow((board.length / 3), 2); i++) {
        boardBoxes.push([]);
        for (let j = 0; j < board.length / 3; j++) {
            for (let k = 0; k < board.length / 3; k++) {
                boardBoxes[i].push(board[j + Math.floor(i / 3) * 3][k + (i % 3) * 3]);
            }
        }
    }
    return boardBoxes;
}



export function filterArray(arrayToFilter: number[], numbersToRemove: number[]): number[] {
    numbersToRemove = numbersToRemove.filter((num) => num != 0)
    for (let i = 0; i < numbersToRemove.length; i++) {
        arrayToFilter = arrayToFilter.filter((num) => num != numbersToRemove[i])
    }
    return arrayToFilter;
}


export const getBorder = (index: number) => {
  if (index % 3 == 0){
    return "2px"
  }
  else{
    return "0px";
  }
}


const knownOptions: number[] = [1,2,3,4,5,6,7,8,9];
const rows: Board = []
const cols: Board = [];
const boxes: Board = []

for (let i = 0; i < Math.pow(9 / 3, 2); i++) {
  if (i < 9) {
    rows.push(knownOptions)
    cols.push(knownOptions)
  }
  boxes.push(knownOptions)
}

export { rows, cols, boxes };
