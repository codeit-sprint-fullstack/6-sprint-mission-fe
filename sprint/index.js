const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-empty');
  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('password-empty');
  const passwordIcon = document.querySelector('.password-icon');
  const passwordConfirmIcon = document.querySelector('.password-confirm-icon');
  const loginButton = document.getElementById('login-button');
  const signupForm = document.getElementById('signup-form');
  const nicknameInput = document.getElementById('nickname');
  const nicknameError = document.getElementById('nickname-empty');
  const passwordConfirmInput = document.getElementById('password-confirm');
  const passwordConfirmError = document.getElementById('password-confirm-empty');
  const signupButton = document.getElementById('signup-button');

  let emailHasError = false;
  let passwordHasError = false;
  let passwordConfirmHasError = false;
  let nicknameHasError = false;

  function validateInputs() {
    const emailValid = emailInput.value.trim() !== '' && !emailHasError;
    const passwordValid = passwordInput.value.trim() !== '' && !passwordHasError;
    loginButton.disabled = !(emailValid && passwordValid);
  }

  function validateSignup() {
    const emailValid = emailInput.value.trim() !== '' && !emailHasError;
    const passwordValid = passwordInput.value.trim() !== '' && !passwordHasError;
    const nicknameValid = nicknameInput.value.trim() !== '' && !nicknameHasError;
    const passwordConfirmValid = passwordConfirmInput.value.trim() !== '' && !passwordConfirmHasError;
    signupButton.disabled = !(emailValid && passwordValid && nicknameValid && passwordConfirmValid);
  }

  emailInput.addEventListener('focusout', function(e) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailInput.value.trim() === '') {
      emailError.textContent = '이메일을 입력해주세요.';
      emailError.style.display = 'block';
      emailInput.classList.add('error-input');
      emailHasError = true;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = '잘못된 이메일 형식입니다.';
      emailError.style.display = 'block';
      emailInput.classList.add('error-input');
      emailHasError = true;
    } else {
      emailError.style.display = 'none';
      emailHasError = false;
    }
    if (loginForm) {
      validateInputs();
    } else if (signupForm) {
      validateSignup();
    }
  });

  emailInput.addEventListener('focus', function() {
    emailInput.classList.remove('error-input');
    emailError.style.display = 'none';
  });
  
  passwordInput.addEventListener('focusout', function(e) {
    if (passwordInput.value.trim() === '') {
      passwordError.textContent = '비밀번호를 입력해주세요.';
      passwordError.style.display = 'block';
      passwordInput.classList.add('error-input');
      passwordHasError = true;
    } else if (passwordInput.value.length < 8) {
      passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
      passwordError.style.display = 'block';
      passwordInput.classList.add('error-input');
      passwordHasError = true;
    } else {
      passwordError.style.display = 'none';
      passwordHasError = false;
    }
    if (loginForm) {
      validateInputs();
    } else if (signupForm) {
      validateSignup();
    }
  })

  passwordInput.addEventListener('focus', function() {
    passwordInput.classList.remove('error-input');
    passwordError.style.display = 'none';
  });

  if (signupForm) {
    passwordConfirmInput.addEventListener('focusout', function(e) {
      if (passwordConfirmInput.value.trim() === '') {
      passwordConfirmError.textContent = '비밀번호를 입력해주세요.';
      passwordConfirmError.style.display = 'block';
      passwordConfirmInput.classList.add('error-input');
      passwordConfirmHasError = true;
    } else if (passwordConfirmInput.value !== passwordInput.value) {
      passwordConfirmError.textContent = '비밀번호가 일치하지 않습니다다.';
      passwordConfirmError.style.display = 'block';
      passwordConfirmInput.classList.add('error-input');
      passwordConfirmHasError = true;
    } else {
      passwordConfirmError.style.display = 'none';
      passwordConfirmHasError = false;
    }
    validateSignup();
    })

    passwordConfirmInput.addEventListener('focus', function() {
      passwordConfirmInput.classList.remove('error-input');
      passwordConfirmError.style.display = 'none';
    });

    nicknameInput.addEventListener('focusout', function(e) {
      if (nicknameInput.value.trim() === '') {
      nicknameError.textContent = '닉네임을 입력해주세요.';
      nicknameError.style.display = 'block';
      nicknameInput.classList.add('error-input');
      nicknameHasError = true;
    } else {
      nicknameError.style.display = 'none';
      nicknameHasError = false;
    }
    validateSignup();
    });

    nicknameInput.addEventListener('focus', function() {
      nicknameInput.classList.remove('error-input');
      nicknameError.style.display = 'none';
    });
  }
  
  passwordIcon.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordIcon.src = '/img/visibility.png'; 
    } else {
      passwordInput.type = 'password';
      passwordIcon.src = '/img/invisibility.png';
    }
  });

  passwordConfirmIcon.addEventListener('click', function() {
    if (passwordConfirmInput.type === 'password') {
      passwordConfirmInput.type = 'text';
      passwordConfirmIcon.src = '/img/visibility.png'; 
    } else {
      passwordConfirmInput.type = 'password';
      passwordConfirmIcon.src = '/img/invisibility.png';
    }
  });

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!loginButton.disabled) {
        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value.trim();
        const user = USER_DATA.find(user => user.email === enteredEmail);
        if (!user) {
          alert('비밀번호가 일치하지 않습니다.');
        } else if (user.password !== enteredPassword) {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          window.location.href = "/items";
        }
      }
    });
    validateInputs();
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!signupButton.disabled) {
        const enteredEmailSignup = emailInput.value.trim();
        const user = USER_DATA.find(user => user.email === enteredEmailSignup);
        if (!user) {
          window.location.href = "/items";
        } else {
          alert('사용중인 이메일입니다.');
        }
      }
    });
    validateSignup();
  }

});