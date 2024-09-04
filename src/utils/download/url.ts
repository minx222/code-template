import type { DownloadOptions } from '@/types'
import { RepoType } from '@/types';

/**
 * @name 获取下载地址
 */
export class DownloadUrl {
	private options: Omit<DownloadOptions, 'clone'>;

	private clone: boolean;

	private downloadUrl: string | undefined;

	constructor(options: Omit<DownloadOptions, 'clone'>, clone: boolean) {
		this.options = options;
		this.clone = clone;
		this.init();
	}

	get url() {
		return this.downloadUrl;
	}

	private init() {
		if(this.options.type === RepoType.GITHUB) {
			this.downloadUrl = this.github()
			return;
		}
		this.downloadUrl = this.gitlab()
	}

	private github() {
		if(this.clone) {
			this.downloadUrl = ["git@github.com:", this.options.owner, "/", this.options.name, ".git"].join("");
		}
		return [
			"https://github.com/",
			this.options.owner,
			"/",
			this.options.name,
			"/archive/",
			this.options.checkout,
			".zip",
		].join("");
	}

	private gitlab() {
		if (this.clone) {
			return ["git@gitlab.com:", this.options.owner, "/", this.options.name, ".git"].join("");
		}
		return this.options.url;
	}
}


export const getDownloadUrl = (options: Omit<DownloadOptions, 'clone'>, clone: boolean) => {
	return new DownloadUrl(options, clone).url
}
