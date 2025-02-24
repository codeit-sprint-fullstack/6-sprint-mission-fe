// 문서가 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {

    // DOM 요소 변수 선언
    const emailInput = document.getElementById("email"); // 이메일 입력 필드
    const passwordInput = document.getElementById("password"); // 비밀번호 입력 필드
    const loginButton = document.getElementById("login_btn"); // 로그인 버튼
    const emailError = document.getElementById("email-error"); // 이메일 오류 메시지 영역
    const passwordError = document.getElementById("password-error"); // 비밀번호 오류 메시지 영역
    const passwordToggle = document.querySelector(".password-input i"); // 비밀번호 표시/숨기기 아이콘

    // 사용자 데이터 배열 (이메일과 비밀번호)
    const USER_DATA = [
        { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" },
    ];

    // 이메일 입력값 체크
    emailInput.addEventListener("input", function () {
        const emailValue = emailInput.value.trim();

        // 이메일 값이 비어있는지 확인
        if (emailValue === "") {
            showError(emailError, "이메일을 입력해주세요.", emailInput);
        }
        // 이메일 형식이 유효한지 확인
        else if (!isValidEmail(emailValue)) {
            showError(emailError, "잘못된 이메일 형식입니다.", emailInput);
        }
        else {
            hideError(emailError, emailInput); // 오류 메시지 숨기기
        }

        // 폼의 유효성 검사
        checkFormValidity([emailInput, passwordInput], loginButton, [emailError, passwordError]);
    });

    // 비밀번호 입력값 체크
    passwordInput.addEventListener("input", function () {
        const passwordValue = passwordInput.value.trim();

        // 비밀번호 값이 비어있는지 확인
        if (passwordValue === "") {
            showError(passwordError, "비밀번호를 입력해주세요.", passwordInput);
        }
        // 비밀번호의 길이가 8자 이상인지 확인
        else if (!isValidPassword(passwordValue)) {
            showError(passwordError, "비밀번호는 8자 이상이어야 합니다.", passwordInput);
        }
        else {
            hideError(passwordError, passwordInput); // 오류 메시지 숨기기
        }

        // 폼의 유효성 검사
        checkFormValidity([emailInput, passwordInput], loginButton, [emailError, passwordError]);
    });

    // 로그인 버튼 클릭 시 처리
    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 폼 제출을 막음

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // 이메일과 비밀번호 입력 여부 체크
        if (!emailValue || !passwordValue) {
            showPopup("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        // 이메일로 사용자 검색
        const user = USER_DATA.find(user => user.email === emailValue);

        // 이메일이 존재하지 않으면 경고 메시지 표시
        if (!user) {
            showPopup("이메일이 존재하지 않습니다.");
            return;
        }

        // 비밀번호가 일치하지 않으면 경고 메시지 표시
        if (user.password !== passwordValue) {
            showPopup("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 로그인 성공 시 페이지 이동
        window.location.href = "/items";
    });

    // 비밀번호 표시/숨기기 기능
    passwordToggle.addEventListener("click", function () {
        if (passwordInput.value.trim() !== "") {
            togglePasswordVisibility(passwordInput, passwordToggle);
        }
    });
});
