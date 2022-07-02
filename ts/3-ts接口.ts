export {}

// 对象接口类型
interface Mylife{
  city: string,
  name: string,
  age: number
}
//属性要一致
let life: Mylife = {
  city: "hangzhou",
  name: "zhangsan",
  age: 27
}
// 数组接口类型
interface Arritf{
  // 下标类型: 值类型
  [index: number]: number|string,
}
let itfArr: Arritf = [1,"zhangsan"] 

// 函数接口类型
interface fnItf{
  // 函数形参类型: 函数返回值类型
  (a: number,b: number): number
}
let sum: fnItf = function(a: number,b: number){
  return a+b;
}
sum(2,5)

// 接口继承接口
interface NameItf{
  name: string
}
interface AgeItf{
  age: number
}
interface gender extends NameItf,AgeItf{
  gender: string
}
let pernson: gender = {
  gender: "male",
  name: "zhangsan",
  age: 30
}

// 接口继承type,以及接口
type  typeObj = {
  address: string
}
interface msg extends NameItf,AgeItf, typeObj{
   lang:string
}
const person2: msg = {
  address:"guangzhou",
  lang:"chinese",
  name:"lili",
  age:29

}
