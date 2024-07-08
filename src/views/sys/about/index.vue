<template>
  <PageWrapper :title="t('pages.about.title')">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ name }}</a>
          {{ t('pages.about.description') }}
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { Description, DescItem, useDescription } from '@/components/Description';
  import { GITHUB_URL, DOC_URL } from '@/settings/siteSetting';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, name, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: t('pages.about.version'),
      field: 'version',
      render: commonTagRender('blue'),
    },
    {
      label: t('pages.about.lastBuildTime'),
      field: 'lastBuildTime',
      render: commonTagRender('blue'),
    },
    {
      label: t('pages.about.document'),
      field: 'doc',
      render: commonLinkRender('Panel Document'),
    },
    {
      label: t('pages.about.github'),
      field: 'github',
      render: commonLinkRender('dstgo/panel'),
    },
  ];

  const infoData = {
    version,
    lastBuildTime,
    doc: DOC_URL,
    github: GITHUB_URL,
  };

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  const [register] = useDescription({
    title: t('pages.about.devdep'),
    data: dependencies,
    schema: schema,
    column: 3,
  });

  const [registerDev] = useDescription({
    title: t('pages.about.prodep'),
    data: devDependencies,
    schema: devSchema,
    column: 3,
  });

  const [infoRegister] = useDescription({
    title: t('pages.about.projectInfo'),
    data: infoData,
    schema: infoSchema,
    column: 2,
  });
</script>
