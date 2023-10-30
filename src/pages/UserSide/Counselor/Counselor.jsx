import React, { useState, useEffect } from "react";
import Navbar from "../../../components/landingPages/Navbar";
import ConCard from "../../../components/helpers/ConCard";
import Footer from "../../../components/landingPages/Footer";
import HCards from "../../../components/helpers/HCards";
import Buttons from "../../../components/helpers/Buttons";
import Filters from "../../../components/helpers/Filters";
import PublicAxios from "../../../Axios/PublicAxios";
import Loading from "../../../components/Spinner/Loading";

const Counselor = () => {
  const [therapistList, setTherapistList] = useState([]);
  const [loading,setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  useEffect(() => {
    setLoading(true)
    try {
      PublicAxios.get(`vendor/topTherapist`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((response) => {
        JSON.stringify(response);
        console.log(response.data);
        setTherapistList(response.data);
        setLoading(false)
      });
    } catch (error) {
      console.log("Error fetching user data:", error);
      setLoading(true)
    }
  }, []);

  const filteredTherapistdata = therapistList.filter((therapist) => {
    const nameMatch = therapist.therapist_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      filterCategory === "" || therapist.categories.name === filterCategory;
    const languageMatch =
      filterLanguage === "" ||
      therapist.languages.some(
        (language) => language.language === filterLanguage
      );

    return nameMatch && categoryMatch && languageMatch;
  });

  return (
    <div>
      <Navbar />
      {loading &&<Loading/>}
      <div className="bg-white p-4">
        <div className="rounded p-5">
          <Filters
            searchQuery={searchQuery}
            onSearchQueryChange={(value) => setSearchQuery(value)}
            filterCategory={filterCategory}
            isFilter={true}
            onFilterCategoryChange={(value) => setFilterCategory(value)}
            filterLanguage={filterLanguage}
            onFilterLanguageChange={(value) => setFilterLanguage(value)}
          />
        </div>

        {filteredTherapistdata.map((therapist, index) => (
          <HCards
            key={index}
            name={`${therapist.therapist_name}`}
            certification="® Certified & Verified"
            specializations={
              therapist && therapist.categories && therapist.categories.name
            }
            buttonText="View Profile"
            language={therapist.languages.map((language, index) => (
              <span key={index}>{language.language},</span>
            ))}
            id={therapist.user}
            image={therapist.therapist_image}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Counselor;
