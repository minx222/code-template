import { program } from "commander";
import path from 'node:path'
import { input, select, confirm, checkbox } from "@inquirer/prompts";
import ora from "ora";
import chalk from "chalk";
import logSymbols from "log-symbols";

import { reduceTemplate, templates, frameworks, reduceFramework } from "./config.js";
import { download } from "./utils/index.js";

program
.command("create")
.description("基础模版")
.action(async () => {
	try {
		const appName = await input({
			message: "请输入项目名称",
			default: "app",
		});
		const template = await select({
			message: "请选择初始化项目模板",
			choices: reduceTemplate,
		});
	
		const config = templates[template];
		config.appName = appName;
		const isMonorepo = template === 'monorepo-base'
	
		/**
		 * @description 如果不是monorepo项目，就直接下载
		 */
		if(!isMonorepo) {
			run(config)
			return;
		}
	
		/**
		 * @description 是否选择框架
		 */
		const isFramework = await confirm({
			message: '是否选择一个代码框架',
			default: true
		})
	
		if(!isFramework) {
			run(config)
			return;
		}
	
		const framework = await checkbox({
			message: '请选择框架模版',
			choices: reduceFramework
		})
	
		config.children = framework.map(fra => {
			return frameworks[fra]
		})
	
		run(config)
	} catch (err) {
		if(String(err).includes('ExitPromptError')) {
			console.log(logSymbols.warning, chalk.yellow('用户取消操作'));
		} else {
			console.log(logSymbols.error, chalk.red(err));
		}
	}

});

/**
 * @name 开始下载
 * @param {RunConfig} config 
 */
const run = (config) => {
	const spinner = ora(chalk.blue("正在下载.....\n")).start();
	download(`${config.url}#${config.branch}`, config.appName, { clone: false })
	.then(() => {
		if (config.children) {
			return Promise.all(config.children.map(child => {
				return download(`${child.url}#${child.branch}`, path.join(config.appName, './packages/', child.name), { clone: false })
			}))
		}
		return Promise.resolve(1);
	})
	.then(() => {
		spinner.succeed(chalk.green("下载成功!!!"));
	})
	.catch((err) => {
		spinner.fail("下载终止，终止原因：");
		console.log(logSymbols.error, chalk.red(err));
	});
};

program.parse(process.argv);


/**
 * @description Repo type definition
 * @typedef {Object} RunConfig
 * @property {string} url 路径
 * @property {string} branch 分支
 * @property {string} appName 文件夹名
 * @property {RunConfig[]} children 子项目 
 */
