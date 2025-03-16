<template>
	<div class="login-form-wrapper">
		<div class="login-form-title">重置密码</div>
		<div class="login-form-sub-title">输入您的邮箱以重置密码</div>
		<div class="login-form-error-msg">{{ errorMessage }}</div>
		<a-form :model="resetForm" class="login-form" layout="vertical" @submit="handleSubmit">
			<a-form-item field="username" :rules="[{ required: true, message: '账户不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
				<a-input v-model="resetForm.username" size="large" placeholder="请输入账户">
					<template #prefix>
						<icon-user />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item field="password" :rules="[{ required: true, message: '密码不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
				<a-input-password v-model="resetForm.password" size="large" placeholder="请输入密码" allow-clear autocomplete>
					<template #prefix>
						<icon-lock />
					</template>
				</a-input-password>
			</a-form-item>
			<a-form-item
				field="rePassword"
				:rules="[{ required: true, message: '二次密码不能为空' }, { validator: rePasswordValidator }]"
				:validate-trigger="['change', 'blur']"
				hide-label
			>
				<a-input-password v-model="resetForm.rePassword" size="large" placeholder="二次输入密码" allow-clear autocomplete>
					<template #prefix>
						<icon-lock />
					</template>
				</a-input-password>
			</a-form-item>
			<a-form-item field="captcha" :rules="[{ required: true, message: '验证码不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
				<a-input v-model="resetForm.captcha" size="large" placeholder="请输入验证码" allow-clear autocomplete>
					<template #prefix>
						<icon-lock />
					</template>
					<template #append>
						<img v-if="captchaBase64" width="100" height="34" :src="captchaBase64" @click="fetchCaptcha()" />
					</template>
				</a-input>
			</a-form-item>
			<a-space :size="16" direction="vertical">
				<a-button size="large" type="primary" html-type="submit" long :loading="loading">重置</a-button>
				<div class="login-form-bottom">
					<span class="login-form-link" @click="router.push({ name: 'login' })">返回</span>
				</div>
			</a-space>
		</a-form>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import useLoading from '@/hooks/loading';
import { GetUserLoginCaptcha } from '@/api/manager/user/api';
import { UserResetRequest } from '@/api/manager/user/type';

const timeInter: any = ref(null);
const router = useRouter();
const errorMessage = ref('');

const { loading, setLoading } = useLoading();

onUnmounted(() => {
	clearInterval(timeInter.value);
	timeInter.value = null;
});

const captchaBase64 = ref('');

const resetForm = reactive<UserResetRequest>({
	username: '',
	password: '',
	rePassword: '',
	captcha: '',
	captchaId: ''
});

const rePasswordValidator = (value, cb) => {
	if (value !== resetForm.password) {
		cb('两次输入的密码不一致');
	} else {
		cb();
	}
};

const fetchCaptcha = async () => {
	// 清除定时器
	clearInterval(timeInter.value);
	// 请求验证码
	const { data } = await GetUserLoginCaptcha();
	resetForm.captchaId = data.uuid;
	captchaBase64.value = data.captcha;
	if (!data.expire) {
		Message.error('验证吗配置错误');
		return;
	}
	// 定时刷新
	timeInter.value = setInterval(() => {
		fetchCaptcha();
	}, data.expire * 1000);
};

fetchCaptcha();

const handleSubmit = async ({ errors, values }: { errors: Record<string, ValidatedError> | undefined; values: Record<string, any> }) => {
	if (loading.value) return;
	if (!errors) {
		setLoading(true);
		try {
			// TODO: 后面换成重置密码的API
			// await userStore.login(values as UserLoginRequest);

			Message.success('登陆成功');
			router.push({ name: 'login' });
		} catch (err) {
			fetchCaptcha();
			errorMessage.value = (err as Error).message;
		} finally {
			setLoading(false);
		}
	}
};
</script>

<style scoped lang="less">
.login-form {
	&-wrapper {
		width: 80%;
	}

	&-title {
		color: var(--color-text-1);
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
	}

	&-sub-title {
		color: var(--color-text-2);
		font-size: 15px;
		line-height: 24px;
	}

	&-error-msg {
		height: 32px;
		color: rgb(var(--red-6));
		line-height: 32px;
	}

	&-password-actions {
		display: flex;
		justify-content: space-between;
	}

	&-register-btn {
		color: var(--color-text-3) !important;
	}

	&-link {
		color: var(--color-link-light-4);
		cursor: pointer;

		&:active {
			color: var(--color-link-light-2);
		}
	}

	&-bottom {
		display: flex;
		justify-content: center;
	}
}

// responsive
@media (max-width: @screen-sm) {
	.login-form {
		&-wrapper {
			width: 90%;
		}
	}
}
</style>
