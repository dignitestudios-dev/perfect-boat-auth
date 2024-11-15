import React, { useEffect, useState } from "react";
import { MasterCardIcon } from "../assets/export";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { ErrorToast } from "../components/Toaster";
import { FiLoader } from "react-icons/fi";
import SummaryLoader from "../components/SummaryLoader";

const Summary = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const getSummary = async () => {
    try {
      setSummaryLoading(true);
      const { data } = await axios.get("/owner/subscription/getSummary");
      if (data) {
        setSummary(data?.data);
        setSummaryLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  const handleCompleteBuy = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/owner/subscription/buy");
      if (response.status === 200) {
        setLoading(false);
        navigate("/congrats", {
          state: { summaryPlan: summary?.subscriptionPlan },
        });
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("🚀 ~ handleCompleteBuy ~ err:", err);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row items-center lg:items-start justify-center bg-[#001229]">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 max-w-[600px] h-auto px-4 py-8 lg:p-16 z-10 flex flex-col justify-start items-start gap-6 lg:gap-8 overflow-y-auto">
        <h1 className="w-full text-[28px] md:text-[32px] lg:text-[40px] font-bold text-white leading-tight text-left">
          Summary
        </h1>

        {summaryLoading ? (
          <SummaryLoader />
        ) : (
          <>
            {/* Package Info */}
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[18px] font-bold text-white">
                  {summary?.subscriptionPlan?.name}
                </h2>
                {/* <Link
            to="/select-package"
            className="text-[12px] md:text-[14px] text-[#199BD1] font-medium"
          >
            Change
          </Link> */}
              </div>
              <p className="text-[14px] md:text-[16px] font-normal text-white leading-relaxed">
                {summary?.subscriptionPlan?.description}
              </p>
            </div>
            {/* Payment Method */}
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-[18px] font-bold text-white">
                Payment Method
              </h2>
              <div className="w-full p-4 bg-[#21344C] rounded-xl border border-[#55C9FA] grid gap-4 grid-cols-1 lg:grid-cols-8">
                <img
                  src={MasterCardIcon}
                  alt="MasterCard"
                  className="col-span-1 lg:col-span-1"
                />
                <span className="col-span-1 lg:col-span-3 text-xl text-white">
                  ****-****-****-{summary?.card?.number}
                </span>
                <div className="col-span-1 lg:col-span-2">
                  <span className="block text-sm font-medium text-white">
                    Name On Card
                  </span>
                  <span className="block text-sm text-white">
                    {summary?.card?.name}
                  </span>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <span className="block text-sm font-medium text-white">
                    Expires On
                  </span>
                  <span className="block text-sm text-white">
                    {summary?.card?.expireOn}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="w-full flex justify-end items-center gap-2">
              <span className="text-[16px] font-medium text-white">
                Total Amount:
              </span>
              <span className="text-[24px] font-bold text-white">
                ${summary?.subscriptionPlan?.price}
              </span>
              <span className="-ml-1 text-[12px] text-white">/month</span>
            </div>

            {/* Button */}
            <div className="w-full flex justify-end gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full lg:w-[180px] h-[48px] bg-[#02203A] text-[#199BD1] rounded-md text-[16px] font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCompleteBuy}
                disabled={loading}
                className="w-full lg:w-[180px] h-[48px] bg-[#199BD1] text-white rounded-md text-[16px] font-bold
            flex items-center justify-center"
              >
                <div className="flex items-center">
                  <span className="mr-1">Save</span>
                  {loading && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right Section - Image (only for larger screens) */}
      {/* Right Side (Image for larger screens) */}
      {/* <div className="lg:flex hidden relative h-full">
          <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0 absolute top-0 -left-0"></span>
          <img src={AuthMockup} alt="auth_mockup" className="w-full h-full object-cover" />
        </div> */}
    </div>
  );
};

export default Summary;
