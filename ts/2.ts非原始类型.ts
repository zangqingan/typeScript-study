export {}
// 对象
let obj: object = {name: "zhangsan"};
let obj2: Object = {name: "lisi"};
let obj3: {} = {name: "wangwu"};

// 数组
let list: number[] = [1, 2, 3];
list[0] = 10;
// list[2] = "gsg";//报错因为不是数值 类型
let listStr: string[] = ["1", "zhangsan", "qiqi"];
// listStr[0] = 10;//报错
listStr[2] = "gsg";
// 泛型
let arr : Array<string> = ["string"]
// 接口
interface IItem {
  id: number;
  name: string;
  isGod: boolean;
}
const objectArr1: IItem[] = [{ id: 1, name: '俊劫', isGod: true }];
// or
const objectArr2: Array<IItem> = [{ id: 1, name: '俊劫', isGod: true }];
//用 any 表示数组中允许出现任意类型
let listAny: any[]

// 元组
let tuple: [string, number] = ["hello", 1];

// 联合类型
let numAndstr : number | string = 10;
numAndstr = "hello"

// 交叉类型
interface Person {
  name: string
  age: number
}
type Student = Person & { grade: number }// 交叉类型

// 类型别名
type flag = string | number;
function hello(value: flag) {}
type Name = string                              // 基本类型
type arrItem = number | string                  // 联合类型
const typearr: arrItem[] = [1,'2', 3]

type Teacher = Person & { major: string  } 

type StudentAndTeacherList = [Student, Teacher]  // 元组类型
const typelist:StudentAndTeacherList = [
  { name: 'lin', age:27,grade: 100 }, 
  { name: 'liu', age:40,major: 'Chinese' }
]

// 类型断言
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;













