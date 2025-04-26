<script setup lang="ts">
import {
	text,
	userInput,
	lastIndex,
	currLetter,
	wordIndex,
	letterIndex,
	nextLetterIndex,
	status, spacePressed, key
} from '@/logic/typingLogic'

	console.log(text.value);

</script>

<template>

	<div class="container">

		<OptionsBar/>
		<PracticeText/>
<!--		<div class="input">Input:{{ [userInput] }}</div>-->
<!--		<div class="input">{{[lastIndex, currLetter, wordIndex, letterIndex, nextLetterIndex] }}</div>-->
<!--		<div class="input"> {{ status }}</div>-->
<!--		<div class="input"> {{ key }}</div>-->
	</div>

</template>

<style scoped>
.container{
	display: inline-grid;
	overflow: hidden;
	grid-template-columns: 1fr;
	gap: 2em;
	width: 100%;
	margin-left: 5em;
	margin-right: 5em;
	}
.input{
	background-color: black;
	color: white;
	}

</style>
