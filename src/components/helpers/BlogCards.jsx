import React, { useState } from "react";

function BlogCards({ title, content, author_name, created_at, image,deleteHandle,id}) {
  const [showFullContent, setShowFullContent] = useState(false);


  const handleButtonDelete=()=>{
    deleteHandle(id)
  }
  const toggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="overflow-hidden transition-shadow hover:bg-orange-100 duration-300 bg-white rounded shadow-sm">
      <div className="p-5 border ">
      <img src={image} className="object-cover w-full h-64" alt="" />
        <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
          <a
            href="/"
            className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
            aria-label="Category"
            title="traveling"
          >
            {author_name}
          </a>
          <span className="text-gray-600">
            {new Date(created_at).toLocaleDateString()}
          </span>
        </p>
        <a
          href="/"
          aria-label="Category"
          title="Visit the East"
          className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          {title}
        </a>
        <p className="mb-2 text-gray-700">
          {showFullContent ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content.slice(0,20) }} />
          )}
        </p>
        {content.length > 200 && (
          <button
            onClick={toggleFullContent}
            className="text-deep-purple-accent-400 hover:text-deep-purple-800 cursor-pointer"
          >
            {showFullContent ? "Show Less" : "Read More"}
          </button>
        )}
        <div className=" flex justify-center items-center">
          <button onClick={handleButtonDelete} className="bg-blue-800 p-3 rounded-xl hover:bg-transparent hover:text-black shadow-lg text-white">
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCards;
