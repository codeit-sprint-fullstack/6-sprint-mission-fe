function isValid(type, { email,  password, passwordConfirmation, nickname }) {
    const emailValid = (email) => {
      if (email.length === 0) return false;
      const atIndex = email.indexOf('@');
      if (atIndex === -1) return false;
      const tmp = email.slice(atIndex + 1);
      if (tmp.indexOf('.') === -1) return false;
      if (email[atIndex + 1] === '.') return false;
      if (email.endsWith('.')) return false;
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(email)) return false;
      return true;
    };
  
    const passwordValid = (password) => password.length >= 8;
  
    const passwordConfirmationValid = (p1, p2) => p1 === p2;
  
    const nicknameValid = (nickname) => nickname.trim().length > 0;
  
    switch (type) {
      case "email":
        return emailValid(email);
      case "password":
        return passwordValid(password);
      case "passwordConfirmation":
        return passwordConfirmationValid(password, passwordConfirmation);
      case "nickname":
        return nicknameValid(nickname);
      default:
        return false;
    }
  }
  
  
  
  export default isValid