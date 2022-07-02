export {}//让文件独立
let str: string = "字符串类型";
let num: number = 27;
let bool: boolean = true;
let nul: null = null;
let sy: symbol = Symbol("123");
// let big: bigint = 100n;需要在配置文件配置不理了
let notSure: any = 4
notSure = "maybe a string"     // 可以是 string 类型
notSure = false                // 也可以是 boolean 类型
let value: unknown;
value = true; // OK
value = 42; // OK
let value2:  any = value; // OK
// let value3:  boolean = value; // Error Type 'unknown' is not assignable to type 'boolean'.
let vo: void = undefined;
function sayHi(): void{

}
// 抛出异常,无返回值
function fn(msg:  string):  never { 
  throw new Error(msg)
}









