import React, { useState, useEffect } from "react";
import Navbar from "../../../components/landingPages/Navbar";
import Hero from "../../../components/landingPages/Hero";
import Trusted from "../../../components/landingPages/Trusted";
import TopTherapist from "../../../components/landingPages/TopTherapist";
import Booster from "../../../components/landingPages/Booster";
import Feedback from "../../../components/landingPages/Feedback";
import Therapist from "../../../components/landingPages/Therapist";
import Blog from "../../../components/landingPages/Blog";
import Footer from "../../../components/landingPages/Footer";
import Loading from "../../../components/Spinner/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(delay);
  }, []);

  return (
    isLoading ? (
      // Loading state
      <div><Loading/></div>
    ) : (
      // Content when loading is complete
      <div>
        <Navbar />
        <Hero />
        <TopTherapist />
        <Booster />
        <Feedback />
        <Therapist />
        <Trusted />
        <Blog />
        <Footer />
      </div>
    )
  );
};

export default Home;
