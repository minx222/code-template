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

export type Key = keyof typeof template;

type Select = {
    value: Key,
    name: string
}

export const reduceSelect = Object.keys(template).map((item) => {
    const key = item as Key
    return {
        value: item,
        name: template[key].description,
    } as Select
});