import React, { useContext, useState } from "react";
import { AuthMockup } from "../assets/export";
import AuthInput from "../components/AuthInput";
import AuthSubmitBtn from "../components/AuthSubmitBtn";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        email: formData.email,
        password: formData.password,
        role: "owner",
      };

      const response = await axios.post("/auth/signIn", obj);
      if (response.status === 200) {
        if (response?.data?.data?.isEmailVerified === true) {
          sessionStorage.setItem("token", response?.data?.data?.token);
          if (response?.data?.data?.isSubscribed === true) {
            navigate("/congrats");
          } else {
            navigate("/buy-package");
          }
        } else {
          navigate("/onboard-verify-otp");
        }
        // navigate("/dashboard");
        setLoading(false);
        SuccessToast("Logged in successfully");
      }
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-0 p-4 w-full h-screen flex items-center justify-center bg-[#001229]">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col justify-start items-center gap-8"
      >
        <div>
          <h1 className="w-full justify-start items-start text-[38px] md:text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Log in
          </h1>
          <div className="w-full h-auto flex flex-col mt-6 justify-start items-start md:gap-4 gap-2">
            <AuthInput
              register={register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              text={"Email Address"}
              placeholder={"Type your email address here"}
              type={"text"}
              error={errors.email}
            />
            <div className="w-full lg:w-[434px] flex flex-col justify-start items-end gap-1">
              <AuthInput
                register={register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long.",
                  },
                })}
                text={"Password"}
                placeholder={"Enter Password"}
                type={"password"}
                error={errors.password}
              />
              {/* <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[13px] font-medium text-[#fff]"
            >
              Forgot Password?
            </button> */}
            </div>
          </div>

          <div className="pt-6">
            <AuthSubmitBtn text={"Log in"} loader={loading} />
          </div>

          <div className="py-4 w-full h-auto flex flex-col justify-start items-start">
            <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center ">
              <span className="text-[13px] font-medium text-[#C2C6CB]">
                Don’t have an account?
              </span>
              <button
                type="button"
                className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
                onClick={() => {
                  navigate("/");
                }}
              >
                Create one
              </button>
            </div>
          </div>

          <SocialLogin />
        </div>
      </form>
    </div>
  );
};

export default Login;
