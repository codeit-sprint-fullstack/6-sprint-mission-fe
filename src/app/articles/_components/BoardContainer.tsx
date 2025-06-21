import React from "react";
import BestBoard from "./BestBoard";
import Board from "./Board";

function BoardContainer() {
  return (
    <div className="m-4 flex flex-col gap-6 md:m-6 w-full max-w-300">
      <BestBoard />
      <Board />
    </div>
  );
}

export default BoardContainer;
