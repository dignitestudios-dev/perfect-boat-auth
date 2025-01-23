import React, { useContext, useRef, useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import AuthInput from "../components/AuthInput";
import AuthSubmitBtn from "../components/AuthSubmitBtn";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import { useForm } from "react-hook-form";
import axios from "../axios";
import SocialLogin from "../pages/SocialLogin";
import PhoneInput from "../components/PhoneInput";

const Signup = () => {
  const navigate = useNavigate();
  // const { navigate } = useContext(GlobalContext);
  // const {signUpData} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [agreementErr, setAgreementErr] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const createAccount = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: `+1${formData.phoneNumber}`,
        role: "singleuser",
      };
      if (!isAgree) {
        setAgreementErr(
          "Kindly acknowledge the policy by checking the agreement"
        );
        return;
      }
      const response = await axios.post("/auth/signUp", obj);

      if (response.status === 200) {
        sessionStorage.setItem(
          "email",
          response?.data?.data?.userRecord?.email
        );
        setLoading(false);
        SuccessToast("SignUp Successfully");
        navigate("/onboard-verify-otp");
      } else {
        ErrorToast(response?.data?.message);
      }
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
    // navigate("/onboard-verify-otp");
  };

  return (
    <div className="md:p-0 p-4 w-full h-full flex justify-center items-center bg-[#001229]">
      <div className="md:w-auto w-full">
        <form className="w-full h-auto" onSubmit={handleSubmit(createAccount)}>
          <h1 className="w-full justify-start items-start text-[38px] md:text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Signup
          </h1>
          <div className="w-full h-auto flex flex-col justify-start items-start md:gap-4 gap-2">
            <AuthInput
              register={register("fullName", {
                required: "Please enter your name.",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Please enter a valid name.",
                },
              })}
              text={"Name"}
              placeholder={"Enter your name here"}
              type={"text"}
              error={errors.fullName}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
            />

            <AuthInput
              register={register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email pattern
                  message: "Please enter a valid email address.",
                },
              })}
              text={"Email"}
              placeholder={"Enter your email address here"}
              type={"email"}
              error={errors.email}
            />

            <PhoneInput
              register={register("phoneNumber", {
                required: "Please enter your phone number.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid phone number.",
                },
              })}
              maxLength="10"
              text={"Phone Number"}
              placeholder={"Enter your phone number here"}
              type={"text"}
              error={errors.phoneNumber}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              isPhone={true}
            />

            <AuthInput
              register={register("password", {
                required:
                  "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                minLength: {
                  value: 8,
                  message:
                    "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                  message:
                    "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                },
              })}
              maxLength={18}
              text={"Password"}
              placeholder={"Enter your password here"}
              type={"password"}
              error={errors.password}
            />
            <AuthInput
              register={register("confPassword", {
                required:
                  "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                minLength: {
                  value: 8,
                  message:
                    "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                },
                validate: (value) =>
                  value === password.current ||
                  "Confirm Password does not match",
                // pattern: {
                //   value:
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                //   message:
                //     "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                // },
              })}
              maxLength={18}
              text={"Confirm Password"}
              placeholder={"Enter confirm password here"}
              type={"password"}
              error={errors.confPassword}
            />
            <div className="w-full h-auto flex gap-1 justify-start items-start">
              <div className=" pt-2">
                <input
                  type="checkbox"
                  className="w-5 h-6 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                                   checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500]
                                  checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229]
                                   checked:after:text-[16px] checked:after:p-0.5"
                  checked={isAgree}
                  onChange={() => {
                    setIsAgree(!isAgree);
                    setAgreementErr(false);
                  }}
                />
              </div>
              <div>
                <p className="w-auto pl-2 text-white/50">
                  I agree to the terms of service and privacy policy, and i
                  authorize the collection and use of my phone number for
                  two-Factor authentication
                </p>
              </div>
            </div>
            {agreementErr && (
              <p className="text-[#FF453A] text-sm -mt-3">{agreementErr}</p>
            )}
          </div>
          <div className="pt-4">
            <AuthSubmitBtn text={"Sign Up"} loader={loading} />
            <div className="w-full h-auto flex flex-col justify-start items-start">
              <div className="w-full lg:w-[434px] pt-2 flex justify-center items-center">
                {/* <span className="text-[13px] font-medium text-[#C2C6CB]">
                  Already have an account?
                </span>
                <button
                  className="pl-1 outline-none text-[13px] border-none text-[#199BD1] font-bold"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button> */}
              </div>
            </div>
          </div>

          <SocialLogin />

          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start pt-2">
            <div className="w-full lg:w-[434px] flex flex-wrap gap-1 justify-center items-center">
              <span className="text-[12px] md:text-[16px] font-medium text-[#C2C6CB]">
                By creating an account, I accept the
              </span>
              <button
                type="button"
                className="outline-none text-[12px] md:text-[16px] border-none text-[#199BD1] font-bold"
                onClick={() => {
                  window.open(
                    "https://app.termly.io/policy-viewer/policy.html?policyUUID=3bcd60e8-b5c1-42ea-b3a9-c232dc2d0672",
                    "_blank"
                  );
                }}
              >
                Terms & conditions
              </button>
              <span className="text-[12px] md:text-[16px] font-medium text-[#C2C6CB]">
                &
              </span>
              <button
                type="button"
                className="outline-none text-[12px] md:text-[16px] border-none text-[#199BD1] font-bold"
                onClick={() => {
                  window.open(
                    "https://app.termly.io/policy-viewer/policy.html?policyUUID=a6047de9-b149-4001-86a8-5a4051ab8411",
                    "_blank"
                  );
                }}
              >
                Privacy policy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
