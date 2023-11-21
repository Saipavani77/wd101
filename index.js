const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const termsCheckbox = document.getElementById("acceptTerms");
const submitButton = document.getElementById("submit");
const historyTable = document.getElementById("history");

const currentDate = new Date();
let allEntries = [];

const isValidDate = (givenDate) => {
    const userDate = givenDate.split("-").map(Number);
    const validYear = userDate[0] >= currentDate.getFullYear() - 55 && userDate[0] <= currentDate.getFullYear() - 18;
    const validMonth = (userDate[0] === currentDate.getFullYear() - 55 && userDate[1] >= currentDate.getMonth() + 1) || (userDate[0] === currentDate.getFullYear() - 18 && userDate[1] <= currentDate.getMonth() + 1) || validYear;
    const validDay = (userDate[0] === currentDate.getFullYear() - 55 && userDate[2] >= currentDate.getDate()) || (userDate[0] === currentDate.getFullYear() - 18 && userDate[2] <= currentDate.getDate()) || validYear;

    return validYear && validMonth && validDay;
};

const isInputValid = (element) => element.validity.valid;

const formatDigits = (num) => (num < 10) ? "0" + num : num;

const storeUserData = (name, email, password, dob, terms) => {
    const userData = {name, email, password, dob, terms};
    allEntries.push(userData);
    localStorage.setItem('userData', JSON.stringify(allEntries));
};

const retrieveUserData = () => {
    allEntries = JSON.parse(localStorage.getItem("userData")) || [];
    const view = allEntries.map(entry => `<tr>${Object.values(entry).map(value => `<td>${value}</td>`).join("")}</tr>`).join("\n");
    historyTable.innerHTML += view;
};

submitButton.addEventListener("click", () => {
    const userDate = dobInput.value;

    alert(!isValidDate(userDate) && `Date must be between ${currentDate.getFullYear() - 55}-${formatDigits(currentDate.getMonth() + 1)}-${formatDigits(currentDate.getDate())} and ${currentDate.getFullYear() - 18}-${formatDigits(currentDate.getMonth() + 1)}-${formatDigits(currentDate.getDate())}`);

    if (isInputValid(nameInput) && isInputValid(emailInput) && isInputValid(passwordInput) && isInputValid(dobInput)) {
        storeUserData(nameInput.value, emailInput.value, passwordInput.value, dobInput.value, termsCheckbox.checked);
    }
});

retrieveUserData();
