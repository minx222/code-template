#! /usr/bin/env node
import { program } from "commander";
import { downloadDir, resolvePromise } from "./utils/index.js";

import { create, craeteApp, rmCommand } from '@/command'
import type { Project } from '@/types';

import packages from '../package.json';

program.version(packages.version)

program
.command("create")
.description("基础模版")
.action(async () => {
	const [res, err] = await resolvePromise(create)
	if(err) {
		return;
	}
	downloadDir(res as Project)
});

program
.command("app")
.description("框架模版")
.action(async () => {
	const [res, err] = await resolvePromise(craeteApp)
	if(err) {
		return;
	}
	downloadDir(res as Project)
});

program
.command("rm")
.description("删除文件")
.argument("string", "要删除文件/文件夹")
.action(async (path: string) => {
	await resolvePromise(rmCommand(path));
});



program.parse(process.argv);


