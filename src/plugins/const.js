import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import { assert } from 'Utils/tools'
import { CONST_DEFAULT_CONFIG } from 'Config'
import CONST_CONFIG from 'Service/const'


class MakeConst {
    constructor(options) {
        this.const = {}
        this.constBuilder(options)
    }


    constBuilder({
    	sep = '/',
    	config = []
    }) {
    	Object.keys(config).map(namespace => {
    		this._constSingleBuilder({namespace, sep, config: config[namespace]})
    	})
    }

    _constSingleBuilder({
    	namespace, 
    	sep = '/',
    	config = {}
    }) {
        config.forEach( cst => {
            let {name, value} = cst
            let constName = `${namespace.toUpperCase()}${sep}${name}`
            Object.defineProperty(this.const, constName, { value })            
        })
        
    }
}

console.log(new MakeConst({
    config: CONST_CONFIG,
    ...CONST_DEFAULT_CONFIG
})['const'])

export default new MakeConst({
	config: CONST_CONFIG,
	...CONST_DEFAULT_CONFIG
})['const']

