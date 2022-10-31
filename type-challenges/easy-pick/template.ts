// 要求：实现 TS 内置的类型工具函数 Pick<T, K>，但不可以使用它。
// 这个工具函数的作用就是：从一个类型 T 中选择出属性 K，构造成一个新的类型返回。
// 所以这个例子的实际是，你要声明一个跟 ts 内置的类型工具函数 Pick一样功能的类型
type MyPick<T, K extends keyof T> = {
    // 遍历 K
    [P in K] : T[P]

}



// 对比js学习
// 生命一个函数，它接受两个形参，返回一个变量
// 根据传入的key数组取传入对象的属性并返回
// function jsMyPick(data, keys) {
//     const obj = {}
//     // for(let i = 0; i < keys.length; i++) {
//     //     if(keys[i] in data) {
//     //         obj[keys[i]] = data[keys[i]]
//     //     }
//     // }
//     keys.forEach(key => {
//         if (key in data) {
//             obj[key] = data[key]
//         }
//     });
//     return obj
// }

// 1.返回一个对象
// 2.遍历传入的要求数组
// 3.去data[key]的值
// 4.判断key是否在data里
// 把这四点翻译成ts的语法也就实现了相同的功能了

// 1.ts里返回一个对象直接等于字面量写法即可 ==> {}
// 2.在ts里遍历也是使用 in 操作符，涉及的ts知识点是 Mapped
// 3.ts里对象使用属性变量取值也是使用中括号 [] ，涉及的ts知识点是 indexed
// 4.在ts里可以使用 extends 来对类型变量进行约束,使用 keyof 可以对接口所有的属性进行遍历，最终返回一个类似字符串数组的接口 ['a','b']
// ，涉及的ts知识点是 keyof lookup




