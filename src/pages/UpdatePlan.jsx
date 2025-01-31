import axios from "../axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageLoader from "../components/PackageLoader";
import { FiLoader } from "react-icons/fi";
import { GiStripedSun } from "react-icons/gi";
import { FaStripeS } from "react-icons/fa6";
import { SuccessToast } from "../components/Toaster";

const UpdatePlan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [reasonError, setReasonError] = useState(null);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const dropdownRef = useRef(null);

  const reasons = [
    { reason: "Schedule tasks and get notifications when tasks are due." },
    { reason: "Complete tasks and add note and photos." },
    { reason: "Keep and download complete preventive history." },
    { reason: "Manage up to 3 boats / personal watercraft." },
  ];

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownVisible(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    setReasonError(null);
  };

  const getNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/owner/subscription/plan");
      setSubscriptions(data?.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handlePlan = async (id, index) => {
    try {
      setLoadingBtn((prev) => {
        const newLoadingState = [...prev];
        newLoadingState[index] = true;
        return newLoadingState;
      });
      const response = await axios.post("/owner/subscription/selectPlan", {
        subscriptionPlanId: id,
      });

      if (response.status === 200) {
        navigate("/summary");
        setLoadingBtn(false);
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (apiError) {
      setError("An error occurred while processing the payment.");
      console.error(apiError);
    } finally {
      setLoadingBtn((prev) => {
        const newLoadingState = [...prev];
        newLoadingState[index] = true;
        return newLoadingState;
      });
    }
  };

  const handleCancelSubscription = async () => {
    if (!selectedReason) {
      setReasonError("Select cancellation Reason");
      return;
    }
    try {
      setCancelLoading(true);
      const response = await axios.put("/owner/subscription/cancel", {
        reason: selectedReason,
      });

      if (response.status === 200) {
        SuccessToast("Subscription Cancel");
        navigate("/");
      }
    } catch (error) {
      console.log("🚀 ~ handleCancelSubscription ~ error:", error);
      cancelLoading(false);
    } finally {
      cancelLoading(false);
    }
  };
  return (
    <div className="w-screen min-h-screen bg-[#001229] flex flex-col gap-4 py-6 px-4 xl:py-0 xl:px-0 items-center justify-center">
      {/* Centered Content */}
      <div className="w-full flex flex-col items-center justify-center py-8">
        <h1 className="text-[28px] md:text-[36px] xl:text-[40px] font-bold text-white leading-tight md:leading-[44px] xl:leading-[54px] tracking-tight md:tracking-[-0.5px] xl:tracking-[-1.2px] text-center px-2 md:px-0">
          Update Your Package
        </h1>
        <p className="w-full md:w-[70%] lg:w-[45%] text-center text-[14px] md:text-[16px] font-medium leading-[20px] md:leading-[22px] tracking-[-0.5px] text-[#fff]/[0.5] px-4 md:px-0">
          Discover the perfect plan that aligns with your preferences. Each
          subscription tier offers unique features and benefits ensuring a
          tailored experience just for you.
        </p>
        <div>
          <button
            onClick={() => navigate("/add-card")}
            className={`outline-none bg-[#329b53] hover:bg-[#39a265] mt-4
             text-white rounded-2xl w-[150px] md:w-[170px] xl:w-[200px] h-[38px]
             md:h-[40px] xl:h-[44px] flex items-center justify-center gap-2 font-[550]`}
          >
            <FaStripeS className="text-white text-xl" />
            <span className="text-sm md:text-base">Update Card</span>
          </button>
        </div>

        {loading ? (
          <PackageLoader />
        ) : (
          <div className="w-auto grid md:grid-cols-2 grid-cols-1  justify-center items-center mt-8 gap-6">
            {subscriptions?.map((subscription, index) => (
              <div
                key={index}
                className="w-auto md:w-[420px] xl:w-[440px] h-auto rounded-[20px] xl:rounded-[24px] bg-[#1A293D]
               p-6 md:p-8 flex flex-col gap-6 justify-center items-center"
              >
                <div className="w-full position relative">
                  {subscription?.currentPlan && (
                    <div className="w-full flex justify-end">
                      <button
                        className="text-red-600 text-xs"
                        onClick={() => setDropdownVisible((prev) => !prev)} // Toggle dropdown visibility
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  )}

                  {dropdownVisible && (
                    <div
                      ref={dropdownRef}
                      className="absolute mt-2 p-4 w-72 bg-[#2c3f57] border-[#1A293D] rounded-xl shadow text-[#fff]/[0.5] z-10"
                    >
                      <div className="w-full text-center">
                        <p className="text-xl text-white">
                          Select cancellation reason
                        </p>
                      </div>

                      <span>
                        {reasons.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center p-2 cursor-pointer "
                          >
                            <input
                              type="radio"
                              id={`reason-${index}`}
                              name="reason"
                              value={item.reason}
                              // checked={selectedReason === item.reason}
                              onChange={() => handleReasonSelect(item.reason)}
                              className="mr-2"
                            />
                            <label
                              htmlFor={`reason-${index}`}
                              className="cursor-pointer"
                            >
                              {item.reason}
                            </label>
                          </div>
                        ))}
                      </span>
                      <button
                        onClick={handleCancelSubscription}
                        className="mt-2 w-full bg-red-600 text-white p-2 rounded"
                      >
                        {cancelLoading ? "Cancelling..." : "Cancel"}
                      </button>
                      {reasonError && (
                        <p className="text-xs font-bold text-red-600">
                          {reasonError}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <span
                  className="w-auto h-[36px] md:h-[42px] bg-[#001229] text-center text-[12px] md:text-[14px]
                 tracking-[3px] font-semibold px-3 md:px-4 text-white rounded-full flex items-center justify-center"
                >
                  {subscription?.name}
                </span>

                <div>
                  <span
                    className="w-auto py-1 text-[12px] md:text-[14px] text-center
                 tracking-[3px] font-normal px-1 md:px-1 text-white rounded-md flex items-center justify-center"
                  >
                    {subscription?.description}
                  </span>
                </div>

                <div className="w-auto relative flex gap-1 justify-start items-center">
                  <span className="absolute top-2 -left-4 text-lg md:text-xl font-medium text-white">
                    $
                  </span>
                  <span className="text-[48px] md:text-[60px] xl:text-[72px] font-bold text-white">
                    {subscription?.price}
                  </span>
                  <span className="text-[12px] md:text-[14px] font-normal text-white">
                    /month
                  </span>
                </div>

                <button
                  disabled={subscription?.currentPlan}
                  onClick={() => handlePlan(subscription?._id, index)}
                  className={`outline-none ${
                    subscription?.currentPlan ? "bg-[#1c4353]" : "bg-[#55C9FA]"
                  }  text-white rounded-full w-[100px] md:w-[110px] xl:w-[126px] h-[38px]
                     md:h-[40px] xl:h-[44px] flex items-center font-[550] justify-center`}
                >
                  <div className="flex items-center">
                    <span className="mr-1">
                      {subscription?.currentPlan ? "Current" : "Buy Now"}{" "}
                    </span>
                    {loadingBtn[index] && (
                      <FiLoader className="animate-spin text-lg mx-auto" />
                    )}
                  </div>
                </button>

                <ul className="h-[300px] message-container overflow-auto w-full px-4 md:px-6 xl:px-8 text-[14px] md:text-[16px] text-white font-normal flex flex-col gap-4 justify-start items-start list-disc">
                  <li>{subscription?.trailDays} free trial days</li>
                  {subscription?.features.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePlan;
