import React from "react";

function LineDivider({ my = 4 }: { my?: number }) {
  return <span className={`flex border text-gray-100 my-${my}`}></span>;
}

export default LineDivider;
