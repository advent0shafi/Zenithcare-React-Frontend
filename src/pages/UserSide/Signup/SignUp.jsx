import React, { useState } from "react";
import data from "./../../../assets/blue.jpg";
import image from "./../../../assets/logiko.png";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import Spinner from "../../../components/Spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";
import PublicAxios from "../../../Axios/PublicAxios";

const SignUp = () => {
  const [loading,setLoading] = useState(false)
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await PublicAxios.post('auth/signup', formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log('Signup successful:', response.data.user.id);
       Navigate(`/otpuser/${response.data.user.id}`);
    } catch (error) {
      setLoading(false);
      console.error('Error signing up:', error);
      // Log the error message to the console
      console.error('Error message:', error.message);
      toast.error("Oops,Email already exists !!")

    }
  };
  
  const notify = () => toast.success("Image has been updated.");


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
                <form onSubmit={handleSubmit} >
                  <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Email"
                  />

                  <input
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    type="text" name="username" value={formData.username} onChange={handleChange} required
                    placeholder="Username"
                  />

                  <input
                    class="block border border-grey-light w-full p-3 rounded mb-4"
              type="password" name="password" value={formData.password} onChange={handleChange} required 
                    placeholder="Password"
                  />
                

                  <button
                    type="submit"
                    class="w-full text-center py-3 rounded-md bg-[#051570] text-white  hover:bg-green-dark focus:outline-none my-1"
                  >
                    Create Account {loading&&<Spinner/>}
                  </button>
                </form> 
                <div class="text-center text-sm text-grey-dark mt-4">
                  By signing up, you agree to the
                  <a
                    class="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and
                  <a
                    class="no-underline border-b border-grey-dark text-grey-dark"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>

              <div class="text-grey-dark mt-6">
                Already have an account?
                <a
                  class="no-underline border-b border-blue text-blue"
                  href="../login/"
                >
                  Log in
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

export default SignUp;
