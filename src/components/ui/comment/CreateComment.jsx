import React from "react";
import Article from "../Article";
import InputField from "../posting/InputField";
import Button from "../Button";

function CreateComment() {
  const handlePost = () => {
    console.log("now comment post");
  };

  return (
    <>
      <div className="font-bold text-[20px] mb-[9px] ">댓글달기</div>
      <div className="mb-[16px]">
        <InputField placeholder={"댓글을 입력해주세요."} height={"h-[104px]"} />
      </div>
      <div className="flex flex-row justify-end">
        <Button
          text={"등록"}
          onClick={handlePost}
          disabled={true}
          width={"w-[74px]"}
          height={"h-[42px]"}
        />
      </div>
    </>
  );
}

export default CreateComment;
