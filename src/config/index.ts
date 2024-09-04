export interface Templates {
	name: string;
	description: string;
	url: string;
	branch: string;
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
		branch: "monorepo-base"
	},
	"react-vite-electron": {
		name: "react-vite-electron",
		description: "react-electron应用",
		url: "github:minx222/code-template",
		branch: "react-vite-electron"
	},
}

export const reduceTemplate = Object.keys(templates).map((item) => {
	return {
		value: item,
		name: templates[item].description,
	}
});


/**
 * @name 框架模版
 */
export const frameworks: Record<string, Templates> = {
	"react-vite": {
		name: "react-vite",
		description: "react-vite应用",
		url: "github:minx222/code-template",
		branch: "react-vite"
	},
	'react-rspack': {
		name: "react-rspack",
		description: "react-rspack应用",
		url: "github:minx222/code-template",
		branch: "react-rspack"
	},
	'vue-vite': {
		name: "vue-vite",
		description: "vue3应用",
		url: "github:minx222/code-template",
		branch: "vue-template"
	},
}

export const reduceFramework = Object.keys(frameworks).map((item) => {
	return {
		value: item,
		name: frameworks[item].description,
	}
});
