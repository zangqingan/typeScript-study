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

