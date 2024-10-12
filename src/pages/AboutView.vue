<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUrlState } from '@packges/hooks';

import { useCountrStore } from '@/stores/counter';

const countStort = useCountrStore();
const { count, doubleCount } = storeToRefs(countStort);

const query = useUrlState<{
	name: string;
	count: 0;
}>();
query.count = 0;
</script>

<template>
	<div class="flex flex-col gap-2 items-center justify-center w-full">
		<div class="text-[32px] text-slate-200">{{ count }}</div>
		<div class="text-[32px] text-slate-200">{{ doubleCount }}</div>
		<div class="text-[16px] text-slate-200">{{ query.count }}</div>
		<button @click="query.count++">++</button>
	</div>
</template>
