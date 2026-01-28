const hourlyPay = Number(document.getElementById("hourlyPay").value);
const hoursPerShift = Number(document.getElementById("hoursPerShift").value);
const shiftsPerMonth = Number(document.getElementById("shiftsPerMonth").value);


const dailyPay = 
    hourlyPay * hoursPerShift;

const totalPay = 
    dailyPay * shiftsPerMonth;

 