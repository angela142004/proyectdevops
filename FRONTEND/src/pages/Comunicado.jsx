import React, { useState, useEffect } from "react";
import Crush from "../components/Crush";
import pict from "../assets/eventos.png";
import { FiBook } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Footer } from "../components/Footer";
import Calendar from "../components/Calendar";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Comunicado() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comunicados, setComunicados] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=1`,
          {
            headers: { "x-api-key": API_KEY },
            cache: "no-cache",
          }
        );
        if (!response.ok) throw new Error("Error al cargar los posts");
        const data = await response.json();
        setPosts(data);
        console.log("EVENTOS>>>", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchComunicados = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=3`,
          {
            headers: { "x-api-key": API_KEY },
            cache: "no-cache",
          }
        );
        if (!response.ok) throw new Error("Error al cargar los comunicados");
        const data = await response.json();
        setComunicados(data);
        console.log("COMU>>>", data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPosts();
    fetchComunicados();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div>
      {/* Hero */}
      <Crush
        pict={pict}
        onVerEventos={() => {
          const el = document.getElementById("proximos-eventos");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onVerComunicados={() => {
          const el = document.getElementById("comunicados");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ─────────────  PRÓXIMOS EVENTOS  ───────────── */}
      <section
        className="bg-gradient-to-br from-[#f0e4d0] via-[#f5e9d3] to-[#ede0c8] text-[#003049] py-20 px-4 sm:px-8 lg:px-24 relative overflow-hidden"
        id="proximos-eventos"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#6698BC] opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#003049] opacity-10 rounded-full blur-2xl animate-ping"></div>

        <div className="relative z-10">
          {/* Título */}
          <div className="text-center mb-16" data-aos="zoom-in">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-[#003049] to-[#6698BC] bg-clip-text text-transparent mb-4">
              PRÓXIMOS EVENTOS
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#003049] to-[#6698BC] mx-auto rounded-full"></div>
          </div>

          {/* Contenido */}
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#6698BC] border-t-transparent mx-auto mb-4"></div>
                <p className="text-[#003049] opacity-70 font-medium">
                  Cargando eventos...
                </p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-16">
                <div className="bg-red-100 border border-red-300 rounded-xl p-6 max-w-md mx-auto">
                  <p className="text-red-600 font-semibold">{error}</p>
                </div>
              </div>
            ) : (
              posts.map((post, idx) => (
                <div
                  key={post.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] border border-white/20 backdrop-blur-sm"
                  data-aos={idx % 2 === 0 ? "fade-up" : "fade-down"}
                  data-aos-delay={idx * 100}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6698BC]/10 to-[#003049]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Ajuste mejorado para tablets */}
                  <div className="flex flex-col lg:flex-row h-full relative z-10">
                    {/* Imagen */}
                    <div className="lg:w-2/5 w-full h-48 lg:h-auto overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img
                        src={post.images?.[0]?.image_url || pict}
                        alt={post.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                    </div>

                    {/* Contenido */}
                    <div className="lg:w-3/5 w-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#6698BC] to-[#5a87a8]">
                      <div>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-[#f0e4d0] transition-colors duration-300 mb-3">
                          {post.title}
                        </h3>
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20 text-sm text-white space-y-1">
                          <div className="flex items-center">
                            <span className="mr-2">📅</span>
                            <strong className="mr-2">Inicio:</strong>
                            <span>{formatDate(post.start_at)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">🏁</span>
                            <strong className="mr-2">Fin:</strong>
                            <span>{formatDate(post.end_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Posición */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[#003049] text-white rounded-full flex items-center justify-center text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {idx + 1}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Botón */}
          <div className="text-center mt-16" data-aos="zoom-in-up">
            <button
              onClick={() => {
                const el = document.getElementById("calendar-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#003049] to-[#6698BC] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
            >
              <span className="z-10 flex items-center relative">
                <span className="mr-3">📅</span>
                Ver Calendario Completo
                {/* ...icono... */}
              </span>
              {/* ...decoración... */}
            </button>
            <p className="mt-4 text-[#003049]/70 text-sm font-medium">
              Explora todos los eventos en nuestro calendario interactivo
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────  COMUNICADOS (FULLY RESPONSIVE + AOS)  ───────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#1a2238] via-[#26335D] to-[#1e2a52] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        id="comunicados"
      >
        {/* Fondos decorativos animados */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-bl from-cyan-400/20 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-tr from-indigo-500/15 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/3 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-blue-300/10 to-cyan-300/5 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/5 rounded-full blur-xl animate-pulse delay-500" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8 sm:mb-12" data-aos="zoom-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-blue-300 drop-shadow-lg">
              COMUNICADOS
            </h2>
            <div className="mt-2 h-1 w-24 sm:w-32 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-blue-500/30" />
            <p className="mt-4 text-sm sm:text-base md:text-lg text-blue-100/90 max-w-xl mx-auto leading-relaxed">
              Mantente informado con nuestras últimas noticias y anuncios
              oficiales
            </p>
          </div>

          {/* Grid de comunicados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {comunicados.length === 0 ? (
              <div
                className="col-span-full text-center py-12"
                data-aos="fade-up"
              >
                <div className="mx-auto max-w-sm bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 sm:p-12 shadow-xl shadow-black/20">
                  <div className="text-5xl sm:text-6xl mb-4 opacity-70 animate-bounce">
                    📢
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    No hay comunicados disponibles
                  </h3>
                  <p className="text-sm sm:text-base text-blue-200/80">
                    Pronto publicaremos nuevos comunicados oficiales
                  </p>
                </div>
              </div>
            ) : (
              comunicados.map((post, idx) => (
                <div
                  key={post.id}
                  className="group relative bg-white/90 backdrop-blur-md text-gray-900 rounded-2xl overflow-hidden
              transform transition duration-500 ease-out
              hover:-translate-y-2 hover:scale-105 hover:shadow-2xl
              border border-white/20 flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {/* Imagen */}
                  <div className="relative w-full h-40 sm:h-48 md:h-52 overflow-hidden">
                    <img
                      src={post.images?.[0]?.image_url || pict}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#26335D] via-blue-600 to-cyan-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-white/20">
                      📢 COMUNICADO
                    </div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-70" />
                    <div className="absolute top-6 right-8 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-500 opacity-50" />
                  </div>

                  {/* Contenido */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-[#26335D] transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl px-3 py-1 flex items-center space-x-2 shadow-sm border border-blue-100/50">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse-slow" />
                        <span className="text-xs sm:text-sm font-medium">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-800 mb-4 max-h-32 overflow-hidden">
                      <p className="leading-relaxed text-sm sm:text-base break-words">
                        {post.content}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-200/30">
                      <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs sm:text-sm">
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse-slow" />
                        <span>Comunicado oficial</span>
                        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse-slow delay-500" />
                      </div>
                    </div>
                  </div>

                  {/* Número de orden */}
                  <div className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm border border-white/40 text-[#26335D] rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold opacity-80 transition-opacity group-hover:opacity-100">
                    {idx + 1}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─────────────  NORMAS INSTITUCIONALES (con AOS variados)  ───────────── */}
      <section className="bg-gradient-to-r from-[#9b1c1c] via-[#b73333] to-[#9b1c1c] text-white py-20 px-4 sm:px-8 lg:px-24 relative overflow-hidden">
        {/* Fondo decorativo animado */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />

        <div className="relative z-10">
          {/* Título */}
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide"
            data-aos="zoom-in-up"
            data-aos-delay="100"
          >
            NORMAS INSTITUCIONALES
          </h2>

          {/* Tarjetas */}
          <div className="max-w-[1400px] mx-auto flex justify-center">
            <div className="flex flex-wrap gap-8 justify-center">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white text-black rounded-2xl shadow-md p-6 flex flex-col items-center text-center
            transition transform hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-[#445da7] w-[300px]"
                  data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={i * 200}
                >
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <FiBook size={32} className="text-[#445da7]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Reglamento Interno
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Documento oficial con las normas que rigen la convivencia y
                    disciplina de los estudiantes.
                  </p>
                  <a
                    href="https://www.trilcelm.edu.pe/lamolina/doc/reglamento_interno.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-[#445da7] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2f457d] transition"
                  >
                    Ver documento 📄
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendario y footer */}
      <Calendar />
      <Footer />

      {/* --- Animaciones personalizadas --- */}
      <style>
        {`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,2,.6,1) both;}
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down { animation: fade-in-down 0.7s cubic-bezier(.4,2,.6,1) both;}
        .animate-pulse-on-hover:hover, .animate-pulse-on-hover:focus {
          animation: pulse 0.7s;
        }
        @keyframes pulse {
          0% { transform: scale(1);}
          40% { transform: scale(1.09);}
          100% { transform: scale(1);}
        }
      `}
      </style>
    </div>
  );
}
