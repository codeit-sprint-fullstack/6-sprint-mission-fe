import React from "react";
import "./Button.scss";

function Button({
  children,
  size = md,
  rounded = false,
  disabled = false,
  reset = false,
  className,
  ...props
}) {
  const buttonClass = `button ${size} ${rounded ? "rounded" : ""}
  ${disabled ? "disabled" : ""} ${reset ? "reset" : ""} ${className}`.trim();

  return <div className={buttonClass}>{children}</div>;
}

export default Button;
