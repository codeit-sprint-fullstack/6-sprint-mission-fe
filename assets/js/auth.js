// handling aut__form-password-toggle for password input visibility 
document.querySelectorAll(".auth__form-password-toggle").forEach((btn) => {
btn.addEventListener("click", ()=>{
  const userInput = btn.previousElementSibling;
  if (userInput && userInput.classList.contains("auth__form-password-input")) {
    userInput.type = userInput.type === "password"? "text" : "password";
  }
});
});
