// Accessing erea of cenima
const cenimaErea = document.querySelector(".cenima-erea");

// A class represents count an state of seats
class Seats {
  constructor(currenValue, value) {
    this.movieOptions = document.querySelector(".movie-options");

    this.countOfSeats = currenValue;
    this.countUI = document.querySelector("#count");

    this.totalPrice = value;
    this.totalPriceUI = document.querySelector("#total");
  }

  seatUI(event) {
    event.target.classList.toggle("selected");
  }

  isSelected(event) {
    if (event.target.classList.contains("selected")) return true;
    else return false;
  }

  addSeats() {
    this.countOfSeats++;
    this.countUI.textContent = this.countOfSeats;
    this.countTotalPrice(true);
  }

  removeSeats() {
    this.countOfSeats--;
    this.countUI.textContent = this.countOfSeats;
    this.countTotalPrice(false);
  }

  isSeatOrAvailable(event) {
    if (
      event.target.classList.contains("seat") &&
      !event.target.classList.contains("occupied")
    )
      return true;
    else false;
  }

  countTotalPrice(added) {
    if (added) {
      this.totalPrice = this.totalPrice + +this.movieOptions.value;
      this.totalPriceUI.textContent = this.totalPrice;
      return;
    }
    this.totalPrice = this.totalPrice - +this.movieOptions.value;
    this.totalPriceUI.textContent = this.totalPrice;
  }
}

//----------------------------------------------
const seats = new Seats(0, 0);
cenimaErea.addEventListener("click", (event) => {
  if (!seats.isSeatOrAvailable(event)) {
    return;
  }

  seats.seatUI(event);

  if (seats.isSelected(event)) {
    seats.addSeats();
  } else {
    seats.removeSeats();
  }
});
