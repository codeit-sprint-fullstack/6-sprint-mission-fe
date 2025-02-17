const idForm = document.querySelector('.userEmail');
const pwForm = document.querySelector('.userPW');

emailForm.addEventListener('keyup', activeEvent);
pwForm.addEventListener('keyup', activeEvent);

function activeEvent() {
  switch(!(emailForm.value && pwForm.value)){
    case true : loginButton.disabled = true; break;
    case false : loginButton.disabled = false; break
  }
}