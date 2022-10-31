export {}
// 定义一个将属性约束全部变成布尔值类型的类型别名
type OptionsFlags<T> = {
    [P in keyof T]: boolean;
};
type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<FeatureFlags>;
// 去掉只读
type RemoveReadonly<T> = {
    -readonly [P in keyof T]: T[P]
}
type UserMsg = {
    readonly name:string,
    readonly phone:string
}

type OtherUserMsg = RemoveReadonly<UserMsg>