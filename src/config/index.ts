export interface Templates {
	name: string;
	description: string;
	url: string;
	branch: string;

	appName?: string;
	path?: string;
	child?: Templates;
}

/**
 * @name 基础模版
 */
export const templates: Record<string, Templates> = {
	/**
	 * @name monorepo模版
	 */
	"monorepo-base": {
		name: "monorepo-base",
		description: "monorepo模版",
		url: "github:minx222/code-template",
		branch: "monorepo-base",
	},
	"react-vite-electron": {
		name: "react-vite-electron",
		description: "react-electron应用",
		url: "github:minx222/code-template",
		branch: "react-vite-electron",
	},
	"react-monorepo-vite": {
		name: "react-monorepo-vite",
		description: "react-应用",
		url: "github:minx222/code-template",
		branch: "monorepo-base",
		child: {
			name: "react-vite",
			appName: "react-vite",
			description: "react-vite应用",
			url: "github:minx222/code-template",
			branch: "react-vite",
			path: "packages",
		},
	},
	"vue-monorepo-vite": {
		name: "react-monorepo-vite",
		description: "vue-应用",
		url: "github:minx222/code-template",
		branch: "monorepo-base",
		child: {
			name: "vue-vite",
			description: "vue3应用",
			appName: "vue-vite",
			url: "github:minx222/code-template",
			branch: "vue-template",
			path: "packages",
		},
	},
};

export const reduceTemplate = Object.keys(templates).map((item) => {
	return {
		value: item,
		name: templates[item].description,
	};
});

/**
 * @name 框架模版
 */
export const frameworks: Record<string, Templates> = {
	"react-vite": {
		name: "react-vite",
		description: "react-vite应用",
		url: "github:minx222/code-template",
		branch: "react-vite",
	},
	"vue-vite": {
		name: "vue-vite",
		description: "vue3应用",
		url: "github:minx222/code-template",
		branch: "vue-template",
	},
};

export const reduceFramework = Object.keys(frameworks).map((item) => {
	return {
		value: item,
		name: frameworks[item].description,
	};
});
