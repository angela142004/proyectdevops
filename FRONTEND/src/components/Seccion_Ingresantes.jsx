import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import img1 from "../assets/Blog/ingresantes3.jpg";
import img2 from "../assets/Blog/ingresantes2.jpg";
import img3 from "../assets/Blog/ingresantes4.jpg";
import img4 from "../assets/Blog/ingresantes1.jpg";

const beige = "#f6e7cf";

const redes = [
  { icon: <FaFacebookF />, color: "bg-[#4267B2] hover:bg-[#365899]" },
  { icon: <FaInstagram />, color: "bg-[#E1306C] hover:bg-[#C13584]" },
];

const colores = [
  { border: "border-[#780000]", name: "text-[#A6122E]" },
  { border: "border-[#780000]", name: "text-[#A6122E]" },
  { border: "border-[#780000]", name: "text-[#A6122E]" },
  { border: "border-[#780000]", name: "text-[#A6122E]" },
];

const ingresantes = [
  {
    nombre: "KERVIN HERRERA",
    carrera: "Ingeniería de Telecomunicaciones",
    imagen: img1,
  },
  {
    nombre: "RODNEY ASCORNAO",
    carrera: "Ingeniería Mecatrónica",
    imagen: img2,
  },
  {
    nombre: "CESAR CHOQUEZ",
    carrera: "Ingeniería de Alimentos",
    imagen: img3,
  },
  {
    nombre: "FABIAN CAMACHO",
    carrera: "Ingeniería Eléctrica",
    imagen: img4,
  },
];

const StudentCard = ({ student, color, idx }) => (
  <div
    className={`rounded-xl shadow-md ${color.border} border-2 bg-white/90 transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col overflow-hidden`}
    data-aos="fade-up"
    data-aos-delay={idx * 100}
  >
    {/* Imagen responsive con proporción */}
    <div className="w-full aspect-[4/3] overflow-hidden bg-white rounded-t-xl">
      <img
        src={student.imagen}
        alt={student.nombre}
        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    {/* Contenido */}
    <div className="flex-1 flex flex-col justify-between px-3 py-4 sm:px-4 sm:py-5 text-center text-sm sm:text-base">
      <h3
        className={`font-bold text-xs sm:text-sm md:text-base mb-2 uppercase tracking-wide ${color.name}`}
      >
        {student.nombre}
      </h3>
      <span className="inline-block mb-2 px-3 py-1 rounded-full bg-[#f2e3d1] border border-gray-200 text-[10px] sm:text-xs font-medium text-gray-600">
        INGRESANTE 2025
      </span>
      <p className="font-semibold text-xs sm:text-sm text-gray-700 mb-4">
        {student.carrera}
      </p>
      <div className="flex justify-center gap-2 sm:gap-3 mt-auto">
        {redes.map((r, i) => (
          <a
            key={i}
            href="#"
            className={`rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base text-white shadow transition duration-300 hover:scale-110 ${r.color}`}
            aria-label={["Facebook", "Instagram"][i]}
          >
            {r.icon}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const NuevosIngresantes = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      style={{ background: beige }}
      className="py-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14" data-aos="fade-down">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[#3B4D61] tracking-wide uppercase">
            Nuevos Ingresantes 2025
          </h1>
          <div className="w-20 h-1 bg-[#5D8CA9] mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base md:text-xl text-[#3B4D61] max-w-2xl mx-auto">
            Damos la más cordial bienvenida a nuestros ingresantes, quienes
            inician una nueva etapa llena de aprendizajes, retos y grandes
            experiencias.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {ingresantes.map((student, idx) => (
            <StudentCard
              key={idx}
              student={student}
              color={colores[idx % colores.length]}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuevosIngresantes;
