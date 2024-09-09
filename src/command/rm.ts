import nodePath from 'node:path';
import { rimrafSync as rm } from "rimraf";
import ora from "ora";

export const rmCommand = async (path: string) => {
	console.log(path);
	const spinner = ora(`Removing ${path}`).start();
	const file = nodePath.resolve(process.cwd(), path)
	rm(file)
	spinner.stop();
	return 1;
};
