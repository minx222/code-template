<script lang="ts">
import { defineColadaLoader } from 'unplugin-vue-router/data-loaders/pinia-colada'
const getUserById =  () => {
	console.log('请求开始');
	return new Promise((res) => {
		setTimeout(() => {
			res([
				{
					id: 1
				}
			])
		}, 10500);
	});
}	
export const useUserData = defineColadaLoader('/home/page2/', {
	async query() {
    return getUserById()
  },
  key: (to) => ['users', to.params],
  // Keep the data "fresh" 10 seconds to avoid fetching the same data too often
  staleTime: 10000,
	lazy: true,
})
</script>


<script setup lang="ts">
const { data: users, isLoading, reload } = useUserData()
</script>

<template>
  <div>
		{{ users }}
		<div v-if="isLoading">loading...</div>
		<div>
			<RouterView />
		</div>
	</div>
</template>

<style lang="scss" scoped>
div {
  @apply text-center text-gray-50 pb-6 text-2xl;
  background-image: -webkit-linear-gradient(left, #b5b2b2, #ff9800, #fdd835);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
