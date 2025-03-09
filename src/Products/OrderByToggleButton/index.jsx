/* eslint-disable react/prop-types */
import { useState } from "react";

export const OrderByToggleButton = ({ orderByState, setOrderByState }) => {
  const [isToggleState, setIsToggleState] = useState(false);

  const toggleOrderByHandler = () => {
    setIsToggleState(!isToggleState);
  };

  const changeOrderByHandler = () => {
    setOrderByState(orderByState == "recent" ? "favorite" : "recent");
  };

  return (
    <>
      <div className="orderByButton">
        <p className="toggle-button">{orderByState}</p>
        <button onClick={toggleOrderByHandler}>
          {isToggleState ? "▲" : "▼"}
        </button>
      </div>
      {isToggleState ? (
        <div>
          <button className="orderByButton">{orderByState}</button>
          <button className="orderByButton" onClick={changeOrderByHandler}>
            {orderByState == "recent" ? "favorite" : "recent"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
