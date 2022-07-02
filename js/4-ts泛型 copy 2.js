"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fn1(n) {
    return n;
}
fn1(10);
function fn2(arg) {
    return arg;
}
fn2(20);
let obj = {
    name: "zhanmgsan",
    getage() {
        return 11;
    }
};
function identity(arg) {
    return arg;
}
let myIdentity = identity;
let obj11 = {
    name: 1,
    getAge: () => {
        return 1;
    }
};
// 类
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
