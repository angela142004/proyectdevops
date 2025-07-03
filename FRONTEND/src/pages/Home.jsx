import React from "react";
import Hero from "../components/Hero";
import EducationalPillars from "../components/Base";
import Level from "../components/Level";
import { Footer } from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <main>
      <Hero />
      <EducationalPillars />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};
export default Home;
