<script setup lang="ts">
	import {
		textWordsLettersArray,
		textWordsLettersArrayColor,
		wordIndex,
		letterIndex,
		nextLetterIndex,
		userInputWordsLettersArray
	} from "@/logic/typingLogic.ts"
	import {
		FONT_SIZE
	} from '@/logic/typingLogic.ts'


	console.log(textWordsLettersArray.value);

	function isCurrent(wIndex: number, lIndex: number): string {
		if(wIndex == wordIndex.value && lIndex == nextLetterIndex.value &&  lIndex !== (textWordsLettersArrayColor.value[wIndex].length)){
			return "underline"
		}
		// else if (wIndexuserInputWordsLettersArray.value[wIndex-1].pop()==" "){
		//
		// }
		else{
			return "none"
		}
	}

	function isSpaceCurrent(wIndex: number, lIndex: number): string {
		if(lIndex == (textWordsLettersArrayColor.value[wIndex].length - 1) && wIndex == wordIndex.value){
			return "underline"
		}
		return "none"
	}
</script>

<template>
	<div class="typing-area" :style="{ '--font-size': FONT_SIZE }">
		<div v-for="(word, wordIndex) in textWordsLettersArrayColor" :key="wordIndex" class="letter">
			<div v-for="(letter, letterIndex) in word"
				 :key="`${wordIndex},${letterIndex}`"
				 class="letter"
				 :style="{ 'color': letter.color, 'text-decoration-line': isCurrent(wordIndex, letterIndex)}"
			>
				{{ letter.letter }}
			</div>
			<div class="emptyChar"
				 :style="{
				'text-decoration-line': isSpaceCurrent(wordIndex, letterIndex)}"
			>ㅤ</div> <!--empty char-->
		</div>
	</div>

</template>

<style scoped>
	:root{
		--font-size: FONT_SIZE
		}

	.typing-area {
		background-color: rgba(19, 16, 16, 0.51);
		font-size: var(--font-size);
		position: relative;
		left: 0;
		right: 0;
		text-align: left;
		width: 60rem;
		padding: 1rem;
		max-width: calc(
			100vw - 8px * 3
		);
		margin-inline: auto;
		border-radius: 0.6rem;
		box-shadow: 0.05rem 0.05rem 0.7rem rgba(114, 14, 222, 0.62);
		}

	.letter {
		display:inline-block;
		position: relative;
		margin:0;

		}
	.emptyChar {
		display:inline-block;
		position: relative;
		height: 0;
		}
</style>
