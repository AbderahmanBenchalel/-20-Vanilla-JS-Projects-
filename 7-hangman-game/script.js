////// DOM elements accessing
const wordUI = document.getElementById("word");
const wrongMessage = document.getElementById("message");
const notification = document.getElementById("notification");
const popup = document.getElementById("popup-container");
const playAgainBtn = document.getElementById("play-agin");
const PARTS_NUMBER = 6;

///// Array of words.
const words = ["software", "house", "programming", "designing", "hardware"];
let correctLetters = [];
let wrongLetters = [];
let selectedLetters = [];
let bodyParts = 0;
////////////////////////////////////////////////

let word = generateRandomWord(words);
displayWordUI(word);

addEventListener("keydown", (event) => {
  if (popup.style.display === "flex" || event.code.slice(0, 3) !== "Key") {
    return;
  }
  if (selectedLetters.includes(event.key.toLowerCase())) {
    displayNotification();
    return;
  }
  selectedLetters.push(event.key.toLowerCase());
  checkLetter(event.key);
});

playAgainBtn.addEventListener("click", resetGame);

////// Functions

// Check if the letter is wrong or correct
function checkLetter(letter) {
  if (Array.from(word).includes(letter)) {
    correctLetters.push(letter);
    displayWordUI(word);
  } else {
    wrongLetters.push(letter);
    displayWrongLetters();
    displayBodyPart();
  }
  winOrLose();
}

// Check win or lose
function winOrLose() {
  const createdWord = wordUI.innerText.replace(/\n/g, "");
  if (word === createdWord) {
    popup.style.display = "flex";
    popup.querySelector("p").innerText = "Congratulations! You Won! 😃";
    return;
  }
  if (bodyParts === PARTS_NUMBER) {
    popup.style.display = "flex";
    popup.querySelector("p").innerText = "Unfortunately! You Lost! 😟";
    return;
  }
}

// Generate random word from an array of words.
function generateRandomWord(words) {
  const randomWord = Math.round(Math.random() * (words.length - 1));
  return words[randomWord];
}

// Display the word
function displayWordUI(word) {
  wordUI.innerHTML = "";
  Array.from(word).forEach((letter) => {
    const letterUI = document.createElement("p");
    correctLetters.includes(letter)
      ? (letterUI.innerText = letter)
      : (letterUI.innerText = "");
    letterUI.className = "letter";
    wordUI.append(letterUI);
  });
}

// Display wrong letters
function displayWrongLetters() {
  wrongMessage.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    <p class="letters">${wrongLetters.join(",").toLowerCase()}</p>`;
}

// Display notification when selecting a letter twice.
function displayNotification() {
  notification.classList.add("display");
  setTimeout(() => {
    notification.classList.remove("display");
  }, 2000);
}

// Display body parts
function displayBodyPart() {
  document.querySelector(".figure").classList.remove("figure");
  bodyParts++;
}

// Reset game
function resetGame() {
  popup.style.display = "none";
  word = generateRandomWord(words);
  correctLetters = [];
  wrongLetters = [];
  selectedLetters = [];
  bodyParts = 0;
  displayWordUI(word);
  displayWrongLetters();
  [...document.querySelectorAll(".part")].forEach((part) =>
    part.classList.add("figure")
  );
}
