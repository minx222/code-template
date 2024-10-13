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
	opts:
		| { clone: boolean }
		| ((url: string, dest: string) => { clone: boolean }),
) => {
	const opt = typeof opts === "function" ? opts(url, dest) : opts;

	const repo = normalize(url);
	const downloadUrl = getDownloadUrl(repo, opt.clone);
	if (!downloadUrl) {
		logger.error("url非法");
		return Promise.reject("url非法");
	}
	return new Promise<void>((resolve, reject) => {
		if (opt.clone) {
			gitClone(downloadUrl, dest, { checkout: repo.checkout }, (err) => {
				if (err === undefined) {
					rm(`${dest}/.git`);
					resolve();
					return;
				}
				reject(err.message);
			});
			return;
		}
		Download(downloadUrl, dest, {
			extract: true,
			strip: 1,
			filter: (file) => {
				return file.path.includes("packages");
			},
		}).then(() => {
			resolve();
		}, reject);
	});
};

export const downloadDir = async (config: Project) => {
	// const spinner = ora();
	// spinner.start(chalk.blue("正在下载项目.....\n"));
	let [, err] = await resolvePromise(
		download(`${config.url}#${config.branch}`, config.appName, {
			clone: false,
		}),
	);

	if (err) {
		// spinner.fail("下载终止，终止原因：");
		rm(config.appName);
		logger.exit(err);
		return;
	}

	if (!config.child) {
		// spinner.succeed(chalk.green("下载成功!!!"));
		return;
	}

	// spinner.clear();
	// spinner.start(chalk.blue("正在下载子项目.....\n"));

	const { url, branch, path: childPath, appName: childName } = config.child;
	const { appName } = config;
	[, err] = await resolvePromise(
		download(
			`${url}#${branch}`,
			path.join(config.appName, `./${childPath ?? ""}/`, childName),
			{ clone: false },
		),
	);

	if (err) {
		// spinner.fail("下载终止，终止原因：");
		rm(config.appName);
		logger.exit(err);
		return;
	}
	// spinner.succeed(chalk.green("下载成功!!!"));
};
