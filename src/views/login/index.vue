<template>
	<div class="container">
		<div class="logo">
			<img alt="logo" style="width: 40px" :src="$logo" />
			<div class="logo-text">{{ appStore.name }}</div>
		</div>
		<div class="login-box">
			<div class="login-box-left">
				<img src="@/assets/images/login-bg.png" alt="login left image" class="login-box-left-image" />
				<div class="login-box-left-desc">
					<div class="login-box-left-title">{{ appStore.desc }}</div>
					<div class="login-box-left-sub-title">{{ appStore.subDesc }}</div>
				</div>
			</div>
			<div class="login-box-right">
				<div class="login-form-wrapper">
					<div class="login-form-title">欢迎登陆 👋🏻</div>
					<div class="login-form-sub-title">输入您的账号密码以开始使用</div>
					<div class="login-form-error-msg">{{ errorMessage }}</div>
					<a-form :model="loginForm" class="login-form" layout="vertical" @submit="handleSubmit">
						<a-form-item field="username" :rules="[{ required: true, message: '账户不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
							<a-input v-model="loginForm.username" size="large" placeholder="请输入账户">
								<template #prefix>
									<icon-user />
								</template>
							</a-input>
						</a-form-item>
						<a-form-item field="password" :rules="[{ required: true, message: '密码不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
							<a-input-password v-model="loginForm.password" size="large" placeholder="请输入密码" allow-clear autocomplete>
								<template #prefix>
									<icon-lock />
								</template>
							</a-input-password>
						</a-form-item>
						<a-form-item field="captcha" :rules="[{ required: true, message: '验证码不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
							<a-input v-model="loginForm.captcha" size="large" placeholder="请输入验证码" allow-clear autocomplete>
								<template #prefix>
									<icon-lock />
								</template>
								<template #append>
									<img v-if="captchaBase64" width="100" height="34" :src="captchaBase64" @click="fetchCaptcha()" />
								</template>
							</a-input>
						</a-form-item>
						<a-space :size="16" direction="vertical">
							<div class="login-form-password-actions">
								<a-checkbox checked="rememberPassword" :model-value="loginConfig.rememberPassword" @change="setRememberPassword as any">记住密码</a-checkbox>
								<span class="login-box-link">忘记密码?</span>
							</div>
							<a-button size="large" type="primary" html-type="submit" long :loading="loading">登录</a-button>
							<div class="login-box-bottom">
								<span>还没有账号？</span>
								<span class="login-box-link">创建新账号</span>
							</div>
						</a-space>
					</a-form>
				</div>

				<div class="login-box-footer">
					<Footer />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Footer from '@/components/footer/index.vue';
import { ref, reactive, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useStorage } from '@vueuse/core';
import { useUserStore, useAppStore } from '@/store';
import useLoading from '@/hooks/loading';
import { GetUserLoginCaptcha } from '@/api/manager/user/api';
import { UserLoginRequest } from '@/api/manager/user/type';

const timeInter: any = ref(null);
const router = useRouter();
const errorMessage = ref('');

const { loading, setLoading } = useLoading();
const userStore = useUserStore();
const appStore = useAppStore();
const loginConfig = useStorage('login-config', {
	rememberPassword: true,
	username: '',
	password: ''
});

onUnmounted(() => {
	clearInterval(timeInter.value);
	timeInter.value = null;
});

const captchaBase64 = ref('');

const loginForm = reactive<UserLoginRequest>({
	username: loginConfig.value.username,
	password: loginConfig.value.password,
	captcha: '',
	captchaId: ''
});

const fetchCaptcha = async () => {
	// 清除定时器
	clearInterval(timeInter.value);
	// 请求验证码
	const { data } = await GetUserLoginCaptcha();
	loginForm.captchaId = data.uuid;
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
			await userStore.login(values as UserLoginRequest);
			// 不引用导致不回跳转
			const { redirect, ...othersQuery } = router.currentRoute.value.query;
			if (redirect && router.hasRoute(redirect as string)) {
				router.push({ name: redirect as string, query: { ...othersQuery } });
			} else {
				router.push({ path: '/', query: { ...othersQuery } });
			}

			Message.success('登陆成功');
			const { rememberPassword } = loginConfig.value;
			const { username, password } = values;
			loginConfig.value.username = rememberPassword ? username : '';
			loginConfig.value.password = rememberPassword ? password : '';
		} catch (err) {
			fetchCaptcha();
			errorMessage.value = (err as Error).message;
		} finally {
			setLoading(false);
		}
	}
};

const setRememberPassword = (value: boolean) => {
	loginConfig.value.rememberPassword = value;
};
</script>

<style lang="less" scoped>
.container {
	padding: 0;
}

.login-box {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 100vh;

	&-left {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 67%;
		padding: 100px;
		overflow: hidden;
		background: linear-gradient(154deg, #07070915 30%, hsl(211deg 91% 39%/20%) 48%, #07070915 64%);

		&-desc {
			text-align: center;
		}

		&-image {
			width: 400px;
			height: 300px;
		}

		&-title {
			color: var(--color-text-1);
			font-weight: 500;
			font-size: 24px;
			line-height: 32px;
		}

		&-sub-title {
			color: var(--color-text-2);
			font-size: 15px;
			line-height: 24px;
		}
	}

	&-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 33%;
		padding: 20px;
		background-color: rgb(255 255 255);
		border-left: 1px solid var(--color-border-2);
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

	&-footer {
		position: absolute;
		bottom: 0.75rem;
		display: flex;
		text-align: center;
	}
}

.logo {
	position: fixed;
	top: 24px;
	left: 22px;
	z-index: 1;
	display: inline-flex;
	align-items: center;

	&-text {
		margin-right: 4px;
		margin-left: 4px;
		font-size: 20px;
	}
}

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
}

// responsive
@media (max-width: @screen-sm) {
	.login-box {
		.login-box-left {
			display: none;
		}

		.login-box-right {
			width: 100%;
			border: none;
		}
	}

	.login-form {
		&-wrapper {
			width: 90%;
		}
	}
}
</style>
