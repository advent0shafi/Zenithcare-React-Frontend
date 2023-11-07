import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PublicAxios from "../../../Axios/PublicAxios";
import { Link } from "react-router-dom";
import Loading from "../../../components/Spinner/Loading";
import { BASE_URL } from "../../../Interceptor/baseURL";
import image from "../../../assets/blog2.png"

const UserBlogList = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PublicAxios.get("blog/blogposts/", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        setBlogData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>  
<Loading/>      
  </div>;
  }

  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="md:flex justify-between  mx-auto border p-12 transition-shadow rounded-2xl duration-300 bg-white shadow-sm sm:items-center hover:shadow lg:mx-0">
            <div className="">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From the blog
          
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
            </div>
            <div className="">
            <img src={image} alt="" />

            </div>

          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t  border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogData.map((post) => (
              <Link to="/blog-details" state={post}>
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start h-[500px] justify-between bg-white border rounded-lg shadow-lg transition-all group-hover:w-full overflow-hidden"
                >
                  <div className="">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-60 w-96 rounded-t-lg" 
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime="12;30" className="text-gray-500">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </time>
                      <a
                        href=""
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                       ZenithCare Blog
                      </a>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <div>
                          <span className="absolute inset-0" />
                      
                          <div
                          dangerouslySetInnerHTML={{
                            __html: post.title.slice(0, 50),
                          }}
                        />
                        </div>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.content.slice(0, 100),
                          }}
                        />
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        src={`${BASE_URL}media/${post.author_image}`}
                        alt="no image"
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href="gh">
                            <span className="absolute inset-0" />
                            {post.author_name}
                          </a>
                        </p>
                        <p className="text-gray-600">Author</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlogList;
