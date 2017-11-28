/**
 * @Author: songqi
 * @Date:   2016-06-29 22:06:00
 * @Email:  songqi@benmu-health.com
* @Last modified by:   songqi
* @Last modified time: 2016-07-12
 */


var _ = require('lodash');

/**
 * [nameKey 命名空间]
 * @type {String}
 */
var nameKey = 'win-';

/**
 * [_get 获取 localstroage 值]
 * @author songqi
 * @date   2016-07-06
 * @param  {[String]}   key [key 值]
 * @return {[All]}       [value 值]
 */
function _get(key) {
    var data = JSON.parse(localStorage.getItem(nameKey + key));
    return data && data.data;
}

/**
 * [_set 存储 localstroage 值]
 * @author songqi
 * @date   2016-07-06
 * @param  {[String]}   key   [key 值]
 * @param  {[All]}   value [value 值]
 */
function _set(key, value) {
    var data = {
        data: value
    };
    try {
        localStorage.setItem(nameKey + key, JSON.stringify(data));
    } catch (e) {
        // console.log(e);
    }
}

/**
 * [_remove 删除内存中的数据]
 * @author songqi
 * @date   2016-07-06
 * @param  {[Object]}   keys [内存中的 key]
 */
function _remove(keys) {
    if (_.isArray(keys)) {
        keys.map(function(item) {
            localStorage.removeItem(nameKey + item);
        });
    } else if (typeof(keys) === 'string') {
        localStorage.removeItem(nameKey + keys);
    }
}

/**
 * [_clear 清除所有的缓存数据]
 * @author songqi
 * @date   2016-07-06
 */
function _clear() {
    localStorage.clear();
}

module.exports = {
    get: _get,
    set: _set,
    clear: _clear,
    remove: _remove
};
