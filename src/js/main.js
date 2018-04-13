import 'babel-polyfill' //导入支持新的方法 只能import导入过下loader
import axios from 'axios'
import dd from './lib'


console.log(dd);

//通过压缩和转换实现了ie8压缩的问题
var b = {
    class: '123'
}

console.log(b);

var a = {};
a.default = 10;


//这里通过babel latest已经可以转成支持 es6,7语言了

class Person {
    constructor(name) {
        this.name = name;
    }

    hello() {
        console.log(this.name);
    }
}

const p = new Person('liuyang');

p.hello();


//这里测试下es6,7新的方法 是否需要pollyfill 并且验证这个pollyfill是否还需要babel转语法
var cc = Object.assign({}, {
    test: '123'
});

console.log(cc);

console.log($);

$(function () {
    $('a').click(async () => {
        var result = await axios.get('/');
        console.log(result);
    })
})


//全部搞定！！！！！！！！！

//总结：
//开发不用压缩工具：支持ie8 需要 es3ifyPlugin 来es5->es3
//需要babel-loader来兼容es6
//需要babel-polyfill 来兼容es6新方法 但是没有找到为什么不能直接script引入 需要import require导入
//源代码必须不能是eval的babel es3ify 不转

//生产需要压缩工具，支持ie8 需要
// optimization: {
//     minimizer: [
//         //真正生产构建的时候需要设置压缩兼容ie8的
//         new UglifyJsPlugin({
//             cache: true,
//             parallel: true,

//             uglifyOptions: {
//                 ecma: 7,
//                 ie8: true
//             }
//         }),
//     ]
// },
//需要babel-loader来兼容es6
//需要babel-polyfill 来兼容es6新方法 但是没有找到为什么不能直接script引入 需要import require导入
//源代码必须不能是eval的babel es3ify 不转