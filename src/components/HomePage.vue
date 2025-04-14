<script setup lang="ts">

import ProjectHomeDisplay from '@/components/ProjectHomeDisplay.vue'

defineProps<{ heading: string }>();
import sudoku from '@/assets/sudoku.png';
import typing from '@/assets/typing.jpeg';

</script>

<template>
    <h1>{{ heading }}</h1>
	<div class="container">
		<project-home-display title="sudoku" :image="sudoku" path="sudoku"/>
		<project-home-display title="Typing Practice" :image="typing" path="typing"/>
	</div>
</template>

<style scoped>

h1{
  margin-bottom: 1em;
}

button {
  background-color: rgba(29, 29, 29, 0.75);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-shadow: rgba(100, 108, 255, 0.51) 1px 0 5px ;
}

.projectHeading{
  font-size: 1.5em;
  margin-top: 0.5em;
}

.container{
	display: inline-grid;
	grid-template-columns: 1fr 1fr;
	gap: 1em;
	}

</style>


