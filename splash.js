// Generate binary text
function generateBinary() {
    let binary = '';
    for (let i = 0; i < 500; i++) {
        binary += Math.random() > 0.5 ? '1' : '0';
        if (i % 20 === 19) binary += '\n';
    }
    return binary;
}

// Generate money symbols
function generateMoney() {
    const symbols = ['£', '$', '0', '1'];
    let money = '';
    for (let i = 0; i < 500; i++) {
        // First half: binary, second half: currency
        if (i < 250) {
            money += Math.random() > 0.5 ? '1' : '0';
        } else {
            money += symbols[Math.floor(Math.random() * symbols.length)];
        }
        if (i % 15 === 14) money += '\n';
    }
    return money;
}

// Insert content
document.querySelector('.binary-bg.left').textContent = generateBinary();
document.querySelector('.money-bg.right').textContent = generateMoney();

// Click anywhere to enter calculator
document.body.addEventListener('click', () => {
    window.location.href = 'index.html';
});