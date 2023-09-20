////// Accessing DOM elements.
const main = document.querySelector("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const filterMillioBtn = document.getElementById("only-millio");
const sortBtn = document.getElementById("sort-rich");
const totalWealthBtn = document.getElementById("calculate");

let personsData = [];
////// The Application.

generateRandomPerson();
generateRandomPerson();
generateRandomPerson();
addUserBtn.addEventListener("click", generateRandomPerson);
doubleMoneyBtn.addEventListener("click", doubleMoneyOfPersons);
sortBtn.addEventListener("click", sortByRichest);
filterMillioBtn.addEventListener("click", filterMillio);
totalWealthBtn.addEventListener("click", totalWealth);

////// The functions.

///// Generate random names and money
async function generateRandomPerson() {
  const response = await fetch("https://randomuser.me/api/?inc=name&noinfo");
  const resData = await response.json();
  const personName = `${resData.results[0].name.first} ${resData.results[0].name.last}`;
  const personMoney = Math.floor(Math.random() * 1000000);
  const personData = { name: personName, money: personMoney };
  addData(personData);
}

////// To save new person in the array
function addData(newPerson) {
  personsData.push(newPerson);
  renderPersonsData();
}

////// To update the DOM
function renderPersonsData(data = personsData) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  data.forEach((person) => {
    const personEl = document.createElement("p");
    personEl.className = "person";
    personEl.innerHTML = `<strong>${
      person.name
    }</strong><p>$${person.money.toLocaleString()}</p>`;
    main.append(personEl);
  });
}

function doubleMoneyOfPersons() {
  personsData = personsData.map((person) => ({
    ...person,
    money: person.money * 2,
  }));
  renderPersonsData();
}

function sortByRichest() {
  personsData.sort((a, b) => b.money - a.money);
  renderPersonsData();
}

function filterMillio() {
  personsData = personsData.filter((person) => person.money >= 1000000);
  renderPersonsData();
}

function totalWealth() {
  const totalWealth = personsData.reduce((total, current) => {
    return current.money + total;
  }, 0);
  const personEl = document.createElement("h3");
  personEl.className = "person";
  personEl.innerHTML = `Total Wealth: <strong>$${totalWealth.toLocaleString()}</strong>`;
  main.append(personEl);
}
