export class User {
    fullName: string;
    login: string;
    password: string;
    birthday:Date;
    constructor(){  
    }
  

}
export class Student extends User{
    group: number;
    constructor(){
        super();
    }
   
    
}
export class Teacher extends User{
    constructor(){
        super(); 
    }
   
}