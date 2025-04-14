export const text = ref<string>('');
export const originalText = ref<string>('');
export const userInput = ref<string>('');
export const wordIndex = ref<number>(0);
export const letterIndex = ref<number>(0);
export const nextLetterIndex = ref<number>(0);

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
const userInputWordsLettersArray = ref<string[][]>(wordLettersArray(structuredClone(toRaw(userInput.value)).split(' ')));
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
		textWordsLettersArrayColor.value[i].push({letter: letter, color: "gray"});
	}
}
// Done :)


// handling input:

interface Index {
	wordIndex: number,
	letterIndex: number
}


const lastIndex = ref<Index>({wordIndex: 0 , letterIndex: 0})


export function handleInput(): void {

	console.log("Handling input");

	//Organizing new input in Array of words:
	userInputWordsLettersArray.value = (wordLettersArray(structuredClone(toRaw(userInput.value)).split(' ')));

	//word and letter indexes
	wordIndex.value = userInputWordsLettersArray.value.length > 0 ? userInputWordsLettersArray.value.length - 1 : 0;
	letterIndex.value = (userInputWordsLettersArray.value[wordIndex.value]?.length) ?
		userInputWordsLettersArray.value[wordIndex.value].length -1 : 0;

	//for cursor:
	nextLetterIndex.value = (userInputWordsLettersArray.value[wordIndex.value]?.length) ?
		userInputWordsLettersArray.value[wordIndex.value].length : 0;

	//current letter
	const currLetter = userInputWordsLettersArray.value[wordIndex.value][letterIndex.value]

	console.log(currLetter)
	console.log([wordIndex.value, letterIndex.value]);
	console.log("original " + originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value])
	console.log(textWordsLettersArrayColor.value)

	if (lastIndex.value.wordIndex == wordIndex.value) { //same word

		console.log("same wordIndex.value", wordIndex.value);

		if (letterIndex.value == 0){
			if (currLetter == originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value]) {
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "green";
			}
			else{
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "gray";
			}
		}
		//problema
		else if (letterIndex.value > lastIndex.value.letterIndex){ //going forward
			console.log("going forward");
			if (letterIndex.value > (originalTextWordsLettersArray.value[wordIndex.value].length -1)) { //HERE
				console.log("orange");
				textWordsLettersArray.value[wordIndex.value].push(currLetter)
				textWordsLettersArrayColor.value[wordIndex.value].push({letter: currLetter, color: "orange"})
			}
			else if (currLetter == originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value]) {
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "green";
			}
			else {
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "red";
			}
		}
		else { //HERE
			if (letterIndex.value >= (originalTextWordsLettersArray.value[wordIndex.value].length - 1)) { //going back when beyond word
				textWordsLettersArray.value[wordIndex.value].splice(letterIndex.value+1, 1);
				textWordsLettersArrayColor.value[wordIndex.value].splice(letterIndex.value+1, 1);
			}
			else {
				textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value+1].color = "gray";
			}
		}
	}
	// else {
	// 	if (letterIndex.value == 0){
	// 		if (currLetter == originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value]) {
	// 			textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "green";
	// 		}
	// 		else{
	// 			textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "gray";
	// 		}
	// 	}
	// 	else if(originalTextWordsLettersArray.value[wordIndex.value][letterIndex.value] == currLetter){
	// 		textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "green";
	// 	}
	// 	else {
	// 		textWordsLettersArrayColor.value[wordIndex.value][letterIndex.value].color = "red";
	// 	}
	// }
	lastIndex.value = {wordIndex: wordIndex.value, letterIndex: letterIndex.value};
	return
}
