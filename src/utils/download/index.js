import Download from "download";
import gitClone from "git-clone";
import { rimrafSync as rm } from "rimraf";

const RepoType = {
	GITHUB: "github",
	GITLAB: "gitlab"
}

/**
 * 下载或克隆仓库到指定目录。
 * @param {string} url - 要下载或克隆的仓库URL。
 * @param {string} dest - 仓库放置的目的地目录。
 * @param {DownloadOptions|Function} opts - 下载选项或返回选项的函数。
 * @returns {Promise<string>} 当操作完成时解析为目的路径的Promise。
 */
export const download = (url, dest, opts) => {
	const opt = typeof opts === "function" ? opts(url, dest) : opts;

	const repo = normalize(url);
	const downloadUrl = getUrl(repo, opt.clone);

	return new Promise((resolve, reject) => {
		if (opt.clone) {
			gitClone(downloadUrl, dest, { checkout: repo.checkout }, (err) => {
				if (err === undefined) {
					rm(`${dest}/.git`);
					resolve(dest);
					return;
				}
				reject(err.message);
			});
			return;
		}
		Download(downloadUrl, dest, { extract: true, strip: 1 }).then(
			resolve,
			reject,
		);
	});
};

/**
 * 格式化给定的下载URL并提取仓库信息。
 * @param {string} downloadUrl - 原始下载URL。
 * @returns {Repo} 包含格式化仓库信息的对象。
 */
const normalize = (downloadUrl) => {
	let type = RepoType.GITHUB;
	let url = downloadUrl;
	if (downloadUrl.indexOf(RepoType.GITHUB) === 0) {
		type = RepoType.GITHUB;
		url = url.substring(7);
	} else if (downloadUrl.indexOf(RepoType.GITLAB) === 0) {
		type = RepoType.GITLAB;
		url = url.substring(7);
	}

	const owner = url.split("/")[0];
	let name = url.split("/")[1];
	let checkout = "master";

	if (~name.indexOf("#")) {
		checkout = name.split("#")[1];
		name = name.split("#")[0];
	}

	return {
		url,
		type: type,
		owner: owner,
		name: name,
		checkout: checkout,
	};
};

/**
 * 构建用于下载或克隆仓库的适当URL。
 * @param {Repo} repo - 仓库信息对象。
 * @param {boolean} clone - 是否执行git克隆操作。
 * @returns {string} 用于下载或克隆的构建URL。
 */
const getUrl = (repo, clone) => {
	if (repo.type === RepoType.GITLAB) {
		return gitlab(repo, clone);
	}
	return github(repo, clone);
};
/**
 * 构建GitHub特定的URL用于下载或克隆。
 * @param {Repo} repo - 仓库信息对象。
 * @param {boolean} clone - 是否执行git克隆操作。
 * @returns {string} GitHub URL。
 */
const github = (repo, clone) => {
	if (clone) {
		return ["git@github.com:", repo.owner, "/", repo.name, ".git"].join("");
	}
	return [
		"https://github.com/",
		repo.owner,
		"/",
		repo.name,
		"/archive/",
		repo.checkout,
		".zip",
	].join("");
};
/**
 * 构建GitLab特定的URL用于下载或克隆。
 * @param {Repo} repo - 仓库信息对象。
 * @param {boolean} clone - 是否执行git克隆操作。
 * @returns {string} GitLab URL。
 */
const gitlab = (repo, clone) => {
	if (clone) {
		return ["git@gitlab.com:", repo.owner, "/", repo.name, ".git"].join("");
	}
	return repo.url;
};


/**
 * @description DownloadOptions type definition
 * @typedef {Object} DownloadOptions
 * @property {boolean} clone
 */

/**
 * @description Repo type definition
 * @typedef {Object} Repo
 * @property {string} url
 * @property {string} type
 * @property {string} owner
 * @property {string} name
 * @property {string} checkout
 */
