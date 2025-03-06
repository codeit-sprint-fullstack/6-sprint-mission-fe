// DOM
const form = document.querySelector('form')
const submitBtn = document.querySelector(".submit_button")
const inputs = document.querySelectorAll('.form_group input')
const password = document.querySelector('.input_password')
const passwordConfirmation = document.querySelector(".input_password_confirmation")
const passwordImgs = document.querySelectorAll('.password_toggle img')
const errorModal = document.querySelector("aside")

document.addEventListener("click", function (e) {
    if(!e.target.classList.value.includes('input')){
        for(let i = 0; i < inputs.length; i++) inputs[i].style.borderColor = 'rgba(54, 146, 255, 0)'
    }
});
for(let input of inputs) {
    input.addEventListener('click', (e)=> {
        for(let i = 0; i < inputs.length; i++) inputs[i].style.borderColor = 'rgba(54, 146, 255, 0)'
        e.target.style.borderColor = 'rgba(54, 146, 255, 1)'
    })
}
for(let passwordImg of passwordImgs) {
    passwordImg.addEventListener('click',(e)=> {
        e.target.src = e.target.src.includes('eye-invisible') ? '/images/icons/eye-visible.svg' : '/images/icons/eye-invisible.svg' 
        e.target.parentNode.parentNode.querySelector('input').type = e.target.src.includes('eye-visible') ? 'text' : "password"
    })
}

function login(username, token) {
    console.log('Login Cookie!');
    const expireDays = 1;
    const date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    // 쿠키 설정
    document.cookie = `username=${username}; ${expires}; path=/`;
    document.cookie = `token=${token}; ${expires}; path=/`;
}


function checkInputValidity(e) {
    e.preventDefault();
    
    let userEmail = null;
    let userName = null;
    let userPassword = null;
    let continueJoin = false;
    let continueLogin = false;

    for(let input of inputs) {
        const errorElement = input.parentNode.querySelector('.form_error') || input.parentNode.parentNode.querySelector('.form_error');
        const showError = (message) => {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        };
        const hideError = () => {
            errorElement.style.display = 'none';
        };

        if(input.id === 'email') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(input.value === ''){
                showError('이메일을 입력해 주세요');
            } else if(!emailPattern.test(input.value)) {
                showError('잘못된 이메일 형식입니다');
            } else {
                userEmail = input.value;
                hideError();
            }
        } 
        else if(input.id === 'nickname') {
            input.value === '' ? showError('닉네임을 입력해 주세요') : hideError();
            userName = input.value
        } 
        else if(input.id === 'password') {
            if(input.value === '') {
                showError('비밀번호를 입력해 주세요');
            } else if(input.value.length < 8) {
                showError('비밀번호를 8자 이상 입력해 주세요');
            } else {
                userPassword = input.value;
                continueLogin = true;
                hideError();
            }
        } 
        else {
            if(input.value.length < 8) {
                showError('먼저 조건에 맞는 비밀번호를 입력해 주세요');
            } else if(input.value !== userPassword) {
                showError('비밀번호가 일치하지 않습니다');
            } else {
                continueJoin = true;
                hideError();
            }
        }
    }
    const currentURL = window.location.href;
    let storedDatas = JSON.parse(localStorage.getItem('userData'));
    // 모든 경우가 참일때(회원가입)
    if(currentURL.includes('/pages/signup') && continueJoin && userEmail != null) {
        for(let storedData of storedDatas) {
            if(storedData['email'] === userEmail) {
                // 이미 동일한 이메일이 있는 경우
                errorModal.style.display = 'block'
                return;
            } 
        }
        storedDatas =  JSON.parse(localStorage.getItem('userData')) || [];
        const newUser = { email: userEmail , password: userPassword };
        storedDatas.push(newUser);
        localStorage.setItem('userData', JSON.stringify(storedDatas));
        alert("회원가입완료")
        location.href= '/pages/login.html'
    }

    // 모든 경우가 참일때(로그인)
    if(currentURL.includes('/pages/login') && continueLogin && userEmail != null) {
        for(let storedData of storedDatas) {
            if(storedData['email'] === userEmail) {
                if(storedData['password'] === userPassword) {
                    //로그인완료!
                    login(userEmail, 'someToken'); // 로그인 성공 시 쿠키 설정
                    location.href= '/pages/item.html'
                    return;
                } else {
                    errorModal.style.display = 'block'
                    errorModal.querySelector('.error_message').textContent = '비밀번호가 일치하지 않습니다.'
                    return;
                }
            } 
        }
        errorModal.style.display = 'block'
        errorModal.querySelector('.error_message').textContent = '이메일이 존재하지 않습니다.'
    }
}

// Event
submitBtn.addEventListener('click', checkInputValidity)
errorModal.querySelector('.error_check').addEventListener('click', (e)=> { errorModal.style.display = 'none' })
form.addEventListener('submit', (e)=> { e.preventDefault() })
// 회원데이터
if (localStorage.getItem('userData')) {
    // 데이터가 존재하면 불러오기
    const storedData = JSON.parse(localStorage.getItem('userData'));
    console.log('불러온 데이터:', storedData);
} else {
    // 데이터가 없으면 기본값 설정
    const USER_DATA = [
        { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" }
    ];
    localStorage.setItem('userData', JSON.stringify(USER_DATA));
    console.log('기본 데이터가 저장되었습니다.');
}
