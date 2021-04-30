export class User {

    fullName: string;
    login: string;
    password: string;
    birthday: string;
}
export class Student extends User {
    homeworkskey: string | null;
    key?: string | null;
    group: number;
    constructor() { super(); };
}
export class Teacher extends User {

    key?: string | null;
    degree?: string;
    constructor() { super(); };
}

export class Homework {

    key?: string | null;
    stud_key?: string | null;
    group: number;

    name: string;
    description: string;
    wishes?: string;

    teacher: string;
    teacher_login?: string;
    subject?: string;

    startDate: string;
    deadlineDate: string;

    isAsked?: boolean = true;
    isDone?: boolean;
    isExpired?: boolean;
    status: string;


}


