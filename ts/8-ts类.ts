export {}
// 类定义
class Parent {
  public name: string;
  protected age: number;
  private car: number;
  constructor(name: string, age: number, car: number) {
    //构造函数
    this.name = name;
    this.age = age;
    this.car = car;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
  static mainName = "Parent";
  static getmainName() {
    console.log(this); //注意静态方法里面的this指向的是类本身 而不是类的实例对象 所以静态方法里面只能访问类的静态属性和方法
    return this.mainName;
  }
}
class Child extends Parent {
  constructor(name: string, age: number, car: number) {
    super(name, age, car);
  }
  desc() {
    console.log(`${this.name}`); 
    console.log(`${this.age} `); 
    // console.log(`${this.car}`); //car访问不到 会报错
  }
}

let child = new Child("hello", 10, 1000);
console.log(child.name);
console.log(Parent.mainName);
console.log(Parent.getmainName());
// console.log(child.age); //age访问不到 会报错、
// console.log(child.car); //car访问不到 会报错

// 抽象类
abstract class Animal {
  name!: string;
  abstract speak(): void;
}
// 必须实现
class Cat extends Animal {
  speak() {
    console.log("喵喵喵");
  }
}
// let animal = new Animal(); //直接报错 无法创建抽象类的实例
let cat = new Cat();
cat.speak();

//类实现接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
  speak(): void;
}
interface Eatable {
  eat(): void;
}
//一个类可以实现多个接口
class Person implements Speakable, Eatable {
  speak() {
    console.log("Person说话");
  }
  eat() {} //需要实现的接口包含eat方法 不实现会报错
}

// 报警器-类实现接口例子
interface Alarm {
  alert(): void;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}
// Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯。
class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
      console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
