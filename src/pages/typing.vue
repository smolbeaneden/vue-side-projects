<template>
	<body>
		<typing-practice/>
	</body>
</template>

<style scoped>

body {
	margin: 0;
	place-items: center;
	position: relative; /* Essential for absolute positioning of headers */
	width: 100%;
	height: 100%;
	font-family: monospace;

	background-image    : url('@/assets/bckg2.jpg'); /* Replace with your image path */

	background-size: cover; /* Use cover to ensure the background covers the container */
	background-repeat: no-repeat;
	background-position: top center; /* Or adjust as needed */

	overflow-x: hidden;

	}
</style>

<script setup lang="ts">

import {
handleKeyPress
} from '@/logic/typingLogic.ts'


onMounted(() => {
	document.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
	document.removeEventListener('keydown', handleKeyPress)
})
</script>
