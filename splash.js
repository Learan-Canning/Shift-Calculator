/* ====================================================================== */
/* BINARY BACKGROUND GENERATION */
/* ====================================================================== */

/**
 * Generates random binary string (1s and 0s) for splash page background
 * Creates 100,000 random binary digits with newline breaks every 200 characters
 * Provides the animated background effect for splash page
 * @returns {string} Binary string with line breaks
 */
function generateBinary() {
    let binary = '';
    for (let i = 0; i < 100000; i++) {
        // Randomly select 0 or 1
        binary += Math.random() > 0.5 ? '1' : '0';
        // Add newline every 200 characters for consistent line wrapping
        if (i % 200 === 199) binary += '\n';
    }
    return binary;
}

// Inject binary content into background element
document.querySelector('.binary-bg').textContent = generateBinary();

/* ====================================================================== */
/* THEME TOGGLE & PERSISTENCE */
/* ====================================================================== */

// References to DOM elements
const body = document.body;
const themeToggle = document.getElementById('themeToggleSplash');

// Load saved theme preference from localStorage (defaults to dark-mode)
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);
updateToggleIcon();

/**
 * Theme toggle event listener - switches between dark and light modes
 * Saves preference to localStorage for persistence across all pages
 */
themeToggle.addEventListener('click', () => {
    // Toggle both theme classes
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    // Save current theme to localStorage for other pages to use
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    
    // Update icon to reflect current theme
    updateToggleIcon();
});

/**
 * Updates theme toggle button icon between moon (light mode) and sun (dark mode)
 */
function updateToggleIcon() {
    const icon = themeToggle.querySelector('i');
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

/* ====================================================================== */
/* NAVIGATION - CLICK TO ENTER CALCULATOR */
/* ====================================================================== */

/**
 * Click anywhere on the page (except the theme toggle) to navigate to calculator
 * Allows user-friendly entry to the calculator by clicking the splash content
 */
document.body.addEventListener('click', (e) => {
    // Allow theme toggle clicks without navigation
    if (e.target !== themeToggle && !themeToggle.contains(e.target)) {
        window.location.href = 'calculator.html';
    }
});