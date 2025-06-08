<script setup lang="ts">
	const props = defineProps({
		buttonColor: String
	})
</script>

<template>

		<button :style="{'--btn-color': props.buttonColor}">
			<router-link to="/">Home</router-link>
		</button>

</template>

<style scoped>
:root {
	--btn-color: string;
	}
a {
	font-weight: 500;
	color: var(--btn-color);
	text-decoration: inherit;
	}

a:hover {
	color: var(--btn-color);
	}


button {
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	background-color: #1a1a1a;
	cursor: pointer;
	transition: border-color 0.25s;
	}

button:hover {
	border-color: var(--btn-color);
	}

button:focus,
button:focus-visible {
	outline: 4px auto -webkit-focus-ring-color;
	}
</style>
