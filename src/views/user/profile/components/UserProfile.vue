<template>
  <Card class="w-full h-full enter-x">
    <Divider orientation="left" :orientationMargin="0" class="!mt-0">
      {{ t('pages.user.section.basic') }}
    </Divider>
    <div class="flex flex-col-reverse md:flex-row mb-5">
      <div class="md:w-1/3">
        <Form layout="vertical" class="md:ml-5">
          <FormItem :label="t('pages.user.label.username')">
            <Input :value="formData.basic.username" />
          </FormItem>
          <FormItem :label="t('pages.user.label.role')">
            <Input disabled value="管理员" />
          </FormItem>
          <FormItem :label="t('pages.user.label.description')">
            <Textarea :value="formData.basic.description" :auto-size="{ minRows: 3 }" />
          </FormItem>
          <FormItem>
            <Button type="primary">{{ t('pages.user.btn.updateInfo') }}</Button>
          </FormItem>
        </Form>
      </div>
      <div class="flex flex-col items-center md:ml-10 mb-5">
        <Avatar class="mb-2" :src="avatarFn(userinfo.avatar)" :size="100" />
        <Button class="w-1/3 md:w-3/4 !text-3" size="small" :block="false">
          {{ t('pages.user.btn.updateAvatar') }}
        </Button>
      </div>
    </div>
    <Divider orientation="left" :orientationMargin="0"
      >{{ t('pages.user.section.password') }}
    </Divider>
    <div class="md:w-1/3">
      <Form layout="vertical" class="md:ml-5">
        <FormItem :label="t('pages.user.label.newPassword')">
          <InputPassword :value="formData.password.new" />
        </FormItem>
        <FormItem :label="t('pages.user.label.confirmPassword')">
          <InputPassword :value="formData.password.new" />
        </FormItem>
        <FormItem :label="t('pages.user.label.verifyCode')">
          <CountdownInput
            v-model:value="formData.email.code"
            :placeholder="t('component.countdown.placeholder')"
          />
        </FormItem>
        <FormItem>
          <Button type="primary">{{ t('pages.user.btn.updatePassword') }}</Button>
        </FormItem>
      </Form>
    </div>
    <Divider orientation="left" :orientationMargin="0">{{ t('pages.user.section.email') }}</Divider>
    <div class="md:w-1/3">
      <Form layout="vertical" class="md:ml-5">
        <FormItem :label="t('pages.user.label.email')">
          <Input :value="formData.email.address" />
        </FormItem>
        <FormItem :label="t('pages.user.label.verifyCode')">
          <CountdownInput
            v-model:value="formData.email.code"
            :placeholder="t('component.countdown.placeholder')"
          />
        </FormItem>
        <FormItem>
          <Button type="primary">{{ t('pages.user.btn.updateEmail') }}</Button>
        </FormItem>
      </Form>
    </div>
    <Divider orientation="left" :orientationMargin="0"
      >{{ t('pages.user.section.preference') }}
    </Divider>
    <div class="md:w-1/3">
      <Form :labelCol="{ span: 5 }" class="md:ml-5">
        <FormItem :label="t('pages.user.label.theme')">
          <Switch
            v-model:checked="formData.preference.darkTheme"
            checked-children="light"
            un-checked-children="dark"
          />
        </FormItem>
        <FormItem :label="t('pages.user.label.welcome')">
          <Switch v-model:checked="formData.preference.welcome" />
        </FormItem>
        <FormItem :label="t('pages.user.label.lang')">
          <Select
            class="!w-1/2"
            v-model:value="formData.preference.lang"
            :options="languageOptions"
          />
        </FormItem>
        <FormItem>
          <Button type="primary">{{ t('pages.user.btn.updatePreference') }}</Button>
        </FormItem>
      </Form>
    </div>
    <Divider orientation="left" :orientationMargin="0">{{ t('pages.user.section.third') }}</Divider>
    <div class="md:w-1/3">
      <Form class="md:ml-5">
        <FormItem>
          <div class="flex flex-row justify-between items-center">
            <span class="md:w-1/4 flex flex-row items-center w-1/4">
              <Icon icon="ant-design:github-filled" :size="30" />
              <p class="mb-0 text-4 ml-2">{{ t('pages.user.label.github') }}</p>
            </span>
            <span class="text-secondary text-4">{{ formData.thirdParty.github }}</span>
            <Button type="link">{{ t('pages.user.btn.bind') }}</Button>
          </div>
        </FormItem>
        <FormItem>
          <div class="flex flex-row justify-between items-center">
            <span class="md:w-1/4 flex flex-row items-center">
              <Icon icon="ant-design:qq-circle-filled" :size="30" color="#12B7F5" />
              <p class="mb-0 text-4 ml-2">{{ t('pages.user.label.qq') }}</p>
            </span>
            <span class="text-secondary text-4">{{ formData.thirdParty.qq }}</span>
            <Button type="link">{{ t('pages.user.btn.bind') }}</Button>
          </div>
        </FormItem>
        <FormItem>
          <div class="flex flex-row justify-between items-center">
            <span class="md:w-1/4 flex flex-row items-center">
              <Icon icon="ant-design:wechat-outlined" :size="30" color="#3BAF34" />
              <p class="mb-0 text-4 ml-2">{{ t('pages.user.label.wechat') }}</p>
            </span>
            <span class="text-secondary text-4">{{ formData.thirdParty.wechat }}</span>
            <Button type="link">{{ t('pages.user.btn.bind') }}</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { avatarFn } from '@/utils/avatar';
  import {
    Avatar,
    Button,
    Card,
    Divider,
    Form,
    FormItem,
    Input,
    InputPassword,
    Select,
    Switch,
    Textarea,
  } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { CountdownInput } from '@/components/CountDown';
  import { computed, reactive } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { useI18n } from '@/hooks/web/useI18n';
  import { availableLocaleList } from '@/settings/localeSetting';

  const { t } = useI18n();
  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const languageOptions = reactive(availableLocaleList());
  const formData = reactive({
    basic: {
      username: userinfo.value.username,
      description: userinfo.value.description,
    },
    password: {
      new: '',
      again: '',
      code: '',
    },
    email: {
      address: userinfo.value.email,
      code: '',
    },
    preference: {
      darkTheme: false,
      welcome: true,
      lang: languageOptions[0],
    },
    thirdParty: {
      qq: '海阔天空就是缘',
      wechat: '海阔天空就是缘',
      github: 'jackson',
    },
  });
</script>

<style scoped lang="less"></style>
