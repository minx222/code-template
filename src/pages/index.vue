<script setup lang="ts">
import { useCountStore } from '@/stores/modules/useCount'

const countStort = useCountStore();
const { count, doubleCount } = storeToRefs(countStort);
const { increment } = countStort;
</script>

<template>
  <div class="con flex items-center justify-center w-full">
		<div>{{ count }}</div>
		<div>{{ doubleCount }}</div>
		<button @click="increment">+++</button>
	</div>
</template>

<style lang="scss" scoped>
.con {
	@apply flex;
}
</style>
