//----------------------------------------------
// Accessing erea of cenima
const cenimaErea = document.querySelector(".cenima-erea");

//----------------------------------------------
// A class represents seats
class Seats {
  constructor(count, total, option) {
    this.indexsOfselectedSeats = [];
    this.countOfSeats = count;
    this.totalPrice = total;

    this.movieOptions = document.querySelector(".movie-options");
    this.movieOptions.value = option;
    this.countUI = document.querySelector("#count");
    this.totalPriceUI = document.querySelector("#total");
  }

  isSeatOrAvailable(event) {
    if (
      event.target.classList.contains("seat") &&
      !event.target.classList.contains("occupied")
    )
      return true;
    else false;
  }

  seatUI(event) {
    event.target.classList.toggle("selected");
  }

  updateCountAndTotal() {
    const selectedSeats = document.querySelectorAll(".row .selected");
    const ticketPrice = +this.movieOptions.value;
    console.log(selectedSeats);
    this.countOfSeats = selectedSeats.length;
    this.renderCountAndPrice("C");
    this.totalPrice = ticketPrice * this.countOfSeats;
    this.renderCountAndPrice("P");
  }

  renderCountAndPrice(operation) {
    if (operation === "C") this.countUI.textContent = this.countOfSeats;
    else if (operation === "P") this.totalPriceUI.textContent = this.totalPrice;
  }
}

//----------------------------------------------
// Save data to LocalStorage
function saveToLocalStorage(Seats) {
  const seats = document.querySelectorAll(".row .seat");
  const selectedSeats = document.querySelectorAll(".row .selected");
  Seats.indexsOfselectedSeats = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem("seats", JSON.stringify(Seats.indexsOfselectedSeats));
  localStorage.setItem("seatsNumber", JSON.stringify(Seats.countOfSeats));
  localStorage.setItem("totalPrice", JSON.stringify(Seats.totalPrice));
  localStorage.setItem("currentOption", Seats.movieOptions.value);
}

//----------------------------------------------
// Recovering data from LocalStorage
function recoverDataFromLocalStorage() {
  const indexOfselectedSeats = JSON.parse(localStorage.getItem("seats"));
  const total =
    +localStorage.getItem("totalPrice") !== null
      ? +localStorage.getItem("totalPrice")
      : 0;

  const count =
    +localStorage.getItem("seatsNumber") !== null
      ? +localStorage.getItem("seatsNumber")
      : 0;

  const option =
    localStorage.getItem("currentOption") !== null
      ? localStorage.getItem("currentOption")
      : 10;

  if (indexOfselectedSeats !== null) {
    const seatsUI = document.querySelectorAll(".row .seat");
    console.log(seatsUI);
    console.log(indexOfselectedSeats);
    indexOfselectedSeats.forEach((seatIndex) => {
      seatsUI[seatIndex].classList.add("selected");
    });
  }
  const seats = new Seats(count, total, option);
  return seats;
}

//----------------------------------------------
// The main application

const seats = recoverDataFromLocalStorage();
seats.renderCountAndPrice("P");
seats.renderCountAndPrice("C");

// Event of clicking on a seat
cenimaErea.addEventListener("click", (event) => {
  if (!seats.isSeatOrAvailable(event)) {
    return;
  }
  seats.seatUI(event);
  seats.updateCountAndTotal();
  saveToLocalStorage(seats);
});

// Event changing movie option
seats.movieOptions.addEventListener("change", (event) => {
  seats.updateCountAndTotal();
  saveToLocalStorage(seats);
});
