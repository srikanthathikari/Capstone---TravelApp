
import date from 'date-and-time';

const userDate = document.getElementById('date');



function datePicker(event) {
    // event.preventDefault()
    let dateFromCalendar = new Date();
    let valueOfDate = date.format(dateFromCalendar, 'YYYY-MM-DD');

    let maxDate = valueOfDate.split('-', 3);
    maxDate = maxDate[2] 
    maxDate = Number(maxDate) + 16;
    maxDate.join
    console.log(maxDate)

   userDate.min = valueOfDate;
   userDate.max = "2021-07-31"

}



export { datePicker }