<script setup lang="ts">
	import {FONT_SIZE} from '@/logic/typingLogic.ts'
	import HomeButton from '@/components/general components/HomeButton.vue'
</script>

<template>
	<nav>
		<HomeButton class="control" buttonColor="white"/>
		<div class="control">
			<div class="headText">Font Size</div>
			<br/>
			<select
				v-model="FONT_SIZE"
				id="text size"
				name="text size"
			>
				<option value="1.3em">small</option>
				<option selected value="1.7em">medium</option>
				<option value="2.2em">large</option>
			</select>

		</div>

	</nav>

</template>

<style scoped>
	nav{
		display: grid;
		grid-template-columns: fit-content(100%) fit-content(100%) ;
		column-gap: 0;
		background-color: rgba(0, 0, 0, 0.51);
		border-radius: 10px;
		place-items: center;
		}
	.control{
		display: grid;
		grid-template-columns: fit-content(100%) fit-content(100%) ;
		margin: 10px;
		background-color: rgba(9, 9, 9, 0);
		padding: 8px;
		border-radius: 5px;
		place-items: center;


		}
	.headText{
		margin-bottom: 1px;
		}
	select{
		border-radius: 3px;

		border: 1px solid transparent;
		padding: 0.6em 1.2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: rgba(252, 252, 252, 0.16);
		cursor: pointer;
		transition: border-color 0.25s;
		}

	select:hover {
		border-color: #ffffff;
		}


</style>
