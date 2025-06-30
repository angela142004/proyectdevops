import React, { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const extraVideos = [
  {
    title: "Reconocimiento Regional",
    url: "https://www.youtube.com/embed/QEpJy9eiqX4",
  },
  {
    title: "Ceremonia de Mérito",
    url: "https://www.youtube.com/embed/FOt91LmV_fY",
  },
  {
    title: "Celebración Aniversario",
    url: "https://www.youtube.com/embed/Ic8EgWhbA9U",
  },
];

const WelcomeVideo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative py-16 md:py-20 px-4 bg-[#f0e4d0] overflow-hidden">
      {/* Fondo decorativo animado */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-0 right-16 w-64 h-64 bg-yellow-300/20 rounded-full blur-2xl animate-float-slow"
          style={{ animationDelay: "0.7s" }}
        />
        <div
          className="absolute bottom-40 left-1/3 w-80 h-48 bg-white/10 rounded-full blur-2xl animate-float-slow"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-56 h-56 bg-purple-400/15 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "1.7s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Título */}
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003049] drop-shadow-xl mb-4"
          data-aos="fade-up"
        >
          Nuestro Reconocimiento
        </h1>
        <h2
          className="text-2xl md:text-3xl font-bold text-[#003049] mb-3"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          ¡BIENVENIDO!
        </h2>

        <div
          className="flex items-center justify-center gap-3 text-purple-200 font-medium mb-10"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <FaMapMarkerAlt className="text-lg text-[#003049] animate-bounce-slow" />
          <span className="text-[#003049] md:text-lg leading-relaxed">
            Mira nuestro video institucional y conoce el espíritu Prisma.
          </span>
        </div>

        {/* VIDEO PRINCIPAL */}
        <div
          className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition duration-500 border-2 border-[#a69fff]/20 bg-white/10 backdrop-blur-md mb-10 md:mb-16"
          data-aos="zoom-in"
        >
          <iframe
            className="w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/4ZXV4uexlTU"
            title="Video institucional Colegio Prisma"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* NUEVOS VIDEOS EN FILA */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
          data-aos="fade-up"
        >
          {extraVideos.map((video, i) => (
            <div
              key={i}
              className="aspect-video rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform hover:scale-105 border border-white/20 backdrop-blur-md bg-white/20"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <iframe
                className="w-full h-full rounded-2xl"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeVideo;
