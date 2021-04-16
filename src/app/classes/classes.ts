export interface User{
    fullName?:string;
    login?:string;
    password?:string;
    birthday?:Date;
}
export class Student{
    fullName:string;
    login:string;
    password:string;
    birthday?:Date;
    group:number;
    constructor(){};
}
export class Teacher{
    fullName:string;
    login:string;
    password:string;
    constructor(){};
    // birthday:Date;
    // degree?:string;
}

