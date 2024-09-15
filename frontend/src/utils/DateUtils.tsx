const MONTHS: string[] = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const getMonths = ():JSX.Element[] => {
    return MONTHS.map((month, index) => {
        if(index===0)
            return <option key={index} value={index} disabled>{month}</option>
        else
            return <option key={index} value={index}>{month}</option>
    });
}

export const getDays = ():JSX.Element[] => {
    let days:JSX.Element[] = [];
    for(let i=0;i<=31;i++){
        if(i===0)
            days.push(<option key={i} value={i} disabled>{i}</option>);
        else
            days.push(<option key={i} value={i}>{i}</option>);
    }
    return days;
}

export const getYears = ():JSX.Element[] => {
    let years:JSX.Element[] = [];
    for(let i=2024;i>=1900;i--){
       if(i===2024)
            years.push(<option key={i} value={i} disabled>{i}</option>);
        else
            years.push(<option key={i} value={i}>{i}</option>);
    }
    return years;
}