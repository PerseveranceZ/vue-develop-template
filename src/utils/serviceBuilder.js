import Ajax from 'Config/ajax'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import { assert } from './tools'
import { LOCAL_AJAX, TEST_PATH } from 'Config'

/**
 * Apior
 * @description 简易的api组装器，自动添加命名空间
 * @author Zero
 */

// 接口访问： 文件名称/接口名称
// 常量访问： 文件名称大写/常量名称

export default class SourceMaker {
    constructor() {
        this.service = {}
    }

    register(type, params) {
    	if(!this.service[type]) this.service[type] = {}
    	this[`${type}Builer`] && this[`${type}Builer`](params) 
    }

    apiBuilder({
    	sep = '|',
    	config = [],
    	mock = false, 
    	debug = false,
    	mockpath = ''
    }) {
    	Object.keys(config).map(namespace => {
    		this._apiSingleBuilder({namespace, mock, mockpath, sep, debug, config[name]})
    	})
    }
    _apiSingleBuilder({
    	namespace, 
    	sep = '|',
    	config = {},
    	mock = false, 
    	debug = false,
    	mockpath = ''
    }) {
    	const  {name, desc, params, method, path, localPath } = config
		let apiname = `${namespace}${sep}${name}`,
            url = mock ? localPath : path,
            baseURL = mock && mockpath,

        debug && assert(name, `${apiUrl} :接口name属性不能为空`)
        debug && assert(apiUrl.indexOf('/') === 0, `${apiUrl} :接口路径path，首字符应为/`)

        Object.defineProperty(this.service.api, `${namespace}${sep}${name}`, {
            value(outerParams, outerOptions) {
                let _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), Object.keys(params))
                return Ajax(normoalize(_assign({
                    url,
                    desc,
                    baseURL,
                    method
                }, options), _data))
            }
        })    	
    }

    constBuilder(name = "", consts = []) {
        consts.map((cst, key) => {
            let constMap = this._constMap,
                constName = name.toUpperCase() + '/' + cst.name
            Object.defineProperty(constMap, constName, { value: cst.value })
        })
    }

	localStorageBuilder(name = "", consts = []) {
        consts.map((cst, key) => {
            let constMap = this._constMap,
                constName = name.toUpperCase() + '/' + cst.name
            Object.defineProperty(constMap, constName, { value: cst.value })
        })
    }

	storeBuilder(name = "", consts = []) {
        consts.map((cst, key) => {
            let constMap = this._constMap,
                constName = name.toUpperCase() + '/' + cst.name
            Object.defineProperty(constMap, constName, { value: cst.value })
        })
    }        
}

function normoalize(options, data) {
    if (options.method === 'POST') {
        options.data = data
    } else if (options.method === 'GET') {
        options.params = data
    }
    return options
}