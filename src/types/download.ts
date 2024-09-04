export enum RepoType {
	GITHUB = "github",
	GITLAB = "gitlab"
}

export interface DownloadOptions {
  /**
   * 仓库的 URL 地址。
   * 
   * @example
   * https://github.com/minx222
   */
  url: string;

  /**
   * 仓库的类型。
   * 
   * 
   */
  type: RepoType;

  /**
   * 仓库的所有者。
   * 
   * @example
   * "aliyun"
   */
  owner: string;

  /**
   * 仓库的名称。
   * 
   * @example
   * fast-monorepo-cli
   */
  name: string;

  /**
   * 仓库的检出分支或标签。
   * 
   * @example
   * master
   */
  checkout: string;

	/**
	 * @name 使用使用git clone
	 */
	clone: boolean;
}


export interface Project {
 /**
	 * @name 路径。
	 *
	 */
 url: string;

 /**
	* @name 分支。
	*
	*/
 branch: string;

 /**
	* @name 文件夹名。
	*/
 appName: string;

 /**
	* @name 子项目列表。
	*/
 child?: Project; // 可选字段

 /**
	* @name 相对于当前文件的的路径
	*/
 path?: string;
}
