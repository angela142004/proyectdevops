import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";

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
  const [videos, setVideos] = useState(extraVideos);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [errorVideos, setErrorVideos] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoadingVideos(true);
      setErrorVideos(null);
      try {
        const res = await fetch(`${API_BASE_URL}/prisma/blog`, {
          headers: { "x-api-key": API_KEY },
          cache: "no-cache",
        });
        if (!res.ok) throw new Error("Error al obtener videos");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setVideos(
            data.map((v) => ({ title: v.id || "Video", url: v.enlace }))
          );
        } else {
          setVideos(extraVideos);
        }
      } catch (err) {
        setErrorVideos(err.message);
        setVideos(extraVideos);
      } finally {
        setLoadingVideos(false);
      }
    };
    fetchVideos();
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
          <FaMapMarkerAlt className="text-lg text-[#003049] animate-bounce-slow" />w
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
          {videos.map((video, i) => (
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
