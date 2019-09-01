/**
 * DOM Elements
 */
const form = document.getElementById("form-loan");
const fieldAmount = document.getElementById("amount");
const fieldInterest = document.getElementById("interest");
const fieldYears = document.getElementById("years");
const fieldMonthlyPayment = document.getElementById("monthly-payment");
const fieldTotalPayment = document.getElementById("total-payment");
const fieldTotalInterest = document.getElementById("total-interest");

/**
 * Specific variables
 */
const PERCENTAGE = 100;
const MONTHS = 12;

/**
 * Calculate payment
 */
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const resultCard = document.querySelector(".container-result");
  const loader = document.getElementById("loading");
  resultCard.style.display = "none";
  loader.style.display = "block";

  setTimeout(calculatePayment, 3000);
});

function calculatePayment() {
  const amountValue = parseFloat(fieldAmount.value);
  const interest = parseFloat(fieldInterest.value) / PERCENTAGE / MONTHS;
  const yearlyPayment = parseFloat(fieldYears.value) * MONTHS;
  const errorMessage = "Please, check your numbers";

  // monthly payment
  const coefficient = Math.pow(1 + interest, yearlyPayment);
  const monthlyPayment =
    (amountValue * coefficient * interest) / (coefficient - 1);

  if (isFinite(monthlyPayment)) {
    fieldMonthlyPayment.innerHTML = `<span>$${monthlyPayment.toFixed(
      2
    )}</span>`;
    fieldTotalPayment.innerHTML = `<span>$${(
      monthlyPayment * yearlyPayment
    ).toFixed(2)}</span>`;
    fieldTotalInterest.innerHTML = `<span>${(
      monthlyPayment * yearlyPayment -
      amountValue
    ).toFixed(2)}</span>`;

    const resultCard = document.querySelector(".container-result");
    const loader = document.getElementById("loading");
    resultCard.style.display = "block";
    loader.style.display = "none";
  } else {
    showError(errorMessage);
  }
}

/**
 * Show error
 */
function showError(message) {
  const resultCard = document.querySelector(".container-result");
  const loader = document.getElementById("loading");
  resultCard.style.display = "none";
  loader.style.display = "none";

  const errorDiv = document.createElement("div");
  const cardElement = document.querySelector(".card");
  const cardTitle = document.querySelector("h1");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(message));

  cardElement.insertBefore(errorDiv, cardTitle);

  setTimeout(clearErrorAlert, 5000);
}

/**
 * Clear error alert
 */
function clearErrorAlert() {
  document.querySelector(".alert").remove();
}
