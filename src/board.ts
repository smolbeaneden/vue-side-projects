import { ref, onMounted } from 'vue'
import type { Board } from '@/logic'
import { filterArray, setBoardBoxes, setBoardColumns } from '@/logic'
import { rows, cols, boxes } from '@/logic'

const BOARD_SIZE = 9;
export { BOARD_SIZE }

export const board = ref<Board>([])
export const difficulty = ref<string>('')
export const originalBoard = ref<Board>([])
export const boardIndexes = ref<number[]>([]) //to go through the board

const currBoard = ref<Board>([])

const boardColumns = ref<Board>([]) //board arranged by columns
const boardBoxes = ref<Board>([]) //board arranged by boxes (left to right then down a row)

const rowsOptions = ref<Board>(rows) //left options for rows
const colsOptions = ref<Board>(cols) //left options for columns
const boxesOptions = ref<Board>(boxes) //left options for boxes

//all options for every cell:
const options = ref<number[][][]>([])

interface Options {
	x: number
	y: number
	minLength: number
}

async function fetchBoard(){
	try {
		const response = await fetch('https://sudoku-api.vercel.app/api/dosuku')
		const data = await response.json()
		const gridRes = data.newboard.grids.pop()
		board.value = gridRes.value
		originalBoard.value = structuredClone(gridRes.value)
		currBoard.value = structuredClone(gridRes.value)
		difficulty.value = 'difficulty: ' + gridRes.difficulty
	} catch (error) {
		console.log('error fetching board', error)
	}
}

for (let i = 0; i < BOARD_SIZE; i++) {
	boardIndexes.value.push(i)
}

onMounted(async () => {
	await fetchBoard()

	// --> setting options again and presenting the board in columns and boxes
	//lets do it different - assign each time we assign new value to the board - to these boards as well
	function setBoard(): void {
		boardColumns.value = setBoardColumns(board.value)
		boardBoxes.value = setBoardBoxes(board.value)
		rowsOptions.value = rows
		colsOptions.value = cols
		boxesOptions.value = boxes

		//filtering options:
		for (let i = 0; i < BOARD_SIZE; i++) {
			rowsOptions.value[i] = filterArray(rowsOptions.value[i], board.value[i])
			colsOptions.value[i] = filterArray(colsOptions.value[i], boardColumns.value[i])
		}
		for (let i = 0; i < Math.pow(BOARD_SIZE / 3, 2); i++) {
			boxesOptions.value[i] = filterArray(boxesOptions.value[i], boardBoxes.value[i])
		}
	}
	//--> done setting board

	//Method no.1 of solving
	function lastPossibleNumber(): void {
		setBoard()
		let test = 0
		while (test == 0) {
			test = 1

			options.value = []
			for (const row in board.value) {
				options.value.push([])
				for (const col in board.value[row]) {
					if (board.value[row][col] == 0) {
						const cellOptions = getOptions(parseInt(row), parseInt(col))
						options.value[row].push(cellOptions)
						if (cellOptions.length == 1) {
							//const setCell = () =>{board.value[i][j] = cellOptions[0]}
							//setTimeout(setCell, 1000);
							board.value[row][col] = cellOptions[0]
							currBoard.value[row][col] = cellOptions[0]
							test = 0
							setBoard()
							if (checkSolved()) {
								alert('Solved board;)')
								return
							}
						}
					} else {
						options.value[row].push([board.value[row][col]])
					}
				}
			}
		}

		console.log(options.value)
	}


	const arrayWentThrough = ref<Options[][][]>([]) //make it a board! of empty places for each cell. easily delete when going backwards
	//list all the wrong paths? -no!! its different cause cells affect each other
	for (let i = 0; i < BOARD_SIZE; i++) {
		arrayWentThrough.value.push([])
		for (let j = 0; j < BOARD_SIZE; j++) {
			arrayWentThrough.value[i].push([])
		}
	}

	function notGoneThrough(x: number, y: number): boolean {
		for (const row in arrayWentThrough.value) {
			arrayWentThrough.value[row].map((optionConsidered) => {
				if (x == optionConsidered[0].x && y == optionConsidered[0].y) {
					return false
				}
			})
		}
		return true
	}

	function findLeastOptionsCell() {
		const option = ref<Options>()
		option.value = {
			x: 0,
			y: 0,
			minLength: 9,
		}
		for (const [i] of options.value.entries()) {
			for (const [j, cellOptions] of options.value[i].entries()) {
				if (
					cellOptions.length < option.value.minLength &&
					cellOptions.length != 1 &&
					notGoneThrough(j, i)
				) {
					option.value.minLength = cellOptions.length
					option.value.x = j
					option.value.y = i

					if (option.value.minLength == 2) {
						arrayWentThrough.value[i][j][0] = option.value
						return option.value
					}
				}
			}
		}
		arrayWentThrough.value[option.value.y][option.value.x][0] = option.value
		return option.value
	}

	const path = ref<Board>([])

	function trialAndError(): void {
		const leastOptionsCell: Options = findLeastOptionsCell()
		const cellOptionsArray: number[] = options.value[leastOptionsCell.x][leastOptionsCell.y]

		for (const [index, cell] of cellOptionsArray.entries()) {
			board.value[leastOptionsCell.x][leastOptionsCell.y] = cell
			if (checkWorking()) {
				path.value.push([leastOptionsCell.x, leastOptionsCell.y, index])
				lastPossibleNumber()
				trialAndError()
			} else {
				//clear
				//go back
				if (index + 1 == cellOptionsArray.length) {
					//change to index
					trialAndError()
					//refactor to cell
				}
			}

			//clear!!!
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
			return
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
	const gameOn = () => {
		lastPossibleNumber()
		if (checkSolved()) {
			return
		}
		trialAndError()
	}
	gameOn()
})

const optionsLength = ref<number[]>([])
const getOptionsLengths = () => {
	optionsLength.value = []
	for (const row in options.value) {
		for (const col in options.value[row]) {
			optionsLength.value.push(options.value[row][col].length)
		}
	}
}

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
