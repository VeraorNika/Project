export class User {

    fullName: string;
    login: string;
    password: string;
    birthday: string;
}
export class Student extends User {

    key?: string | null;
    group: number;
    // homeworks?: Homework[];
    constructor() { super(); };
}
export class Teacher extends User {

    key?: string | null;
    // homeworks?: Homework[];
    degree?: string;
    constructor() { super(); };
}

export class Homework {
    
    key?: string | null;
    name: string;
    description: string;
    wishes?: string;

    teacher: string;
    teacher_login?:string;
    subject?: string;

    startDate: string;
    deadlineDate: string;

    group?: number;

    isAsked?: boolean = true;
    isDone?: boolean;
    isExpired?: boolean;
    status: String;
}


