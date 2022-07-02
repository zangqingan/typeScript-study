export {}

function fn1(n:number|boolean):number|boolean {
  return n;
}
fn1(10)
function fn2<T>(arg: T): T {
  return arg;
}
// 在使用时指定明确的类型
fn2<number>(20);


// 泛型 = 类型别名
type StrORNum = string|number;
type objType<N,G> = {name:N,getage:()=>G}
let obj:objType<StrORNum,StrORNum> = {
  name:"zhanmgsan",
  getage(){
    return 11
  }
}

// 接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;

type strornum = number|string
interface Person<N extends strornum, G>{
  name:N,
  getAge:()=>G
}

let obj11:Person<number,number> ={
  name:1,
  getAge:() => {
    return 1
  }
}

// 类
class Greeter {
  // 要在外面声明类型
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 接口给类用
interface Citf{
    
}




