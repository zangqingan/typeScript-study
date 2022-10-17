export {}

interface Abc{
  name:string,
  age:number
}
// type Partial<T> = { [P in keyof T]?: T[P] | undefined; }
let obj:Partial<Abc>={
  name:"zhangsan",
  age:29
}