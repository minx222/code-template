/**
 * 表示一个模板的信息。
 */
export interface Templates {
  /**
   * 模板的名称。
   *
   * @example
   * "basic-template"
   */
  name: string;

  /**
   * 模板的描述。
   *
   * @example
   * "这是一个基础的项目模板"
   */
  description: string;

  /**
   * 模板的 URL 地址。
   *
   * @example
   * "https://github.com/user/basic-template.git"
   */
  url: string;

  /**
   * 模板的分支或标签。
   *
   * @example
   * "master" 或 "v1.0.0"
   */
  branch: string;
}
