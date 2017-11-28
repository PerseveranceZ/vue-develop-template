import Apis from './apis'
import Consts from './consts'

import { assert } from 'Utils/tools'

const source = Object.assign({}, Apis, Consts)

export default {
    pull(name) {
        assert(resource[name], `${name}并不存在，请检查路径是否正确`)
        return resource[name]
    }
}