import React, { useContext, useState, useRef } from "react";
import { AuthMockup } from "../assets/export.js";
import AuthSubmitBtn from "../components/AuthSubmitBtn.jsx";
import axios from "../axios.js";
import { ErrorToast, SuccessToast } from "../components/Toaster.jsx";
import { useNavigate } from "react-router-dom";

const OnboardVerifyOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const inputs = useRef([]);
  //   const {login} = useContext(AuthContext)
  const otpEmail = sessionStorage.getItem("email");

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if it's not the last
      if (index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the current field
      setOtp(newOtp);

      // Move focus to the previous input if it's not the first
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const getOtpValue = () => {
    return parseInt(otp.join(""), 10);
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      let obj = { email: otpEmail, otp: getOtpValue() };

      const response = await axios.post("/auth/otp/verify/email", obj);
      if (response?.status === 200) {
        setLoading(false);
        SuccessToast("Email Verified");
        if (response?.data?.data?.isEmailVerified === true) {
          sessionStorage.setItem("token", response?.data?.data?.token);
          if (response?.data?.data?.isSubscribed === true) {
            navigate("/congrats");
          } else {
            navigate("/buy-package");
          }
        } else {
          // navigate("/onboard-verify-otp");
          console.log("email not verified");
        }
      } else {
        ErrorToast("Error");
      }
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { email: otpEmail };
      const response = await axios.post("/auth/otp/resend/email", obj);

      if (response.status === 200) {
        // navigate("/select-package");
        SuccessToast(response?.data?.message);
        setResendLoading(false);
        setOtp(Array(6).fill(""))
      } else {
        ErrorToast(response?.data?.message);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  const [isVerified, setIsVerified] = useState(false);
  // setIsVerified(true);
  return (
    <div className="w-screen h-screen flex justify-center items-center lg:items-start lg:justify-start bg-[#001229]">
      <div className="w-full lg:w-1/2 px-4 py-8 lg:p-20 flex flex-col overflow-y-auto gap-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOtp();
          }}
        >
          <div className="w-full flex justify-start items-start flex-col">
            <h1 className="text-[38px] md:text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
              Verification
            </h1>
            <p className=" font-normal text-[17px] text-white leading-[21.6px] tracking-[-1.2px]">
              Enter the OTP code sent to your email
            </p>
          </div>
          <div className="w-full h-auto grid grid-cols-6 justify-start items-center gap-4 my-4 ">
            {otp.map((digit, index) => (
              <input
              inputmode="numeric"
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputs.current[index] = el)}
                className=" h-[50px] md:h-[54px] rounded-lg bg-transparent outline-none text-center border-[1px]
                 border-[#c2c6cb] text-white md:text-2xl text-xl focus-within:border-[#55C9FA] flex items-center justify-center"
              />
            ))}
          </div>
          <div className="w-full h-auto flex justify-center lg:flex lg:flex-col mb-10 md:justify-start md:mb-20 gap-1">
            <div className="w-full lg:w-[434px] flex lg:justify-center lg:items-center gap-1">
              <span className="text-[13px] font-medium text-[#C2C6CB]">
                Didn't recieve a code?
              </span>
              <button
                type="button"
                disabled={resendLoading}
                onClick={handleResendOtp}
                className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
              >
                Resend now
              </button>
            </div>
          </div>
          <div className="md:w-[60%] lg:w-full">
            <AuthSubmitBtn text={"Verify"} loader={loading} />
          </div>

          {isVerified && (
            <EmailVerificationSuccessModal
              isOpen={isVerified}
              setIsOpen={setIsVerified}
            />
          )}
        </form>
      </div>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>

        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default OnboardVerifyOtp;
