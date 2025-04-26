<script setup lang="ts">

 defineProps({
	 title: String,
	 image: String,
	 path: String
 });

</script>
<template>
	<button>
		<router-link :to="`/${path}`">
			<div class="projectHeading">
				{{ title }}
			</div>
			<br/>
			<img class="logo" :src="image" :alt="image"/>
		</router-link>
	</button>
</template>
