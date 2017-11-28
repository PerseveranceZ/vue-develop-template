//全局getters函数 返回你想要的全局状态格式
export default {
    menuOriginGetter: state => state.menuOrigin,
    userinfoGetter: state => state.userinfo,
    menuTreeGetter: state => state.menuTree,
    menuMapGetter: state => state.menuMap
}