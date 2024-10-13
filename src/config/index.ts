export interface Templates {
	name: string;
	description: string;
	url: string;
	branch: string;

	appName?: string;
	path?: string;
	child?: Templates;
}

export const frameworks = {
	vue: {
		name: "Vue",
		description: "Vue",
		url: "github:minx222/code-template",
		branch: "vue",
		template: [
			{
				name: "eslint-monorepo",
				description: "Vue",
				url: "github:minx222/code-template",
				dir: "eslint-monorepo",
				appDir: "apps",
				type: "monorepo",
			},
			{
				name: "vitest-playwright-monorepo",
				description: "Vue",
				url: "github:minx222/code-template",
				dir: "vitest-playwright-monorepo",
				type: "monorepo-apps",
			},
		],
	},
	react: {
		name: "React",
		description: "React",
		url: "github:minx222/code-template",
		branch: "react",
		template: [
			{
				name: "eslint-monorepo",
				description: "Vue",
				url: "github:minx222/code-template",
				dir: "vite-eslint",
				appDir: "apps",
				type: "monorepo",
			},
			{
				name: "vitest-playwright-monorepo",
				description: "Vue",
				url: "github:minx222/code-template",
				dir: "vitest-playwright-monorepo",
				type: "monorepo-apps",
			},
		],
	},
};

export type Framework = "react" | "vue";
