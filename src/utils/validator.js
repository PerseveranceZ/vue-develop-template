var strategies = {
    required: function(val, errMsg ) {
        if (val === '') {
            return errMsg;
        }
    },
    isLongThan: function(val, len, errMsg) {
        if (val == len) {
            return errMsg
        }
    },
    isRepeat :function(val,  len, errMsg){
        var isRepeat = val.some((item) => {
                if (item === len) {
                    return true;
                }
        });
        if(isRepeat){
            return errMsg
        }
    },
    isMobile: function(val, errMsg) {
        // var isMobile = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[0-9])[0-9]{8}$/g;
        var isMobile = /(^1[3|4|5|7|8][0-9]{9}$)/;
        if(!isMobile.test(val)){
            return errMsg;
        }
    },
    isLineNumber: function(val, errMsg) {
        var isMobile = /^\s*\d+-?\d+\s*$/;
        if(!isMobile.test(val)){
            return errMsg;
        }
    },
    limitTitle: function(val, errMsg) {//富文本编辑器验证title
        if(val.length < 5 || val.length > 30){
            return errMsg
        }
    },
    limitContent: function(val, errMsg) {//富文本编辑器验证content
        if(val.replace(/<h2[^>]*>.*<\/h2>/i, '').replace(/<\/?[^>]*>/g, '').length < 10){
            return errMsg
        }
    },
    isNumber: function(val, errMsg) {
        if(!Math.trunc(val) && Math.trunc(val)!==0){
            return errMsg
        }
    }
};

/**
 * 接受验证的数组
            [{
                value: this.modalData.datas.keywordInput,
                rules: [{
                    rule: 'required',
                    msg: '关键词不能为空'
                }]
            }]
 */
var validate = function(arr) {
    var obj = {
        status: true
    };
    for (var i = 0, l1 = arr.length; i < l1; i++) {
        var item = arr[i];
        var stop = false;
        for (var k = 0, l2 = item.rules.length; k < l2; k++) {

            var r = item.rules[k];
            var arg = r.rule.split(':');
            var rule = arg.shift();
            if (r.type) {
                arg.unshift(r.type);
            }
            arg.unshift(item.value);
            arg.push(r.msg);
            //debugger
            var status = strategies[rule].apply(null, arg);
            if (status) {
                obj = {
                    value: item.value,
                    status: false,
                    msg: status
                };
                stop = true;
                break;
            }
        }
        if (stop) break;
    }
    return obj;
};

module.exports = validate;
