
import logSymbols from 'log-symbols';
import chalk from 'chalk';

export class Logger {
	// biome-ignore lint/suspicious/noExplicitAny: 需要实现打印
	log(...args: any[]) {
		console.log(...args);
	}

	// biome-ignore lint/suspicious/noExplicitAny: 需要实现打印
	info(...args: any[]) {
		this.log(logSymbols.info, chalk.white(...args))
	}

	// biome-ignore lint/suspicious/noExplicitAny: 需要实现打印
	warning(...args: any[]) {
		this.log(logSymbols.warning, chalk.yellow(...args))
	}

	// biome-ignore lint/suspicious/noExplicitAny: 需要实现打印
	error(...args: any[]) {
		this.log(logSymbols.error, chalk.red(...args))
	}

	// biome-ignore lint/suspicious/noExplicitAny: 需要实现打印
	exit(...args: any[]) {
		this.error(...args);
		process.exit(1);
	}
}

export const logger = new Logger();
