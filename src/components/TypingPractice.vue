<script setup lang="ts">
	import { text } from '@/logic/typingLogic';
	console.log(text.value);

</script>

<template>

	<div class="container">
		<PracticeText/>
		<TextInput/>
	</div>

</template>

<style scoped>
.container{
	display: inline-grid;
	grid-template-columns: 1fr;
	gap: 2em;
	margin: 5em

	}


</style>
