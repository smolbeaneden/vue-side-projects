// import { ref, onMounted } from 'vue'
//add type tree
import type { Board } from '@/logic'
import { filterArray, setBoardBoxes, setBoardColumns } from '@/logic'
//import { rows, cols, boxes } from '@/logic'   // options left, organized differently

const BOARD_SIZE = 9;
export { BOARD_SIZE }

export const board = ref<Board>([])
export const difficulty = ref<string>('')
export const originalBoard = ref<Board>([])
export const boardIndexes = ref<number[]>([]) //to go through the board

const currBoard = ref<Board>([])

const boardColumns = ref<Board>([]) //board arranged by columns
const boardBoxes = ref<Board>([]) //board arranged by boxes (left to right then down a row)

// const rowsOptions = ref<Board>(rows) //left options for rows
// const colsOptions = ref<Board>(cols) //left options for columns
// const boxesOptions = ref<Board>(boxes) //left options for boxes

//all options for every cell:
const options = ref<number[][][]>([])

interface Options {
	x: number
	y: number
	minLength: number
}

for (let i = 0; i < BOARD_SIZE; i++) {
	boardIndexes.value.push(i)
}

async function fetchBoard(){
	try {
		const response = await fetch('https://sudoku-api.vercel.app/api/dosuku')
		const data = await response.json()
		const gridRes = data.newboard.grids.pop()
		board.value = gridRes.value
		originalBoard.value = structuredClone(gridRes.value) //check gridRes.value alone
		currBoard.value = structuredClone(gridRes.value)
		difficulty.value = gridRes.difficulty
	} catch (error) {
		console.log('error fetching board', error)
	}
	return true;
}

await fetchBoard()

boardColumns.value = setBoardColumns(board.value)
boardBoxes.value = setBoardBoxes(board.value)

// --> setting options again and presenting the board in columns and boxes
//lets do it different - assign each time we assign new value to the board - to these boards as well

// function setBoard(): void {
// 	rowsOptions.value = rows
// 	colsOptions.value = cols
// 	boxesOptions.value = boxes
//
// 	//filtering options:
// 	for (let i = 0; i < BOARD_SIZE; i++) {
// 		rowsOptions.value[i] = filterArray(rowsOptions.value[i], board.value[i])
// 		colsOptions.value[i] = filterArray(colsOptions.value[i], boardColumns.value[i])
// 	}
// 	for (let i = 0; i < Math.pow(BOARD_SIZE / 3, 2); i++) {
// 		boxesOptions.value[i] = filterArray(boxesOptions.value[i], boardBoxes.value[i])
// 	}
// }
//--> done setting board

//Method no.1 of solving
function lastPossibleNumber(): void {
	let test = 0
	while (test == 0) {
		test = 1

		options.value = []
		for (const [i, row] of board.value.entries()) {
			options.value.push([]);
			for (const [j, val] of row.entries()) {
				if (board.value[i][j] == 0) {
					const cellOptions = getOptions(i, j)
					options.value[i].push(cellOptions)
					if (cellOptions.length == 1) {
						//const setCell = () =>{board.value[i][j] = cellOptions[0]}
						//setTimeout(setCell, 1000);
						board.value[i][j] = cellOptions[0];
						boardBoxes.value[Math.floor(j / 3) * 3 + Math.floor(i / 3) * 3][(i % 3)*3 + j%3] = val;
						boardColumns.value[j][i] = val;
						currBoard.value[i][j] = cellOptions[0];
						test = 0;
						if (checkSolved()) {
							alert('Board solved ;)')
							return;
						}
					}
				} else {
					options.value[i].push([board.value[i][j]]);
				}
			}
		}
	}
}

const boardWentThrough = ref<Options[][][]>([]) //make it a board! of empty places for each cell. easily delete when going backwards

//list all the wrong paths? -no!! its different cause cells affect each other
for (let i = 0; i < BOARD_SIZE; i++) {
	boardWentThrough.value.push([])
	for (let j = 0; j < BOARD_SIZE; j++) {
		boardWentThrough.value[i].push([])
	}
}

function notGoneThrough(x: number, y: number): boolean {
	for (const [index, row] of boardWentThrough.value.entries()) {
		row.map((optionConsidered) => {
			const currOption: Options | undefined = optionConsidered[0]
			if ( currOption && x == currOption.x && y == currOption.y ) {
				return false
			}

		})
	}
	return true
}

function findLeastOptionsCell() {
	const minOptions = ref<Options>() // point with the least amount of options
	minOptions.value = {
		x: 0,
		y: 0,
		minLength: 9,
	}
	for (const [i, row] of options.value.entries()) {
		for (const [j, cellOptions] of row.entries()) {
			if (
				cellOptions.length < minOptions.value.minLength &&
				cellOptions.length != 1 &&
				notGoneThrough(j, i)
			) {
				minOptions.value.minLength = cellOptions.length
				minOptions.value.x = j
				minOptions.value.y = i

				if (minOptions.value.minLength == 2) {
					boardWentThrough.value[i][j]= [minOptions.value];
					return minOptions.value;
				}
			}
		}
	}
	boardWentThrough.value[minOptions.value.y][minOptions.value.x] = [minOptions.value];
	return minOptions.value;
}

const optionsLength = ref<number[]>([])
const getOptionsLengths = () => {
	optionsLength.value = []
	for (const row in options.value) {
		for (const col in options.value[row]) {
			optionsLength.value.push(options.value[row][col].length)
		}
	}
}

//make an interface for elements in path
// if we tried all options in the element, go back until we find an element in which there are options we didn't try yet.
interface OptionTried {
	optionValue: number,
	wentThrough: boolean,
	currentBoard: Board
}
interface PathElement{
	x: number,
	y: number,
	numberOfOptions: number,
	options: OptionTried[]
}

const path = ref<PathElement[]>([])

function trialAndError(): void {
	const leastOptionsCell: Options = findLeastOptionsCell()
	const cellOptionsArray: number[] = options.value[leastOptionsCell.x][leastOptionsCell.y] // options

	const currPathElement= ref<PathElement>({
		x: leastOptionsCell.x,
		y: leastOptionsCell.y,
		numberOfOptions: cellOptionsArray.length,
		options: [],
	})
	for (const [index, cell] of cellOptionsArray.entries()){
		currPathElement.value.options.push({optionValue: cell, wentThrough: false, currentBoard: []})
	}
	path.value.push(currPathElement.value);

	for (const [index, cell] of cellOptionsArray.entries()) {
		treeChild(index, cell, currPathElement.value.y, currPathElement.value.x);
		//make a function
		// board.value[currPathElement.value.x][currPathElement.value.y] = cell;
		// path.value[path.value.length -1].options[index].wentThrough = true;
		// path.value[path.value.length -1].options[index].currentBoard = structuredClone(board.value);

		// if (checkWorking()){
		// 	gameOn();
		// } else{
		// 	if (index + 1 == path.value[path.value.length -1].options.length) {
		// 		path.value.pop();
		// 		for (let i = 0; i < path.value[path.value.length-1].options.length; i++) {
		// 			if(path.value[path.value.length - 1].options[i].wentThrough == false){
		// 				treeChild(i, path.value[path.value.length - 1].options[i].optionValue)
		// 			}
		// 		}
		//
		// 		//change to index
		// 		//trialAndError()
		// 		//go back cell?
		// 	}
		// }
		//clear!!!
	}

	function treeChild(index: number, cellValue: number, y: number, x: number): void{
		board.value[y][x] = cellValue;
		path.value[path.value.length -1].options[index].wentThrough = true;
		path.value[path.value.length -1].options[index].currentBoard = structuredClone(toRaw(board.value));

		if (checkWorking()){
			gameOn();
		} else{
			if (index + 1 == cellOptionsArray.length) {
				path.value.pop();
				for (let i = 0; i < path.value[path.value.length-1].options.length; i++) {
					if(!path.value[path.value.length - 1].options[i].wentThrough){
						treeChild(i, path.value[path.value.length - 1].options[i].optionValue, path.value[path.value.length - 1].y, path.value[path.value.length - 1].x)
					}
				}
				return;
			}
		}
	}

	function checkWorking() {
		getOptionsLengths()
		optionsLength.value.map((x) => {
			if (x == 0) {
				return false
			}
		})
		return true
	}

	//array of the length of options for each cell
	if (checkSolved()) {
		alert('Solved board;)')
		return;
	}
}

const checkSolved = () => {
	for (const row in board.value) {
		for (const col in board.value[row]) {
			if (board.value[row][col] == 0) {
				return false
			}
		}
	}
	return true
}

//let's go!
function gameOn(): void {
	lastPossibleNumber()
	if (checkSolved()) {
		return;
	}
	trialAndError();
}
gameOn();

function getOptions(y: number, x: number): number[] {
	// const arr: number[][] = [rowsOptions.value[y], colsOptions.value[x], boxesOptions.value[Math.floor(y / 3) * 3 + Math.floor(x / 3)]];
	//  return (arr.reduce((prev,curr) => prev.filter(element => curr.includes(element))));
	const options = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9])
	options.value = filterArray(options.value, [
		...board.value[y],
		...boardColumns.value[x],
		...boardBoxes.value[Math.floor(y / 3) * 3 + Math.floor(x / 3)],
	])
	return options.value
}
