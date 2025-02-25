const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const inputEmail = document.getElementById("input-email");
const inputPwd = document.getElementById("input-pwd");
const inputPwdConfirm = document.getElementById("input-pwd-confirm");
const btnLogin = document.getElementById("btn-login");
const btnSignup = document.getElementById("btn-signup");
const isLoginPage = document.body.id === "login-page";
const isSignupPage = document.body.id === "signup-page";
                
const inputName = [
    inputEmail,
    inputPwd,
    inputPwdConfirm,
];

function blurStyleOn(input, message) {
    input.classList.add("red");
    message.style.display = "block";
}

function blurStyleOff(input, message) {
    input.classList.remove("red");
    message.innerText = "";
}

inputName.forEach(input => {
    if(input) {
        input.addEventListener("blur", function (){
            let value = input.value.trim();
            const errorMessagePtag = input.nextElementSibling;
            const parentNextSibling = input.parentElement.nextElementSibling;
            const emailPatterns = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // 사인업페이지에서만 DB에 있는 이메일 중복검사
            if(input === inputEmail) {
                if (isSignupPage === true) {
                    USER_DATA.some(value => value === value)
                    if(value === true) {
                        blurStyleOn(input, errorMessagePtag);
                        errorMessagePtag.innerText = "사용 중인 이메일입니다.";
                    } else {
                        blurStyleOff(input, errorMessagePtag);
                        errorMessagePtag.innerText = "";
                    } 
                }
             // 이메일 input에 공백 있으면 에러 출력

                if(value=== ""){
                    blurStyleOn(input, errorMessagePtag);
                    errorMessagePtag.innerText = "이메일을 입력해주세요.";
                }else {
                    blurStyleOff(input, errorMessagePtag);
                    errorMessagePtag.innerText = "";
                }
                

                // 이메일 형식 검사
                if(!emailPatterns.test(value)) {
                    blurStyleOn(input, errorMessagePtag);
                    errorMessagePtag.innerText = "잘못된 이메일 형식입니다.";
                }else {
                    blurStyleOff(input, errorMessagePtag);
                    errorMessagePtag.innerText = "";
                }
            }
            
            if (input === inputPwd) {
                if (isSignupPage === true) {
                    // 비밀번호 length가 8 미만일 경우
                    if(value.length < 8) {
                        blurStyleOn(inputPwd, parentNextSibling);
                        parentNextSibling.innerText = "비밀번호를 8자 이상 입력해주세요.";
                    }else {
                        blurStyleOff(inputPwd, parentNextSibling);
                        parentNextSibling.innerText = "";
                    }
                }
                // 비밀번호를 입력하지 않았을 경우
                if (value === "") {
                    blurStyleOn(inputPwd, parentNextSibling);
                    parentNextSibling.innerText = "비밀번호를 입력해주세요.";
                } else {
                    blurStyleOff(inputPwd, parentNextSibling);
                    parentNextSibling.innerText = "";
                }
            // 비밀번호 불 일치할 경우
            } else if (input === inputPwdConfirm) {
                if(input.value.trim() != inputPwd.value.trim()) {
                    blurStyleOn(inputPwdConfirm, parentNextSibling);
                    parentNextSibling.innerText = "비밀번호가 일치하지 않습니다.";
                }else {
                    blurStyleOff(inputPwdConfirm, parentNextSibling);
                    parentNextSibling.innerText = "";
                }
            }
        });
    }
});


function loginMemberCheck (email, pwd) {
    const user = USER_DATA.find(user => user.email === email);
    
    if (!user) {
        alert("존재하지 않는 이메일입니다.");
    } else if (user.password !== pwd) {
        alert("비밀번호가 일치하지 않습니다.");
    } else {
        window.location.href = "/items"; // 로그인 성공
        window.alert("로그인 성공!");
    }
}

function signupMemberCheck(email) {
    
    window.location.href = "/login";
}

// 입력이 유효하면 로그인 버튼 활성화, 아니면 비활성화
inputName.forEach(input => {
    input.addEventListener("blur", function () {
        if (isSignupPage) {
            // 입력값 확인 후 버튼 활성화/비활성화 처리
            if (inputEmail.value && inputPwd.value && inputPwdConfirm.value) {
                btnSignupEnable();
            } else {
                btnSignupEnable();
            }
        } else if (isLoginPage) {
            // 입력값 확인 후 버튼 활성화/비활성화 처리
            if (inputEmail.value && inputPwd.value) {
                btnLoginEnable();
            } else {
                btnLoginDisable();
            }
        }
    });
});

// [v] Input 에 유효한 값을 입력하면 ‘회원가입' 버튼이 활성화 됩니다.
function btnSignupEnable () {
    btnSignup.classList.remove("disabled");
    btnSignup.disabled = false;
    btnSignup.onclick = function () { 
        alert ('회원가입 성공');
        window.location.href = "/login";
    };
}


// [v] 활성화된 ‘회원가입’ 버튼을 누르면 “/login” 로 이동합니다
function btnSignupHref () {
    btnLogin.onclick = () => {
        alert ('회원가입 성공');
        window.location.href = "/login";
    };
}

// [v] Input 에 유효한 값을 입력하면 ‘로그인' 버튼이 활성화 됩니다.
function btnLoginEnable () {
    // btnLogin.classList.remove("disabled");
    btnLogin.disabled = false;
    btnLoginHref();
}

// [v] input 에 빈 값이 있거나 에러 메세지가 있으면 ‘로그인’ 버튼은 비활성화 됩니다.
function btnLoginDisable () {
    //btnLogin.classList.add("disabled");
    btnLogin.disabled = true;
}

// [v] 활성화된 ‘로그인’ 버튼을 누르면 “/items” 로 이동합니다
function btnLoginHref () {
    btnLogin.onclick = () => {
        alert ('로그인 성공');
        window.location.href = "/items";
    };
}

// signup 필드 모두 유효한 값이어야 btnSignupEnable() 호출 로직