const fileNameRE = /^\.\/([^\s]+)\.js$/
export function importAll(modulesContext) {
    return modulesContext.keys().map((modulesPath) => {
        const moduleName = modulesPath.match(
            fileNameRE
        )
        return {
            moduleName,
            camelModuleName: moduleName[1].replace(
                /-(\w)/g,
                (_, c) => (c ? c.toUpperCase() : '')
            ),
            module: modulesContext(modulesPath).default
        }
    })
}