//  user database
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// handling aut__form-password-toggle for password input visibility 
document.querySelectorAll(".auth__form-password-toggle").forEach((btn) => {
btn.addEventListener("click", ()=>{
  const userInput = btn.previousElementSibling;
  if (userInput && userInput.classList.contains("auth__form-password-input")) {
    userInput.type = userInput.type === "password"? "text" : "password";
  }
});
});

let form = document.querySelector('.auth__form');
let emailField = document.querySelector('#email');
let passwordField = document.querySelector('#password');
