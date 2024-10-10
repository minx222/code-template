import { confirm, input, select } from "@inquirer/prompts";

import { reduceTemplate, templates } from "@/config";
import type { Project } from "@/types";
import { resolvePromise } from "@/utils";
import { logger } from "@/utils/logger";

export const create = async () => {
	const config: Partial<Project> = {};

	// 主项目名称
	const [appName, appErr] = await resolvePromise(
		input({
			message: "请输入项目名称",
			default: "app",
		}),
	);
	logger.loggerErr(appErr);
	config.appName = appName;

	// 默认模版
	const [template, templateErr] = await resolvePromise(
		select({
			message: "请选择初始化项目模板",
			choices: reduceTemplate,
		}),
	);
	logger.loggerErr(templateErr);
	Object.assign(config, templates[template]);
	return config;
};
