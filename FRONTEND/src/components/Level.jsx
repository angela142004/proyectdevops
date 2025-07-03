import React, { useEffect, useState } from "react";
import {
  FaGraduationCap,
  FaArrowRight,
  FaStar,
  FaHeart,
  FaRocket,
} from "react-icons/fa";
import ModalForm from "./ModalForm"; // Asegúrate que ModalForm esté implementado correctamente
import inicialImg from "../assets/inicial.jpeg"; // Reemplaza con la ruta correcta de tu imagen
import primariaImg from "../assets/primaria.jpeg"; // Reemplaza con la ruta correcta
import secundariaImg from "../assets/secundaria.jpeg"; // Reemplaza con la ruta correcta

const levels = [
  {
    name: "INICIAL",
    icon: <FaHeart className="text-white" size={24} />,
    image: inicialImg,
    description:
      "Educación inicial para los más pequeños, basada en el juego y el descubrimiento. Promovemos el desarrollo emocional, social y cognitivo en un ambiente seguro y afectuoso.",
    features: ["Desarrollo emocional", "Juego educativo", "Ambiente seguro"],
    gradient: "from-[#003949] to-[#6DB8CC]",
    delay: "200ms",
  },
  {
    name: "PRIMARIA",
    icon: <FaStar className="text-white" size={24} />,
    image: primariaImg,
    description:
      "Formación integral con enfoque en valores, ciencias y desarrollo emocional. En esta etapa fortalecemos las habilidades de lectura, escritura, lógica matemática y comprensión del entorno.",
    features: ["Formación integral", "Pensamiento crítico", "Valores sólidos"],
    gradient: "from-[#003949] to-[#6DB8CC]",
    delay: "300ms",
  },
  {
    name: "SECUNDARIA",
    icon: <FaRocket className="text-white" size={24} />,
    image: secundariaImg,
    description:
      "Preparación académica sólida para afrontar los retos del futuro con éxito. Se consolidan las competencias académicas, científicas y tecnológicas, promoviendo el pensamiento crítico y la responsabilidad social.",
    features: [
      "Excelencia académica",
      "Liderazgo",
      "Preparación universitaria",
    ],
    gradient: "from-[#6DB8CC] to-[#003949]",
    delay: "400ms",
  },
];

export default function Level() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openModal = (levelName) => {
    setSelectedLevel(levelName);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <section className="relative bg-[#f0e4d0] py-20 px-4 sm:px-8 overflow-hidden">
        {/* Fondos decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#780000]/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#003949]/50 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#6DB8CC]/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Título principal */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#780000] to-[#C121F] rounded-full flex items-center justify-center mr-4">
                <FaGraduationCap className="text-white" size={24} />
              </div>
              <span className="bg-gradient-to-r from-[#780000] to-[#C121F] bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider">
                Excelencia Educativa
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold text-[#003949] mb-6 leading-tight">
              NUESTROS{" "}
              <span className="bg-[#780000] bg-clip-text text-transparent">
                NIVELES EDUCATIVOS
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-[#780000] to-[#C121F] mx-auto rounded-full"></div>
          </div>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div
                key={level.name}
                className={`group relative transform transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                } hover:scale-105 hover:-translate-y-3`}
                style={{ transitionDelay: level.delay }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Fondo gradiente flotante */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${level.gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                ></div>

                {/* Tarjeta principal */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-500">
                  {/* Imagen */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={level.image}
                      alt={level.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${level.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}
                    ></div>

                    {/* Ícono */}
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-transform duration-500 ${
                        hoveredCard === index ? "scale-110 rotate-12" : ""
                      }`}
                    >
                      {level.icon}
                    </div>

                    {/* Nombre del nivel */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white mb-1 transform transition-transform duration-500 group-hover:translate-x-2">
                        {level.name}
                      </h3>
                      <div className="w-12 h-1 bg-white/80 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-150"></div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    {/* Etiquetas */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {level.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-3 py-1 bg-gradient-to-r ${level.gradient} text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500`}
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Descripción */}
                    <p className="text-[#003949]/80 text-sm leading-relaxed mb-6 group-hover:text-[#003949] transition-colors duration-300">
                      {level.description}
                    </p>

                    {/* Botón corregido */}
                    <button
                      onClick={() => openModal(level.name)}
                      className={`w-full bg-gradient-to-r ${level.gradient} text-white font-semibold py-3 px-6 rounded-2xl transform transition-all duration-500 group-hover:shadow-lg group-hover:shadow-red-500/25 flex items-center justify-center space-x-2 relative overflow-hidden`}
                    >
                      {/* Efecto decorativo */}
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none"></div>

                      <span className="relative z-10 flex items-center space-x-2">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          ÚNETE
                        </span>
                        <FaArrowRight
                          className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300"
                          size={16}
                        />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Partícula decorativa */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#780000] to-[#C121F] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Elementos decorativos inferiores */}
          <div
            className={`flex justify-center mt-16 space-x-4 transform transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-3 h-3 bg-[#780000] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#003949] rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-[#6DB8CC] rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </section>

      {/* ModalForm */}
      <ModalForm open={modalOpen} onClose={closeModal} level={selectedLevel} />
    </>
  );
}
