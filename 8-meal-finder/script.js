const INTERNET_ERROR = "INTERNET_ERROR";
const NO_RESULT = "NO_RESULT";
const SUCCESS = "SUCCESS";

const search = document.querySelector(".search");
const randomBtn = document.querySelector(".random-meal-btn");
const mealsSection = document.querySelector(".result-container");
const resultTitle = document.querySelector(".result-title");
const singleMealArticle = document.querySelector(".single-meal");
let meals = [];

search.addEventListener("submit", searchMeals);

randomBtn.addEventListener("click", randomMeal);

mealsSection.addEventListener("click", mealDetails);

// functions

// search and fetch meals by term
async function searchMeals(event) {
  event.preventDefault();
  const keyword = event.target[0].value;
  event.target[0].value = "";
  if (keyword.trim() === "") {
    alert("Please enter a search term");
    return;
  }
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
    );
    const data = await res.json();
    meals = [...data.meals];
    displayMeals(data.meals, keyword);
  } catch {
    showSearchMessage(INTERNET_ERROR);
  }
}

// Search random
async function randomMeal() {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await res.json();
    const meal = data.meals[0];
    displaySingleMeal(meal);
  } catch {
    showSearchMessage(INTERNET_ERROR);
  }
}

// disply fetched meals
function displayMeals(meals, keyword) {
  mealsSection.innerHTML = "";
  singleMealArticle.innerHTML = "";

  if (meals === null) {
    showSearchMessage(NO_RESULT);
    return;
  } else {
    showSearchMessage(SUCCESS, keyword);
  }

  meals.forEach((meal) => {
    const mealEl = document.createElement("figure");
    mealEl.className = "meal";
    mealEl.innerHTML = `<img src="${meal.strMealThumb}" /><div data-meal-id=${meal.idMeal} class ="info">${meal.strMeal}</div>`;
    mealsSection.append(mealEl);
  });
}

// Display single meal
function displaySingleMeal(meal, datails = false) {
  if (!datails) {
    mealsSection.innerHTML = "";
    resultTitle.innerText = "";
  }

  const ingredients = Object.keys(meal)
    .filter((key) => key.includes("strIngredient") && meal[key])
    .map((key) => meal[key]);

  singleMealArticle.innerHTML = "";
  singleMealArticle.innerHTML = `
      <h2 class="meal-title">${meal.strMeal}</h2>
      <figure class="meal-photo">
        <img src="${meal.strMealThumb}" alt="" />
      </figure>
      <div class="single-meal-info"><p>${meal.strCategory}</p><p>${
    meal.strArea
  }</p></div>
      <p class="single-meal-recipe">${meal.strInstructions}</p>
      <h2 class="ingredients-title">Ingredients</h2>
      <ul class="ingredients">${ingredients
        .map((item) => `<li>${item}</li>`)
        .join("")}</ul>
  `;
}

// Show meal details
function mealDetails(event) {
  const mealId = event.target.dataset.mealId;
  if (!mealId) {
    return;
  }
  meals.forEach((meal) => {
    if (meal.idMeal === mealId) displaySingleMeal(meal, true);
  });
}

// Show message of the search
function showSearchMessage(result, keyword) {
  if (result === NO_RESULT) {
    resultTitle.innerText = "There are no search results. Try again!";
    resultTitle.style.fontSize = "1em";
    return;
  }
  if (result === INTERNET_ERROR) {
    resultTitle.innerText = "Failed to connect, check your internet!";
    resultTitle.style.fontSize = "1em";
    return;
  }
  if (result === SUCCESS) {
    resultTitle.innerText = `Search results for '${keyword}':`;
    resultTitle.style.fontSize = "1.5em";
    return;
  }
}
