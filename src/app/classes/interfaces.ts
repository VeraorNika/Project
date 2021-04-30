import { Homework } from './classes';

export interface HomeworksOfStudents {
    group: number;
    fullName: string;
    student_key?: string;
    homeworks?: Homework[];

}