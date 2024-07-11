export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard/workbench',
  // error page path
  ERROR_PAGE = '/exception',
  // project about
  ABOUT_PAGE = '/about',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',

  // api key page
  APIKEY_PAGE = '/apikey',

  // node pages
  NODE_INDEX_PAGE = '/node/',

  // server pages
  SERVER_INDEX_PAGE = '/server/',

  // user pages
  USER_INDEX_PAGE = '/user/profile',

  // system pages

  SYSTEM_USER_PAGE = '/sys/user',
  SYSTEM_ROLE_PAGE = '/sys/role',
  SYSTEM_CRON_PAGE = '/sys/cron',
  SYSTEM_CONFIG_PAGE = '/sys/config',
}

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight';
