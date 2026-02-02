// Generate lots of binary text for full screen coverage
function generateBinary() {
    let binary = '';
    for (let i = 0; i < 100000; i++) {
        binary += Math.random() > 0.5 ? '1' : '0';
        if (i % 200 === 199) binary += '\n';
    }
    return binary;
}

// Insert content
document.querySelector('.binary-bg').textContent = generateBinary();

// Theme toggle
const body = document.body;
const themeToggle = document.getElementById('themeToggleSplash');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);
updateToggleIcon();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', currentTheme);
    updateToggleIcon();
});

function updateToggleIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Click anywhere to enter calculator
document.body.addEventListener('click', (e) => {
    if (e.target !== themeToggle && !themeToggle.contains(e.target)) {
        window.location.href = 'calculator.html';
    }
});