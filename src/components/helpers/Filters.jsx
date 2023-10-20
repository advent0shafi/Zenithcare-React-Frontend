import React from 'react';

const Filters = ({ searchQuery, onSearchQueryChange }) => {
  const handleSearchChange = (event) => {
    onSearchQueryChange(event.target.value);
  };

  return (
    <>
      <div className="mb-5">
        <div className="bg-white">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Therapists
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                Quick Search For Therapist
              </h2>
            </div>
            <div className="flex items-center sm:justify-center">
              <form className="flex">
                <input
                  placeholder="Search by username"
                  type="search"
                  className="flex-grow w-full h-12 px-4 mb-3 text-gray-500 transition duration-200 bg-transparent border-2 border-gray-400 rounded appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-200 focus:outline-none focus:shadow-outline"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="inline-flex items-center bg-[#051570] justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
