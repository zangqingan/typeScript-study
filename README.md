# typeScript-study
typeScript学习记录
# 一、概述
TypeScript is JavaScript with syntax for types,ts就是带上类型语法的js,是js的超集。
主要学习类型检查,文件是以 .ts扩展名。
安装:npm install -g typescript 或者指定版本 npm install -g typescript@4.5.2
检查是否安装成功:tsc -v 可以查看安装版本信息。
初始化ts项目:tsc -init,创建tsconfig.json文件,这个文件中指定了用来编译这个项目的根文件和其它编译选项。 
编译成js文件:tsc helloworld.ts

# 二、类型
## 2.1基本类型
TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。 
布尔值、数字、字符串、null、undefined、符号类型、bigint,它们对应的类型值如下:
boolean、number、string、null、undefined、symbol。
默认情况下 null 和 undefined 是所有类型的子类型,也就是说null和undefined值可以赋值给其它类型。
let声明的变量值是什么类型变量就是什么类型,const声明的变量值就是变量的类型。
函数没有返回值时类型是void,意味空的。
使用方法:
let 变量名:基本类型名 = 变量值;
如:let str:string = "我是字符串类型";
这样就表示变量  str 是字符串类型，如果赋值其它类型就会报错。
这样就可以帮助我们提前发现代码中的错误。
然后是ts自己添加的类型:any、unknown、以及void。
any类型任意类型不清楚用什么类型，就可以使用 any 类型。它绕过类型校验，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。实际开发中不建议使用不然就丧失了 TS 的意义。

unknown类型也代表任何类型，它的定义和 any 定义很像，但是它是一个安全类型，使用 unknown 做任何事情都是不合法的。这是因为它不绕过类型校验，同时它声明变量值只能赋值给any类型和它本身。

void 与 any 类型相反表示没有任何类型为空，当一个函数没有返回值时 TS 会认为它的返回值是 void 类型。

never类型表示的是那些永不存在的值的类型，它是任何类型的子类型，也可以赋值给任何类型。
有些情况下值会永不存在，比如，
    如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值，因为抛出异常会直接中断程序运行。
    函数中执行无限循环的代码，使得程序永远无法运行到函数返回值那一步。


## 2.2非基本类型
对象类型:object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
可以使用三种形式:object、Object、{}，一般使用小写的object。

数组类型:有两种方式可以定义数组。 
第一种，可以在基本类型后面接上[]，表示由此基本类型元素组成的一个数组。
list: number[] 纯数字数组，listStr: string[] 纯字符串数组。
第二种方式是使用数组泛型，Array<元素类型>。

元组类型（ Tuple ）表示一个已知数量和类型的数组 其实可以理解为他是一种特殊的数组。
也就是说当你想一个数组内每一项放入不同数据时就使用元组类型。
比如，你可以定义一对值分别为 string和number类型的元组。
但是元组的写法是写死了位置上对应的类型的。
let x: [string, number];

联合类型（Union Types）:表示一个变量可以支持多种类型。或的意思用竖线（ |）分隔每个类型，
所以 number | string | boolean表示一个值可以是 number， string，或 boolean。
如一个希望是number或 string类型的参数。
let numAndstr :number | string = 10;

交叉类型:表示将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。and的意思用 （&）符号连接每个类型。
交叉类型和 interface 的 extends 非常类似，都是为了实现对象形状的组合和扩展。
interface Person {
    name: string
    age: number
}
type Student = Person & { grade: number }

类型别名（type aliase）:用来给一个类型起个新名字,它有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。也就是用于给各种类型定义别名，让 TS 写起来更简洁、清晰。
function hello(value: string | number) {}，我们可以给这个联合类型取一个名字标识，使用type关键字声明，有点像变量一样，这样这个联合类型就有了另一个等价的名字，使用这个别名即可。
type flag = string | number;
function hello(value: flag) {}
type Name = string                              // 基本类型
type arrItem = number | string                  // 联合类型
const arr: arrItem[] = [1,'2', 3]

type Person = { 
  name: Name 
}

type Student = Person & { grade: number  }       // 交叉类型

type Teacher = Person & { major: string  } 

type StudentAndTeacherList = [Student, Teacher]  // 元组类型
const list:StudentAndTeacherList = [
  { name: 'lin', grade: 100 }, 
  { name: 'liu', major: 'Chinese' }
]

类型断言:值 as 类型,使用类型断言来告诉 TS，我（开发者）比你（编译器）更清楚这个参数是什么类型，你就别给我报错了。其实就是你需要手动告诉 ts 就按照你断言的那个类型通过编译。
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

# 三、接口
上面我们已经可以描述一个对象的类型了，但是对象里的每个字段类型约束还没有。
而 interface(接口) 就是 TS 设计出来用于定义对象类型的，可以对对象的形状进行描述。
接口一般首字母要大写,它的作用主要是定义给对象、数组、函数用的校验每个字段跟接口定义的字段类型是否一致，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。
接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在，可以使用 ?: 表示可选。
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly来指定只读属性。
声明语法如下:描述对象
interface 接口名{
  name:string,
  字段名:类型约束,
  color?: string;//可选字段,
  readonly x: number;
}
描述数组
interface Myarr{
  [index:number]:number | string;
}
描述函数
interface Myfn {
  (a: number,b: number): number
} 
使用时属性必须和类型定义的时候完全一致，可选的可不定义，只读的不能修改。
少写多写了属性都会报错，
const p1: Person = {
    name: 'lin',
    age: 18
}

接口重复声明会合并重复的声明。
interface Person {
    name: string
}
interface Person {         // 重复声明 interface，就合并了
    age: number
}
const person: Person = {
    name: 'lin',
    age: 18
}

接口继承:和类一样，接口也可以相互继承，也可以继承类型别名type声明的类型，也使用 extends关键字,继承 多个接口名和类型别名声明的名字逗号隔开即可,相当于从一个接口里复制所有成员到另一个接口里所以继承的属性也要写上不然报错。
// interface 继承 interface
interface Person { 
  name: string 
}
// interface 继承 type
type Person1 = { 
  gender: string 
}
interface Student extends Person,Person1{ 
  grade: number 
}
const person:Student = {
  name: 'lin',
  grade: 100,
  gender: 
}

# 四、函数
TypeScript函数可以创建有名字的函数和匿名函数,给每个形参添加类型之后再为函数本身添加返回值类型。
TypeScript可以根据返回语句自动推断出返回值类型，因此我们通常省略它函数返回值的类型。
如果函数没有明确返回值，默认返回 void 类型。
(x:number)里面写形参的类型，():这是函数返回值的类型。形参也是可以可选的这时要放在函数入参的最后面，不然会导致编译错误,也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时就使用默认值，如果带默认值的参数不是最后一个参数，用户必须明确的传入 undefined值来获得默认值。
// 函数声明
function buildName(firstName: string, lastName?: string):string {

}
function buildName(firstName: string, lastName = "Smith"):string  {

}
// 函数表达式
let myAdd = function(x: number, y: number): number { return x + y; };

# 五、类
类修饰符:TypeScript里通过 public、private、protected 三个类修饰符来增强了 JS 中的类，成员都默认为 public，可以不写。
当成员被标记成 private时私有的，只属于这个类自己，它的实例和继承它的子类都访问不到。
protected受保护的与 private修饰符的行为很相似，但有一点不同，继承它的子类可以访问，实例不能访问。
static 类的静态属性和方法是直接定义在类本身上面的，所以也只能通过直接调用类的方法和属性来访问，实例不能访问，访问会报错。
readonly关键字将属性设置为只读的，只读属性必须在声明时或构造函数里被初始化。 
//声明
class Person {
  name!: string; //如果初始属性没赋值就需要加上!
  constructor(_name: string) {
    this.name = _name;
  }
  getName(): void {
    console.log(this.name);
  }
}
let p1 = new Person("hello");
p1.getName();
//子类继承，如果有自己的属性要使用super关键字执行。
class Student extends Person {
  grade: number
  constructor(name: string,grade:number) {
      super(name)
      this.grade = grade
  }
  study() {
      console.log(${this.name} needs study)
  }
}

const s1 = new Student('lin',600)
s1.study()

多态子类对父类的方法进行了重写，子类和父类调同一个方法时会不一样。

抽象类:使用abstract声明的只能被继承，但不能被实例化的类。
特点:
  抽象类不允许被实例化,即new调用。
  抽象类中的抽象方法必须被子类实现
使用场景：我们一般用抽象类和抽象方法抽离出事物的共性 以后所有继承的子类必须按照规范去实现自己的具体逻辑 这样可以增加代码的可维护性和复用性

类实现接口implements


# 六、泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。可以理解为类型的形参，通过类型变量将类型参数化。类型变量它是一种特殊的变量，只用于表示类型而不是值。也就是将来使用具体的类型代替类型变量。一般可以用 T 来表示类型变量。
语法:
尖括号 <类型变量>表示一个泛型。
泛型类使用（ <>）括起泛型类型，跟在类名后面。
泛型约束:再定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束。
//函数,下面就是说函数的形参arg的类型和函数的返回值都是泛型T，他们的具体类型是在调用时传入指定的。
function  fn<T>(arg:T):T{
  return arg;
}
//使用
fn<number>(20)


# 六、工具类型
Partail部分属性








