import { input, select } from "@inquirer/prompts";

import { frameworks } from "@/config";
import type { Framework } from "@/config";
import type { Project } from "@/types";
import { logger } from "@/utils/logger";

export const create = async () => {
	const config: Partial<Project> = {};

	// 主项目名称
	const appName = await input({
		message: "请输入项目名称",
		default: "app",
	});
	config.appName = appName;

	// 默认模版
	const fras = Object.keys(frameworks);
	const framework = await select<Framework>({
		message: "请选择框架",
		choices: fras,
	});

	config.branch = frameworks[framework].branch;

	// 选择模板
	const templates = frameworks[framework].template.filter(
		(template) => template.type === "monorepo",
	);

	console.log(templates);
	if (templates.length === 0) {
		logger.error("没有可用的模板");
		process.exit(1);
	}

	if (templates.length === 1) {
		console.log(templates);
		return Object.assign(templates[0], config);
	}

	// 处理多模板
	const templ = await select({
		message: "请选择模板",
		choices: templates.map((template) => ({
			name: template.description,
			value: template.appDir,
		})),
	});
	const template = templates.find((template) => template.appDir === templ);

	if (!template) {
		logger.error("没有可用的模板");
		process.exit(1);
	}

	config.path = await input({
		message: "请输入项目路径",
		default: "./",
	});

	return Object.assign(template, config);
};
