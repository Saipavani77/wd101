// DOM elements
const formEl = document.getElementById("form");
const submitBtnEl = document.getElementById("submit");
const namesEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
let dobEl = document.getElementById("dob");
const termsEl = document.getElementById("acceptTerms");

// Constants
const minAge = 18;
const maxAge = 55;

// Utility functions
const formatDate = (date) => new Intl.DateTimeFormat("en-US").format(date);

const isDateValid = (givenDate) => {
    const userDate = new Date(givenDate);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - minAge);
    const fiftyFiveYearsAgo = new Date();
    fiftyFiveYearsAgo.setFullYear(fiftyFiveYearsAgo.getFullYear() - maxAge);

    return (
      userDate >= fiftyFiveYearsAgo && userDate <= eighteenYearsAgo
    );
};

const isFormValid = () => formEl.checkValidity();

const getAllEntries = () => JSON.parse(localStorage.getItem("userData")) || [];

const displayHistory = () => {
    const allEntries = getAllEntries();
    const historyEl = document.getElementById("userTable");

    const tableHeader = `<tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
    </tr>`;

    historyEl.innerHTML = tableHeader + allEntries
      .map(entry => `<tr>${Object.values(entry).map(value => `<td>${value}</td>`).join("")}</tr>`)
      .join("\n");
};

const saveToStorage = (name, email, password, dob, terms) => {
    const userData = {name, email, password, dob, terms};
    const allEntries = getAllEntries();
    allEntries.push(userData);
    localStorage.setItem("userData", JSON.stringify(allEntries));
};

// Event listener for form submission
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    let dobEl = document.getElementById("dob");
    if (!isFormValid()) return;

    if (!isDateValid(dobEl.value)) {
        alert(`Date must be between ${formatDate(maxAge)} and ${formatDate(minAge)} years ago`);
        return;
    }

    saveToStorage(namesEl.value, emailEl.value, passwordEl.value, dobEl.value, termsEl.checked);
    displayHistory();
    formEl.reset();
});

// Initial display of user history
displayHistory();
