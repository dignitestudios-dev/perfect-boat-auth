import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai"; // React Icon for tick

const Congratulations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { summaryPlan } = location.state || {};
  const isFreeTrial = sessionStorage.getItem("isFreeTrial");

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#001229]">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 gap-6 text-center">
        <AiOutlineCheckCircle className="text-[#55C9FA] text-[80px] lg:text-[100px]" />
        <h1 className="text-[36px] lg:text-[48px] font-bold text-white leading-[48px] lg:leading-[64.8px] tracking-[-1.2px]">
          Congratulations!
        </h1>
        <p className="text-[16px] lg:text-[18px] font-normal text-white leading-5 tracking-[-0.5px] max-w-[500px]">
          You have successfully subscribed to the {summaryPlan?.name}. Enjoy all
          the premium features and benefits tailored just for you.
        </p>
        {isFreeTrial && (
          <p className="text-[16px] lg:text-[18px] font-normal text-white leading-5 tracking-[-0.5px] max-w-[500px]">
            Your free trial of 120 days has started.
          </p>
        )}
        <p className="text-[14px] lg:text-[16px] font-normal text-[#199BD1]">
          ⓘ Please open the mobile app to continue.
        </p>
        {/* <button
          onClick={() => navigate("/")}
          className="mt-4 w-[160px] h-[44px] bg-[#199BD1] text-white rounded-[12px] text-[16px] font-bold leading-[21.6px] tracking-[-0.24px] flex items-center justify-center"
        >
          Go Home
        </button> */}
      </div>
    </div>
  );
};

export default Congratulations;
