export {}
// 联合类型
function fn1(n:number|boolean):number|boolean {
  return n;
}
fn1(10)
//使用泛型表示
function fn2<T>(arg: T): T {
  return arg;
}
// 在使用时指定明确的类型
fn2<number>(20);

type MyAddG = <T>(x: T) => T
let myAdd:MyAddG = function(x){ return x ; };


// 泛型接口
interface Identities<T, U> {
  value: T,
  message: U
}
function identity<T, U> (value: T, message: U): Identities<T, U> {
  console.log(value + ": " + typeof (value));
  console.log(message + ": " + typeof (message));
  let identities: Identities<T, U> = {
    value,
    message
  };
  return identities;
}
console.log(identity(68, "Semlinker"));

// 泛型默认参数
interface Iprint<T = number> {
  (arg: T): T
}
function print<T>(arg:T) {
  console.log(arg)
  return arg
}
const myPrint: Iprint = print

// 泛型继承接口加强约束、
interface ILength {
  length: number
}

function printLength<T extends ILength>(arg: T): T {
  console.log(arg.length)
  return arg
}
const str = printLength('lin')
const arr = printLength([1,2,3])
const obj = printLength({ length: 10 })

// 定义一个栈，有入栈和出栈两个方法，如果想入栈和出栈的元素类型统一，就可以这么写
class Stack<T> {
  private data: T[] = []
  push(item:T) {
      return this.data.push(item)
  }
  pop():T | undefined {
      return this.data.pop()
  }
}
// 在定义实例的时候写类型
const s1 = new Stack<number>()


