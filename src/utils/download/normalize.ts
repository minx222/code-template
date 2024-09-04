import { RepoType } from '@/types';

/**
 * 格式化给定的下载URL并提取仓库信息。
 * @param downloadUrl - 原始下载URL。
 * @returns 包含格式化仓库信息的对象。
 */
export const normalize = (downloadUrl: string) => {
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
