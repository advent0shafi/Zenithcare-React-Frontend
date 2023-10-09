import React, { useState } from "react";
import image from "./../../../assets/logiko.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../redux/AuthContext";
import Spinner from "../../../components/Spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";
import PublicAxios from "../../../Axios/PublicAxios";
import axiosInstance from "../../../axiosInstance";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const authstate = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await PublicAxios.post("token/", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    
      console.log(response.data);
      if (response.data.admin){
        const userdata = {
          username: response.data.username,
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
          roles : "9289",
          user_id: response.data.id,
        };
        dispatch(setCredentials(userdata));
  
        
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        history("/admin/");

      }else{
        setLoading(false);
        toast.error("Unathorised");

      }
     
    } catch (error) {
      toast.error("email or password invalid");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-gray-100">
      <div className=" h-full p-16 ">
        <div class="bg-grey-lighter min-h-screen flex flex-col ">
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black w-full">
              <div className=" pl-28">
                <img className="w-[80px] pl-1" src={image} alt="" />
              </div>
              <form onSubmit={submit}>
                  <h1 class="mb-8 text-xl font-bold text-center">Admin Login In</h1>

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
                Your In Admin Login Of ZennithCare
              </div>
            </div>
          </div>
          <Toaster/>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
