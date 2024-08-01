export enum RepoType {
    GITHUB = 'github',
    GITLAB = 'gitlab',
}
export interface Repo {
    // 仓库地址
    url: string,
    // 仓库类型
    type: RepoType,
    // 仓库所属
    owner: string,
    // 仓库名称
    name: string,
    // 分支
    checkout: string
}

export type DownloadOptions = {
    clone: boolean
}