document.addEventListener("DOMContentLoaded", loadEntries);

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dobInput = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptedTerms").checked;

    const ageValidation = validateAge(dobInput);
    if (ageValidation !== true) {
        showError(ageValidation);
        return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
        showError("Please enter a valid email address.");
        return;
    }

    addEntryToTable(name, email, password, dobInput, acceptedTerms);
    saveEntryToLocalStorage(name, email, password, dobInput, acceptedTerms);

    // Reset the form without an alert
    document.getElementById("registrationForm").reset();
});

function validateAge(dob) {
    const dobValue = new Date(dob);
    const today = new Date();
    const minAge = 18;
    const maxAge = 55;

    const age = today.getFullYear() - dobValue.getFullYear();
    const monthDifference = today.getMonth() - dobValue.getMonth();

    if (age < minAge || age > maxAge || (age === minAge && monthDifference < 0) || (age === maxAge && monthDifference > 0)) {
        return "You must be between 18 and 55 years old.";
    }
    return true;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showError(message) {
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
}

function addEntryToTable(name, email, password, dob, acceptedTerms) {
    const tableBody = document.getElementById("registrationTableBody");
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td class="border-b border-gray-300 px-4 py-2">${name}</td>
        <td class="border-b border-gray-300 px-4 py-2">${email}</td>
        <td class="border-b border-gray-300 px-4 py-2">${password}</td> 
        <td class="border-b border-gray-300 px-4 py-2">${dob}</td>
        <td class="border-b border-gray-300 px-4 py-2">${acceptedTerms}</td>
    `;
}

function saveEntryToLocalStorage(name, email, password, dob, acceptedTerms) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ name, email, password, dob, acceptedTerms }); 
    localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.forEach((entry) => {
        addEntryToTable(entry.name, entry.email, entry.password, entry.dob, entry.acceptedTerms);
    });
}
