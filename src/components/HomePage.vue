<script setup lang="ts">

import ProjectHomeDisplay from '@/components/general components/ProjectHomeDisplay.vue'

defineProps<{ heading: string }>();
import sudoku from '@/assets/sudoku.png';
import typing from '@/assets/typing.jpeg';
import spotify from '@/assets/spotify.jpg'

</script>

<template>
	<body>
		<h1>{{ heading }}</h1>
		<div class="container">
			<project-home-display title="sudoku" :image="sudoku" path="sudoku"/>
			<project-home-display title="Typing Practice" :image="typing" path="typing"/>
			<project-home-display title="Spotify" :image="spotify" path="spotify"/>
		</div>
	</body>

</template>

<style scoped>

body{
	margin: 0;
	place-items: center;
	position: relative;
	}
h1{
  margin-bottom: 1em;
}

button {
  background-color: rgba(29, 29, 29, 0.75);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-shadow: rgba(100, 108, 255, 0.68) 1px 0 5px ;
}

.projectHeading{
  font-size: 1.5em;
  margin-top: 0.5em;
}

.container{
	display: inline-grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1em;

	}
@media (max-width: 800px){
	.container{
		grid-template-columns: 1fr 1fr;
		}
	}

</style>


