import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import padres1 from "../assets/Blog/padre1.png";
import padres2 from "../assets/Blog/padre2.png";
import padres3 from "../assets/Blog/padre3.png";
import padres4 from "../assets/Blog/padre4.png";

const InfoCard = ({ title, description }) => (
  <div
    className="relative flex flex-col items-center w-full max-w-sm p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100/30 hover:shadow-blue-500/30 transition-all duration-700 group hover:-translate-y-2"
    data-aos="zoom-in"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-4 shadow-xl group-hover:shadow-blue-500/50 transition-all duration-500">
      <div className="text-white text-2xl group-hover:scale-125 transition-all duration-500 relative z-10">
        {title === "Nuestra Escuela" ? "🏫" : "🏅"}
      </div>
    </div>
    <h3 className="font-bold text-xl text-gray-800 mt-14 mb-4 text-center group-hover:text-blue-700 transition-colors duration-500">
      {title}
    </h3>
    <p className="text-gray-600 text-sm text-center leading-relaxed group-hover:text-gray-700 font-medium">
      {description}
    </p>
  </div>
);

const ImageCard = ({ src, alt }) => (
  <div
    className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl group transform transition-all duration-500 hover:scale-105"
    data-aos="fade-up"
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-all duration-500" />
  </div>
);

const SeccionPadres = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const cards = [
    {
      title: "Nuestra Escuela",
      description:
        "No es solo un lugar de aprendizaje, sino un espacio donde se forman tradiciones, valores y logros educativos que marcan la diferencia en cada familia.",
    },
    {
      title: "Reconocimientos",
      description:
        "Somos reconocidos por la excelencia en la formación integral y el acompañamiento personalizado a nuestras familias y comunidad educativa.",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#003049] text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Columna izquierda */}
        <div>
          <h2
            className="text-4xl sm:text-5xl font-black mb-6 text-center lg:text-left"
            data-aos="fade-up"
          >
            Bienvenidos a
            <span className="block text-white">Escuela de Padres</span>
          </h2>
          <p
            className="text-base sm:text-lg mb-10 text-center lg:text-left leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Creamos un espacio donde las familias y la escuela se unen para
            impulsar la formación y el desarrollo integral de sus hijos.
            <span className="block mt-3 font-bold text-lg">
              ¡Juntos construimos el futuro!
            </span>
          </p>
          <div
            className="grid gap-6 sm:grid-cols-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {cards.map((card, idx) => (
              <InfoCard
                key={idx}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>

        {/* Columna derecha */}
        <div
          className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl shadow-2xl p-6 sm:p-8"
          data-aos="zoom-in-left"
        >
          <div className="text-center mb-8" data-aos="fade-up">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Galería
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4 rounded-full" />
            <p className="text-blue-100 text-sm sm:text-base">
              Descubre nuestras actividades y participa en la experiencia
              <span className="block text-white font-semibold mt-1">
                Escuela de Padres
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <ImageCard src={padres1} alt="Actividad Escuela de Padres 1" />
            <ImageCard src={padres2} alt="Actividad Escuela de Padres 2" />
            <ImageCard src={padres3} alt="Actividad Escuela de Padres 3" />
            <ImageCard src={padres4} alt="Actividad Escuela de Padres 4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionPadres;
