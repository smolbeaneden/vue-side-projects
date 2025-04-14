export type Board = number[][];
import {  SQRT_BOARD_SIZE, EMPTY_CELL, board , BOARD_SIZE} from '@/logic/boardAlgorithm.ts';



export function setBoardColumns(): Board {
    const boardColumns: Board = [];

	for( const [i, row] of board.value.entries() ) {
		boardColumns.push([])
		for( const [j] of row.entries() ) {
			boardColumns[i].push(board.value[j][i]);
		}
	}
    return boardColumns;
}

export function setBoardBoxes(): Board {
    const boardBoxes: Board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        boardBoxes.push([]);
        for (let j = 0; j < SQRT_BOARD_SIZE; j++) {
            for (let k = 0; k < SQRT_BOARD_SIZE; k++) {
                boardBoxes[i].push(board.value[j + Math.floor(i / SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE][k + (i % SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE]);
            }
        }
    }
    return boardBoxes;
}



export function filterArray(arrayToFilter: number[], numbersToRemove: number[]): number[] {
    numbersToRemove = numbersToRemove.filter((num) => num != 	EMPTY_CELL);
	for(const [index] of numbersToRemove.entries()) {
		arrayToFilter = arrayToFilter.filter((num) => num != numbersToRemove[index])
	}
    return arrayToFilter;
}


export function getBorder (index: number) :string {
  if (index % SQRT_BOARD_SIZE == 0){
    return "2px"
  }
  else{
    return "0px";
  }
}


//
// const rows: Board = []
// const cols: Board = [];
// const boxes: Board = []
//
// const knownOptions: number[] = [];
//
// for(let i = 1; i <= BOARD_SIZE; i++){
// 	knownOptions.push(i);
// }
//
// for (let j = 0; j < BOARD_SIZE; j++) {
// 	rows.push(knownOptions)
// 	cols.push(knownOptions)
// 	boxes.push(knownOptions)
// }
//
// export { rows, cols, boxes };
