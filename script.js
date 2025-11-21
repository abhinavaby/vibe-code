// Rock Paper Scissors Game Logic
let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

const choiceButtons = document.querySelectorAll('.choice-btn');
const playerIcon = document.getElementById('player-icon');
const computerIcon = document.getElementById('computer-icon');
const playerChoiceText = document.getElementById('player-choice-text');
const computerChoiceText = document.getElementById('computer-choice-text');
const resultText = document.getElementById('result-text');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset-game');
const playerCard = document.getElementById('player-card');
const computerCard = document.getElementById('computer-card');

// Handle player choice
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        playGame(playerChoice);
    });
});

function playGame(playerChoice) {
    // Disable buttons during animation
    choiceButtons.forEach(btn => btn.disabled = true);
    
    // Animate player choice first
    const playerCard = document.getElementById('player-card');
    playerCard.classList.remove('card-animate');
    void playerCard.offsetWidth; // Trigger reflow
    playerCard.classList.add('card-animate');
    
    // Update player choice with animation
    playerIcon.textContent = choiceEmojis[playerChoice];
    playerIcon.style.animation = 'iconSpin 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    playerChoiceText.textContent = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
    
    // Computer "thinking" animation
    const computerCard = document.getElementById('computer-card');
    let thinkingCount = 0;
    const thinkingInterval = setInterval(() => {
        const randomEmoji = choiceEmojis[choices[Math.floor(Math.random() * choices.length)]];
        computerIcon.textContent = randomEmoji;
        thinkingCount++;
        
        if (thinkingCount >= 5) {
            clearInterval(thinkingInterval);
            
            // Computer makes random choice
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            
            // Animate computer card
            computerCard.classList.remove('card-animate');
            void computerCard.offsetWidth;
            computerCard.classList.add('card-animate');
            
            // Update computer choice
            computerIcon.textContent = choiceEmojis[computerChoice];
            computerIcon.style.animation = 'iconSpin 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            computerChoiceText.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
            
            // Determine winner after delay
            setTimeout(() => {
                determineWinner(playerChoice, computerChoice);
                choiceButtons.forEach(btn => btn.disabled = false);
            }, 500);
        }
    }, 150);
}

function determineWinner(playerChoice, computerChoice) {
    // Animate result text
    resultText.classList.remove('fade-in');
    void resultText.offsetWidth;
    resultText.classList.add('fade-in');
    
    let result;
    if (playerChoice === computerChoice) {
        result = 'tie';
        resultText.textContent = "It's a tie! 🤝";
        resultText.className = 'result-text tie fade-in';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'win';
        playerScore++;
        resultText.textContent = 'You win! 🎉';
        resultText.className = 'result-text win fade-in';
        animateScore(playerScoreEl, playerScore);
    } else {
        result = 'lose';
        computerScore++;
        resultText.textContent = 'Computer wins! 😢';
        resultText.className = 'result-text lose fade-in';
        animateScore(computerScoreEl, computerScore);
    }
}

function animateScore(element, newScore) {
    element.style.animation = 'scoreBounce 0.5s ease';
    element.textContent = newScore;
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Reset game
resetBtn.addEventListener('click', () => {
    // Animate reset
    const cards = [playerCard, computerCard];
    cards.forEach(card => {
        card.style.animation = 'cardPop 0.5s ease reverse';
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    });
    
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerIcon.textContent = '?';
    computerIcon.textContent = '?';
    playerIcon.style.animation = 'iconSpin 0.6s ease';
    computerIcon.style.animation = 'iconSpin 0.6s ease';
    playerChoiceText.textContent = 'You';
    computerChoiceText.textContent = 'Computer';
    
    resultText.classList.remove('fade-in', 'win', 'lose', 'tie');
    resultText.textContent = 'Choose your move!';
    resultText.className = 'result-text fade-in';
    
    // Re-enable buttons
    choiceButtons.forEach(btn => btn.disabled = false);
});

// Number Range Selector Logic
const minRangeInput = document.getElementById('min-range');
const maxRangeInput = document.getElementById('max-range');
const generateBtn = document.getElementById('generate-number');
const randomNumberEl = document.getElementById('random-number');
const numberInfoEl = document.getElementById('number-info');

generateBtn.addEventListener('click', () => {
    const min = parseInt(minRangeInput.value);
    const max = parseInt(maxRangeInput.value);
    
    // Disable button during generation
    generateBtn.disabled = true;
    
    // Validate inputs
    if (isNaN(min) || isNaN(max)) {
        numberInfoEl.textContent = 'Please enter valid numbers!';
        randomNumberEl.textContent = '❌';
        randomNumberEl.style.animation = 'resultLose 0.5s ease';
        setTimeout(() => {
            generateBtn.disabled = false;
        }, 500);
        return;
    }
    
    if (min >= max) {
        numberInfoEl.textContent = 'Minimum must be less than maximum!';
        randomNumberEl.textContent = '❌';
        randomNumberEl.style.animation = 'resultLose 0.5s ease';
        setTimeout(() => {
            generateBtn.disabled = false;
        }, 500);
        return;
    }
    
    // Animate number generation with rolling effect
    let currentValue = min;
    const range = max - min;
    const steps = 20;
    const stepValue = range / steps;
    let stepCount = 0;
    
    randomNumberEl.style.animation = 'none';
    
    const rollInterval = setInterval(() => {
        currentValue = Math.floor(min + Math.random() * range);
        randomNumberEl.textContent = currentValue;
        randomNumberEl.style.transform = `scale(${1 + Math.sin(stepCount * 0.5) * 0.2}) rotate(${stepCount * 10}deg)`;
        stepCount++;
        
        if (stepCount >= steps) {
            clearInterval(rollInterval);
            
            // Final number
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            randomNumberEl.textContent = randomNumber;
            numberInfoEl.textContent = `Random number between ${min} and ${max}`;
            
            // Celebration animation
            randomNumberEl.style.animation = 'numberCelebrate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            randomNumberEl.style.transform = 'scale(1) rotate(0deg)';
            
            setTimeout(() => {
                generateBtn.disabled = false;
            }, 800);
        }
    }, 50);
});

// Add CSS animation for number celebration
const style = document.createElement('style');
style.textContent = `
    @keyframes numberCelebrate {
        0% {
            transform: scale(0.8) rotate(-10deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.3) rotate(10deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Allow Enter key to generate number
minRangeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateBtn.click();
    }
});

maxRangeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateBtn.click();
    }
});
