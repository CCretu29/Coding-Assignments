const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        openPopup('Please enter a valid number between 1 and 100.');
        return;
    }

    attempts++;

    if (guess === randomNumber) {
        openPopup(`Congratulations! You guessed the number ${randomNumber} correctly in ${attempts} attempts.`, true);
    } else if (guess < randomNumber) {
        openPopup('The number is higher. Try again.');
    } else {
        openPopup('The number is lower. Try again.');
    }
}

function openPopup(message, isCorrect = false) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');

    popupMessage.textContent = message;
    popup.style.display = 'block';
    popup.style.backgroundColor = isCorrect ? '#26ea5a' : '##40e70e';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
