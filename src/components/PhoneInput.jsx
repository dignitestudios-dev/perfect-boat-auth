import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { LiaFlagUsaSolid } from "react-icons/lia";
// Import the USA flag icon from react-icons
const PhoneInput = ({
  text,
  type,
  error,
  placeholder,
  register,
  onInput,
  isPhone = false,
  maxLength,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
        {text}
      </label>
      <div
        className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] rounded-[12px] bg-[#1A293D] flex items-center justify-start ${
          error
            ? "focus-within:border-[#FF453A]"
            : "focus-within:border-[#55C9FA]"
        }`}
      >
        <div
          className={`w-full h-full flex items-center justify-center rounded-[12px] relative`}
        >
          {isPhone && (
            <div className="flex items-center bg-[#16202e] h-full rounded-l-[12px] px-1">
              <span className="text-xl pr-1">
                <img
                  src="https://flagcdn.com/w320/us.png"
                  alt="US flag"
                  className="w-6 h-4 mr-2"
                />
              </span>
              <span className="text-md text-[#6B7373]">+1</span>
            </div>
          )}
          <input
            type={isPassVisible ? "text" : type}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full outline-none rounded-[12px] autofill:bg-transparent autofill:text-white placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium pb-[2px]"
            {...register}
            onInput={onInput}
          />
          <span
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="cursor-pointer absolute top-4 text-lg right-2"
            style={{ color: "#6B7373" }}
          >
            {type === "password" &&
              (!isPassVisible ? <BsEyeSlash /> : <BsEye />)}
          </span>
        </div>
      </div>
      {error && <p className="text-[#FF453A] text-sm">{error.message}</p>}
    </div>
  );
};
export default PhoneInput;
