import { importAll } from '@/utils/common.js'

const routeModules = importAll(
    require.context('./modules', false, /\.js$/)
)

let configs = {}
routeModules.forEach(({camelModuleName, module}) => {
	configs[camelModuleName] = module
})


export default configs
