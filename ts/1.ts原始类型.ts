export {}//让文件独立
// 字符串类型
let str: string = "字符串类型";
// 数字类型
let num: number = 27;
// 布尔值类型
let bool: boolean = true;
// null类型
let nul: null = null;
// undefined类型
let u: undefined = undefined;
// Symbol符号类型
let sy: symbol = Symbol("123");
// 大数类型
// let big: bigint = 100n;需要在配置文件配置不理了

// ts自己定义的基本类型
// any类型
let notSure: any = 4
notSure = "maybe a string"     // 可以是 string 类型
notSure = false                // 也可以是 boolean 类型
// unknown类型
let value: unknown;
value = true; // OK
value = 42; // OK
let value2:  any = value; // OK
// let value3:  boolean = value; // Error Type 'unknown' is not assignable to type 'boolean'.

// void空值类型
let vo: void = undefined;
function sayHi(): void{

}
// never 抛出异常,无返回值
function fn(msg:  string):  never { 
  throw new Error(msg)
}









