<template>
  <Card :title="t('pages.dashboard.nav.title')">
    <CardGrid v-for="item in navItems" :key="item.title">
      <span class="flex flex-col items-center">
        <Icon :icon="item.icon" :color="item.color" size="25" />
        <span class="text-md mt-2 truncate">{{ item.title }}</span>
      </span>
    </CardGrid>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, CardGrid } from 'ant-design-vue';
  import { navItems } from './data';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
</script>
