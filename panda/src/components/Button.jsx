import React from "react";
import "./Button.scss";

function Button({
  children,
  size = md,
  rounded = false,
  disabled = false,
  reset = false,
  className,
  onClick,
  type = "submit",
  ...props
}) {
  const buttonClass = `button ${size} ${rounded ? "rounded" : ""} ${
    disabled ? "disabled" : ""
  } ${reset ? "reset" : ""} ${className}`.trim();

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
