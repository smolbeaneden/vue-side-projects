export const text = ref<string>('');
export const originalText = ref<string>('');
export const userInput = ref<string>('');
export const key = ref<string>('');
export const wordIndex = ref<number>(0);
export const letterIndex = ref<number>(0);
export const nextLetterIndex = ref<number>(0);
export const currLetter = ref<string>();
export const backspacePressed = ref<boolean>(false);
export const spacePressed = ref<boolean>(false);
export const status = ref<string>("hey");
interface Index {
	wordIndex: number,
	letterIndex: number
}
export const lastIndex= ref<Index>({wordIndex: 0 , letterIndex: 0});
export const changeIndexes = ref<boolean>(true);
export const FONT_SIZE = ref<string>("1.7em")
const defaultColor = "white";
const matchColor = "#7eff09";
const wrongColor = "red";
const overColor = "yellow";


async function fetchText(): Promise<boolean>{
	try {
		const response = await fetch('https://hipsum.co/api/?type=hipster&paras=1')
		const data = await response.json()
		text.value = data.pop();
		originalText.value = structuredClone(toRaw(text.value));
	} catch (error) {
		console.log('error fetching text', error)
	}
	return true;
}
await fetchText();


function wordLettersArray(wordArray: readonly string[]):string[][] {
	const array: string[][] = [];
	for(const [ , word] of wordArray.entries()){
		if (word != ""){
			array.push(word.split(''));
		}

	}
	return array;
}

// Example: [[s,e,a],[m,e,o,w],[p,i,z,z,a]]
export const userInputWordsLettersArray = ref<string[][]>(wordLettersArray(structuredClone(toRaw(userInput.value)).split(' ')));
const originalTextWordsLettersArray = ref<string[][]>(wordLettersArray(structuredClone(toRaw(originalText.value)).split(' ')));
export const textWordsLettersArray = ref<string[][]>(wordLettersArray(structuredClone(toRaw(text.value)).split(' ')));

// { letter, color }
interface LetterColor {
	letter: string,
	color: string
}

export const textWordsLettersArrayColor = ref<LetterColor[][]>([]);

for (const [i ,word] of textWordsLettersArray.value.entries()) {
	textWordsLettersArrayColor.value.push([]);
	for (const [ ,letter] of word.entries()) {
		textWordsLettersArrayColor.value[i].push({letter: letter, color: defaultColor});
	}
}
// Done :)

// handling input:
export function handleInput(): void {
	console.log("Handling input");
	status.value = "none";
	//Organizing new input in Array of words:
	userInputWordsLettersArray.value = (wordLettersArray(structuredClone(toRaw(userInput.value)).split(' ')));

	//word and letter indexes
	if(changeIndexes.value){
		wordIndex.value = userInputWordsLettersArray.value.length > 0 ? userInputWordsLettersArray.value.length - 1 : 0;
		letterIndex.value = (userInputWordsLettersArray.value[wordIndex.value]?.length) ?
			userInputWordsLettersArray.value[wordIndex.value].length -1 : 0;
	}
	changeIndexes.value = true;
	if(wordIndex.value == (textWordsLettersArrayColor.value.length-1) && letterIndex.value == (textWordsLettersArrayColor.value[textWordsLettersArrayColor.value.length-1].length-1)){
		alert("great u done")
		document.removeEventListener('keydown', handleKeyPress)
		return;
	}
	//for cursor:
	nextLetterIndex.value = (userInputWordsLettersArray.value[wordIndex.value]?.length) ?
		userInputWordsLettersArray.value[wordIndex.value].length : 0;

	//current letter
	currLetter.value = userInputWordsLettersArray.value[wordIndex.value]?.length? userInputWordsLettersArray.value[wordIndex.value][letterIndex.value]:
		undefined;

	console.log(currLetter.value)
	console.log([wordIndex.value, letterIndex.value]);
	console.log("original " + originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value])
	console.log(textWordsLettersArrayColor.value)

	if (lastIndex.value.wordIndex == wordIndex.value) { //same word

		console.log("same wordIndex.value", wordIndex.value);

		if (letterIndex.value == 0 && !backspacePressed.value) {
			status.value = "i = 0";
			if (currLetter.value == originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value]) {
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = matchColor;
			}
			else if(userInputWordsLettersArray.value[wordIndex.value].length>0){
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = wrongColor;
			}
			else{
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = defaultColor;
			}
		}
		else if(wordIndex.value < lastIndex.value.wordIndex){
			textWordsLettersArrayColor.value[lastIndex.value.wordIndex][0].color = defaultColor;
		}
		//problema?
		else if (letterIndex.value > lastIndex.value.letterIndex){ //going forward
			status.value = "going forward";
			if (letterIndex.value > (originalTextWordsLettersArray.value[wordIndex.value].length -1)) { //HERE
				console.log(overColor);
				textWordsLettersArray.value[wordIndex.value].push(currLetter.value)
				textWordsLettersArrayColor.value[wordIndex.value].push({letter: currLetter.value, color: overColor})
			}
			else if (currLetter.value == originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value]) {
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = matchColor;
			}
			else {
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = wrongColor;
			}
		}
		else { //backtrack
			status.value="backtrack"
			if (letterIndex.value >= (originalTextWordsLettersArray.value[wordIndex.value].length - 1)) { //going back when beyond word
				textWordsLettersArray.value[wordIndex.value].splice(letterIndex.value+1, 1);
				textWordsLettersArrayColor.value[wordIndex.value].splice(letterIndex.value+1, 1);
			}
			else {
				status.value="backtrack white"
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value+1].color = defaultColor;
				if(nextLetterIndex.value ==0){
					textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = defaultColor;
				}
			}
		}
	}
	// else {
	// 	if (letterIndex.value == 0){
	// 		if (currLetter.value == originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value]) {
	// 			textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = matchColor;
	// 		}
	// 		else{
	// 			textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = defaultColor;
	// 		}
	// 	}
	// 	else if(originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value] == currLetter.value){
	// 		textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = matchColor;
	// 	}
	// 	else {
	// 		textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = wrongColor;
	// 	}
	// }
	lastIndex.value = {wordIndex: wordIndex.value, letterIndex: letterIndex.value};
	backspacePressed.value = false;
	return
}





const lastKey = ref<string>('')


export function handleKeyPress(event: KeyboardEvent): void {
	spacePressed.value = false
	key.value = event.key
	if (event.key.length == 1 && event.key != " ") {
		userInput.value += event.key;
		lastKey.value = event.key;
	}
	else if (event.key=== "Backspace") {
		userInput.value = userInput.value.substring(0, userInput.value.length - 1);
		backspacePressed.value = true;
	}
	else if (event.key === " " && lastKey.value != " ") {
		lastKey.value = event.key;
		userInput.value += event.key;
		spacePressed.value = true
		wordIndex.value++
		letterIndex.value = 0;
		changeIndexes.value = false
		console.log("space")
	}
	else {
		return
	}
	handleInput()
}

