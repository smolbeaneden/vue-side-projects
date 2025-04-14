// import { ref, onMounted } from 'vue'
//add type tree
import type { Board } from '@/logic/index.ts'
import { filterArray, setBoardBoxes, setBoardColumns } from '@/logic/index.ts'
//import { rows, cols, boxes } from '@/logic'   // options left, organized differently

export const BOARD_SIZE = 9;
export default BOARD_SIZE;
export const SQRT_BOARD_SIZE: number = Math.sqrt(BOARD_SIZE);
export const EMPTY_CELL = 0;
const NO_OPTIONS = 0;
const ONE_OPTION = 1;

export const board = ref<Board>([])
export const difficulty = ref<string>('')
export const originalBoard = ref<Board>([])
export const boardIndexes = ref<number[]>([]) //to go through the board

const currBoard = ref<Board>([])

const boardColumns = ref<Board>([]) //board arranged by columns
const boardBoxes = ref<Board>([]) //board arranged by boxes (left to right then down a row)

const options = ref<number[][][]>([])
const colsOptions = ref<number[][][]>([]) //left options organized by cols
const boxesOptions = ref<number[][][]>([]) //left options organized by boxes


//all options for every cell:

for (let i = 0; i < BOARD_SIZE; i++) {
	boardIndexes.value.push(i)
}

async function fetchBoard(): Promise<boolean>{
	try {
		const response = await fetch('https://sudoku-api.vercel.app/api/dosuku')
		const data = await response.json()
		const gridRes = data.newboard.grids.pop()
		board.value = gridRes.value
		originalBoard.value = structuredClone(toRaw(board.value)) //check gridRes.value alone
		console.log(originalBoard.value);
		// currBoard.value = structuredClone(toRaw(board.value))
		difficulty.value = gridRes.difficulty
	} catch (error) {
		console.log('error fetching board', error)
	}
	return true;
}

await fetchBoard()

//arranging by boxes and columns
boardColumns.value = setBoardColumns()
boardBoxes.value = setBoardBoxes()



function getOptions(y: number, x: number): number[] {
	boardColumns.value = setBoardColumns()
	boardBoxes.value = setBoardBoxes()
	// const arr: number[][] = [options.value[y], colsOptions.value[x], boxesOptions.value[Math.trunc(y / SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE + Math.trunc(x / SQRT_BOARD_SIZE)]];
	//  return (arr.reduce((prev,curr) => prev.filter(element => curr.includes(element))));
	const cellOptions = ref<number[]>([]);
	for(let i = 1; i <= BOARD_SIZE; i++) {
		cellOptions.value.push(i);
	}
	cellOptions.value = filterArray(cellOptions.value, [
		...board.value[y],
		...boardColumns.value[x],
		...boardBoxes.value[Math.trunc(y / SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE + Math.trunc(x / SQRT_BOARD_SIZE)],
	])
	return cellOptions.value
}


function setOptions(): void {
	options.value = [];
	for (const [i, row] of board.value.entries()) {
		options.value.push([]);
		for (const [j] of row.entries()) {
			options.value[i].push(getOptions(i, j));
		}
	}

	//organize options left by: rows, cols and boxes
	colsOptions.value = [];
	boxesOptions.value = [];

	//arranging by columns & boxes
	for( const [i, row] of board.value.entries() ) {
		colsOptions.value.push([])
		for( const [j] of row.entries() ) {
			colsOptions.value[i].push(options.value[j][i]);
		}
	}

	for (let i = 0; i < BOARD_SIZE; i++) {
		boxesOptions.value.push([]);
		for (let j = 0; j < SQRT_BOARD_SIZE; j++) {
			for (let k = 0; k < SQRT_BOARD_SIZE; k++) {
				boxesOptions.value[i].push(options.value[j + Math.floor(i / SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE][k + (i % SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE]);
			}
		}
	}
}

setOptions();
export const startOptions: number[][][] = structuredClone(toRaw(options.value))

interface CellPlace {
	row: number,
	col: number
}

const startPointEmptyCells = ref<CellPlace[]>([]);

function findEmptyCells(): CellPlace[] {
	const emptyCells = ref<CellPlace[]>([]);
	for (const [i, row] of board.value.entries()){
		for (const [j, cell] of row.entries()) {
			if (cell === EMPTY_CELL){
				emptyCells.value.push({row: i, col: j});
			}
		}
	}
	return emptyCells.value;
}


//Method no.1 of solving
function lastOptionNumber(): void {
	const test = ref<boolean>(true);
	while (test.value) {
		test.value = false;

		for (const [i, row] of board.value.entries()) {
			for (const [j, val] of row.entries()) {
				if (val == EMPTY_CELL) {
					const cellOptions: number[] = getOptions(i, j);
					if (cellOptions.length == ONE_OPTION) {
						//const setCell = () =>{board.value[i][j] = cellOptions[0]}
						//setTimeout(setCell, 1000);
						[board.value[i][j]] = cellOptions; //?

						[boardBoxes.value
							[Math.trunc(j / SQRT_BOARD_SIZE) + Math.trunc(i / SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE]
							[(i % SQRT_BOARD_SIZE)*SQRT_BOARD_SIZE + j%SQRT_BOARD_SIZE]]
							= cellOptions;
						[boardColumns.value[j][i]] = cellOptions
						test.value = true;
						if (findEmptyCells().length == 0) {
							return;
						}
					}
				}
			}
		}
	}
	return;
}

const optionsLength = ref<number[]>([])
function checkWorking () : boolean {
	setOptions();
	optionsLength.value = []
	for (const [i, row] of options.value.entries()) {
		for (const [j] of row.entries()) {
			if (options.value[i][j].length == 0){
				return false
			}
		}
	}
	return true;
}

// function checkWorking(): boolean {
// 	getOptionsLengths()
// 	const working = ref<boolean>(true)
// 	optionsLength.value.forEach((x: number) => {
// 		if (x == NO_OPTIONS) working.value = false;
// 	})
// 	return working.value
// }

function isSolved(): boolean{
	boardColumns.value = setBoardColumns()
	boardBoxes.value = setBoardBoxes()
	for(const [i, row] of board.value.entries()) {
		for(const [j, val] of row.entries()) {
			for(const [x, value] of row.entries()) {
				if(val == value && x != j){
					return false;
				}
			}
			for(const [x, value] of boardColumns.value[i].entries()) {
				if(val == value && x != j){
					return false;
				}
			}
			for(const [x, value] of boardBoxes.value[Math.trunc(i / SQRT_BOARD_SIZE) * SQRT_BOARD_SIZE + Math.trunc(j / SQRT_BOARD_SIZE)].entries()) {
				if(val == value && x != Math.trunc(i / SQRT_BOARD_SIZE)*3 + Math.trunc(j / SQRT_BOARD_SIZE) ){
					return false;
				}
			}


		}
	}
	return true;
}


//  //go on and backtrack :]
// function recurse(index: number): boolean {
// 	if(index >= startPointEmptyCells.value.length){
// 		return true
// 	}
//
// 	currBoard.value = structuredClone(toRaw(board.value));
// 	setOptions();
//
// 	const { row, col } :CellPlace = startPointEmptyCells.value[index]
//
// 	const cellOptions = options.value[row][col];
//
// 	if(board.value[row][col] != 0){
// 		for(const option of cellOptions) {
// 			board.value[row][col] = option;
// 			lastOptionNumber();
// 			console.log(row, col);
//
// 			if (recurse(index + 1) && isSolved()) {
// 				return true;
// 			}
//
// 			board.value = structuredClone(toRaw(currBoard.value))
// 		}
// 	}
// 	else{
// 		if (recurse(index + 1) && isSolved()) {
// 			return true;
// 		}
// 	}
//
// 	return false;
// }



function recurse(index: number): boolean {
	if(index >= startPointEmptyCells.value.length){
		return true
	}

	//currBoard.value = structuredClone(toRaw(board.value));
	setOptions();

	const { row, col } :CellPlace = startPointEmptyCells.value[index]

	const cellOptions = options.value[row][col];


	for(const option of cellOptions) {
		board.value[row][col] = option;
		//lastOptionNumber();
		console.log(row, col);
		if (recurse(index + 1)) {
			return true;
		}
		board.value[row][col] = EMPTY_CELL;
		//board.value = structuredClone(toRaw(currBoard.value))
	}

	return false;
}


export const isLoading = ref<boolean>(true);

function gameOn(): void {

	lastOptionNumber(); // comparing each cell to its row-col-box and if it has one option left we assign it to the cell.
	if (findEmptyCells().length == 0) {
		alert('Solved board')
		return;
	}
	startPointEmptyCells.value = findEmptyCells();
	recurse(0); //recursive function

	if (isSolved() && findEmptyCells().length == 0) {
		isLoading.value = false;
		alert('Solved board')
		return;
	}
	else {
		isLoading.value = false;
		alert('WOMP WOMP');
	}
}

gameOn();
