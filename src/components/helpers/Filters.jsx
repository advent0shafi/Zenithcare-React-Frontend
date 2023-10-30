import React, { useState, useEffect } from "react";

const Filters = ({
  searchQuery,
  onSearchQueryChange,
  filterCategory, // Add filterCategory as a prop
  onFilterCategoryChange, // Add onFilterCategoryChange as a prop
  filterLanguage, 
  isFilter,// Add filterLanguage as a prop
  onFilterLanguageChange, // Add onFilterLanguageChange as a prop
}) => {
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
            <div className="md:flex items-center sm:justify-center">
              <form className="md:flex ">
                <input
                  placeholder="Search by username"
                  type="search"
                  className="flex-grow w-full h-12 px-4 mb-3 text-gray-500 transition duration-200 bg-transparent border-2 border-gray-400 rounded appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-200 focus:outline-none focus:shadow-outline"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
               { isFilter &&<select
                  value={filterLanguage}
                  onChange={(e) => onFilterLanguageChange(e.target.value)}
                  className="w-48 h-12 px-4 mb-3 text-gray-500 border-2 border-gray-400 rounded appearance-none"
                >
                  <option value="">All Languages</option>
                  {["Marathi", "Hindi", "Tamil", "English", "Malayalam"].map(
                    (language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    )
                  )}
                </select>}
                { isFilter && <select
                  value={filterCategory}
                  onChange={(e) => onFilterCategoryChange(e.target.value)}
                  className="w-48 h-12 px-4 mb-3 text-gray-500 border-2 border-gray-400 rounded appearance-none"
                >
                  <option value="">All Categories</option>
                  {[
                    "Gender Identity and LGBTQ+ Issues",
                    "Child and Adolescent Therapy",
                    "Obsessive-Compulsive Disorder (OCD)",
                    "Addiction and Substance Abuse",
                    "Eating Disorders",
                    "Grief and Loss",
                    "Self-Esteem and Confidence",
                    "Stress Management",
                    "Relationship and Family Issues",
                    "Trauma and PTSD",
                    "Depression and Mood Disorders",
                    "Anxiety Disorders",
                  ].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>}

               
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
