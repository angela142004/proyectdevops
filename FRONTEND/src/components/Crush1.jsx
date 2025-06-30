import React, { useState, useEffect } from "react";
import {
  Users,
  MessageCircle,
  Calendar,
  Award,
  BookOpen,
  Sparkles,
  Heart,
  Star,
  Trophy,
  Globe,
} from "lucide-react";

const Crush1 = ({ pict }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

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
    { id: 0, label: "Estudiantes", icon: Users, color: "blue" },
    { id: 1, label: "Docentes", icon: BookOpen, color: "green" },
    { id: 2, label: "Familias", icon: Heart, color: "pink" },
    { id: 3, label: "Logros", icon: Trophy, color: "yellow" },
  ];

  const communityData = {
    0: {
      title: "Comunidad Estudiantil",
      subtitle: "1,247 estudiantes activos",
      description: "Juntos construimos el futuro de nuestra educación",
      cards: [
        {
          icon: MessageCircle,
          title: "Foro Estudiantil",
          desc: "Comparte ideas y conecta",
          members: "400+",
        },
        {
          icon: Star,
          title: "Proyectos Destacados",
          desc: "Innovación estudiantil",
          count: "45+",
        },
        {
          icon: Globe,
          title: "Intercambios",
          desc: "Experiencias globales",
          count: "12+",
        },
      ],
    },
    1: {
      title: "Cuerpo Docente",
      subtitle: "89 educadores comprometidos",
      description: "Formando líderes con pasión y dedicación",
      cards: [
        {
          icon: BookOpen,
          title: "Recursos Pedagógicos",
          desc: "Material educativo",
          count: "200+",
        },
        {
          icon: Award,
          title: "Certificaciones",
          desc: "Excelencia académica",
          count: "156+",
        },
        {
          icon: Users,
          title: "Mentorías",
          desc: "Apoyo personalizado",
          count: "78+",
        },
      ],
    },
    2: {
      title: "Familias Prisma",
      subtitle: "856 familias unidas",
      description: "Construyendo juntos una educación integral",
      cards: [
        {
          icon: Calendar,
          title: "Reuniones",
          desc: "Participación activa",
          count: "24+",
        },
        {
          icon: Heart,
          title: "Voluntariado",
          desc: "Compromiso familiar",
          members: "340+",
        },
        {
          icon: Star,
          title: "Eventos Familiares",
          desc: "Momentos especiales",
          count: "18+",
        },
      ],
    },
    3: {
      title: "Logros y Reconocimientos",
      subtitle: "124 logros este año",
      description: "Celebrando la excelencia en cada paso",
      cards: [
        {
          icon: Trophy,
          title: "Competencias",
          desc: "Primeros lugares",
          count: "34+",
        },
        {
          icon: Award,
          title: "Reconocimientos",
          desc: "Excelencia académica",
          count: "67+",
        },
        {
          icon: Sparkles,
          title: "Innovación",
          desc: "Proyectos premiados",
          count: "23+",
        },
      ],
    },
  };

  const currentData = communityData[activeTab];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
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

      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/40 to-purple-900/50"></div>

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

        <div className="flex-1 px-4 sm:px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                {currentData.title}
              </h2>
              <p className="text-xl text-blue-300 font-semibold mb-2 drop-shadow-md">
                {currentData.subtitle}
              </p>
              <p className="text-white/90 max-w-2xl mx-auto drop-shadow-md">
                {currentData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentData.cards.map((card, index) => (
                <div
                  key={index}
                  className={`group relative cursor-pointer transition-all duration-700 transform ${
                    isVisible
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-20 opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                        activeTab === 0
                          ? "from-blue-500 to-cyan-500"
                          : activeTab === 1
                          ? "from-green-500 to-emerald-500"
                          : activeTab === 2
                          ? "from-pink-500 to-rose-500"
                          : "from-yellow-500 to-orange-500"
                      }`}
                    />

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-xl p-3 mb-4 group-hover:scale-110 transition-transform duration-300 ${
                          activeTab === 0
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : activeTab === 1
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : activeTab === 2
                            ? "bg-gradient-to-r from-pink-500 to-rose-500"
                            : "bg-gradient-to-r from-yellow-500 to-orange-500"
                        }`}
                      >
                        <card.icon className="w-full h-full text-white" />
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 drop-shadow-md">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-3 drop-shadow-sm">
                        {card.desc}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white drop-shadow-md">
                          {card.count || card.members}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                          <Sparkles className="w-4 h-4 text-white/80" />
                        </div>
                      </div>
                    </div>

                    {hoveredCard === index && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                              animationDelay: `${Math.random() * 0.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(180deg);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(90deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(270deg);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        .animate-float-0 {
          animation: float-0 5s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Crush1;
