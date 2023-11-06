import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import PrivateAxios from "../../../Interceptor/AxiosInterceptor";

const AdminCatogery = () => {
  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState([]);

  const [isCreatingCategory, setIsCreatingCategory] = useState(true); // Added state variable

  const [displayCount, setDisplayCount] = useState(5);
  const [count, setCount] = useState(5);

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    PrivateAxios.get("adminside/categories/")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    PrivateAxios.get("adminside/language/")
      .then((response) => {
        console.log(response.data);
        setLanguage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching language:", error);
      });
  }, []);

  const handleShowMore = (e) => {
    if (e == 1) {
      setDisplayCount(displayCount + 5);
    } else {
      setCount(count + 5);
    }
  };
  const handleShowLess = (e) => {
    if (e == 1) {
      setDisplayCount(displayCount - 5);
    } else {
      setCount(count - 5);
    }
  };

  const toggleCreateCategoryOrLanguage = () => {
    setIsCreatingCategory((prev) => !prev);
  };

  const handleOpen = () => setOpen(!open);

  const handleBlockToggle = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);

    if (category) {
      const apiUrl = `adminside/categories/${categoryId}/${
        category.is_blocked ? "unblock" : "block"
      }/`; // Replace with your API endpoints

      PrivateAxios.put(apiUrl)
        .then((response) => {
          const updatedCategories = categories.map((cat) => {
            if (cat.id === categoryId) {
              return { ...cat, is_blocked: !cat.is_blocked };
            }
            return cat;
          });
          setCategories(updatedCategories);
        })
        .catch((error) => {
          console.error("Error toggling category:", error);
        });
    }
  };

  const handleLanguageBlockToggle = (languageId) => {
    const languages = language.find((language) => language.id === languageId);

    if (languages) {
      const apiUrl = `adminside/language/${languageId}/${
        languages.is_blocked ? "unblock" : "block"
      }/`;

      PrivateAxios.put(apiUrl)
        .then((response) => {
          const updatedLanguage = language.map((language) => {
            if (language.id === languageId) {
              return { ...language, is_blocked: !language.is_blocked };
            }
            return language;
          });
          setLanguage(updatedLanguage);
        })
        .catch((error) => {
          console.error("Error toggling language:", error);
        });
    }
  };


  const handleSubmit = () => {
    const apiUrl = isCreatingCategory
      ? 'adminside/categories-create/'
      : 'adminside/language-create/';
  
    const dataToSend = isCreatingCategory
      ? { name: inputValue } // Assuming your API expects a 'name' field for categories
      : { language: inputValue }; // Assuming your API expects a 'language' field for languages
  
    PrivateAxios.post(apiUrl, dataToSend)
      .then((response) => {
        // Handle the success response, e.g., display a success message or update the list of categories or languages
        alert('success')
        console.log('Data sent successfully:', response.data);
        setInputValue("")
        if (isCreatingCategory) {
          setCategories((prevCategories) => [...prevCategories, response.data]);
        } else {
          setLanguage((prevLanguage) => [...prevLanguage, response.data]);
        }
        handleOpen();
      })
      .catch((error) => {
        // Handle any errors, e.g., display an error message
        console.error('Error sending data:', error);
      });
  };
  


  return (
    <>
      <div className="px-4 pb-24 h-screen overflow-auto md:px-6 ">
        <div>
          <div className="">
            <div className=" p-4">
              <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                <div className="flex ">
                  <p
                    onClick={() => toggleCreateCategoryOrLanguage()}
                    className="text-lg font-light cursor-pointer"
                  >
                    {isCreatingCategory
                      ? "Category Configure"
                      : "Language Configure"}
                  </p>
                </div>
                <div className="flex justify-start">
                  <div
                    onClick={handleOpen}
                    className="bg-white px-8 py-4 border "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-4">
              <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                <div className="">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h1 className="text-2xl font-bold mb-4 text-blue-700">
                        Categories
                      </h1>
                      <h1>Actions</h1>
                    </div>

                    <ul className="space-y-2">
                      {categories.slice(0, displayCount).map((category) => (
                        <li key={category.id} className="flex items-center">
                          <span className="flex-grow">{category.name}</span>
                          <button
                            onClick={() => handleBlockToggle(category.id)}
                            className={`h-8 rounded font-bold  w-28 ${
                              category.is_blocked
                                ? "bg-[#051570] text-white"
                                : "bg-[#051570] text-white"
                            }`}
                          >
                            {category.is_blocked ? "Unblock" : "Block"}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {displayCount < categories.length ? (
                      <>
                        <button
                          onClick={() => handleShowMore(1)} // Pass a function reference
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-4"
                        >
                          Show More
                        </button>
                        {displayCount > 5 && (
                          <button
                            onClick={() => handleShowLess(1)} // Pass a function reference
                            className="bg-gray-500 text-white px-3 py-1 rounded-lg mt-4 ml-2"
                          >
                            Show Less
                          </button>
                        )}
                      </>
                    ) : displayCount > 5 ? (
                      <button
                        onClick={() => handleShowLess(1)} // Pass a function reference
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg mt-4"
                      >
                        Show Less
                      </button>
                    ) : null}
                  </div>
                </div>
                <p className="italic"></p>
              </div>
            </div>

            <div className=" p-4">
              <div className="transition-shadow duration-300 bg-white border shadow-sm sm:items-center hover:shadow text-black p-6 rounded-lg mb-4 w-full">
                <div className="">
                 
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h1 className="text-2xl font-bold mb-4 text-blue-700">
                        Categories
                      </h1>
                      <h1>Actions</h1>
                    </div>

                    <ul className="space-y-2">
                      {language.slice(0, count).map((language) => (
                        <li key={language.id} className="flex items-center">
                          <span className="flex-grow">{language.language}</span>
                          <button
                            onClick={() =>
                              handleLanguageBlockToggle(language.id)
                            }
                            className={`h-8 rounded font-bold  w-28 ${
                              language.is_blocked
                                ? "bg-[#051570] text-white"
                                : "bg-[#051570] text-white"
                            }`}
                          >
                            {language.is_blocked ? "Unblock" : "Block"}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {count < categories.length ? (
                      <>
                        <button
                          onClick={handleShowMore}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-4"
                        >
                          Show More
                        </button>
                        {count > 5 && (
                          <button
                            onClick={handleShowLess}
                            className="bg-gray-500 text-white px-3 py-1 rounded-lg mt-4 ml-2"
                          >
                            Show Less
                          </button>
                        )}
                      </>
                    ) : count > 5 ? (
                      <button
                        onClick={handleShowLess}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg mt-4"
                      >
                        Show Less
                      </button>
                    ) : null}
                  </div>
                </div>
                <p className="italic"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              {isCreatingCategory ? "Add Category" : "Add Language"}
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            {isCreatingCategory ? "Create a Category" : "Create a Language"}
          </Typography>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              {isCreatingCategory ? "Category Name" : "Language Name"}
            </Typography>
            <Input
              label={isCreatingCategory ? "Category" : "Language"}
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default AdminCatogery;
