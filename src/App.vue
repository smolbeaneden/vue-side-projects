<script setup lang="ts">
import { RouterView } from "vue-router";
import { supabase } from "@/lib/supabaseClient";

console.log(supabase);
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
