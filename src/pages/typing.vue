<template>
	<body>
		<nav-bar/>
		<typing-practice/>
	</body>
</template>

<style scoped>

body{
	margin: 0;
	display: flex;
	place-items: center;
	min-width: 320px;
	min-height: 100vh;
	font-family: monospace;


	background-image    : url('@/assets/bckg.jpeg'); /* Replace with your image path */
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : top center;
	}
</style>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
