import { input, select, confirm } from "@inquirer/prompts";

import { frameworks, reduceFramework, reduceTemplate, templates } from '@/config'
import { resolvePromise } from '@/utils';
import type { Project } from '@/types';
import { logger } from "@/utils/logger";

const loggerErr = (err: Error | null) => {
	if(!err) {
		return;
	}
	if(String(err).includes('ExitPromptError')) {
		logger.exit('用户取消操作')
	} else {
		logger.exit(err);
	}
}

export const create = async () => {
	const config: Partial<Project> = {};

	// 主项目名称
	let [appName, appErr] = await resolvePromise(
		input({
			message: "请输入项目名称",
			default: "app",
		})
	);
	loggerErr(appErr);
	config.appName = appName;
	
	// 默认模版
	const [template, templateErr] = await resolvePromise(
		select({
			message: "请选择初始化项目模板",
			choices: reduceTemplate,
		})
	);
	loggerErr(templateErr);
	Object.assign(config, templates[template])

	const [isFramework, isFrameworkErr] = await resolvePromise(confirm({
		message: '是否选择一个额外框架',
		default: false
	}))
	loggerErr(isFrameworkErr);
	if(!isFramework) {
		return config;
	}

	const [projectPath, projectPathErr] = await resolvePromise(
		input({
			message: "请输入文件路径",
			default: "packages",
		})
	);
	loggerErr(projectPathErr);

	[appName, appErr] = await resolvePromise(
		input({
			message: "请输入项目名称",
			default: "app",
		})
	);
	loggerErr(appErr);

	const [framework, frameworkErr] = await resolvePromise(select({
		message: '请选择框架模版',
		choices: reduceFramework
	}))
	loggerErr(frameworkErr);

	config.child = Object.assign({ appName, path: projectPath }, frameworks[framework])

	return config;
}
