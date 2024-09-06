import { input, select, confirm } from "@inquirer/prompts";

import { frameworks, reduceFramework } from '@/config'
import { resolvePromise } from '@/utils';
import type { Project } from '@/types';
import { logger } from "@/utils/logger";

export const craeteApp = async () => {

	const config: Partial<Project> = {};
	// 子项目名称
	const [appName, appErr] = await resolvePromise(
		input({
			message: "请输入项目名称",
			default: "app",
		})
	);
	logger.loggerErr(appErr);
	config.appName = appName;
	
	// 默认模版
	const [template, templateErr] = await resolvePromise(
		select({
			message: "请选择框架模版",
			choices: reduceFramework,
		})
	);
	logger.loggerErr(templateErr);
	Object.assign(config, frameworks[template])

	return config as Project;
}
