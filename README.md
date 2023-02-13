# typeScript-study
typeScript学习记录
# 一、概述
TypeScript is JavaScript with syntax for types,TypeScript就是带上类型语法的JavaScript,它是JavaScript的超集。简称ts，它是静态类型的，所谓静态类型是指ts的类型检查是在编译阶段，也就是ts代码在编译为js代码的时候才做类型检查。
主要学习类型检查,文件是以 .ts 为扩展名。
安装:npm install -g typescript 或者指定版本 npm install -g typescript@4.5.2,安装完成之后，我们就可以在任何地方执行 tsc 命令了。
检查是否安装成功:tsc -v 可以查看安装版本信息。
初始化ts项目:tsc -init,创建tsconfig.json文件,这个配置文件中指定了用来编译这个项目的根文件和其它编译选项。 
编译成js文件:tsc helloworld.ts

# 二、类型
在 TypeScript 中，我们使用冒号后跟类型名来指定一个变量的类型。即 变量名:指定变量的类型，冒号的前后有没有空格都可以。
具体使用方法:在变量后面添加 :ts类型名 即可。这种是ts的类型注解语法，它显性的声明变量的类型约束。
let 变量名:类型名 = 变量值;
如:let str:string = "我是字符串类型";
常见变量类型声明格式
变量名	   JavaScript	       TypeScript
字符串	     'str'/"str"	    str:string
数值	         5	            num:number
布尔值	       true/false     bool:boolean
大整数	        BigInt	      big:bigint
符号	          Symbol	      sym:symbol
不存在	        Null	        n:null 
未定义	        Undefined	    un:undefined
联合类型     'str' || 3       strOrNum: string | number
对象          {}              obj:Object /obj:object /obj:{}  只是一个对象
对象          {}              obj:接口名       对对象属性的类型进行约束
对象          {}              obj:类型别名     对对象属性的类型进行约束
数组          []              基本类型名:[] / 接口名:[]
数组          []              Array<基本类型名> / Array<接口名>



这样就表示变量 str 是字符串类型，如果赋值其它类型就会报错。
这样就可以帮助我们提前发现代码中的错误。在ts中有很多类型，常见的如下：
## 2.1基本类型
TypeScript支持与JavaScript几乎相同的数据类型转为全小写即可，此外还提供了实用的枚举类型方便我们使用。 
原始数据类型	JavaScript	TypeScript
字符串	        String	    string
数值	          Number	    number
布尔值	        Boolean	    boolean
大整数	        BigInt	    bigint
符号	          Symbol	    symbol
不存在	        Null	        null 
未定义	        Undefined	  undefined

默认情况下 null 和 undefined 是所有类型的子类型,也就是说null和undefined值可以赋值给其它类型。
// 这样不会报错
let num: number = undefined;

let声明的变量值是什么类型变量就是什么类型,const声明的变量值就是变量的类型。
原始数据类型是可以不显式声明类型的，因为ts会进行类型推论，根据声明变量时赋值的类型，自动推导出变量类型。
函数没有返回值时类型是void,意味空的。

然后是ts自己添加的类型:any、unknown、void以及never。

any类型,也就是任意类型不清楚用什么类型，就可以使用 any 类型。它会绕过类型校验，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。实际开发中不建议使用不然就丧失了 TS 的意义。
同时对any类型值得任何操作，其返回值还是any类型。
变量声明时未指定其类型那么会被识别为any类型。

unknown类型也代表任何类型，它的定义和 any 定义很像，但是它是一个安全类型，使用 unknown 做任何事情都是不合法的。这是因为它不绕过类型校验，同时它声明变量值只能赋值给any类型和它本身。

void 与 any 类型相反表示没有任何类型为空，当一个函数没有返回值时 TS 会认为它的返回值是 void 类型。
声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null，如下
let unusable: void = undefined;

never类型表示的是那些永不存在的值的类型，它是任何类型的子类型，也可以赋值给任何类型。
有些情况下值会永不存在，比如，
    如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值，因为抛出异常会直接中断程序运行。
    函数中执行无限循环的代码，使得程序永远无法运行到函数返回值那一步。

类型推论：TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

## 2.2非基本类型
可以说除了上面说的基本类型，剩下的都是非基本类型。

对象类型: 我们知道JavaScript中对象是一个键值对的集合，它表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。在ts中也可以使用三种形式:object、Object、{}，来定义一个变量时对象类型，一般使用小写的object。
但是这种类型只能指定变量是一个对象而不能指定对象键的具体类型所以一般也不怎么用，在ts中提供了类型别名 type 和 接口interface 来对对象键的类型进行约束。
非原始类型	JavaScript	TypeScript
对象	      Object/{}	    Object/object/{}
对象	      Object/{}	     类型别名
对象        Object/{}	     接口

数组类型:有多种方式可以定义数组，比较灵活。 
第一种，可以在基本类型名称后面接上方括号[]，表示由此基本类型元素组成的一个数组，这时数组中的项不允许是其它类型的。注意这个类型它可以是接口，这样就变成了一个对象数组
如 list: number[] 纯数字数组，listStr: string[] 纯字符串数组。
第二种方式是使用数组泛型，Array< elemType >，即：Array<元素类型>。
这里这个elemType元素类型也可以是基本类型、接口、类型别名,其中使用接口数组泛型组合的非常常用。
总结如下：
数组里的数据	类型写法 1	  类型写法 2
字符串	      string[]	    Array<string>
数值	        number[]	    Array<number>
布尔值	      boolean[]	    Array<boolean>
大整数	      bigint[]	    Array<bigint>
符号	        symbol[]	    Array<symbol>
不存在	      null[]	      Array<null>
未定义	      undefined[]	  Array<undefined>
接口          接口名[]      Array<接口名>  常用
any           any[]        Array<any>


元组类型（ Tuple ）表示一个已知数量和类型的数组 其实可以理解为是一种特殊的数组。
也就是说当你想一个数组内每一项放入不同数据时就使用元组类型。
比如，你可以定义一对值分别为 string和number类型的元组。
也就是元组的写法是写死了位置上对应的类型的。
let x: [string, number] = ["hello", 1];

联合类型（Union Types）:表示一个变量可以支持多种类型，或的意思用竖线（|）来分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean这三种类型中的一种但是不能是其他类型。
如：一个希望是number或 string类型的参数，let numAndstr :number | string = 10。

交叉类型:表示将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。and的意思用 （&）符号连接每个类型。
交叉类型和 interface 的 extends 非常类似，都是为了实现对象形状的组合和扩展。
interface Person {
    name: string
    age: number
}
type Student = Person & { grade: number }

类型断言（Type Assertion）可以用来手动指定一个值的类型。
语法: 值 as 类型,使用类型断言来告诉 TS，我（开发者）比你（编译器）更清楚这个参数是什么类型，你就别给我报错了。其实就是你需要手动告诉 ts 就按照你断言的那个类型通过编译。
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

声明文件：当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
  declare var 声明全局变量
  declare function 声明全局方法
  declare class 声明全局类
  declare enum 声明全局枚举类型
  declare namespace 声明（含有子属性的）全局对象
  interface 和 type 声明全局类型
  export 导出变量
  export namespace 导出（含有子属性的）对象
  export default ES6 默认导出
  export = commonjs 导出模块
  export as namespace UMD 库声明全局变量
  declare global 扩展全局变量
  declare module 扩展模块
  /// <reference /> 三斜线指令

通常我们会把声明语句放到一个单独的文件（xxx.d.ts）中，这就是声明文件。注意：声明文件必需以 .d.ts 为后缀。

# 三、接口
上面我们已经可以描述一个变量时对象类型了，但是对象里的每个字段(键)的类型约束还没有。
而 interface(接口) 就是 TS 设计出来用于定义对象键的类型的，它可以对对象的形状(Shape)进行描述。也就是对对象属性的类型进行声明约束。
接口名一般要求每个单词的首字母大写也就是大驼峰命名法,它的作用主要是定义给对象、数组、函数用的，用来校验它们的每个字段跟接口定义的字段类型是否一致，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型是否符合要求就可以。
接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在，可以使用 ? 表示可选。
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性。
如果一些属性的结构跟当前接口本身一致，也可以直接引用自己，常用来一些树结构上。
对变量赋值使用时属性必须和类型定义的时候完全一致，与位置无关，可选的可不定义，只读的不能修改，少写多写了属性都会报错。

接口声明语法如下:
interface 接口名 {
  字段名:类型约束,
  字段名?: 类型约束,          //可选字段
  readonly 字段名: 类型约束,  //只读字段
  children：接口名[]         //引用自己
}

描述数组
interface Myarr{
  // [下标: 下标类型]: 值类型
  [index:number]: number | string;
  
}

描述函数
interface Myfn {
  // (形参：形参类型,,,): 函数返回值类型
  (a: number,b: number): number
} 

描述对象
interface Myobj {
    name: string;
    age: number;
}

接口重复声明会合并重复的声明，相当于对象合并。
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

接口继承:和类class一样，接口也可以相互继承，也可以继承类型别名type声明的类型，也使用 extends 关键字。
继承多个接口名和类型别名声明的名字逗号隔开即可,本质上相当于从一个接口里复制其所有成员到另一个接口里，所以继承的属性也要写上不然报错。相当于对象合并不同属性叠加，相同保留后面的，同时还有自己当前定义的。
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
  gender: 'male'
}

如果在继承时不需要记录这么多属性，也可以在继承的过程中舍弃某些属性，通过 Omit 工具类型来实现。
Omit是ts原生提供的全局使用工具类，用来促进公共类型转换。
语法：
interface 接口名 extends Omit<要继承的接口, '要继承接口中的某个属性1' | '要继承接口中的某个属性2'>
要继承接口中的某个属性1，要继承接口中的某个属性2就不会被继承。

interface UserItem {
  name: string
  age: number
  enjoyFoods: string[]
  friendList?: UserItem[]
}

// 这里在继承 UserItem 类型的时候，删除了两个多余的属性
interface Admin extends Omit<UserItem, 'enjoyFoods' | 'friendList'> {
  permissionLevel: number
}

// 现在的 admin 如下
const admin: Admin = {
  name: 'Petter',
  age: 18,
  permissionLevel: 1,
}
# 四、函数 
JavaScript中函数常见的两种函数定义方式：函数声明、函数表达式。再ts里也是一样的。
一个函数有输入和输出，输入就是传进来的形参，输出就是函数的返回值。
所有在ts中给每个形参添加类型之后再为函数本身添加返回值类型，就能完成对函数的约束了。
而TypeScript可以根据返回语句自动推断出返回值类型，因此我们也通常省略它函数返回值的类型。
注意：如果函数没有明确返回值，默认返回 void 类型。
语法如下：
(x:number)里面写形参的类型，():这是函数返回值的类型。形参也是可以可选的这时要放在函数入参的最后面，不然会导致编译错误,也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时就使用默认值，如果带默认值的参数不是最后一个参数，用户必须明确的传入 undefined值来获得默认值。
注意，输入多余的（或者少于要求的）参数，是不被允许的
// 函数声明形式
function buildName(firstName: string, lastName?: string):string {

}
function buildName(firstName: string, lastName = "Smith"):string  {

}
// 函数表达式形式
let myAdd = function(x: number, y: number): number { return x + y; };
// 上面 myAdd的类型是通过赋值操作进行类型推论而推断出来的，其实是没有定义的。手动定义如下：
let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
注意：在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。当然这里可以先用接口或者类型别名定义好函数的形状。而对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
interface MyAdd {
  (x: number, y: number) : number
}
type MyAdd = (x: number, y: number) => number
let myAdd:MyAdd = function(x: number, y: number): number { return x + y; };

# 五、类型别名
类型别名（type aliase）:用来给一个类型起个新名字,它有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。也就是用于给各种类型定义别名，让 TS 写起来更简洁、清晰。
function hello(value: string | number) {}，我们可以给这个联合类型取一个名字标识，使用type关键字声明，有点像变量一样，这样这个联合类型就有了另一个等价的名字，使用这个别名即可。
相当于使用type 声明类型变量了，常用于联合类型方便使用时缩写。
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
字符串字面量类型：用来约束取值只能是某几个字符串中的一个。
type EventNames = 'click' | 'scroll' | 'mousemove';

# 六、枚举
枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
枚举使用关键字enum 来定义：
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射


# 七、类
## 7.1 类声明约束
类修饰符:TypeScript里通过 public、private、protected 三个类修饰符来增强了 JS 中的类，成员都默认为 public即公有的，可以不写。
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
//子类继承，如果有自己的属性要使用super关键字执行，使用 super 关键字会调用父类的构造函数和方法。
class Student extends Person {
  grade: number
  constructor(name: string,grade:number) {
      super(name) // 相当于调用父类的 constructor(name)
      this.grade = grade
  }
  study() {
      console.log(${this.name} needs study)
  }
}

const s1 = new Student('lin',600)
s1.study()

多态子类对父类的方法进行了重写，子类和父类调同一个方法时会不一样。

抽象类:使用abstract声明的只能被继承，但不能被实例化的类，抽象类是供其他类继承的基类。
特点:
  抽象类不允许被实例化,即new调用。
  抽象类中的抽象方法必须被子类实现
使用场景：我们一般用抽象类和抽象方法抽离出事物的共性 以后所有继承的子类必须按照规范去实现自己的具体逻辑 这样可以增加代码的可维护性和复用性

## 7.2 类实现接口
类实现(implements)接口：接口（Interfaces）除了可以用于对「对象的形状（Shape）」进行描述，还可以对类的一部分行为进行抽象。
这是因为一般来讲，一个类只能继承自另一个类，而有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现，一个类可以实现多个接口。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：
interface Alarm {
    alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}

# 八、泛型
## 8.1 泛型概述
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。可以理解为类型的形参，通过类型变量将类型参数化。类型变量它是一种特殊的变量，只用于表示类型而不是值。也就是将来使用具体的类型代替类型变量，一般可以用 T 代表 Type 来表示类型变量。
常见泛型变量代表还有如下几个
  K（Key）：表示对象中的键类型；
  V（Value）：表示对象中的值类型；
  E（Element）：表示元素类型。
语法:
<类型变量1,类型变量2,.....,>表示一个泛型,其中它可以包含多个类型变量，类型变量可以是ts中的基本类型也可以是元祖、接口、类型别名等等。
<T>，这样就定义了一个泛型。

当你的函数、接口或类将处理多种数据类型时或者当函数、接口或类在多个地方使用该数据类型时就应该使用泛型。
只是声明的时候添加起到一个占位符号的作用，实际类型是在使用时传入的。

## 8.2泛型处理函数
我们知道之前ts约束函数是如下声明的，而泛型处理函数是在函数名后面加上泛型定义 <泛型变量名>，这样函数形参、函数返回值就可以使用泛型变量约束。这时在函数调用时再具体声明泛型变量的类型即可。
定义一个 print 函数，这个函数的功能是把传入的参数打印出来，再返回这个参数，传入参数的类型是 string，函数返回类型为 string。
<!-- 函数声明形式 -->
// 普通约束
function print(arg:string):string {
    console.log(arg)
    return arg
}
// 泛型约束
function print<T>(arg:T):T {
    console.log(arg)
    return arg
}
// 使用时再指定类型变量T的具体类型
print<number>(20);
print<string>('hello');
// ts类型推断 自动推导出类型
print('hello')  // TS 类型推断，自动推导类型为 string

## 8.3 泛型接口和泛型类型别名
在使用函数表达式形式的时候是可以使用接口和类型别名对变量进行约束的。同样他们也可以使用泛型进行约束。
<!-- 普通约束 -->
interface MyAdd {
  (x: number, y: number) : number
}
type MyAdd = (x: number, y: number) => number
let myAdd:MyAdd = function(x: number, y: number): number { return x + y; };
<!-- 泛型约束 -->
interface MyAdd<T> {
  (x: T, y: T) : T
}
type MyAddG = <T>(x: T, y: T) => T
let myAdd:MyAddG = function(x: number, y: number): number { return x + y; };

在定义接口时也可以使用泛型
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
identity<number,string>(68, "Semlinker"));这里是显式指定泛型变量的实际类型
console.log(identity(68, "Semlinker"));这里就会触发类型推断，ts自动识别

泛型也可以继承接口或者类型别名


## 8.4 泛型类
在类中使用泛型也很简单，我们只需要在类名后面，使用 <T, ...> 的语法定义任意多个类型变量。
特别注意的是，泛型无法约束类的静态成员。
interface GenericInterface<U> {
  value: U
  getIdentity: () => U
}
//类实现接口implements
class IdentityClass<T> implements GenericInterface<T> {
  value: T
  constructor(value: T) {
    this.value = value
  }
  getIdentity(): T {
    return this.value
  }

}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>("Semlinker!");
console.log(myStringClass.getIdentity()); // Semlinker!
类型值是沿链向上传播，且与类型变量名无关。所以上面类型变量名U和T并不影响传值。

## 8.5 泛型约束
希望类型变量对应的类型上存在某些属性。这时，除非我们显式地将特定属性定义为类型变量，否则编译器不会知道它们的存在。这时可以让类型变量 extends 一个含有我们所需属性的接口。此外，我们还可以使用逗号 , 号来分隔多种约束类型，比如：<T extends Length, Type2, Type3>。
keyof操作符用于获取某种类型的所有键，其返回类型是联合类型。


# 九、工具类型
Partail部分属性

# 十、ts类型体操训练
环境搭建：创建一个type-challenges目录专门用来存放，安装@type-challenges/utils包用来检测自己写的是否正确。
实现写在template.ts里，测试case复制原仓库里的，还可以把readme文件拿过来说明当前类型训练的要求是什么。

映射类型：所谓映射类型：它是一种泛型类型，它使用PropertyKeys的联合（通常通过keyof创建）来遍历键以创建类型。
通过in 和 keyof 完成。
type OptionsFlags<T> = {
  属性名：属性值
  -readonly [P in keyof T]: T[P];
  -readonly [Property in keyof Type]: boolean;
  [P in keyof Type]-?: T[P];
  [P in keyof T as NewKeyType]: T[P]
};
上面的类型OptionsFlags将从类型Type中获取它的所有属性，并将其值更改为布尔值。也就是所OptionsFlags类型的属性名是Type里所有的属性名，但是值统一改成了布尔值类型。
对于只读和可选属性可以通过 - 符号来去除。
此外还可以通过 as 关键字 重命名key 的名字




