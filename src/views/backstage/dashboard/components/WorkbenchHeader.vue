<template>
  <div class="flex items-center flex-col md:flex-row">
    <Avatar :src="avatarFn(userinfo.avatar)" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2 md:text-left text-center">
      <h2 class="md:text-lg text-md mb-1">
        {{ userinfo.username }} <span class="hidden md:inline">, {{ t(greeting) }} !</span></h2
      >
      <span class="text-secondary">
        <MailOutlined />
        {{ userinfo.email }}
      </span>
      <span class="text-secondary">
        {{ userinfo.description }}
      </span>
    </div>
    <div class="flex flex-1 justify-center md:justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right">
        <span class="text-secondary"> {{ t('pages.dashboard.header.servers') }} </span>
        <span class="text-2xl">2/10</span>
      </div>

      <div class="flex flex-col justify-center text-right md:mx-16 mx-12">
        <span class="text-secondary"> {{ t('pages.dashboard.header.nodes') }} </span>
        <span class="text-2xl">7/8</span>
      </div>
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> {{ t('pages.dashboard.header.users') }} </span>
        <span class="text-2xl">300</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { MailOutlined } from '@ant-design/icons-vue';
  import { computed } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { useI18n } from '@/hooks/web/useI18n';
  import { avatarFn } from '@/utils/avatar';

  const { t } = useI18n();
  const greeting = computed(() => {
    let hours = new Date().getHours();
    if (hours >= 18) {
      return 'pages.dashboard.header.greeting.night';
    } else if (hours >= 12) {
      return 'pages.dashboard.header.greeting.noon';
    } else {
      return 'pages.dashboard.header.greeting.morning';
    }
  });

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
</script>
