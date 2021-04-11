export class Homework{
    name:string;
    description:string;
    wishes:String;

    teacher:String; //Возможно, в БД будет teacher_id, пока не знаю
    subject:String;

    startDate:Date;
    deadlineDate:Date;
   
    group:number;
    
    isAsked:boolean=true;
    isDone:boolean;
    isExpired:boolean;
    status:String;
}