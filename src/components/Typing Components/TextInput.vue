<script setup lang="ts">
import {
	handleInput,
	userInput
} from '@/logic/typingLogic.ts'


</script>

<template>
	<input v-model="userInput" placeholder="Let's start bitches!!!" :oninput="handleInput" />
</template>

<style scoped>

	input{
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 1.7em;
		position: relative;
		display: flex;
		left: 0;
		right: 0;
		width: 60rem;
		max-width: calc(
			100vw - 8px * 3
		);
		box-shadow: 0.05rem 0.05rem 0.7rem rgba(98, 26, 239, 0.84);
		border-radius: 0.3rem;
		padding: 0.7rem;
		}

</style>
