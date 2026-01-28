// Get input values from the HTML form, and Calculate total monthly pay

document.getElementById("calculateBtn").addEventListener("click", () => {

    const hourlyPay = Number(document.getElementById("hourlyPay").value);
    const hoursPerShift = Number(document.getElementById("hoursPerShift").value);
    const shiftsPerMonth = Number(document.getElementById("shiftsPerMonth").value);


    const dailyPay = 
        hourlyPay * hoursPerShift;

    const totalPay = 
        dailyPay * shiftsPerMonth;

    document.getElementById("monthlyPay").textContent = `Monthly Pay: £${totalPay.toFixed(2)}`;

});