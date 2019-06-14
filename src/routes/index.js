import { importAll } from '@/utils/common.js'

const routeModules = importAll(
    require.context('@/routes/modules', false, /\.js$/)
)
const routes = routeModules.reduce(
    (finallRoutes, routerModule) =>
        finallRoutes.concat(routerModule.module),
    []
)


export default routes
