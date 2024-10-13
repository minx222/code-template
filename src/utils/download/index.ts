import path from "node:path";
import chalk from "chalk";
import Download from "download";
import gitClone from "git-clone";
import ora from "ora";
import { rimrafSync as rm } from "rimraf";

import type { Project } from "@/types";
import { logger } from "@/utils/logger";

import { resolvePromise } from "../promise";
import { normalize } from "./normalize";
import { getDownloadUrl } from "./url";

/**
 * 下载或克隆仓库到指定目录。
 * @param url - 要下载或克隆的仓库URL。
 * @param dest - 仓库放置的目的地目录。
 * @param opts - 下载选项或返回选项的函数。
 * @returns  当操作完成时解析为目的路径的Promise。
 */
export const download = (
	url: string,
	dest: string,
	clone: boolean,
	dir?: string,
) => {
	const repo = normalize(url);
	const downloadUrl = getDownloadUrl(repo, clone);
	if (!downloadUrl) {
		logger.error("url非法");
		return Promise.reject("url非法");
	}
	return new Promise((resolve, reject) => {
		Download(downloadUrl, dest, {
			extract: true,
			strip: 1,
			filter: (file) => {
				console.log(dir, file.path, "dir");
				return file.path.includes(dir ?? "");
			},
		}).then(resolve, reject);
	});
};

export const downloadDir = async (config: Project) => {
	const spinner = ora();
	spinner.start(chalk.blue("正在下载项目.....\n"));
	const [, err] = await resolvePromise(
		download(
			`${config.url}#${config.branch}`,
			config.appName,
			false,
			config.dir,
		),
	);

	if (err) {
		spinner.fail("下载终止，终止原因：");
		rm(config.appName);
		logger.exit(err);
		return;
	}

	spinner.succeed(chalk.green("下载成功!!!"));
};
