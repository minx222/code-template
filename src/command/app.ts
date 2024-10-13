import { confirm, input, select } from "@inquirer/prompts";

import { frameworks } from "@/config";
import type { Framework } from "@/config";
import type { Project } from "@/types";
import { logger } from "@/utils/logger";

export const craeteApp = async () => {
	const config: Partial<Project> = {};

	// 子项目名称
	config.appName = await input({
		message: "请输入项目名称",
		default: "app",
	});

	// 默认模版
	const fras = Object.keys(frameworks);
	const framework = await select<Framework>({
		message: "请选择框架",
		choices: fras,
	});

	config.branch = frameworks[framework].branch;

	const eslint = await confirm({
		message: "是否需要添加eslint",
		default: true,
	});

	const vitest = await confirm({
		message: "是否需要添加vitest",
		default: true,
	});

	let playwright = false;
	if (vitest) {
		playwright = await confirm({
			message: "是否需要添加playwright",
			default: true,
		});
	}

	const monorepo = await confirm({
		message: "是否需要添加monorepo",
		default: true,
	});

	// 模板
	const templates = frameworks[framework].template;

	templates
		.filter((template) => {
			if (eslint) {
				return template.name.includes("eslint");
			}
			return true;
		})
		.filter((template) => {
			if (vitest) {
				return template.name.includes("vitest");
			}
			return true;
		})
		.filter((template) => {
			if (playwright) {
				return template.name.includes("playwright");
			}
			return true;
		})
		.filter((template) => {
			if (monorepo) {
				return template.name.includes("monorepo");
			}
			return true;
		});

	if (templates.length === 0) {
		logger.error("没有可用的模板");
		process.exit(1);
	}

	if (templates.length === 1) {
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
		default: template.type === "monorepo-apps" ? "./" : "./apps",
	});

	return Object.assign(template, config);
};
