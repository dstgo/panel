<template>
	<div class="container">
		<Breadcrumb />
		<a-card class="general-card">
			<Tool v-model:size="size" v-model:columns="columns" @refresh="handleGet" @add="handleToolAdd"></Tool>
			<Table
				:columns="columns"
				:loading="loading"
				:data="tableData.filter((v) => v.id > 0)"
				:size="size"
				@add="handleTableAdd"
				@update="handleTableUpdate"
				@refresh="handleGet"
			></Table>
			<Form ref="formRef" :departments="tableData" :data="form" @refresh="handleGet"></Form>
		</a-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TableData } from '@arco-design/web-vue/es/table/interface';
import { TableColumn, TableSize } from '@/types/global';
import useLoading from '@/hooks/loading';
import { Department } from '@/api/manager/department/type';
import { ListDepartment } from '@/api/manager/department/api';

import Tool from './components/tool.vue';
import Table from './components/table.vue';
import Form from './components/form.vue';

const formRef = ref();
const form = ref<Department>({} as Department);
const { setLoading } = useLoading(true);
const loading = ref(false);
const tableData = ref<TableData[]>([]);
const size = ref<TableSize>('medium');
const columns = ref<TableColumn[]>([
	{
		title: '部门标志',
		dataIndex: 'keyword'
	},
	{
		title: '部门名称',
		dataIndex: 'name'
	},
	{
		title: '部门描述',
		dataIndex: 'description'
	},
	{
		title: '创建时间',
		slotName: 'createdAt'
	},
	{
		title: '更新时间',
		slotName: 'updatedAt'
	},
	{
		title: '操作',
		slotName: 'operations'
	}
]);

const emptyData = { id: 0, name: '无' };

// handleGet 处理查询
const handleGet = async () => {
	setLoading(true);
	try {
		const { data } = await ListDepartment();
		data.list.unshift(emptyData);
		tableData.value = data.list;
	} finally {
		setLoading(false);
	}
};

handleGet();

//  处理tool按钮新建
const handleToolAdd = () => {
	form.value = {} as Department;
	formRef.value.showAddDrawer();
};

// 处理table点击更新
const handleTableUpdate = (data: Department) => {
	form.value = { ...data };
	formRef.value.showUpdateDrawer();
};

// 处理table点击添加
const handleTableAdd = (id: number) => {
	form.value = { parentId: id } as Department;
	formRef.value.showAddDrawer();
};
</script>

<script lang="ts">
export default {
	name: 'ManagerDepartment'
};
</script>
