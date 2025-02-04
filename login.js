const btn = document.querySelector('.btn');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

function btnToggle(e) {
  if (email.value && password.value) {
    btn.classList.add('btnAble');
    btn.disabled = false;
  } else {
    btn.classList.remove('btnAble');
    btn.disabled = true;
  }
}

email.addEventListener('keyup', btnToggle);
password.addEventListener('keyup', btnToggle);