export const template = {
	/**
	 * @name monorepo模版
	 */
	monorepoBase: {
		name: "monorepo-base",
		description: "monorepo模版",
		url: "github:minx222/code-template",
		branch: "main"
	},
	reactRspack: {
		name: "react-rspack",
		description: "react-rspack应用",
		url: "github:minx222/code-template",
		branch: "react-rspack"
	},
}

export const reduceSelect = Object.keys(template).map((item) => {
	return {
		value: item,
		name: template[item].description,
	}
});
