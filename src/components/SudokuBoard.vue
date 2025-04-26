<script setup lang="ts">
	import { BOARD_SIZE, boardIndexes, board, difficulty, originalBoard, startOptions } from '@/logic/boardAlgorithm.ts';
	import { getBorder } from '@/logic/boardLogic.ts';
	import { isLoading } from '@/logic/boardAlgorithm.ts'
</script>

<template>
		<p class="tag">{{ isLoading ? "Loading..." : ""}}</p>
		<p class="tag">difficulty: {{ difficulty.toLocaleLowerCase() }}</p>
		<p class="tag">wannabe solved</p>
		<div class="container" :style="{ '--boardSize': BOARD_SIZE }">
			<div v-for="i in boardIndexes" :key="i">
				<div
					v-for="j in boardIndexes"
					:key="j"
					class="cell"
					:style="{ '--border': getBorder(i) }"
				>
					{{ board[j][i] == 0 ? '‎' : board[j][i] }}
				</div>
			</div>
		</div>
		<p class="tag">original</p>
		<div class="container" :style="{ '--boardSize': BOARD_SIZE }">
			<div v-for="i in boardIndexes" :key="i">
				<div
					v-for="j in boardIndexes"
					:key="j"
					class="cell"
					:style="{ '--border': getBorder(i) }"
				>
					{{ originalBoard[j][i] == 0 ? '‎' : originalBoard[j][i] }}
				</div>
			</div>
		</div>

	<p class="tag">options</p>
	<div class="containerB" :style="{ '--boardSize': BOARD_SIZE }">
		<div v-for="i in boardIndexes" :key="i">
			<div
				v-for="j in boardIndexes"
				:key="j"
				class="cell"
				:style="{ '--border': getBorder(i) }"
			>
				{{ startOptions[j][i].length == 0 ? '‎' : startOptions[j][i] }}
			</div>
		</div>
	</div>

</template>

<style scoped>


:root {
	--boardSize: 0;
	--border: 0;
}
.container {
	font-size: 2em;
	display: inline-grid;
	grid-template-columns: repeat(var(--boardSize), 1fr);
	border: solid 2px #ffffff;
}
.containerB {
	font-size: 1em;
	display: inline-grid;
	grid-template-columns: repeat(var(--boardSize), 1fr);
	border: solid 2px #ffffff;
	}

.cell {
	justify-content: center;
	align-items: center;
	display: flex;
	border: solid 1px #5c525a;
	color: green;

	padding: 10px 25px 10px 25px;
}

.cell:nth-child(n) {
	border-left: solid var(--border) #ffffff;
}
.cell:nth-child(3n) {
	border-bottom: solid 2px #ffffff;
}

.tag {
	margin: 10px;
	font-size: 17px;
}
</style>
