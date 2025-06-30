import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRegSmile } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import escolar1 from "../assets/Blog/escolar1.jpg";
import escolar2 from "../assets/Blog/escolar2.jpg";
import escolar3 from "../assets/Blog/escolar3.jpg";

const fotos = [{ src: escolar1 }, { src: escolar2 }, { src: escolar3 }];

const colors = ["border-[#D7263D]", "border-[#5D8CA9]", "border-[#A6122E]"];

const InicioEscolar = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="bg-[#003049] py-20 px-4 sm:px-6 lg:px-10 font-poppins">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent drop-shadow-xl tracking-tight"
          data-aos="flip-left"
        >
          INICIO AÑO ESCOLAR 2025
        </h1>

        {/* Barra decorativa */}
        <div
          className="mx-auto w-24 sm:w-32 h-1 rounded-full bg-gradient-to-r from-[#D7263D] via-[#FFD600] to-[#5D8CA9] mb-6 animate-pulse shadow-lg"
          data-aos="slide-right"
        ></div>

        {/* Descripción */}
        <div className="mb-10 max-w-2xl mx-auto text-center">
          <p
            className="text-base sm:text-lg md:text-2xl text-[#f5f5fa] font-semibold leading-relaxed flex flex-wrap justify-center items-center gap-2"
            data-aos="fade-up-right"
          >
            Comenzamos un nuevo año con{" "}
            <span className="text-[#FFD600] font-extrabold">entusiasmo</span> y
            ganas de aprender.
            <FaRegSmile className="inline-block text-2xl text-[#FFD600] drop-shadow animate-bounce" />
          </p>
          <span
            className="text-sm sm:text-lg md:text-xl mt-3 text-[#FFD600] font-bold tracking-wide flex items-center justify-center gap-1"
            data-aos="fade-up-left"
            data-aos-delay="200"
          >
            ¡Bienvenidos a este nuevo ciclo!{" "}
            <FiStar className="text-xl animate-pulse" />
          </span>
        </div>

        {/* Galería de imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {fotos.map((foto, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl ${
                colors[i % colors.length]
              } border-2 shadow-lg overflow-hidden transform transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl group`}
              data-aos={["flip-up", "flip-down", "flip-left"][i % 3]}
              data-aos-delay={i * 150}
            >
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={foto.src}
                  alt={`Foto escolar ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InicioEscolar;
