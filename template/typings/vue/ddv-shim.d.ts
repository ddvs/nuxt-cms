import { Plugin } from "@nuxt/types";

/**
 * 一般用作接收 Promise 错误进行统一处理
 *
 */
type autoRetry = (fn: () => Promise<any>) => Promise<any>;

interface DdvUtil extends Promise<any> {
  autoRetry: autoRetry;
  /**
   * 发送的数据会自动转换为 query 服务器GET参数
   * @param input 发送参数
   */
  send(input?: { [key: string]: any }): DdvUtil;
  /**
   * 将发送到 send 的参数先去除无效数据，如 null、false、undefined
   * @param input 发送参数
   */
  sendValidData(input?: { [key: string]: any }): DdvUtil;
  /**
   * 使用不经过处理的参数发送给服务器，非必要不建议使用
   */
  native(): DdvUtil;
  /**
   *  可以改变请求的path，如：api.get('/path').path('/path2')
   * @param path 请求地址
   */
  path(path: string): DdvUtil;
  /**
   * GET请求
   * @param path 请求地址
   */
  get(path: string): DdvUtil;
  /**
   * PUT请求
   * @param path 请求地址
   */
  put(path: string): DdvUtil;
  /**
   * POST请求
   * @param path 请求地址
   */
  post(path: string): DdvUtil;
  /**
   * DELETE请求
   * @param path 请求地址
   */
  del(path: string): DdvUtil;
  /**
   * DELETE请求
   * @param path 请求地址
   */
  delete(path: string): DdvUtil;
  /**
   * 改变请求头，如：api.get('/path').headers({})
   * @param input 请求头
   * @param isClean 是否清除默认请求头
   */
  headers(input: { [key: string]: any }, isClean?: boolean): DdvUtil;
  /**
   * 服务器GET参数
   * @param input
   * @param isClean
   */
  query(input: { [key: string]: any }, isClean?: boolean): DdvUtil;
  [key: string]: any;
}

declare module "vue/types/vue" {
  interface Vue {
    $ddvUtil: DdvUtil;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    ddvUtil: DdvUtil;
    autoRetry: autoRetry;
  }
}

const ddvUtil: Plugin = (context, inject) => {
  inject("autoRetry", autoRetry);
  inject("ddvUtil", DdvUtil);
};

export default ddvUtil;
