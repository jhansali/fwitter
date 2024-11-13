import { Dob } from "../utils/GlobalInterfaces";

export const validateName = (value:string):boolean => {
    return value.length > 0;
}

export const validDob = (dob:Dob):boolean => {
    let { day, month, year } = dob;
    let leapYears:number[]=[];
    for(let i=2022;i<1902;i-=4){
        leapYears.push(i);
    }

    if(day===0 || month===0 || year===0){
        return false;
    }else if(month===2 && day>29){
        return false;
    }else if(month===2 && day===29 && !leapYears.includes(year)){
        return false;
    }else if([4,6,9,11].includes(month) && day>30){
        return false;
    }
    return checkAge(dob);
}

const checkAge = (dob:Dob):boolean => {
    let{ month,day,year } = dob;
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDay = today.getDate();

    if(currentYear-year>13){
        return true;
    }else if(currentYear-year===13){
        if(currentMonth>month){
            return true;
        }else if(currentMonth===month){
            if(currentDay>=day){
                return true;
            }else{
                return false;
            }
        }
    }
    return false;
}

export const validateEmail = (value: string): boolean => {
    return !!value.toLowerCase().match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    );
  };