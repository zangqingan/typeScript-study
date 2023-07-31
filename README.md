# typeScript-study

typeScript 学习记录

# 一、概述

> TypeScript is JavaScript with syntax for types,TypeScript 就是带上类型语法的 JavaScript。

它是 JavaScript 的超集,简称 TS。
它是静态类型的,所谓静态类型是指 TS 的类型检查是在编译阶段,也就是 TS 代码在编译为 JS 代码的时候才做类型检查。
主要是学习 TypeScript 的类型系统,TypeScript 文件是以 .ts 为扩展名的文件。

安装 typescript 编译器-tsc :npm install -g typescript 或者指定版本 npm install -g typescript@4.5.2,安装完成之后,我们就可以在任何地方执行 tsc 指令进行类型检查了。

检查是否安装成功:tsc -v 可以查看安装版本信息。

初始化为 TS 项目:tsc -init,创建 tsconfig.json 文件。这个配置文件中指定了用来编译这个项目的根文件和其它编译选项。

编译 TS 文件成 JS 文件: tsc helloworld.ts
tsc 就是 TypeScript 的编译器。

# 二、TS 类型系统

ts 类型可以给一个变量、函数返回值、函数形参、类等设置类型约束。

## 2.1 类型概述

在 JavaScript 中,JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt。
它们的类型约束在 TS 中都一一对应。

在 TypeScript 中,我们使用冒号后跟类型名来指定一个变量的类型。即 变量名:指定变量的类型,冒号的前后有没有空格都可以。
这时候 TS 的编译器-tsc 就会在编译时预测代码的行为提前找出一些潜在的 bug,然后利用类型系统提供的信息在事态发展不对劲的时候告知我们,常见的形式就是抛出错误,而这便是 TS 类型系统的作用。

具体使用方法:在变量后面添加 :TS 类型名即可,这种是 TS 的类型注解语法,它显性的声明变量的类型约束。
有了类型注解之后，TypeScript 就能告诉我们，哪些情况下对于变量的使用可能是不正确的。
let 变量名:ts 类型名 = 变量值;
如:let str:string = "我是字符串类型";
这样就表示变量 str 是字符串类型,如果赋值其它类型就会报错,这样就可以帮助我们提前发现代码中的错误。

同时需要注意的是 TypeScript 的类型系统在很多情况下即使省略了类型注解也能自动推断出类型，这是 ts 的一个特性类型推论。

- 常见变量类型声明格式如下：

| 变量名   | JavaScript  |                                  TypeScript |
| :------- | :---------: | ------------------------------------------: |
| 字符串   | 'str'/"str" |                                  str:string |
| 数值     |      5      |                                  num:number |
| 布尔值   | true/false  |                                bool:boolean |
| 大整数   |   BigInt    |                                  big:bigint |
| 符号     |   Symbol    |                                  sym:symbol |
| 不存在   |    Null     |                                      n:null |
| 未定义   |  Undefined  |                                un:undefined |
| 联合类型 |  'str'\| 3  |                  strOrNum: string \| number |
| 对象     |     {}      | obj:Object /obj:object /obj:{} 只是一个对象 |
| 对象     |     {}      |         obj:接口名-对对象属性的类型进行约束 |
| 对象     |     {}      |       obj:类型别名-对对象属性的类型进行约束 |
| 数组     |     []      |                   基本类型名:[] / 接口名:[] |
| 数组     |     []      |           Array<基本类型名> / Array<接口名> |

## 2.2 TS 基本类型

对应基本类型,TypeScript 支持与 JavaScript 相同的基本数据类型,只不过名称转为全小写即可,此外还提供了其它的基础类型。

- TS 和 JS 一样的原始类型如下：七种

| 原始数据类型 | JavaScript | TypeScript |
| :----------- | :--------: | ---------: |
| 字符串       |   String   |     string |
| 数值         |   Number   |     number |
| 布尔值       |  Boolean   |    boolean |
| 大整数       |   BigInt   |     bigint |
| 符号         |   Symbol   |     symbol |
| 不存在       |    Null    |       null |
| 未定义       | Undefined  |  undefined |

默认情况下 null 和 undefined 是所有类型的子类型,也就是说 null 和 undefined 值可以赋值给其它类型。用来做清空重置操作时赋值。
// 即：这样不会报错
let num: number = undefined;

let 声明的变量值是什么类型变量就是什么类型,const 声明的变量值就是变量的类型。
原始数据类型是可以不显式声明类型的,因为 TS 会进行类型推论,根据声明变量时赋值的类型,自动推导出变量类型。

- TS 自己添加的基本类型如下：四种

| 数据类型     | TypeScript |
| ------------ | ---------- |
| 任意值       | any        |
| 未知类型     | unknown    |
| 空值         | void       |
| 完全无返回值 | never      |

1. any:

any 类型,也就是任意类型不清楚用什么类型,就可以使用 any 类型。它会绕过类型校验,不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。实际开发中不建议使用不然就丧失了 TS 的意义。
同时对 any 类型值得任何操作,其返回值还是 any 类型。
变量声明时,如果没有初始化且没有指定其类型,那么会被识别为 any 类型。

2. unknown:

unknown 未知类型也代表任何值,它的定义和 any 定义很像。但是它是一个安全类型,因为使用 unknown 做任何事情都是不合法的。这是因为它不会绕过 TS 的类型校验,同时它声明的变量值只能赋值给 any 类型和它本身,赋值给其他类型的变量时就会报错,如果要使用应该使用断言 as 指定为具体类型。可以理解为它是 any 类型对应的安全类型,如果可以,应该尽量使用"unknown"类型,不然 any 用多了就成了"anyscript"。

3. void:

JS 是没有空值(void)的概念的,TS 里空值(void) 与 any 类型相反表示没有任何类型为空,当一个函数没有返回值时 TS 就会认为它的返回值是 void 类型。
声明一个 void 类型的变量没有什么用,因为你只能将它赋值为 undefined 和 null,如下
let unusable: void = undefined;

4. never:

never 类型是完全没有返回值的类型,它是所有类型的子类型,只有一种情况会如此：代码阻断。
有些情况下值会永不存在,比如,
如果一个函数执行时抛出了异常,那么这个函数永远不存在返回值,因为抛出异常会直接中断程序运行。
函数中执行无限循环的代码,使得程序永远无法运行到函数返回值那一步。
如果一个函数的返回值类型是 never 意味着此函数必须不能被顺利完整执行,而发生中断行为。

5. 类型推论:

如果没有明确的指定类型,那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个变量的类型。这就是所谓的类型推论。

**注意：** 类型推论的前提是变量在声明时初始化了即有明确的值,如果一开始没有赋值,那么会被默认为 any 类型。

## 2.3 TS 非基本类型

可以说除了上面说的基本类型,剩下的都是非基本类型。和基本类型一样,JS 里的非基本类型 TS 也都有对应的类型一一对应,也添加了另外的非基本类型。

1. 对象的类型:

我们知道在 JavaScript 中对象是一个键值对的集合,它表示非原始类型,也就是除 number,string,boolean,symbol,null 或 undefined 之外的类型。

在 TS 中也可以使用三种形式:object、Object、{},来定义一个变量是对象类型,一般使用小写的 object。

但是这种类型只能指定变量是一个对象而不能指定对象里键的具体类型所以一般也不怎么用,在 TS 中提供了类型别名 type 和 接口 interface 来对对象键的类型进行类型约束。

- TS 声明对象类型如下：

| 非原始类型 | JavaScript |       TypeScript |
| :--------- | :--------: | ---------------: |
| 对象       | Object/{}  | Object/object/{} |
| 对象       | Object/{}  |         类型别名 |
| 对象       | Object/{}  |             接口 |

2. 数组的类型:

在 TS 里有多种方式可以定义数组,比较灵活。

第一种方式：可以在基本类型名称后面接上方括号[],表示由此种基本类型元素组成的一个数组,这时数组中的项不允许是其它类型的。

**注意：** 这个类型它可以是接口,这样就变成了一个对象数组。

如：

- list: number[] 纯数字数组,
- lisTStr: string[] 纯字符串数组。
- lisTItf: Itf[] 接口对象数组。

第二种方式：使用数组泛型(Array Generic),Array< elemType >,即：Array<元素类型>表示数组。

**注意：** 这个 elemType 元素类型可以是基本类型、接口、类型别名,其中使用接口数组泛型组合的非常常用。

- TS 声明数组类型方法如下：

| 数组里的数据 | 类型写法 1  |         类型写法 2 |
| :----------- | :---------: | -----------------: |
| 字符串       |  string[]   |      Array<string> |
| 数值         |  number[]   |      Array<number> |
| 布尔值       |  boolean[]  |     Array<boolean> |
| 大整数       |  bigint[]   |      Array<bigint> |
| 符号         |  symbol[]   |      Array<symbol> |
| 不存在       |   null[]    |        Array<null> |
| 未定义       | undefined[] |   Array<undefined> |
| 接口         |  接口名[]   | Array<接口名> 常用 |
| any          |    any[]    |    Array<any> 常用 |

3. 函数的类型:

具体见函数章节。

4. 元组类型:

元组类型（ Tuple ）表示一个已知长度和类型的数组 其实可以理解为是一种特殊的数组。
区别在于：数组合并了相同类型的对象,而元组（Tuple）合并了不同类型的对象。

也就是说当你想一个数组内每一项放入不同数据时就使用元组类型。
比如,你可以定义一对值分别为 string 和 number 类型的元组。

也就是元组的写法是写死了位置上对应的类型的。
let x: [string, number] = ["hello", 1];

5. 联合类型:

联合类型（Union Types）:表示一个变量可以支持多种类型,或的意思。

用竖线（|）来分隔每个类型,所以 number | string | boolean 表示一个值可以是 number, string,或 boolean 这三种类型中的一种但不能是其他类型。

如：一个希望是 number 或 string 类型的参数,let numOrstr :number | string = 10。

6. 交叉类型:

交叉类型:表示将多个类型合并为一个类型, and 的意思用 （&）符号连接每个类型。

这让我们可以把现有的多种类型叠加到一起成为一种类型,它包含了所需的所有类型的特性。

交叉类型和 interface 的 extends 非常类似,都是为了实现对象形状的组合和扩展。
interface Person {
name: string
age: number
}
type Student = Person & { grade: number }

7. 枚举类型:

枚举（Enum）类型用于取值被限定在一定范围内的场景,比如一周只能有七天,颜色限定为红绿蓝等。

枚举使用关键字 enum 来定义：
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

枚举成员会被赋值为从 0 开始递增的数字,同时也会对枚举值到枚举名进行反向映射。console.log(Days["Sun"] === 0); // true

8. 类型断言:

类型断言（Type Assertion）可以用来手动指定一个值的类型。

语法: 值 as 类型

使用类型断言就是来告诉 TS,我（开发者）比你（编译器）更清楚这个参数是什么类型,你就别给我报错了。

其实就是你需要手动告诉 TS 就按照你断言的那个类型通过编译。

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

**注意：** 不要滥用类型断言,只在能够确保代码正确的情况下去使用它。

9. 类型别名:

具体见类型别名一章

10. 接口:

具体见接口一章

11. 泛型:

具体见泛型一章

12. 类:

具体见类一章

13. 常用内置工具类型:

具体见内置工具类型一章

# 三、接口

## 3.1 接口概述

上面我们已经可以描述一个变量是对象类型了,但是对象里的每个字段(键)的类型约束还没有。

> interface(接口) 就是 TS 设计出来用于定义对象键的类型的,它可以对对象的形状(Shape)进行描述。也就是对对象属性的类型进行声明约束。

接口名一般要求每个单词的首字母大写也就是大驼峰命名法,它的作用主要是定义给对象、数组、函数用的,用来校验它们的每个字段跟接口定义的字段类型是否一致,类型检查器不会去检查属性的顺序,只要相应的属性存在并且类型是否符合要求就可以。

接口里的属性不全都是必需的。有些是只在某些条件下存在,或者根本不存在,可以使用 ? 表示可选。

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性。

如果一些属性的结构跟当前接口本身一致,也可以直接引用自己,常用来一些树结构上。

对变量赋值使用时属性必须和类型定义的时候完全一致,与位置无关,可选的可不定义,只读的不能修改,少写多写了属性都会报错。

接口声明语法如下:
interface 接口名 {
字段名:类型约束,
字段名?: 类型约束, //可选字段
readonly 字段名: 类型约束, //只读字段
children：接口名[] //引用自己
}

数组也是对象,所以接口也可以用来描述数组。
描述数组
interface Myarr{
// [下标: 下标类型]: 值类型
[index:number]: number | string;

}

函数也是对象,所以接口也可以用来描述函数。
描述函数
interface Myfn {
// (形参：形参类型): 函数返回值类型
(a: number,b: number): number
}

接口重复声明会合并重复的声明,相当于对象合并。
interface Person {
name: string
}
interface Person { // 重复声明 interface,就合并了
age: number
}
const person: Person = {
name: 'lin',
age: 18
}

## 3.2 接口继承

接口继承:和类(class)一样,接口可以相互继承,也可以继承类型别名,使用 extends 关键字。

继承多个接口名和类型别名声明的名字时,逗号隔开即可,本质上相当于从一个接口里复制其所有成员到另一个接口里,所以继承的属性也要写上不然报错。相当于对象合并不同属性叠加,相同保留后面的,同时还有自己当前定义的。

```
// 接口
interface Person {
  name: string
}
// 类型别名
type Person1 = {
  gender: string
}
// interface 继承 interface 和 type
interface Student extends Person,Person1{
  grade: number
}

const person:Student = {
  name: 'lin',
  grade: 100,
  gender: 'male'
}
```

如果在继承时不需要记录这么多属性,也可以在继承的过程中舍弃某些属性,通过 Omit 工具类型来实现。

Omit 是 TS 原生提供的全局使用工具类,用来促进公共类型转换。
语法：
interface 接口名 extends Omit<要继承的接口, '要继承接口中的某个属性 1' | '要继承接口中的某个属性 2'>
要继承接口中的某个属性 1,要继承接口中的某个属性 2 就不会被继承。

```
interface UserItem {
  name: string
  age: number
  enjoyFoods: string[]
  friendList?: UserItem[]
}

// 这里在继承 UserItem 类型的时候,删除了两个多余的属性
interface Admin extends Omit<UserItem, 'enjoyFoods' | 'friendList'> {
  permissionLevel: number
}

// 现在的 admin 如下
const admin: Admin = {
  name: 'Petter',
  age: 18,
  permissionLevel: 1,
}
```

# 四、函数

> 函数是 JavaScript 中的一等公民

JavaScript 中函数常见的两种函数定义方式：函数声明（Function Declaration）和函数表达式（Function Expression）：在 TS 里也是一样的。

```
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};

```

一个函数有输入和输出,输入就是传进来的形参,输出就是函数的返回值。
所以要在 TypeScript 中对函数进行约束,需要把输入和输出都考虑到,其中函数声明的类型定义较简单：

函数的入参是把类型写在形参后面,函数返回值是写在圆括号后面。

具体语法如下：
function (形参:形参类型): 函数返回值类型 {}
function (x:number):void {}

```
// ts对函数声明形式进行类型约束
function sum(x: number, y?: number): number {
    return x + y;
}
```

形参也是可以可选的这时要放在函数入参的最后面,不然会导致编译错误。也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是 undefined 时就使用默认值,如果带默认值的参数不是最后一个参数,用户必须明确的传入 undefined 值来获得默认值。

**注意：** 如果函数没有明确返回值,默认返回 void 类型。

**注意：** 输入多余的（或者少于要求的）参数,是不被允许的

如果要我们现在写一个对函数表达式（Function Expression）的定义,可能会写成这样：

let myAdd = function(x: number, y: number): number { return x + y; };

上面 myAdd 变量的类型是 TS 通过赋值操作进行类型推论而推断出来的,其实是没有定义的。

```
手动定义如下：
let myAdd: (x: number,firstName: string = 'Tom', y: number) => number = function (x: number, y: number): number {
    return x + y;
};

等于号左边是TS函数类型约束定义:let myAdd: (x: number, y: number) => number

等于号右边是实际的函数声明。

```

**注意：** 在 TypeScript 的类型定义中,函数类型约束是以 () => void 这样的形式来写的。
=> 用来表示函数的定义,左边圆括号是函数的形参类型,需要用括号括起来,右边是输出类型,也就是函数的返回值类型。由于 TypeScript 会推导函数类型,所以很少会显式的去写出来。

当然这里也可以先用接口或者类型别名定义好函数的形状。而对等号左侧进行类型限制,可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

```
// 接口或者类型别名定义好函数的形状
interface MyAdd {
  (x: number, y: number) : number
}

type MyAdd = (x: number, y: number) => number

let myAdd:MyAdd = function(x: number, y: number): number { return x + y; };

```

# 五、类型别名

> 类型别名（type aliase）:用来给一个类型起个新名字。

它有时和接口很像,但是可以作用于原始值,联合类型,元组以及其它任何你需要手写的类型。也就是用于给各种类型定义别名,让 TS 写起来更简洁、清晰。

类型别名使用 type 关键字声明,有点像变量一样,使用这个别名就相当于使用原类型。
相当于使用 type 声明类型变量了,常用于联合类型方便使用时缩写。

```
// 给这个联合类型取一个类型别名标识,
function hello(value: string | number) {},
type flag = string | number;
function hello(value: flag) {}

// 联合类型
type arrItem = number | string
const arr: arrItem[] = [1,'2', 3]

// 基本类型
type Name = string

// 交叉类型
type Person = {
  name: Name
}
type Student = Person & { grade: number  }
type Teacher = Person & { major: string  }

// 元组类型
type StudentAndTeacherList = [Student, Teacher]
const list:StudentAndTeacherList = [
  { name: 'lin', grade: 100 },
  { name: 'liu', major: 'Chinese' }
]

```

# 六、类

## 6.1 类概述

传统方法中,JavaScript 通过构造函数实现类的概念,通过原型链实现继承。而在 ES6 中,我们终于迎来了 class。通过使用 class 关键字声明,它也可以作为一个类型赋值给一个变量,这时变量的类型就是这个类。
而 TypeScript 除了实现了所有 ES6 中的类的功能以外,还添加了一些新的用法。
这里对类相关的概念做一个简单的介绍。

- 类（Class）：定义了一类事物的抽象特点,包含它的属性和方法。

- 对象（Object）：类的实例,通过 new 生成。

- 面向对象（OOP）的三大特性：封装、继承、多态

- 封装（Encapsulation）：将对数据的操作细节隐藏起来,只暴露对外的接口。外界只调用而不需要（也不 能）知道细节,就能通过对外提供的接口来访问该对象,同时也保证了外界无法任意更改对象内部的数据。

- 继承（Inheritance）：子类继承父类,子类除了拥有父类的所有特性外,还有一些更具体的特性。

- 多态（Polymorphism）：由继承而产生了相关的不同的类,对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal,但是分别实现了自己的 eat 方法。此时针对某一个实例,我们无需了解它是 Cat 还是 Dog,就可以直接调用 eat 方法,程序会自动判断出来应该如何执行 eat。

- 存取器（getter & setter）：用以改变属性的读取和赋值行为。

- 修饰符（Modifiers）：修饰符是一些关键字,用于限定类成员或类型的性质。比如 public 表示公有属性或方法。

- 抽象类（Abstract Class）：抽象类是供其他类继承的基类,抽象类不允许被实例化(不能 new)。抽象类中的抽象方法必须在子类中被实现。

- 接口（Interfaces）：不同类之间公有的属性或方法,可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类,但是可以实现多个接口。

下面回顾一下 ES6 中类的用法：

使用 class 关键字定义类,使用 constructor()方法 定义构造函数。通过 new 生成新实例的时候,会自动调用构造函数。

- 在 JavaScript 中定义一个类。

```
class User {
  <!-- 私有属性,方法是在属性名之前使用#表示。只能在类的内部使用 -->
  #count = 0;
  constructor(userName: string) {
    <!-- this关键字则代表new出来的实例对象 -->
    this.name = userName
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
  getName() {
    console.log(this.name)
  }
  <!-- 静态方法-只能类本身调用,可以被子类继承 -->
  static classMethod() {
    return 'hello';
  }
}
// 通过 new 生成新实例
const petter= new User('Petter')

petter.getName()
// Petter

petter.prop = 123;
// setter: 123

petter.prop
// 'getter'

User.classMethod()
// 'hello'

```

## 6.2 ts 类声明约束

TS 类定义声明增强了 JS 中的类,使用三种访问修饰符（Access Modifiers）,分别是 public、private 和 protected 来标识一个类的属性和方式是什么性质的。

- public 修饰的属性或方法是公有的,可以在任何地方被访问到,默认所有的属性和方法都是 public 的,关键字 public 可以不写。

- private 修饰的属性或方法是私有的,不能在声明它的类的外部访问。即只属于这个类自己,它的实例和继承它的子类都访问不到。

- protected 修饰的属性或方法是受保护的,它和 private 类似,区别是它在子类中也是允许被访问的,实例不能访问。

- static 修饰的静态属性和方法是直接定义在类本身上面的,所以也只能通过直接调用类的方法和属性来访问,实例不能访问,访问会报错。

- readonly 关键字将属性设置为只读的,只读属性必须在声明时或构造函数里被初始化。

本质上和 js 声明定义使用类是没有区别的,不过 ts 更加完善并加上了类型约束。而给类加上 TypeScript 的类型很简单与接口类似。

- ts 定义一个类

```
class User {
  // constructor 上的数据需要先这样定好类型
  public name: string

  // 入参也要定义类型
  constructor(userName: string) {
    this.name = userName
  }

  getName():void {
    console.log(this.name)
  }
}
// 通过 new 这个类得到的变量,它的类型就是这个类
const petter: User = new User('Petter')
petter.getName() // Petter
```

## 6.3 类继承

类可以通过 extends 关键字实现继承,让子类继承父类的属性和方法。
extends 的写法比 ES5 的原型链继承,要清晰和方便很多。

```
// 父类
class Animal {
  move() {
    console.log("Moving along!");
  }
}
// 子类继承父类,拥有父类的属性和方法。
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
```

## 6.4 接口继承类

类与类之间可以继承,类也可以给接口继承 只会继承它的实例属性和实例方法。都是通过 extends 关键字实现。这是因为在声明 class Point 时,除了会创建一个名为 Point 的类之外,同时也创建了一个名为 Point 的类型（实例的类型）。

**注意：** 如果类上面本身有方法存在,接口在继承的时候也要相应的实现。当然可以通过 Omit 工具类型去除。

```
// 这是一个类
class UserBase {
  name: string
  constructor(userName: string) {
    this.name = userName
  }
  // 这是一个方法
  getName() {
    console.log(this.name)
  }
}

// 这是一个接口,可以继承自类
interface User extends UserBase {
  age: number
}

// 这样这个变量就必须同时存在两个属性
const petter: User = {
  name: 'Petter',
  age: 18,
}
```

## 6.5 类实现接口

类实现(implemenTS)接口：接口（Interfaces）除了可以用于对「对象的形状（Shape）」进行描述,还可以对类的一部分行为进行抽象。

这是因为一般来讲,一个类只能继承自另一个类,而有时候不同类之间可以有一些共有的特性,这时候就可以把特性提取成接口（interfaces）,用 implemenTS 关键字来实现,一个类可以实现多个接口。这个特性大大提高了面向对象的灵活性。

举例来说,门是一个类,防盗门是门的子类。如果防盗门有一个报警器的功能,我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类,车,也有报警器的功能,就可以考虑把报警器提取出来,作为一个接口,防盗门和车都去实现它：

```
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
```

# 七、泛型

## 7.1 泛型概述

> 泛型（Generics）是指在定义函数、接口或类的时候,不预先指定具体的类型,而在使用的时候再指定类型的一种特性。

可以理解为类型的形参,通过类型变量将类型参数化。类型变量它是一种特殊的变量,只用于表示类型而不是具体的类型值。也就是将来使用具体的类型代替类型变量,一般可以用 T 代表 Type 来表示类型变量。

- 常见泛型变量代表还有如下几个：

| 写法           | 含义                 |
| :------------- | :------------------- |
| K（Key）：     | 表示对象中的键类型； |
| V（Value）：   | 表示对象中的值类型； |
| E（Element）： | 表示元素类型。       |

语法:
<类型变量 1,类型变量 2,.....,>表示一个泛型,其中它可以包含多个类型变量,类型变量可以是 TS 中的基本类型也可以是元祖、接口、类型别名等等。
<T>,这样就定义了一个泛型。

当你的函数、接口或类将处理多种数据类型时或者在多个地方使用该数据类型时就应该使用泛型。
只是声明的时候添加起到一个占位符号的作用,实际类型是在使用时传入的。

## 7.2 泛型处理函数

我们知道之前 TS 约束函数是如下声明的,而泛型处理函数是在函数名后面加上泛型定义 <泛型变量名>,这样函数形参、函数返回值就可以使用泛型变量约束。这时在函数调用时再具体声明泛型变量的类型即可。

- 定义一个 print 函数,这个函数的功能是把传入的参数打印出来,再返回这个参数,传入参数的类型是 string,函数返回类型为 string。

```
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
// TS类型推断 自动推导出类型
print('hello')  // TS 类型推断,自动推导类型为 string

## 7.3 泛型接口和泛型类型别名

在使用函数表达式形式的时候是可以使用接口和类型别名对变量进行约束的。同样他们也可以使用泛型进行约束。

- 泛型接口

```

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

```

- 在定义接口时也可以使用泛型

```

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
console.log(identity(68, "Semlinker"));这里就会触发类型推断,TS 自动识别

泛型也可以继承接口或者类型别名

```


## 7.4 泛型类
## 7.4 泛型类
在类中使用泛型也很简单，我们只需要在类名后面，使用 <T, ...> 的语法定义任意多个类型变量。
特别注意的是，泛型无法约束类的静态成员。
```

interface GenericInterface<U> {
value: U
getIdentity: () => U
}
//类实现接口 implemenTS
class IdentityClass<T> implemenTS GenericInterface<T> {
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

```

类型值是沿链向上传播,且与类型变量名无关。所以上面类型变量名 U 和 T 并不影响传值。

## 7.5 泛型约束

希望类型变量对应的类型上存在某些属性。这时,除非我们显式地将特定属性定义为类型变量,否则编译器不会知道它们的存在。这时可以让类型变量 extends 一个含有我们所需属性的接口。此外,我们还可以使用逗号 , 号来分隔多种约束类型,比如：<T extends Length, Type2, Type3>。

# 八、常用内置工具类型

Partail 部分属性

# 九、其它

## 9.1 声明文件

当使用第三方库时,我们需要引用它的声明文件,这样才能获得对应的代码补全、接口提示等功能。

## 8.1 属性修饰工具类型
## 8.2 结构工具类型
Pick工具类：通过从传入的type中选择一组属性key(字符串字面量或字符串字面量的联合)来重新构造一个类型。

| 声明语句            |             含义             |
| :------------------ | :--------------------------: |
| declare var         |         声明全局变量         |
| declare function    |         声明全局方法         |
| declare class       |          声明全局类          |
| declare enum        |       声明全局枚举类型       |
| declare namespace   | 声明（含有子属性的）全局对象 |
| interface 和 type   |         声明全局类型         |
| export              |           导出变量           |
| export namespace    |   导出（含有子属性的）对象   |
| export default ES6  |           默认导出           |
| export = commonJS   |           导出模块           |
| export as namespace |      UMD 库声明全局变量      |
| declare global      |         扩展全局变量         |
| declare module      |           扩展模块           |
| /// <reference />   |          三斜线指令          |

通常我们会把声明语句都放到一个单独的文件（xxx.d.ts）中,这就是声明文件。

**注意：** 声明文件必需以 xxx.d.ts 为后缀。

# 十、TS 类型体操训练

环境搭建：创建一个 type-challenges 目录专门用来存放,安装@type-challenges/utils 包用来检测自己写的是否正确。
实现写在 template.TS 里,测试 case 复制原仓库里的,还可以把 readme 文件拿过来说明当前类型训练的要求是什么。

映射类型：所谓映射类型：它是一种泛型类型,它使用 PropertyKeys 的联合（通常通过 keyof 创建）来遍历键以创建类型。
通过 in 和 keyof 完成。
type OptionsFlags<T> = {
属性名：属性值
-readonly [P in keyof T]: T[P];
-readonly [Property in keyof Type]: boolean;
[P in keyof Type]-?: T[P];
[P in keyof T as NewKeyType]: T[P]
};

上面的类型 OptionsFlags 将从类型 Type 中获取它的所有属性,并将其值更改为布尔值。也就是所 OptionsFlags 类型的属性名是 Type 里所有的属性名,但是值统一改成了布尔值类型。

对于只读和可选属性可以通过 - 符号来去除。
此外还可以通过 as 关键字 重命名 key 的名字
```
