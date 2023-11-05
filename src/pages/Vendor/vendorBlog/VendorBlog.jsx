import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BlogCards from "../../../components/helpers/BlogCards";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import PublicAxios from "../../../Axios/PublicAxios";
import Loading from "../../../components/Spinner/Loading";

const VendorBlog = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading,setLoading] = useState(false)
  const authstate = useSelector((state) => state.auth);
  const user_id = authstate.user_id;
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    author: user_id,
  });
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
  const [blogData, setBlogData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file input
  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();

    // Create a FormData object for uploading files
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("image", formData.image);

    // Append the author field with its value (assuming formData.author contains the author's ID)
    postData.append("author", formData.author);

    PublicAxios.post("blog/blogcreate", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("New blog post created:", response.data);
        // navigate('/vendor/vendor-blog')
        // Update the blogData state with the new blog post at the beginning
        setBlogData([response.data, ...blogData]);

        // Clear the form after successful submission
        setFormData({
          title: "",
          content: "",
          image: null,
          author: user_id,
        });

        // Close the dialog or perform any other necessary actions
        setLoading(false)
        handleOpen();
      })
      .catch((error) => {
        setLoading(false)

        console.error("Error creating blog post: ", error);
      });
  };

  const deleteHandle = (postId) => {
    setLoading(true)

    // Send a delete request to your backend
    PublicAxios.delete(`blog/blog-delete/${postId}/`)
      .then((response) => {
        alert("Blog post deleted:", postId);

        // Update the blogData state by removing the deleted post
        setLoading(false)

        setBlogData(blogData.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        setLoading(false)

        console.error("Error deleting blog post: ", error);
      });
  };

  // const deleteHandle=(postId)=>{
  //   console.log("Am on Delete");
  //   handleDeletes(postId)
  // }
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await PublicAxios.get(`blog/bloglist/${user_id}`);
        console.log("Fetched data:", response.data);
        setBlogData(response.data);
        handleOpen();
        setLoading(false)

      } catch (error) {
        setLoading(false)

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div className="justify-center items-center pr-24 pl-24">
          <form className="bg-white mt-4 py-2 input-box-shadow rounded-md flex justify-between">
            <input
              className="bg-white"
              type="text"
              placeholder="Search therapist here"
              style={{ width: "100%" }} // Adjust the width here
            />
            <div className="mr-4 mt-2">
              <FontAwesomeIcon icon={faMagnifyingGlass} beat />
            </div>
          </form>
        </div>
        <div className="p-4 flex justify-center items-center">
          <button
            onClick={handleOpen}
            className="bg-blue-900 text-white p-3 rounded-lg border shadow-md"
          >
            Add Blog +
          </button>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
            {blogData.map((blog, key) => (
              <BlogCards key={key} {...blog} deleteHandle={deleteHandle} />
            ))}
          </div>
        </div>
      </div>

      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Add Blog
              </Typography>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
  {loading && <div><Loading /></div>}
  <form onSubmit={handleSubmit}>
    <div className="mb-1 flex flex-col gap-6">
      <div className="overflow-hidden overflow-y-auto max-h-[400px]">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Title
        </Typography>
        <Input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          size="lg"
          placeholder="Enter the title"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Post Content
        </Typography>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
        />
        <div>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
      </div>
    </div>
    <Button className="mt-6" fullWidth type="submit">
      Submit
    </Button>
  </form>
</DialogBody>

      </Dialog>
    </div>
  );
};

export default VendorBlog;
