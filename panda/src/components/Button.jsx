import React from "react";
import "./Button.scss";
import clsx from "clsx";
import { RxReset } from "react-icons/rx";

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
  const buttonClass = clsx(
    "button",
    size,
    rounded ? "rounded" : "",
    disabled ? "disabled" : "",
    className
  ).trim();

  return (
    <>
      <button className={clsx(buttonClass)} onClick={onClick} type={type}>
        <span>{children}</span>
        {reset && <RxReset className="rotate-180 -scale-x-90 stroke-1" />}
      </button>
    </>
  );
}

export default Button;
