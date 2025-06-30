import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalForm from "./ModalForm";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const levels = [
  {
    name: "INICIAL",
    description:
      "Educación inicial para los más pequeños, basada en el juego y el descubrimiento. Promovemos el desarrollo emocional, social y cognitivo en un ambiente seguro y afectuoso.",
  },
  {
    name: "PRIMARIA",
    description:
      "Formación integral con enfoque en valores, ciencias y desarrollo emocional. En esta etapa fortalecemos las habilidades de lectura, escritura, lógica matemática y comprensión del entorno.",
  },
  {
    name: "SECUNDARIA",
    description:
      "Preparación académica sólida para afrontar los retos del futuro con éxito. Se consolidan las competencias académicas, científicas y tecnológicas, promoviendo el pensamiento crítico y la responsabilidad social.",
  },
];

const bannerImages = [banner1, banner2, banner3];

export default function Level() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % bannerImages.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const openModal = (levelName) => {
    setSelectedLevel(levelName);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <section className="flex flex-col lg:flex-row w-full h-auto overflow-hidden bg-white">
        {/* Columna izquierda: Imagen */}
        <div className="w-full lg:w-2/5 bg-[#6698BC] flex items-center justify-center p-6 sm:p-8">
          <img
            src={bannerImages[current]}
            alt={`Banner ${current + 1}`}
            className="w-[80%] sm:w-[70%] md:w-[65%] lg:w-[80%] h-auto object-contain rounded-xl shadow-xl transition-opacity duration-700"
          />
        </div>

        {/* Columna derecha: Info de niveles */}
        <div className="w-full lg:w-3/5 px-4 sm:px-6 md:px-10 py-10 bg-gray-50 flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003049] mb-4 text-center lg:text-left">
            NUESTROS NIVELES EDUCATIVOS
          </h2>

          {levels.map((level, index) => (
            <div
              key={level.name}
              className="bg-[#003049] text-white px-4 py-6 sm:px-6 rounded-xl shadow-md flex flex-col gap-4 max-w-3xl mx-auto lg:mx-0"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <h3 className="text-lg sm:text-xl font-bold">{level.name}</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm sm:text-base flex-1">
                  {level.description}
                </p>
                <button
                  onClick={() => openModal(level.name)}
                  className="bg-[#780000] text-white font-semibold px-5 py-2 rounded hover:bg-[#a5123b] shadow transition text-sm sm:text-base w-full sm:w-auto"
                >
                  ÚNETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ModalForm open={modalOpen} onClose={closeModal} level={selectedLevel} />
    </>
  );
}
