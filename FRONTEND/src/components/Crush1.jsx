import React, { useState, useEffect } from "react";
import { Users, BookOpen, Heart, Trophy } from "lucide-react";

const Crush1 = ({ pict }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const communityTabs = [
    {
      id: 0,
      label: "Estudiantes",
      icon: Users,
      color: "blue",
      title: "Estudiantes Prisma",
      subtitle: "Comprometidos con el aprendizaje",
      description:
        "Nuestros estudiantes destacan por su curiosidad, creatividad y compromiso con su formación académica y personal.",
    },
    {
      id: 1,
      label: "Docentes",
      icon: BookOpen,
      color: "green",
      title: "Docentes Comprometidos",
      subtitle: "Formadores de líderes",
      description:
        "Nuestro equipo docente se actualiza constantemente para brindar una educación de calidad con vocación y experiencia.",
    },
    {
      id: 2,
      label: "Familias",
      icon: Heart,
      color: "pink",
      title: "Familias Aliadas",
      subtitle: "Educación en conjunto",
      description:
        "La participación activa de las familias es vital en nuestra comunidad, promoviendo un entorno armonioso y colaborativo.",
    },
    {
      id: 3,
      label: "Logros",
      icon: Trophy,
      color: "yellow",
      title: "Logros Alcanzados",
      subtitle: "Resultados que nos inspiran",
      description:
        "Nos sentimos orgullosos de cada meta alcanzada por nuestra comunidad en el ámbito académico, artístico y deportivo.",
    },
  ];

  const currentData = communityTabs[activeTab];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.015}px, ${
            (mousePosition.y - 50) * 0.015
          }px) scale(1.05)`,
        }}
      >
        <img
          src={pict || "/api/placeholder/1920/1080"}
          alt="Comunidad Prisma"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/40 to-purple-900/50" />

      {/* Luces de fondo */}
      <div
        className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000"
        style={{
          left: `${mousePosition.x * 0.4}%`,
          top: `${mousePosition.y * 0.2}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-60 h-60 bg-purple-500/15 rounded-full blur-2xl transition-all duration-1500"
        style={{
          right: `${(100 - mousePosition.x) * 0.3}%`,
          bottom: `${(100 - mousePosition.y) * 0.4}%`,
          transform: "translate(50%, 50%)",
        }}
      />

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/30 rounded-full animate-float-${
              i % 3
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="pt-20 pb-8 text-center md:pt-28 lg:pt-40">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-10 opacity-0 scale-95"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              <span className="inline-block animate-slide-up">NUESTRA</span>
              <br />
              <span
                className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slide-up animate-shimmer"
                style={{ animationDelay: "0.2s" }}
              >
                COMUNIDAD
              </span>
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 px-4">
          <div className="flex flex-wrap justify-center gap-2 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            {communityTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-${tab.color}-500/20 text-white border border-${tab.color}-400/30`
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Texto dinámico del tab */}
        <div className="text-center px-6 max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
            {currentData.title}
          </h2>
          <p className="text-xl text-blue-300 font-semibold mb-2 drop-shadow-md">
            {currentData.subtitle}
          </p>
          <p className="text-white/90 drop-shadow-md">
            {currentData.description}
          </p>
        </div>
      </div>

      {/* Estilos animaciones */}
      <style>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(90deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(270deg); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-float-0 { animation: float-0 5s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 7s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Crush1;
