import React, { useState } from "react";
import PaymentForm from "../components/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentInput from "../components/PaymentInput";

const AddCard = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

  const [cardHolderName, setCardHolderName] = useState("");
  const [nameError, setNameError] = useState(null);

  return (
    <div className="w-screen min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#001229]">
      {/* Left Side - Form Section */}
      <div className="w-full lg:w-1/2 max-w-[500px] h-auto px-4 py-8 lg:p-10 z-10 flex flex-col justify-center items-center gap-6 lg:gap-8">
        <h1 className="w-full text-[28px] md:text-[32px] font-bold text-white leading-tight md:leading-[38px] text-left">
          Add Card Details
        </h1>

        {/* Input Fields */}
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <PaymentInput
            text={"Card Holder Name"}
            placeholder={"Mike Smith"}
            type={"text"}
            state={cardHolderName}
            setState={setCardHolderName}
            error={nameError}
            setNameError={setNameError}
          />

          <Elements stripe={stripePromise}>
            <PaymentForm
              cardHolderName={cardHolderName}
              setNameError={setNameError}
            />
          </Elements>

          {/* <AuthInput
            text={"Card Number"}
            placeholder={"0000 0000 0000 0000"}
            type={"text"}
          /> */}

          {/* Expiry, CVC, and Zip Code Fields */}
          {/* <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="w-full flex flex-col gap-1">
              <label className="ml-1 text-xs md:text-sm font-medium text-[#fff] capitalize">
                {"Valid Through"}
              </label>
              <div
                className={`w-full h-[45px] md:h-[52px] focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start ${
                  error && "error"
                }`}
              >
                <input
                  type={"text"}
                  placeholder={"MM/YY"}
                  className="w-full outline-none rounded-[12px] placeholder:text-xs md:placeholder:text-[13px] text-white bg-transparent h-full px-3"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="ml-1 text-xs md:text-sm font-medium text-[#fff] capitalize">
                {"CVC"}
              </label>
              <div
                className={`w-full h-[45px] md:h-[52px] focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start ${
                  error && "error"
                }`}
              >
                <input
                  type={"text"}
                  placeholder={"0000"}
                  className="w-full outline-none rounded-[12px] placeholder:text-xs md:placeholder:text-[13px] text-white bg-transparent h-full px-3"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="ml-1 text-xs md:text-sm font-medium text-[#fff] capitalize">
                {"Zip Code"}
              </label>
              <div
                className={`w-full h-[45px] md:h-[52px] focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start ${
                  error && "error"
                }`}
              >
                <input
                  type={"text"}
                  placeholder={"12345"}
                  className="w-full outline-none rounded-[12px] placeholder:text-xs md:placeholder:text-[13px] text-white bg-transparent h-full px-3"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      {/* <div className="w-full lg:w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0 absolute top-0 -left-4"></span>
        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full object-cover" />
      </div> */}
    </div>
  );
};

export default AddCard;
