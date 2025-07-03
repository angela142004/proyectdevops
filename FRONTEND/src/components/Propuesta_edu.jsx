import React, { useState } from "react";
import { FaBrain, FaBookOpen, FaRocket, FaArrowRight } from "react-icons/fa";

const propuesta = [
  {
    icon: <FaBrain size={32} className="text-white" />,
    title: "Inicial",
    subtitle: "Aprender jugando",
    description:
      "Nuestra propuesta se centra en el desarrollo emocional y social, a través del juego y la exploración. Brindamos un entorno cálido, seguro y estimulante.",
    gradient: "from-purple-500 to-pink-500",
    bgPattern: "bg-gradient-to-br from-purple-50 to-pink-50",
    delay: "0ms",
  },
  {
    icon: <FaBookOpen size={32} className="text-white" />,
    title: "Primaria",
    subtitle: "Formación integral",
    description:
      "Promovemos el pensamiento crítico, la lectura comprensiva y la expresión matemática, con proyectos interdisciplinarios y acompañamiento cercano.",
    gradient: "from-blue-500 to-cyan-500",
    bgPattern: "bg-gradient-to-br from-blue-50 to-cyan-50",
    delay: "200ms",
  },
  {
    icon: <FaRocket size={32} className="text-white" />,
    title: "Secundaria",
    subtitle: "Preparación para el futuro",
    description:
      "Formación académica sólida con enfoque en ciencia, tecnología y ciudadanía global. Fomentamos la autonomía, la investigación y el liderazgo social.",
    gradient: "from-emerald-500 to-teal-500",
    bgPattern: "bg-gradient-to-br from-emerald-50 to-teal-50",
    delay: "400ms",
  },
];

export default function Propuesta_edu() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative bg-[#334E68] py-20 px-4 sm:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with enhanced typography */}
        <div className="text-center mb-16 opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider">
              Educación de Excelencia
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Nuestra Propuesta{" "}
            <span className="bg-[#90B4CE] bg-clip-text text-transparent">
              Educativa
            </span>
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Conoce cómo acompañamos el crecimiento de nuestros estudiantes en
            cada etapa, con un enfoque pedagógico humano, innovador y
            transformador.
          </p>
        </div>

        {/* Enhanced grid with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {propuesta.map((item, index) => (
            <div
              key={index}
              className={`group relative opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards] ${item.bgPattern} backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
              style={{ animationDelay: item.delay }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              {/* Card border glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`}
              ></div>

              {/* Card content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon container with floating animation */}
                <div
                  className={`relative mb-6 transform transition-transform duration-500 ${
                    hoveredCard === index ? "scale-110 -translate-y-2" : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  {/* Floating particles effect */}
                  <div
                    className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500`}
                  ></div>
                </div>

                {/* Title with enhanced typography */}
                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Subtitle with gradient accent */}
                <h4
                  className={`text-sm font-semibold mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent uppercase tracking-wider`}
                >
                  {item.subtitle}
                </h4>

                {/* Description with improved spacing */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow group-hover:text-slate-700 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Interactive CTA button */}
                <div
                  className={`flex items-center text-sm font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 cursor-pointer`}
                >
                  <span>Conocer más</span>
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Hover ripple effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${item.gradient} opacity-5 transform scale-0 group-hover:scale-100 transition-transform duration-700 rounded-2xl`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16 space-x-2 opacity-0 animate-[fade-in_1s_ease-out_1.5s_forwards]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse`}
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
