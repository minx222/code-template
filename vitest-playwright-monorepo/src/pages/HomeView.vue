<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCountrStore } from '@/stores/counter';

const countStort = useCountrStore();
const { count, doubleCount } = storeToRefs(countStort);
const { increment } = countStort;
</script>

<template>
	<div class="flex flex-col gap-2 items-center justify-center w-full">
		<div class="text-[32px] text-slate-200">{{ count }}</div>
		<div class="text-[32px] text-slate-200">{{ doubleCount }}</div>
		<button
			class="w-[128px] p-2 bg-white border-2 border-dashed border-red-500"
			@click="increment"
		>
			+++
		</button>
	</div>
</template>
