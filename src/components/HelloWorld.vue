<script setup lang="ts">

defineProps<{ heading: string }>();
import {RouterLink} from 'vue-router';
import sudoku from '@/assets/sudoku.png';

</script>

<template>
    <h1>{{ heading }}</h1>
    <button>
        <RouterLink to="/sudoku">
          <div class="projectHeading">
            sudoku
          </div>
          <br/>
          <img class="logo" :src="sudoku" alt="sudoku"/>
        </RouterLink>
    </button>
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


</style>


