document.addEventListener("DOMContentLoaded", loadEntries);

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dobInput = document.getElementById("dob");
    const dobValue = new Date(dobInput.value);
    const today = new Date();
    const acceptedTerms = document.getElementById("acceptedTerms").checked
      ? "true"
      : "false";

    const age = today.getFullYear() - dobValue.getFullYear();
    const monthDifference = today.getMonth() - dobValue.getMonth();

    let dobError = document.getElementById("dobError");
    dobError.classList.add("hidden");

    const minAge = 18;
    const maxAge = 55;

    if (
      age < minAge ||
      age > maxAge ||
      (age === minAge && monthDifference < 0) ||
      (age === maxAge && monthDifference > 0)
    ) {
      dobError.classList.remove("hidden");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    addEntryToTable(name, email, password, dobInput.value, acceptedTerms);
    saveEntryToLocalStorage(
      name,
      email,
      password,
      dobInput.value,
      acceptedTerms
    );

    alert("Registration successful!");
    document.getElementById("registrationForm").reset();
  });

function addEntryToTable(name, email, password, dob, acceptedTerms) {
  const tableBody = document.getElementById("registrationTableBody");
  const newRow = tableBody.insertRow();
  newRow.innerHTML = `
        <td class="border-b border-gray-300 px-4 py-2">${name}</td>
        <td class="border-b border-gray-300 px-4 py-2">${email}</td>
        <td class="border-b border-gray-300 px-4 py-2">******</td> <!-- Masked Password -->
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
    addEntryToTable(
      entry.name,
      entry.email,
      entry.password,
      entry.dob,
      entry.acceptedTerms
    );
  });
}
