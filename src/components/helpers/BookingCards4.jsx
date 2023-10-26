import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const BookingCards4 = ({ handleUserInfo, username }) => {
  const [formData, setFormData] = useState({
    name: username,
    place: "",
    age: '',
    summary: "",
    gender: "",
    relationship_status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleData = () => {
    if (
      formData.name &&
      formData.place &&
      formData.age > 0 &&
      formData.gender &&
      formData.relationship_status
    ) {
      handleUserInfo(formData);
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleData();
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Name
            </label>
            <input
              class="appearance-none block w-full bg-[#F8FAFF] text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              place
            </label>
            <input
              class="appearance-none block w-full bg-[#F8FAFF] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="place"
              value={formData.place}
              placeholder="place"
              onChange={handleChange}
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="relationship_status"
            >
              Relationship Status
            </label>
            <div class="relative">
              <select
                className="block appearance-none w-full bg-[#F8FAFF] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="relationship_status"
                value={formData.relationship_status}
                onChange={handleChange}
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="In a Relationship">In a Relationship</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="gender" // Use htmlFor instead of "for" for accessibility
            >
              GENDER
            </label>
            <div class="relative">
              <select
                className="block appearance-none w-full bg-[#F8FAFF] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="gender" // Add the name attribute to associate with form data
                value={formData.gender} // Set the selected value based on your form data
                onChange={handleChange} // Handle changes in the handleChange function
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-zip"
            >
              age
            </label>
            <input
              class="appearance-none block w-full bg-[#F8FAFF] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              value={formData.age}
              name="age"
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Aditional Info
            </label>
            <textarea
              class="appearance-none block w-full bg-[#F8FAFF] text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="summary"
              value={formData.summary}
              placeholder="write if any specfic text"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-900 p-2 rounded-md text-white font-bold"
        >
          Submit
        </button>
      </form>
      <p className="text-green-800">
        Included email support with Dr Pooja Sharma for 48-hours after session
      </p>
      <Toaster />
    </div>
  );
};

export default BookingCards4;
