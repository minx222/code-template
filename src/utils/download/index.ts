import Download from 'download'
import gitClone from 'git-clone'
import { rimrafSync as rm} from 'rimraf'

import type { Repo, DownloadOptions } from './types'
import { RepoType } from './types'

export const download = (url: string, dest: string, opts: DownloadOptions | ((url: string, dest: string) => DownloadOptions)) => {
    const opt = typeof opts === 'function' ? opts(url, dest) : opts;

    const repo = normalize(url);
    const downloadUrl = getUrl(repo, opt.clone);

    return new Promise((resolve, reject) => {
        if(opt.clone) {
            gitClone(downloadUrl, dest, { checkout: repo.checkout }, (err) => {
                if (err === undefined) { 
                    rm(`${dest}/.git`)
                    resolve(dest)
                    return
                }
                reject(err.message)
            })
            return;
        }
        Download(downloadUrl, dest, {extract: true, strip: 1 }).then(resolve, reject)
    })
}

/**
 * @name 获取下载信息
 * @param url 下载地址
 */
const normalize = (downloadUrl: string): Repo => {
    let type = RepoType.GITHUB;
    let url = downloadUrl
    if (downloadUrl.indexOf(RepoType.GITHUB) === 0) {
      type = RepoType.GITHUB;
      url = url.substring(7);
    }
    else if (downloadUrl.indexOf(RepoType.GITLAB) === 0) {
      type = RepoType.GITLAB;
      url = url.substring(7);
    }
  
    const owner = url.split('/')[0];
    let name = url.split('/')[1];
    let checkout = 'master';
  
    if (~name.indexOf('#')) {
      checkout = name.split('#')[1];
      name = name.split('#')[0];
    }
  
    return {
        url,
        type: type,
        owner: owner,
        name: name,
        checkout: checkout
    };
}




/**
 * @name 获取下载地址
 * @param repo  url解析配置
 * @param clone 是否克隆
 * @returns 
 */
const getUrl = (repo: Repo, clone: boolean) => {
    if (repo.type ===  RepoType.GITLAB) {
        return gitlab(repo, clone);
    }
    return github(repo, clone);
}

const github = (repo: Repo, clone: boolean) => {
    if (clone) {
        return ['git@github.com:', repo.owner, '/', repo.name, '.git'].join('')
    }
    return ['https://github.com/', repo.owner, '/', repo.name, '/archive/', repo.checkout, '.zip'].join('')
}

const gitlab = (repo: Repo, clone: boolean) => {
    if (clone) {
        return ['git@gitlab.com:', repo.owner, '/', repo.name, '.git'].join('')
    }
    return repo.url
}