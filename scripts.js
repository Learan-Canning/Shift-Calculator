/* ====================================================================== */
/* CALCULATOR LOGIC - CALCULATE BUTTON EVENT LISTENER */
/* ====================================================================== */

/**
 * Calculates monthly gross pay, tax withholding, and National Insurance
 * Takes user input (hourly pay, hours/shifts, tax code) and outputs net pay
 */
document.getElementById("calculateBtn").addEventListener("click", () => {
    // Get input values from form
    const hourlyPay = Number(document.getElementById("hourlyPay").value);
    const hoursPerShift = Number(document.getElementById("hoursPerShift").value);
    const shiftsPerMonth = Number(document.getElementById("shiftsPerMonth").value);

    // Calculate gross pay (hourly rate × hours per shift × shifts per month)
    const dailyPay = hourlyPay * hoursPerShift;
    const totalPay = dailyPay * shiftsPerMonth;

    // Get selected tax code
    const taxCode = document.getElementById("taxCode").value;

    // Validate tax code selection
    if (taxCode === "") {
        alert("Please select a tax code.");
        return;
    }

    /* ===== TAX CALCULATION ===== */
    let allowanceAnnual = 0;

    // Determine Personal Allowance based on tax code
    // Personal Allowance reduces taxable income
    if (taxCode === "1257L") {
        allowanceAnnual = 12570;     // Standard Personal Allowance: £12,570/year
    } else if (taxCode === "1263L") {
        allowanceAnnual = 12630;     // Higher Personal Allowance: £12,630/year
    } else if (taxCode === "BR") {
        allowanceAnnual = 0;         // Basic Rate: no allowance
    }

    // Convert annual allowance to monthly for comparison
    const allowanceMonthly = allowanceAnnual / 12;
    const taxableIncome = totalPay - allowanceMonthly;

    // Apply 20% tax rate on taxable income
    let tax = 0;
    if (taxableIncome > 0) {
        tax = taxableIncome * 0.20; // Standard 20% income tax
    }

    /* ===== NATIONAL INSURANCE CALCULATION ===== */
    let nationalinsurance = 0;
    const niLowerLimit = 1047.50;    // Monthly Lower Earnings Limit (LEL)
    const niUpperLimit = 4189.17;    // Monthly Upper Earnings Limit (UEL)
      
    // NI is calculated in bands:
    // - Below LEL: no NI
    // - Between LEL and UEL: 8% NI
    // - Above UEL: 8% on band amount + 2% on excess
    if (totalPay > niLowerLimit) {
        if (totalPay <= niUpperLimit) {
            // 8% NI rate on earnings between LEL and UEL
            nationalinsurance = (totalPay - niLowerLimit) * 0.08;
        } else {
            // 8% on band (LEL to UEL) + 2% on earnings above UEL
            nationalinsurance = (niUpperLimit - niLowerLimit) * 0.08 + (totalPay - niUpperLimit) * 0.02;
        }
    }

    /* ===== NET PAY CALCULATION ===== */
    const netPay = totalPay - tax - nationalinsurance;
    
    /* ===== DISPLAY RESULTS ===== */
    document.getElementById("grossPay").textContent = `Gross Pay: £${totalPay.toFixed(2)}`;
    document.getElementById("netPay").textContent = `Net Pay: £${netPay.toFixed(2)}`;
    document.getElementById("taxAmount").textContent = `Tax: £${tax.toFixed(2)}`;
    document.getElementById("niAmount").textContent = `NI: £${nationalinsurance.toFixed(2)}`;
});

/* ====================================================================== */
/* CALCULATOR LOGIC - RESET BUTTON EVENT LISTENER */
/* ====================================================================== */

/**
 * Clears all input fields and resets output to zero
 */
document.getElementById("resetBtn").addEventListener("click", () => {
    // Clear all input fields
    document.getElementById("hourlyPay").value = "";
    document.getElementById("hoursPerShift").value = "";
    document.getElementById("shiftsPerMonth").value = "";
    
    // Reset all output displays to £0.00
    document.getElementById("grossPay").textContent = "Gross Pay: £0.00";
    document.getElementById("taxAmount").textContent = "Tax: £0.00";
    document.getElementById("netPay").textContent = "Net Pay: £0.00";
    document.getElementById("niAmount").textContent = "NI: £0.00";
    document.getElementById("taxCode").value = "";
});

/* ====================================================================== */
/* BINARY BACKGROUND FUNCTIONS */
/* ====================================================================== */

/**
 * Generates random binary string (1s and 0s) for dark mode background
 * Creates 2 million digits with newline breaks every 200 characters
 * This ensures full screen coverage even on large displays
 * @returns {string} Binary string with line breaks
 */
function generateBinaryBackground() {
    let binary = '';  
    for (let i = 0; i < 2000000; i++) {
        binary += Math.random() > 0.5 ? '1' : '0';
        // Add newline every 200 characters for readability and layout
        if (i % 200 === 199) binary += '\n';
    }
    return binary;
}

/**
 * Creates and injects binary background div into DOM when dark mode is active
 * Only displays in dark mode - removed when switching to light mode
 * Positioned fixed so it doesn't follow scroll
 */
function updateBinaryBackground() {
    let binaryBg = document.getElementById('binary-bg-calc');
    if (body.classList.contains('dark-mode')) {
        // Create binary background if it doesn't exist
        if (!binaryBg) {
            binaryBg = document.createElement('div');
            binaryBg.id = 'binary-bg-calc';
            // Inline styles for fixed positioning and animation
            binaryBg.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: #00ff00;
                font-size: 22px;
                line-height: 1.6;
                white-space: pre-wrap;
                overflow: hidden;
                animation: scrollUp 20s linear infinite;
                opacity: 0.15;
                z-index: -1;
                pointer-events: none;
                font-family: 'Courier New', monospace;
            `;
            // Generate and inject binary content
            binaryBg.textContent = generateBinaryBackground();
            document.body.insertBefore(binaryBg, document.body.firstChild);
        }
    } else {
        // Remove binary background when switching to light mode
        if (binaryBg) binaryBg.remove();
    }
}

/* ====================================================================== */
/* THEME TOGGLE & PERSISTENCE */
/* ====================================================================== */

// Reference to body element for theme toggling
const body = document.body;
const themeToggleCalc = document.getElementById('themeToggleCalc');

// Load saved theme preference from localStorage (defaults to dark-mode)
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);
updateToggleIconCalc();
updateBinaryBackground();

/**
 * Theme toggle event listener - switches between dark and light modes
 * Saves preference to localStorage for persistence across sessions
 */
themeToggleCalc.addEventListener('click', () => {
    // Toggle both theme classes
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Save current theme to localStorage
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    
    // Update icon and binary background
    updateToggleIconCalc();
    updateBinaryBackground();
});

/**
 * Updates theme toggle button icon between moon (light mode) and sun (dark mode)
 */
function updateToggleIconCalc() {
    const icon = themeToggleCalc.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        // Dark mode shows sun icon
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // Light mode shows moon icon
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}