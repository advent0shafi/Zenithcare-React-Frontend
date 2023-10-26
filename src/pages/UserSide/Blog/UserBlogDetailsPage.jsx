import React, { useState, useEffect } from "react";
import Navbar from "../../../components/landingPages/Navbar";
import Footer from "../../../components/landingPages/Footer";
import image from "./../../../assets/people.jpg";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PublicAxios from "../../../Axios/PublicAxios";
import { useSelector, useDispatch } from "react-redux";

const UserBlogDetailsPage = () => {
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const { state } = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    PublicAxios.get(`/blog/blog-comments/${state.id}/`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await PublicAxios.get(
          `/blog/blog-likes/${state.id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        ); // Replace with your API endpoint
        setLikeCount(response.data.like_count);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    fetchLikeCount();
  }, []);

  const handleLike = async () => {
    try {
      await PublicAxios.post(
        `/blog/like/${state.id}/`,
        { userId: user_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    PublicAxios.post("/blog/comment-create/", {
      user: user_id,
      post: state.id,
      text: commentText,
    })
      .then((response) => {
        console.log("Comment created:", response.data);
        setComments((prevComments) => [...prevComments, response.data]);
        setCommentText('');
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };
  

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg">
        <img
          src={state.image}
          alt="Blog Post"
          className="rounded-lg w-full h-64 object-cover"
        />
        <h1 className="text-3xl text-center mt-6 mb-2 font-semibold text-gray-800">
          {state.title}
        </h1>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              onClick={() => {
                console.log(state.title);
              }}
              src={image}
              alt="Author"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              <p className="text-gray-700">{state.author_name}</p>
              <p className="text-gray-500 text-sm">
                {new Date(state.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`text-gray-500 hover:text-blue-500 ${
                isLiked ? "text-red-500" : ""
              }`}
              onClick={handleLike}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="h-5 w-5"
                color={isLiked ? "red" : "currentColor"}
              />
            </button>
            <span className="text-gray-500">{likeCount}</span>
          </div>
        </div>

        <p className="mt-12 text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: state.content }} />
        </p>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Comments</h3>
          <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add your comment..."
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Add Comment
      </button>
    </form>
          <div className="mt-2 space-y-4">
           { comments.map((comment) => (<div key={comment.id} className="bg-gray-100 p-3 rounded-lg">
              <p className="text-gray-700">
                Comment by <span className="font-semibold">{comment.author_name}</span>
              </p>
              <p className="mt-2">{comment.text}</p>
            </div>))}
           
           
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserBlogDetailsPage;
