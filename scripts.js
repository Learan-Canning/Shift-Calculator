// Get input values from the HTML form, and Calculate total monthly pay

// Calculate total monthly pay when the button is clicked
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

// Clear all input fields and output when the clear button is clicked
document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("hourlyPay").value = "";
    document.getElementById("hoursPerShift").value = "";
    document.getElementById("shiftsPerMonth").value = "";
    document.getElementById("monthlyPay").textContent = "Monthly Pay: £0.00";
});