const emailInput = document.getElementsByName("email")[0];
const passwordInput = document.querySelector("input[name='password']");
const loginButton = document.querySelector(".login_box");

function showErrorMessage(input, message) {
    let errorMessage = input.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains("error-message")) {
        errorMessage = document.createElement("div");
        errorMessage.classList.add("error-Message");
        input.parentNode.appendChild(errorMessage);
    }
    errorMessage.textcontent = message;
    input.classList.add("error-border");
}

function clearErrorMessage(input) {
    let errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.remove();
    }
    input.classList.remove("error-border")
}