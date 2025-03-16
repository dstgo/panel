<template>
	<div class="content">
		<a-result class="result" status="404" title="Page Not Found"></a-result>
		<div class="operation-row">
			<a-button key="back" type="primary" @click="back">Back</a-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store';

const router = useRouter();
const appStore = useAppStore();
const back = () => {
	router.push({ path: appStore.appHomePath });
};
</script>

<style scoped lang="less">
.content {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -121px;
	margin-left: -95px;
	text-align: center;
}
</style>
