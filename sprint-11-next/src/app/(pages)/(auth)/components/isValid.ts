type FieldTypes = "email" | "password" | "nickname" | "passwordConfirmation";

interface ValidationArgs {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  nickname?: string;
}

const isValid = (type: FieldTypes, fields: ValidationArgs): boolean => {
  // 유효성 검사 로직 예시:
  if (type === "email") {
    return !!fields.email && fields.email.includes("@");
  }
  if (type === "password") {
    return !!fields.password && fields.password.length >= 8;
  }
  if (type === "passwordConfirmation") {
    return fields.password === fields.passwordConfirmation;
  }
  if (type === "nickname") {
    return !!fields.nickname && fields.nickname.length > 0;
  }
  return false;
};

export default isValid;
