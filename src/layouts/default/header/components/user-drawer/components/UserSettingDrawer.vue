<template>
  <BasicDrawer v-bind="$attrs" @register="register" :width="250" :closable="false">
    <template #title>
      <div class="flex items-center">
        <Avatar :src="avatarFn(getUserInfo.avatar)" :size="40" />
        <div class="ml-3 flex flex-col">
          <span class="text-lg">{{ getUserInfo.username }}</span>
          <span class="text-secondary text-xs"> {{ getUserInfo.email }}</span>
        </div>
      </div>
    </template>
    <div :class="[prefixCls, `${prefixCls}--${theme}`]">
      <List :bordered="false" :split="false">
        <ListItem :class="`${prefixCls}__list-item`" @click="jumpTo(PageEnum.USER_INDEX_PAGE)">
          <span class="mr-2"><Icon icon="heroicons-outline:user" /></span>
          {{ t('layout.drawer.profile') }}
        </ListItem>
        <ListItem :class="`${prefixCls}__list-item`" @click="jumpTo(`${DOC_URL}`, false)">
          <span class="mr-2"> <Icon icon="tabler:book" /></span>
          {{ t('layout.drawer.docs') }}
        </ListItem>
        <ListItem :class="`${prefixCls}__list-item`">
          <span class="mr-2"> <Icon icon="icon-park:switch" /></span>
          {{ t('layout.drawer.front') }}
        </ListItem>
        <ListItem :class="`${prefixCls}__list-item`" @click="jumpTo(PageEnum.BASE_HOME)">
          <span class="mr-2"> <Icon icon="icon-park:switch" /></span>
          {{ t('layout.drawer.back') }}
        </ListItem>
        <Divider class="mt-1 mb-1" />
        <!--project zone-->
        <ListItem :class="`${prefixCls}__list-item`" @click="jumpTo(PageEnum.ERROR_LOG_PAGE)">
          <span class="mr-2"> <Icon icon="ant-design:exception-outlined" /></span>
          {{ t('layout.drawer.errorlog') }}
        </ListItem>
        <ListItem :class="`${prefixCls}__list-item`" @click="jumpTo(`${GITHUB_URL}/issue`, false)">
          <span class="mr-2"> <Icon icon="solar:bug-linear" /></span>
          {{ t('layout.drawer.bug') }}
        </ListItem>
        <ListItem :class="`${prefixCls}__list-item`" @click="jumpTo(PageEnum.ABOUT_PAGE)">
          <span class="mr-2"> <Icon icon="octicon:info-16" /></span>
          {{ t('layout.drawer.projectInfo') }}
        </ListItem>
        <!--logout zone-->
        <Divider class="mt-1 mb-1" />
        <ListItem :class="`${prefixCls}__list-item`" @click="userStore.confirmLoginOut()">
          <span class="mr-2"><Icon icon="ri:logout-box-r-line" /></span>
          {{ t('layout.drawer.logout') }}
        </ListItem>
      </List>
    </div>
  </BasicDrawer>
</template>

<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { computed } from 'vue';
  import { Avatar, Divider, List, ListItem } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';
  import Icon from '@/components/Icon/Icon.vue';
  import { DOC_URL, GITHUB_URL } from '@/settings/siteSetting';
  import { openWindow } from '@/utils';
  import { avatarFn } from '@/utils/avatar';

  const { prefixCls } = useDesign('header-user-drawer');
  const { t } = useI18n();
  const [register, { closeDrawer }] = useDrawerInner();
  const go = useGo();
  const userStore = useUserStore();
  const getUserInfo = computed(() => {
    const { avatar, username, email } = userStore.getUserInfo || {};
    return { avatar: avatar, username, email };
  });

  defineProps({
    theme: propTypes.oneOf(['dark', 'light']),
  });
  const jumpTo = (url: string, internal = true) => {
    if (internal) {
      go(url);
      closeDrawer();
    } else {
      openWindow(url);
    }
  };
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-header-user-drawer';

  .@{prefix-cls} {
    &__list-item {
      transition: background-color ease-in-out 0.2s;
      border-radius: 5px;
      cursor: pointer;
    }

    &--dark {
      .@{prefix-cls}__list-item:hover {
        background-color: #313131;
      }

      .@{prefix-cls}__list-item:active {
        background-color: #515050;
      }
    }

    &--light {
      .@{prefix-cls}__list-item:hover {
        background-color: #f0f0f0;
      }

      .@{prefix-cls}__list-item:active {
        background-color: #eceff2;
      }
    }
  }
</style>
