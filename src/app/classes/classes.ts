export class Homework {
    key?: string | null;
    name: string;
    description: string;
    wishes?: String;

    teacher: String;
    subject?: String;

    startDate?: Date;
    deadlineDate?: Date;

    group?: number;

    isAsked?: boolean = true;
    isDone: boolean;
    isExpired: boolean;
    status?: String;
}

export class Student {
    fullName: string;
    login: string;
    password: string;
    birthday?: Date;
    group: number;
    homeworks?: Homework[];
    constructor() { };
}
export class Teacher {
    fullName: string;
    login: string;
    password: string;
    constructor() { };
    // birthday:Date;
    // degree?:string;
}

