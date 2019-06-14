const SPECIAL_CLASS_HANDLE = ['ivu-modal']

function containsSpecial (target) {
    let isContains = false
    SPECIAL_CLASS_HANDLE.forEach((item) => {
        if(target.className.indexOf(item) > -1) isContains = true
    })
    return isContains
}

export default {
    bind (el, binding, vnode) {
        function documentHandler (e) {
            let _target = e.target
            if(containsSpecial(_target)) return 
            if (el.contains(_target)) return false
            if (binding.expression) binding.value(e);
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update () {

    },
    unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
};