import React, { useState, useEffect } from "react";
import data from "./../../../assets/blue.jpg";
import image from "./../../../assets/logiko.png";
import ReactDOM from "react-dom";
import Navbar from "../../../components/landingPages/Navbar";
import Footer from "../../../components/landingPages/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../../../redux/AuthContext";
import axiosInstance from "../../../axiosInstance";
import Spinner from "../../../components/Spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";
import PublicAxios from "../../../Axios/PublicAxios";


const SignIn = () => {
  const [loading,setLoading] = useState(false)
  const authstate = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    
    try {
setLoading(true)
      const response = await PublicAxios.post("token/", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
      const userdata = {
        username: response.data.username,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
        roles : "5908",
        user_id : response.data.id
      }
      dispatch(setCredentials(userdata));


      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      history("/");
    } catch (error) {
      toast.error("email or password invalid")
      setLoading(false)
      console.log(error);
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
                <form onSubmit={submit}>
                  <h1 class="mb-8 text-3xl text-center">Login In</h1>

                  <input
                    type="email"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />

                  <input
                    type="password"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />

                  <button
                    type="submit"
                    class="w-full text-center py-3 rounded-md bg-[#051570] text-white  hover:bg-green-dark focus:outline-none my-1"
                  >
                    Login In  {loading&&<Spinner/>}
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

export default SignIn;
