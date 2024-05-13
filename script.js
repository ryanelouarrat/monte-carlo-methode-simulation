
let redCount = 0;
let totalCount = 0;
let intervalId = null; 
document.getElementById('drawCardBtn').addEventListener('click', function() {
    drawAndDisplay();
});

document.getElementById('autoDrawBtn').addEventListener('click', function() {
    if (intervalId !== null) {
        alert("An automatic drawing is already in progress. Please stop the current drawing before starting a new one.");
        return; 
    }
    autoDrawCards(100000, 10); 
});

document.getElementById('stopDrawBtn').addEventListener('click', function() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        console.log("Drawing stopped"); 
    }
});

function drawAndDisplay() {
    const isRed = drawCard();
    displayCardImage(isRed);
    updateProbability();
    updateTotalCount();
}

function drawCard() {
    const cardNumber = Math.floor(Math.random() * 52) + 1;
    return cardNumber <= 26; 
}

function displayCardImage(isRed) {
    const imagePath = isRed ? 'red_card.png' : 'black_card.png';
    document.getElementById('cardImage').src = imagePath;
    if (isRed) redCount++;
    totalCount++;
}

function updateProbability() {
    const probability = ((redCount / totalCount) * 100).toFixed(2);
    document.getElementById('probability').innerText = `Probabilité de tirer une carte rouge: ${probability}%`;
}

function updateTotalCount() {
    document.getElementById('nbr').innerText = `Nombre de tirages: ${totalCount}`;
}

function autoDrawCards(times, delay) {
    let count = 0;
    intervalId = setInterval(() => {
        if (count >= times) {
            clearInterval(intervalId);
            intervalId = null;
            console.log("Interval cleared automatically"); 
            return;
        }
        drawAndDisplay();
        count++;
    }, delay);
}
