import React, { useState, useEffect } from "react";
import PublicAxios from "../../Axios/PublicAxios";
import { Link,useNavigate } from "react-router-dom";
const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate()
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

  const navigateToBlog = (data, event) => {
    event.preventDefault(); // Prevent the default behavior of the event
   
  }

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 row-gap-8 lg:grid-cols-5">
        {blogData.length > 0 && (
          <div onClick={(event) => navigateToBlog(blogData[0], event)} key={blogData[0].id} className="lg:col-span-2">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
         
              {new Date(blogData[0].created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
            </p>
            <div className="mb-3">
            <Link to="/blog-details" state={blogData[0]}
                aria-label="Article"
                className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-4xl xl:text-5xl">
                  {blogData[0].title}
                </p>
              </Link>
            </div>
            <p className="mb-4 text-base text-gray-700 md:text-lg">
              <div
                dangerouslySetInnerHTML={{
                  __html: blogData[0].content.slice(0, 100),
                }}
              />
            </p>
            <div className="flex items-center">
              <Link to="/blog-details" state={blogData[0]} aria-label="Author" className="mr-3">
                <img
                  src={`http://127.0.0.1:8000/media/${blogData[0].author_image}`}
                  alt={blogData[0].title}
                  className="object-cover w-10 h-10 rounded-full shadow-sm"
                />
              </Link>
              <div>
              <Link to="/blog-details" state={blogData[0]}
                  aria-label="Author"
                  className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  {blogData[0].author_name}
                </Link>
                <p className="text-sm font-medium leading-4 text-gray-600">
                  Author
                </p>
              </div>
            </div>
          </div>
       
        )}

        <div className="flex flex-col space-y-8 lg:col-span-3">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
              14 Jul 2020
            </p>
            <div className="mb-3">
              <a
                href="/"
                aria-label="Article"
                className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
                  Mascarpone cheese triangles taleggio
                </p>
              </a>
            </div>
            <p className="mb-4 text-base text-gray-700 md:text-lg">
              Brie cheese triangles cheesecake. Cauliflower cheese cheese and
              wine manchego bocconcini croque monsieur queso airedale brie.
            </p>
            <div className="flex items-center">
              <a href="/" aria-label="Author" className="mr-3">
                <img
                  alt="avatar"
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  className="object-cover w-10 h-10 rounded-full shadow-sm"
                />
              </a>
              <div>
                <a
                  href="/"
                  aria-label="Author"
                  className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  Alex Stratulat
                </a>
                <p className="text-sm font-medium leading-4 text-gray-600">
                  Author
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
