<template>
	<div class="configure">
		<div class="header">
			<div class="header-item">
				<a-button v-permission="'configure:template:preview'" type="primary" status="success" :disabled="!props.template" @click="handleClickPreview">
					<template #icon><icon-brush /></template>
					生成预览
				</a-button>
			</div>

			<div class="header-item">
				<a-button v-permission="'configure:template:add'" type="primary" :disabled="!props.template" @click="handleCompareTemplate">
					<template #icon><icon-to-top /></template>
					提交模板
				</a-button>
			</div>

			<div class="header-item">
				<a-button v-permission="'configure:configure:sync'" type="primary" :disabled="!props.template" @click="handleClickSync">
					<template #icon><icon-sync /></template>
					推送配置
				</a-button>
			</div>
		</div>
		<div class="edit">
			<CodeEditor
				v-model="submitTemplateForm.content"
				:lang="submitTemplateForm.format"
				:show-line="false"
				:show-switch-lang="true"
				:show-fullscreen="true"
				:style="{
					width: '100%',
					height: '100%'
				}"
				@change-lang="
					(val:string) => {
						submitTemplateForm.format = val;
					}
				"
			></CodeEditor>
		</div>

		<a-modal v-model:visible="envVisible" simple title="请选择环境" @cancel="envVisible = false" @before-ok="handleChooseEnv">
			<a-form ref="envFormRef" :model="envForm" layout="vertical">
				<a-form-item
					field="envId"
					:label="'请选择需要' + envForm.title + '的环境'"
					:rules="[
						{
							required: true,
							message: '请选择需要渲染的环境'
						}
					]"
					:validate-trigger="['change', 'input']"
				>
					<a-select v-model="envForm.envId" allow-search placeholder="请选择">
						<template v-for="(item, index) in envs" :key="index">
							<a-option :value="item.id">{{ item.name }}</a-option>
						</template>
					</a-select>
				</a-form-item>
			</a-form>
		</a-modal>

		<a-modal
			v-model:visible="contentVisible"
			title="配置详情"
			width="900px"
			unmount-on-close
			:body-style="{ height: '500px', padding: '0' }"
			@cancel="contentVisible = false"
			@before-ok="contentVisible = false"
		>
			<CodeEditor
				:value="content"
				:lang="submitTemplateForm.format"
				:show-line="false"
				:read-only="true"
				:style="{
					width: '100%',
					height: '100%'
				}"
			></CodeEditor>
		</a-modal>

		<a-modal
			v-model:visible="compareVisible"
			title="变更详情"
			width="900px"
			ok-text="确认变更"
			unmount-on-close
			:body-style="{ height: '500px', padding: '0' }"
			@cancel="compareVisible = false"
			@before-ok="handleSureCompare"
		>
			<Compare :data="compareData"></Compare>
		</a-modal>

		<a-modal v-model:visible="descVisible" simple title="变更描述" @cancel="descVisible = false" @before-ok="handleSubmit">
			<a-form ref="descFormRef" :model="descForm" layout="vertical">
				<a-form-item
					field="description"
					label="请简要概述一下本次提交的修改"
					:rules="[
						{
							required: true,
							message: '模板描述是必填项'
						}
					]"
					:validate-trigger="['change', 'input']"
				>
					<a-input v-model="descForm.description" placeholder="请输入" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { Env } from '@/api/configure/env/type';
import { ParseTemplate, CompareTemplate } from '@/api/configure/template/api';
import { CompareTemplateInfo, Template } from '@/api/configure/template/type';
import { CompareConfigure } from '@/api/configure/configure/api';
import Compare from './compare.vue';

const props = defineProps<{
	template?: Template;
	envs?: Env[];
}>();

const SUBMIT_TEMPLATE = 'submit';
const SYNC_CONFIGURE = 'sync';
const PREVIEW_CONFIGURE = 'preview';

const emit = defineEmits(['submit', 'sync']);

const compareVisible = ref(false);
const operator = ref('');

const envVisible = ref(false);
const envFormRef = ref();
const envForm = ref<{ envId?: number; title?: string }>({});

const descVisible = ref(false);
const descFormRef = ref();
const descForm = ref<{ description?: string }>({});

const submitTemplateForm = reactive({
	description: '',
	content: '',
	format: 'json'
});

const contentVisible = ref(false);
const content = ref('');

const compareData = ref<CompareTemplateInfo[]>([]);

const submitTemplate = async () => {
	submitTemplateForm.description = descForm.value.description as string;
	if (submitTemplateForm.format === 'json') {
		submitTemplateForm.content = JSON.stringify(JSON.parse(submitTemplateForm.content));
	} else {
		content.value = submitTemplateForm.content;
	}
	emit('submit', submitTemplateForm);
	return true;
};

const syncConfigure = () => {
	emit('sync', {
		serverId: props.template?.serverId,
		envId: envForm.value.envId,
		description: descForm.value.description
	});
	return true;
};

const handleCompareTemplate = async () => {
	if (!props.template?.id) {
		operator.value = SUBMIT_TEMPLATE;
		descForm.value.description = '初始化提交';
		// eslint-disable-next-line no-use-before-define
		handleSubmit();
		return;
	}
	const { data } = await CompareTemplate({
		id: props.template?.id as number,
		content: submitTemplateForm.content,
		format: submitTemplateForm.format
	});
	if (!data.list.length) {
		Message.error('模板不存在变更');
		return;
	}
	operator.value = SUBMIT_TEMPLATE;
	compareVisible.value = true;
	compareData.value = data.list;
};

const handleCompareConfigure = async () => {
	const { data } = await CompareConfigure({
		serverId: props.template?.serverId as number,
		envId: envForm.value.envId as number
	});
	if (!data.list.length) {
		Message.error('配置不存在变更');
		return;
	}
	compareVisible.value = true;
	compareData.value = data.list;
};

const handleSureCompare = () => {
	compareVisible.value = false;
	descForm.value.description = '';
	descVisible.value = true;
	return true;
};

const handleSubmit = async () => {
	if (operator.value === SUBMIT_TEMPLATE) {
		submitTemplate();
	}
	if (operator.value === SYNC_CONFIGURE) {
		syncConfigure();
	}
};

const handleClickPreview = () => {
	envVisible.value = true;
	envForm.value.envId = undefined;
	envForm.value.title = '预览';
	operator.value = PREVIEW_CONFIGURE;
};

const handleClickSync = () => {
	envVisible.value = true;
	envForm.value.envId = undefined;
	envForm.value.title = '推送';
	operator.value = SYNC_CONFIGURE;
};

const handlePreviewTemplate = async () => {
	const { data } = await ParseTemplate({
		content: submitTemplateForm.content,
		format: submitTemplateForm.format,
		envId: envForm.value.envId as number,
		serverId: props.template?.serverId as number
	});
	if (submitTemplateForm.format === 'json') {
		content.value = JSON.stringify(JSON.parse(data.content), null, 3);
	} else {
		content.value = data.content;
	}
	contentVisible.value = true;
};

const handleChooseEnv = async () => {
	const isError = await envFormRef.value.validate();
	if (isError) {
		return false;
	}

	if (operator.value === PREVIEW_CONFIGURE) {
		handlePreviewTemplate();
	}

	if (operator.value === SYNC_CONFIGURE) {
		handleCompareConfigure();
	}
	return true;
};

watch(
	() => props.template,
	(val) => {
		if (!val) return;
		submitTemplateForm.content = val.content;
		submitTemplateForm.format = val.format;
	},
	{ deep: true }
);
</script>

<style lang="less" scoped>
.compare {
	height: 100%;
	overflow: hidden;
	border-radius: 4px;
}

.configure {
	.header {
		display: flex;
		margin-bottom: 15px;

		.header-item {
			display: flex;
			align-items: center;
			margin-right: 18px;
			white-space: nowrap;

			.label {
				margin-right: 8px;
				color: var(--color-text-2);
				font-weight: 700;
				font-size: 13px;
				white-space: nowrap;
			}
		}
	}

	.empty {
		position: absolute;
		top: 150px;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 300px;
	}

	.edit {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(100% - 48px);
		overflow: hidden;
		border-radius: 1px;
		//   box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
	}
}
</style>
