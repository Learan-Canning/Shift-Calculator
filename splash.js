// Generate lots of binary text for full screen coverage
function generateBinary() {
    let binary = '';
    for (let i = 0; i < 100000; i++) {  // Even more text
        binary += Math.random() > 0.5 ? '1' : '0';
        if (i % 200 === 199) binary += '\n';  // 200 characters per line
    }
    return binary;
}

// Insert content
document.querySelector('.binary-bg').textContent = generateBinary();

// Click anywhere to enter calculator
document.body.addEventListener('click', () => {
    window.location.href = 'index.html';
});