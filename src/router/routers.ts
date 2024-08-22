const modules: Record<string, any> = import.meta.globEager('./modules/**/*.ts')

const routers: Array<AppRouteRaw> = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key]
  let modList: Array<AppRouteRaw> = []
  for (const moduleskey in mod) {
    modList = modList.concat(mod[moduleskey])
  }
  routers.push(...modList)
})
export { routers }
