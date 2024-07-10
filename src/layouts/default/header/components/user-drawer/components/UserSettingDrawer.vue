<template>
  <BasicDrawer v-bind="$attrs" @register="register" width="17%" :closable="false">
    <template #title>
      <div class="flex items-center">
        <Avatar :src="getUserInfo.avatar" :size="40" />
        <div class="ml-3 flex flex-col">
          <span class="text-lg">{{ getUserInfo.username }}</span>
          <span class="text-secondary text-xs"> {{ getUserInfo.email }}</span>
        </div>
      </div>
    </template>
    <List :bordered="false" :split="false">
      <ListItem class="list-item">
        <span class="mr-2"><UserOutlined /></span>
        {{ t('sys.drawer.profile') }}
      </ListItem>
      <ListItem class="list-item">
        <span class="mr-2"> <BookOutlined /></span>
        {{ t('sys.drawer.docs') }}
      </ListItem>
      <ListItem class="list-item">
        <span class="mr-2"> <SplitCellsOutlined /></span>
        {{ t('sys.drawer.front') }}
      </ListItem>
      <ListItem class="list-item">
        <span class="mr-2"> <SplitCellsOutlined /></span>
        {{ t('sys.drawer.back') }}
      </ListItem>
      <Divider class="mt-1 mb-1" />
      <!--project zone-->
      <ListItem
        class="list-item"
        @click="
          jumpTo(() => {
            go(PageEnum.ERROR_LOG_PAGE);
          })
        "
      >
        <span class="mr-2"> <WarningOutlined /></span>
        {{ t('sys.drawer.errorlog') }}
      </ListItem>
      <ListItem
        class="list-item"
        @click="
          jumpTo(() => {
            go(PageEnum.ABOUT_PAGE);
          })
        "
      >
        <span class="mr-2"> <InfoCircleOutlined /></span>
        {{ t('sys.drawer.projectInfo') }}
      </ListItem>
      <ListItem class="list-item" @click="toBugFix()">
        <span class="mr-2"> <BugOutlined /></span>
        {{ t('sys.drawer.bug') }}
      </ListItem>
      <!--logout zone-->
      <Divider class="mt-1 mb-1" />
      <ListItem class="list-item" @click="userStore.confirmLoginOut()">
        <span class="mr-2"><LogoutOutlined /></span>
        {{ t('sys.drawer.logout') }}
      </ListItem>
    </List>
  </BasicDrawer>
</template>

<script setup lang="ts">
  import {
    BookOutlined,
    BugOutlined,
    InfoCircleOutlined,
    LogoutOutlined,
    SplitCellsOutlined,
    UserOutlined,
    WarningOutlined,
  } from '@ant-design/icons-vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { computed } from 'vue';
  import { DEFAULT_AVATAR } from '@/settings/designSetting';
  import { Avatar, Divider, List, ListItem } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const [register, { closeDrawer }] = useDrawerInner();
  const go = useGo();
  const userStore = useUserStore();
  const getUserInfo = computed(() => {
    const { avatar, username, email } = userStore.getUserInfo || {};
    return { avatar: avatar || DEFAULT_AVATAR, username, email };
  });

  const jumpTo = (fn: Function) => {
    fn();
    closeDrawer();
  };

  const toBugFix = () => {
    window.open('https://github.com/dstgo/panel/issues');
  };
</script>

<style scoped>
  .list-item {
    transition: background-color ease-in-out 0.2s;
    border-radius: 5px;
    cursor: pointer;
  }

  .list-item:hover {
    background-color: #f0f0f0;
  }

  .list-item:active {
    background-color: #eceff2;
  }
</style>
