
type MyPick<T, K extends keyof T> = {
    // 遍历 K
    [P in K] : T[P]

}



