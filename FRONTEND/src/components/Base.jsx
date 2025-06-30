// src/components/EducationalPillars.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BookOpen, ClipboardCheck, Flag } from "lucide-react";

/* —— datos de pilares —— */
const pillars = [
  {
    title: "ESTUDIO",
    description:
      "El estudio es la base del conocimiento y el camino hacia el crecimiento personal. Fomenta la curiosidad, el pensamiento crítico y la preparación para enfrentar los desafíos del mañana.",
    Icon: BookOpen,
    iconColor: "text-red-600",
    bgFrom: "#003049",
    bgTo: "#234870",
  },
  {
    title: "DISCIPLINA",
    description:
      "La disciplina es el puente entre las metas y los logros. Forma hábitos positivos, fortalece la voluntad y guía el comportamiento hacia la excelencia académica y personal.",
    Icon: ClipboardCheck,
    iconColor: "text-[#003049]",
    bgFrom: "#780000",
    bgTo: "#a5123b",
  },
  {
    title: "SUPERACIÓN",
    description:
      "La superación es el motor del progreso. Impulsa a los estudiantes a dar siempre lo mejor de sí mismos, superar obstáculos y alcanzar nuevas metas con determinación.",
    Icon: Flag,
    iconColor: "text-red-600",
    bgFrom: "#003049",
    bgTo: "#234870",
  },
];

export default function EducationalPillars() {
  /* —— AOS & keyframes —— */
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100 });

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes iconGlow {
        0%   { filter: drop-shadow(0 0 0 rgba(255,255,0,0)); transform: scale(1); }
        100% { filter: drop-shadow(0 0 8px rgba(255,255,0,.9)); transform: scale(1.25); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section className="relative w-full py-10 text-center">
      {/* fondos decorativos */}
      <div className="absolute inset-0 bg-gray-50 -z-20" />
      <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-[#f0e4d0] -z-10" />

      {/* título & subtítulo */}
      <h2
        className="text-3xl md:text-4xl font-bold mb-2 text-[#003049]"
        data-aos="fade-up"
      >
        NUESTROS PILARES EDUCATIVOS
      </h2>
      <p
        className="text-sm md:text-base text-[#003049] mb-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Educamos con propósito, valores y excelencia.
      </p>

      {/* tarjetas responsivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-10">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className={`
              group relative p-6 sm:p-8 md:p-10 lg:p-12 
              w-full max-w-xs mx-auto flex flex-col items-center gap-4
              transition-all duration-300 transform
              hover:scale-105 hover:shadow-2xl
              text-white
            `}
            style={{
              background: `linear-gradient(135deg, ${p.bgFrom} 80%, ${p.bgTo} 100%)`,
              borderRadius: "1.2rem",
              boxShadow: "0 4px 20px #00304918",
            }}
            data-aos={
              i === 0 ? "fade-left" : i === 1 ? "fade-up" : "fade-right"
            }
            data-aos-delay={i * 200}
          >
            {/* esquinas decorativas */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#f0e4d0]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f0e4d0]" />

            {/* icono con brillo */}
            <div
              className="
                icon-wrap w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 
                flex items-center justify-center shadow-md transition-transform
              "
              style={{ animation: "iconGlow 0.8s ease-in-out forwards paused" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
              onAnimationEnd={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
            >
              <p.Icon size={24} className={p.iconColor} />
            </div>

            {/* título + descripción */}
            <h3 className="text-lg sm:text-xl font-bold tracking-wide">
              {p.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-center">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* ——— CINTA DESLIZANTE ——— */}
      <div className="w-full bg-[#0F172A] overflow-hidden">
        <style>{`
          @keyframes marqueeLeft {
            0%   { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>

        <div
          className="
            whitespace-nowrap text-xl sm:text-2xl font-extrabold
            text-transparent bg-clip-text
            bg-gradient-to-r from-sky-400 via-red-500 to-blue-600
            py-4
          "
          style={{ animation: "marqueeLeft 20s linear infinite" }}
        >
          ESTUDIO · DISCIPLINA · SUPERACIÓN · ¡FUERZA PRISMA! · ESTUDIO ·
          DISCIPLINA · SUPERACIÓN · ¡FUERZA PRISMA! ·
        </div>
      </div>
    </section>
  );
}
