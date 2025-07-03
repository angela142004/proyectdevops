import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import {
  BookOpen,
  Laptop,
  Heart,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const metodologia = [
  {
    title: "Aprendizaje activo",
    description:
      "Involucramos a los estudiantes en la construcción de su conocimiento a través de proyectos, investigación y experiencias significativas.",
    icon: BookOpen,
    accent: "#6366f1",
    pattern: "pattern-1",
  },
  {
    title: "Tecnología educativa",
    description:
      "Integramos herramientas digitales para potenciar el aprendizaje, desarrollar habilidades TIC y preparar a los estudiantes para el mundo actual.",
    icon: Laptop,
    accent: "#10b981",
    pattern: "pattern-2",
  },
  {
    title: "Atención personalizada",
    description:
      "Cada estudiante es único. Brindamos seguimiento académico y emocional individual para garantizar su desarrollo integral.",
    icon: Heart,
    accent: "#f59e0b",
    pattern: "pattern-3",
  },
  {
    title: "Formación en valores",
    description:
      "Promovemos la empatía, la responsabilidad y el respeto como pilares de la convivencia escolar y el desarrollo personal.",
    icon: Target,
    accent: "#ef4444",
    pattern: "pattern-4",
  },
  {
    title: "Aprendizaje colaborativo",
    description:
      "Fomentamos el trabajo en equipo, el diálogo y la construcción conjunta del conocimiento entre pares.",
    icon: Users,
    accent: "#8b5cf6",
    pattern: "pattern-5",
  },
];

export default function SwiperMetodologia() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="relative bg-[#f0e4d0] py-20 px-4 sm:px-8 overflow-hidden"
      style={{ backgroundColor: "#f0e4d0" }}
    >
      {/* Fondo animado con partículas */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-600 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-600 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse opacity-35"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-600 rounded-full animate-ping opacity-25"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-orange-700 rounded-full animate-pulse opacity-30"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.2) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-black text-[#334E68] mb-4 tracking-tight">
            Metodología
            <span className="block text-4xl sm:text-5xl font-light mt-2">
              Innovadora
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-amber-800 text-xl max-w-2xl mx-auto leading-relaxed">
            Transformamos la educación con enfoques revolucionarios
          </p>
        </div>

        {/* Swiper Container */}
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet" data-index="${index}"></span>`;
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="metodologia-coverflow"
        >
          {metodologia.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={index} className="!w-80 sm:!w-96">
                <div
                  className={`relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-200/50 overflow-hidden transition-all duration-700 ${
                    isActive ? "shadow-amber-500/30 scale-105" : "shadow-xl"
                  }`}
                >
                  <div className="relative p-4 min-h-[24rem] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className="relative">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                          style={{ backgroundColor: item.accent }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div
                          className="absolute -inset-2 rounded-2xl opacity-30 blur-lg transition-all duration-300"
                          style={{ backgroundColor: item.accent }}
                        ></div>
                      </div>
                      <div className="text-6xl font-black text-amber-900/20 select-none">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-amber-800/80 leading-relaxed flex-grow text-sm">
                      {item.description}
                    </p>
                    <div className="mt-6 pt-6 border-t border-amber-200/50">
                      <button
                        className="group flex items-center text-amber-700 hover:text-amber-900 transition-colors duration-300"
                        style={{ color: isActive ? item.accent : undefined }}
                      >
                        <span className="text-sm font-medium">Conocer más</span>
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg, ${item.accent}, ${item.accent}80)`
                        : "rgba(255,255,255,0.1)",
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Progress indicators */}
        <div className="flex justify-center mt-10 md:mt-6 space-x-3">
          {metodologia.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              } rounded-full cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        .metodologia-coverflow {
          padding-bottom: 0 !important;
        }
        .metodologia-coverflow .swiper-slide {
          background-position: center;
          background-size: cover;
          transition: all 0.3s ease;
        }
        .metodologia-coverflow .swiper-slide-active {
          z-index: 2;
        }
        .metodologia-coverflow .swiper-pagination {
          bottom: 10px !important;
        }
        .custom-bullet {
          width: 12px;
          height: 12px;
          display: inline-block;
          border-radius: 50%;
          background: rgba(217, 119, 6, 0.3);
          opacity: 1;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-bullet.swiper-pagination-bullet-active {
          background: linear-gradient(45deg, #ea580c, #d97706);
          transform: scale(1.3);
          box-shadow: 0 0 20px rgba(234, 88, 12, 0.5);
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background: linear-gradient(
            to right,
            rgba(217, 119, 6, 0.3),
            transparent
          ) !important;
        }
      `}</style>
    </section>
  );
}
