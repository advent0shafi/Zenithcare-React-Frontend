import React, { useState, useEffect } from "react";
import data from "./../../../assets/blue.jpg";
import image from "./../../../assets/logiko.png";
import ReactDOM from "react-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../axiosInstance";

const UserOtp = () => {
  const [otps, setOtp] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to submit the OTP\
      const data = {
        otp: otps,
        id: id
      };
      setLoading(true);
      const response = await axiosInstance.post("auth/otp", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("Response:", response.data);

      navigate("/login"); // Replace with the actual route you want to navigate to
    } catch (error) {
      setLoading(false);
      toast.error("invalid otp");
      console.error("Error submitting OTP:", error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <div class="md:flex ">
        <div class="hidden md:flex md:w-1/2 p-12 ">
          <img className="" src={data} alt="" />
        </div>
        <div class=" md:w-1/2 h-full md:p-12 p-2 bg-white-500 ">
          <div class="bg-grey-lighter min-h-screen flex flex-col ">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div class="bg-white px-6 py-8 rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black w-full">
                <div className=" pl-28">
                  <img className="w-[80px] pl-1" src={image} alt="" />
                </div>
                <form onSubmit={handleSubmit}>
                  <h1 class="mb-8 text-3xl text-center">Otp</h1>

                  <input
                    type="password"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="otp"
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                  />

                  <button
                    type="submit"
                    class="w-full text-center py-3 rounded-md bg-[#051570] text-white  hover:bg-green-dark focus:outline-none my-1"
                  >
                    Verify{loading && <Spinner />}
                  </button>
                </form>
                <div class="text-center text-sm text-gray-400 mt-4">
                  By signing up, you agree to the
                  <a
                    class="no-underline border-b border-grey-dark text-gray-400"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and
                  <a
                    class="no-underline border-b border-grey-dark text-gray-400"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>

              <div class="text-grey-dark mt-6">
                Don't have an account?
                <a class="no-underline border-b border-blue text-blue" href="#">
                  <span
                    onClick={() => {
                      history("/signup");
                    }}
                    className="text-[#051570]"
                  >
                    {" "}
                    Signup
                  </span>
                </a>
                .
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      <Footer />
    </div>
  );
};

export default UserOtp;
