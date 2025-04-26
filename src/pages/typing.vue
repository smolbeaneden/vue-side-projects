<template>
	<body>
		<typing-practice/>
	</body>
</template>

<style scoped>

body {
	margin: 0;
	place-items: center;
	min-width: 320px;
	min-height: 100vh;
	font-family: monospace;

	background-image    : url('@/assets/bckg2.jpg'); /* Replace with your image path */

	background-size: 100% 100%;
	background-repeat   : no-repeat;
	background-position : top center;

	max-width: 100%;
	overflow-x: hidden;

	}
</style>

<script setup lang="ts">

import {
	backspacePressed,
	spacePressed,
	handleInput,
	userInput,
	wordIndex, letterIndex,
	key, changeIndexes
} from '@/logic/typingLogic.ts'
const lastKey = ref<string>('')
function handleKeyPress(event: KeyboardEvent): void {
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

onMounted(() => {
	document.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
	document.removeEventListener('keydown', handleKeyPress)
})
</script>
