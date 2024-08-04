import { program } from "commander";
import { input, select } from "@inquirer/prompts";
import ora from "ora";
import chalk from "chalk";
import logSymbols from "log-symbols";
import rimraf from 'rimraf'

import { reduceSelect, template } from "./config.js";
import { download } from "./utils/index.js";

program
	.command("create")
	.description("基础模版")
	.action(async () => {
		const appName = await input({
			message: "请输入项目名称",
			default: "app",
		});
		const framework = await select({
			message: "请选择初始化项目模板",
			choices: reduceSelect,
		});
		const config = template[framework];
		const spinner = ora(chalk.blue("正在下载.....\n")).start();
		download(`${config.url}#${config.branch}`, appName, { clone: true })
			.then(() => {
				spinner.succeed(chalk.green("下载成功!!!"));
				rimraf('.git')
			})
			.catch((err) => {
				spinner.fail("下载终止，终止原因：");
				console.log(logSymbols.error, chalk.red(err));
			});
	});

program.parse(process.argv);
