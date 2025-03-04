<script setup lang="ts">
import { RouterView } from "vue-router";
import { supabase } from "@/lib/supabaseClient";

console.log(supabase);
</script>

<template>
  <RouterView v-slot="{ Component, route }">
	  <Suspense v-if="Component" :timeout="0">
		  <Component :is="Component" :key="route.name" />
		  <template #fallback>
			  <span> loading... </span>
		  </template>
	  </Suspense>
  </RouterView>
</template>

<style scoped>

</style>
