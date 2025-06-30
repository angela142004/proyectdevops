import React, { useEffect } from "react";
import blog from "../assets/Blog/blog_u.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Fondo = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start text-white"
      style={{ backgroundImage: `url(${blog})` }}
      data-aos="zoom-in"
      data-aos-delay="200"
    >
      {/* Degradado dinámico animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-transparent z-0 animate-pulse"></div>

      {/* Contenedor de texto */}
      <div
        className="relative z-10 px-6 sm:px-12 md:px-24 max-w-2xl text-left flex flex-col justify-center h-full"
        data-aos="fade-right"
        data-aos-delay="400"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl mb-4">
          Blog Institucional
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-green-400 rounded-full animate-pulse"></div>
        <p className="mt-4 text-lg sm:text-xl text-white/80">
          Explora nuestras últimas noticias, logros y novedades educativas
        </p>
      </div>
    </div>
  );
};

export default Fondo;
