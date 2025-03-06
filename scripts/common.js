// common.js

// 쿠키 읽기 함수
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// 로그인 상태 확인
document.addEventListener('DOMContentLoaded', () => {
    const username = getCookie('username');
    const token = getCookie('token');
   
    if (username && token) {
        //로그인 TRUE
        if(
            window.location.pathname.includes('/pages/login.html') || // 현재 내가 해당 페이지라면
            window.location.pathname.includes('/pages/signup.html')  // 현재 내가 해당 페이지라면
        ) {
            location.href = '/pages/item.html'; 
        }
    } else {
        //로그인 FALSE
        if (
            window.location.pathname.includes('/pages/item.html')  // 현재 내가 해당 페이지라면
        ) {
            location.href = '/pages/login.html'; 
        }
    }
});

