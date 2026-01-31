// Get input values from the HTML form, and Calculate total monthly pay

// Calculate total monthly pay when the button is clicked
document.getElementById("calculateBtn").addEventListener("click", () => {

    const hourlyPay = Number(document.getElementById("hourlyPay").value);
    const hoursPerShift = Number(document.getElementById("hoursPerShift").value);
    const shiftsPerMonth = Number(document.getElementById("shiftsPerMonth").value);

    // Calculate gross pay
    const dailyPay = 
        hourlyPay * hoursPerShift;

    const totalPay = 
        dailyPay * shiftsPerMonth;

    const taxCode = document.getElementById("taxCode").value;

    if (taxCode === "") {
        alert("Please select a tax code.");
        return;
    }

    let allowanceAnnual = 0;

    // Determine allowance based on tax codes
    if (taxCode === "1257L") {
        allowanceAnnual = 12570;     // Standard Personal Allowance of  £12,570
    }  else if (taxCode === "1263L") {
        allowanceAnnual = 12630;     // Personal Allowance of £12,630
    }  else if (taxCode === "BR") {
        allowanceAnnual = 0;        // Basic Rate has no allowance
    } else if (taxCode === "D0") {

    }

    const allowanceMonthly = allowanceAnnual / 12;
    const taxableIncome = totalPay - allowanceMonthly;

    let tax = 0;
    if (taxableIncome > 0) {
        tax = taxableIncome * 0.20; // 20% tax rate if over allowance
    } 

    // NI 
    let nationalinsurance = 0;
    const niLowerLimit = 1047.50; // Monthly Lower Earnings Limit
    const niUpperLimit = 4189.17; // Monthly Upper Earnings Limit
      
    if (totalPay > niLowerLimt) {
        if (totalPay <= niUpperLimit) {
            nationalinsurance = (totalPay - niLowerLimit) * 0.08; // 8% NI rate
        } else {
            nationalinsurance  = (niUpperLimit - niLowerLimit) * 0.08 + (totalPay - niUpperLimit) * 0.02; // 2% NI rate above upper limit 
        }
    }

    const netPay = totalPay - tax - nationalinsurance;
    
    

    // Display results
    document.getElementById("netPay").textContent = `Net Pay: £${netPay.toFixed(2)}`;
    document.getElementById("taxAmount").textContent = `Tax: £${tax.toFixed(2)}`;
    document.getElementById("grossPay").textContent = `Gross Pay: £${totalPay.toFixed(2)}`;

});
 

// Clear all input fields and output when the clear button is clicked
document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("hourlyPay").value = "";
    document.getElementById("hoursPerShift").value = "";
    document.getElementById("shiftsPerMonth").value = "";
    document.getElementById("grossPay").textContent = "Gross Pay: £0.00";
    document.getElementById("taxAmount").textContent = "Tax: £0.00";
    document.getElementById("netPay").textContent = "Net Pay: £0.00";
    document.getElementById("taxCode").value = "";
});