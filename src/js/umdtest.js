import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

(function(root,factory){
    if(typeof define === 'function' && define.amd){
        //AMd
        define(['jquery'],factory);
    }else if(typeof exports === 'object'){
        //COMMONjs
        module.exports = factory(require('jquery'))
    }else{
        //浏览器 全局变量
        root.returnExports = factory(root.jQuery)
    }
}(this,function($){
    function myfunc(){}
    
    
    return myfunc;
}))