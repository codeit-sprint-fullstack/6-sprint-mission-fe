function emailchange() {
    const emInput = document.querySelector(".emailinput");
    console.log(emInput)
    const emInputData = emInput.value
    console.log(emInputData)
    const emPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emPattern)
    const emError = document.querySelector(".emailerror")
    console.log(emError)
    if (emPattern.test(emInputData)) {
        emError.style.visibility = "hidden";
        emInput.style.borderColor = "transparent"
    } else {
        emError.style.visibility = "visible";
        emInput.style.borderColor = 'red';
    }
} 


function passwordchange() {
    console.log(document.getElementsByClassName("passwordinput")[0].value)
    const pwInput = document.querySelector(".passwordinput"); // 첫 번째 input 선택
    console.log(pwInput.value.length); // 입력된 값의 길이 출력
    const pwlength = pwInput.value.length;
    const passwordError = document.querySelector(".passworderror");
    console.log(passwordError)
    if (pwlength <= 8) {
        passwordError.style.visibility = "visible";
        pwInput.style.borderColor = 'red';
    } else {
        passwordError.style.visibility = "hidden";
        pwInput.style.borderColor = 'transparent';
    }
}

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
]