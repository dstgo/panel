// Interface data format used to return a unified format
import { ResultEnum } from '@/enums/httpEnum';

export function resultSuccess<T = Recordable>(
  data: T,
  { message = 'ok' } = {},
  i18n = 'api.request_ok',
) {
  return {
    code: ResultEnum.SUCCESS,
    i18n,
    data,
    message,
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function resultError(
  message = 'Request failed',
  i18n = 'sys.request.failed',
  { code = 0, data = null } = {},
) {
  return {
    code,
    i18n,
    data,
    message,
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  const h = headers?.authorization?.split('Bearer ');
  if (!h || h.length < 2) {
    return undefined;
  }
  return h[1];
}
