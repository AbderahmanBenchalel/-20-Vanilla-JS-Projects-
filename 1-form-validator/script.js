// DOM selection
const submit = document.querySelector(".Submit");
const inputFields = document.querySelectorAll("#input-field");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("passowrd");
const confirmPassword = document.getElementById("confirm-passowrd");

// Effect of validation
function successMessage(input) {
  const field = input.parentElement;
  const message = input.nextElementSibling;
  field.classList.add("valide");
  field.classList.remove("invalide");
  message.textContent = "";
}

// Effect of invalidation
function errorMessage(input, content) {
  const field = input.parentElement;
  const message = input.nextElementSibling;
  field.classList.add("invalide");
  field.classList.remove("valide");
  message.textContent = content;
}

// Make the first character uppercase
function upperFirst(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required
function checkRequired([...inputs]) {
  for (const input of inputs) {
    if (!input.value.trim()) {
      errorMessage(input, `${upperFirst(input)} is required`);
    }
  }
}
// Checking the lenght
function checkLength(input, condition) {
  if (!input.value.trim()) {
    return;
  }
  if (input.value.trim().length < condition) {
    errorMessage(
      input,
      `${upperFirst(input)} must be at least ${condition} characters`
    );
  } else {
    successMessage(input);
  }
}

// Checking validation of email
function checkEmail(input) {
  if (!input.value.trim()) {
    return;
  }
  if (input.id === "email") {
    const pattern = /[a-zA-z].*@.*\.\w+/;
    if (!input.value.trim().match(pattern)) {
      errorMessage(input, "Enter a valid email");
    } else {
      successMessage(input);
    }
  }
}

// Checking if confirmation password matches
function checkPasswordsMatch(input, prevInput) {
  if (!input.value.trim()) {
    return;
  }
  if (input.id === "confirm-passowrd") {
    if (input.value.length < 6 || input.value !== prevInput.value) {
      errorMessage(input, "Please confirm your password");
    } else {
      successMessage(input);
    }
  }
}

// ----------------------------------------------------------------

// Main validation function, called by event
function check() {
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3);
  checkLength(password, 6);
  checkEmail(email);
  checkPasswordsMatch(confirmPassword, password);
}

submit.addEventListener("click", check);
