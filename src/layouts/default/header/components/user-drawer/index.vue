<template>
  <div>
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex" @click="openDrawer(true)">
      <img :class="`${prefixCls}__header`" :src="avatarFn(getUserInfo.avatar)" />
    </span>
    <UserSettingDrawer :theme="theme" @register="register" />
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user';
  import { computed } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';
  import UserSettingDrawer from './components/UserSettingDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import { avatarFn } from '@/utils/avatar';

  const userStore = useUserStore();
  const { prefixCls } = useDesign('header-user-drawer');

  const [register, { openDrawer }] = useDrawer();

  defineProps({
    theme: propTypes.oneOf(['dark', 'light']),
  });

  const getUserInfo = computed(() => {
    const { avatar } = userStore.getUserInfo || {};
    return { avatar: avatar };
  });
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-header-user-drawer';

  .@{prefix-cls} {
    align-items: center;
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }

    &__header {
      border-radius: 50%;
    }

    &__list-item {
      transition: background-color ease-in-out 0.2s;
      border-radius: 5px;
      cursor: pointer;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }
    }
  }
</style>
