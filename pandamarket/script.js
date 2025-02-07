function togglePassword(image) {
    const passwordInput = image.previousElementSibling; 
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        image.src = "뜬눈.png";  
    } else {
        passwordInput.type = "password";
        image.src = "가려진눈.png";  
    }
}

