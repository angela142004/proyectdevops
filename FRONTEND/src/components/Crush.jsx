import React, { useState, useEffect } from "react";
import { ChevronDown, Sparkles, Heart, Users } from "lucide-react";

const Crush = ({ pict, onVerEventos, onVerComunicados }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  return (
    <div
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Imagen de fondo con efecto parallax */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${
            (mousePosition.y - 50) * 0.02
          }px) scale(1.1)`,
        }}
      >
        <img
          src={pict || "/api/placeholder/1920/1080"}
          alt="Familia Prismática"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
      {/* Sombra lateral izquierda degradada */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-yellow-100/10 to-transparent"></div>
      {/* <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 via-yellow-100/10 to-transparent"></div> */}
      {/* Efectos de luz dinámicos */}
      <div
        className="absolute w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl transition-all duration-1000"
        style={{
          left: `${mousePosition.x * 0.5}%`,
          top: `${mousePosition.y * 0.3}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      <div
        className="absolute w-64 h-64 bg-blue-400/15 rounded-full blur-2xl transition-all duration-1500"
        style={{
          right: `${(100 - mousePosition.x) * 0.3}%`,
          bottom: `${(100 - mousePosition.y) * 0.4}%`,
          transform: "translate(50%, 50%)",
        }}
      ></div>

      {/* Partículas flotantes animadas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/30 rounded-full animate-float-${
              i % 3
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos decorativos interactivos */}
      <div className="absolute top-20 left-10 group">
        <div className="w-15 h-15 bg-gradient-to-r from-yellow-400/40 to-orange-400/40 rounded-2xl animate-pulse group-hover:scale-110 transition-transform duration-500 flex items-center justify-center backdrop-blur-sm">
          <Sparkles
            className="w-8 h-8 text-yellow-300 animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>
      </div>

      <div className="absolute top-32 right-20 group">
        <div
          className="w-16 h-16 bg-gradient-to-r from-blue-400/40 to-indigo-400/40 rounded-full animate-bounce group-hover:scale-110 transition-transform duration-500 flex items-center justify-center backdrop-blur-sm"
          style={{ animationDelay: "1s" }}
        >
          <Heart className="w-6 h-6 text-blue-300 animate-pulse" />
        </div>
      </div>

      <div className="absolute bottom-40 left-1/4 group">
        <div
          className="w-14 h-14 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-xl animate-pulse group-hover:scale-110 transition-transform duration-500 flex items-center justify-center backdrop-blur-sm"
          style={{ animationDelay: "2s" }}
        >
          <Users className="w-6 h-6 text-purple-300" />
        </div>
      </div>

      {/* Contenido principal mejorado */}
      <div className="absolute inset-0 flex items-center justify-start pl-10 md:pl-32">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible
              ? "translate-x-0 opacity-100 scale-100"
              : "-translate-x-20 opacity-0 scale-95"
          }`}
        >
          {/* Título principal con efectos */}
          <div className="relative mb-8">
            <h1 className="text-white text-5xl md:text-7xl font-black leading-tight">
              <span className="inline-block animate-slide-up">¡MANTENTE</span>
              <br />
              <span
                className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-slide-up animate-shimmer"
                style={{ animationDelay: "0.2s" }}
              >
                INFORMADO!
              </span>
            </h1>
            {/* Efectos de resplandor en el texto */}
            <div className="absolute inset-0 text-5xl md:text-7xl font-black leading-tight opacity-50 blur-sm">
              <span className="inline-block text-yellow-400/50">¡MANTENTE</span>
              <br />
              <span className="inline-block text-yellow-400/50">
                INFORMADO!
              </span>
            </div>
          </div>

          {/* Subtítulo elegante */}
          <div
            className={`mb-10 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <p className="mt-4 text-lg sm:text-xl text-white/80">
              Donde cada estudiante brilla con{" "}
              <span className="text-yellow-400 font-semibold">luz propia</span>,
              <br className="hidden md:block" />
              construyendo juntos un futuro{" "}
              <span className="text-blue-300 font-semibold">
                extraordinario
              </span>
            </p>
          </div>

          {/* Botones de acción modernos (ancho aún más reducido) */}
          <div
            className={`w-full flex justify-center md:justify-start transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "0.8s" }}
          >
            {/* Contenedor con ancho máximo muy pequeño */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-[240px]">
              {/* Botón “Ver eventos” */}

              <button
                className="w-full sm:w-auto flex-none relative px-4 py-2
    bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900
    rounded-xl font-bold text-sm overflow-hidden
    shadow-lg hover:shadow-yellow-400/25 transition-all duration-500
    transform hover:scale-105 hover:-translate-y-1"
                onClick={onVerEventos} // <--- CORREGIDO
              >
                <span className="relative z-10 flex items-center justify-center gap-1">
                  Ver eventos{" "}
                  <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              </button>

              {/* Botón “Comunicados” */}
              <button
                className="w-full sm:w-auto flex-none relative px-4 py-2
    bg-white/10 backdrop-blur-lg text-white rounded-xl
    font-bold text-sm border-2 border-white/30
    overflow-hidden shadow-lg hover:shadow-white/20
    transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                onClick={onVerComunicados} // <--- NUEVO
              >
                <span className="relative z-10 flex items-center justify-center gap-1">
                  Comunicados{" "}
                  <Heart className="w-4 h-4 group-hover:animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style>{`
        @keyframes float-0 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(90deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(270deg);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes scroll-indicator {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.3;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float-0 {
          animation: float-0 3s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-1 4s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 5s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Crush;
