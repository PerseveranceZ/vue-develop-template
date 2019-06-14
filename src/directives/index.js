import Vue from 'vue'
import { importAll } from '@/utils/common.js'

const routeModules = importAll(
    require.context('./modules', false, /\.js$/)
)

routeModules.forEach(({camelModuleName, module}) => {
	Vue.directive(camelModuleName, module)
})

