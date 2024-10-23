import React, { useContext, useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import AuthInput from "../components/AuthInput";
import AuthSubmitBtn from "../components/AuthSubmitBtn";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import { useForm } from "react-hook-form";
import axios from "../axios";
import SocialLogin from "../pages/SocialLogin";

const Signup = () => {
  const navigate = useNavigate();
  // const { navigate } = useContext(GlobalContext);
  // const {signUpData} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createAccount = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        role: "owner",
      };
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
    <div className="md:p-0 p-4 w-full h-full min-h-screen flex items-center justify-center bg-[#001229]">
      <form onSubmit={handleSubmit(createAccount)}>
        <div>
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
              placeholder={"e.g. Mike Smith"}
              type={"text"}
              error={errors.fullName}
            />

            <AuthInput
              register={register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              text={"Email"}
              placeholder={"Type your email address here"}
              type={"email"}
              error={errors.email}
            />

            <AuthInput
              register={register("phoneNumber", {
                required: "Please enter your phone number.",
                pattern: {
                  value: /^\+?[0-9]{11}$/,
                  message: "Please enter a valid phone number.",
                },
              })}
              text={"Phone Number"}
              placeholder={"Type your phone number here"}
              type={"text"}
              error={errors.phoneNumber}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/(?!^\+)[^\d]/g, ""); 
              }}
            />

            <AuthInput
              register={register("password", {
                required: "Please enter your password.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              })}
              text={"Password"}
              placeholder={"Enter Password"}
              type={"password"}
              error={errors.password}
            />
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
                className="outline-none text-[16px] border-none text-[#199BD1] font-bold"
                onClick={() => {
                  navigate("#");
                }}
              >
                Terms & conditions
              </button>
              <span className="text-[16px] font-medium text-[#C2C6CB]">&</span>
              <button
                type="button"
                className="outline-none text-[16px] border-none text-[#199BD1] font-bold"
                onClick={() => {
                  navigate("#");
                }}
              >
                Privacy policy
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
