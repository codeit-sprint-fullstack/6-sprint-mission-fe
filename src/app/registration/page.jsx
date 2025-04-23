"use client";
//find out which part can be separated as client component and keep this main page as server component
import Image from "next/image";

export default function RegistrationPage() {
  return (
    <>
      <h1>Registration Page</h1>
      {/* wrapper */}
      <div>
        {/* header */}
        <Image src="/logo/logo-md.svg"></Image>
        {/* inputs wrapper  */}
        <div>
          {/* each input wrapper */}
          <div className="">
            <label></label>
            <input></input>
          </div>
          <div className="">
            <label></label>
            <input></input>
          </div>
          <div className="">
            <label></label>
            <input></input>
          </div>
          <div className="">
            <label></label>
            <input></input>
          </div>
        </div>
      </div>
    </>
  );
}
