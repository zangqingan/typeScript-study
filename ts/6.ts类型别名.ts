export {}
interface Person {
  name: string
  age: number
}
type Student = Person & { grade: number }
// 类型别名
type flag = string | number;
function hello(value: flag) {}
 // 基本类型起别名
type Name = string    
// 联合类型起别名                        
type arrItem = number | string                  
const typearr: arrItem[] = [1,'2', 3]

type Teacher = Person & { major: string  } 
// 元组类型起别名
type StudentAndTeacherList = [Student, Teacher]  
const typelist:StudentAndTeacherList = [
  { name: 'lin', age:27,grade: 100 }, 
  { name: 'liu', age:40,major: 'Chinese' }
]

type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

// handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

