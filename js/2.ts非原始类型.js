"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 对象
let obj = { name: "zhangsan" };
let obj2 = { name: "lisi" };
let obj3 = { name: "wangwu" };
// 数组
let list = [1, 2, 3];
list[0] = 10;
// list[2] = "gsg";//报错
let listStr = ["1", "zhangsan", "qiqi"];
// listStr[0] = 10;//报错
listStr[2] = "gsg";
// 泛型
let arr = ["string"];
// 联合类型
let numAndstr = 10;
numAndstr = "hello";
// any
let anylist = [1, true, "free"];
anylist[1] = 100;
// unknown
let unknownlist = [1, true, "free"];
unknownlist[1] = 100;
let life = {
    city: "hangzhou",
    name: "zhangsan",
    age: 27
};
let itfArr = [1, "zhangsan"];
let sum = function (a, b) {
    return a + b;
};
sum(2, 5);
let pernson = {
    gender: "male",
    name: "zhangsan",
    age: 30
};
