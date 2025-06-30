import React, { useEffect, useState, useRef } from "react";
import Button_A from "../components/Button_A";
import img_map from "../assets/foto_map.png";
import { Footer } from "../components/Footer";
import {
  FaGraduationCap,
  FaTrophy,
  FaUsers,
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaEye,
  FaBuilding,
  FaRocket,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import galeria1 from "../assets/galeria1.jpg";
import galeria2 from "../assets/galeria2.jpg";
import galeria3 from "../assets/galeria3.jpg";
import galeria4 from "../assets/galeria4.jpg";
import galeria5 from "../assets/galeria5.jpg";
import Image1 from "../assets/directivo1.png";
import Image2 from "../assets/directivo2.png";
import Image3 from "../assets/directivo3.png";
import Image4 from "../assets/directivo4.png";

const imagenesGaleria = [galeria1, galeria2, galeria3, galeria4, galeria5];

// CarruselCintaMultiple (optimized & responsive)
const CarruselCintaMultiple = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  // Responsive: cambia cantidad de imágenes según ancho
  const [imagenesPorVista, setImagenesPorVista] = useState(3);

  useEffect(() => {
    const updateImagenesPorVista = () => {
      if (window.innerWidth < 640) setImagenesPorVista(1);
      else if (window.innerWidth < 1024) setImagenesPorVista(2);
      else setImagenesPorVista(3);
    };
    updateImagenesPorVista();
    window.addEventListener("resize", updateImagenesPorVista);
    return () => window.removeEventListener("resize", updateImagenesPorVista);
  }, []);

  const maxIndex = imagenesGaleria.length - imagenesPorVista;

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPlaying, maxIndex]);

  const nextSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <div
      className="w-full max-w-7xl mx-auto"
      data-aos="fade-in"
      data-aos-delay="200"
    >
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
        <div
          className="flex transition-transform ease-out duration-700"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / imagenesPorVista)
            }%)`,
          }}
        >
          {imagenesGaleria.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2 relative group"
              style={{ width: `${100 / imagenesPorVista}%` }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`Galería imagen ${i + 1}`}
                  className="w-full h-44 sm:h-60 md:h-72 lg:h-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-sm">
                    <FaEye className="text-blue-400" />
                    <span>Momento especial {i + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-6">
          <button
            onClick={prevSlide}
            className="p-2 sm:p-3 bg-white/10 text-white rounded-full shadow-xl hover:bg-white/20 border border-white/20"
            aria-label="Slide anterior"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 sm:p-3 bg-white/10 text-white rounded-full shadow-xl hover:bg-white/20 border border-white/20"
            aria-label="Siguiente slide"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={togglePlayPause}
            className="p-2 bg-white/10 text-white rounded-full shadow-lg hover:bg-white/20 border border-white/20"
            aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`h-2 transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? "w-8 bg-white shadow-lg"
                  : "w-2 bg-white/50 hover:bg-white/70 hover:w-4"
              }`}
              onClick={() => {
                clearTimeout(timeoutRef.current);
                setCurrentIndex(i);
              }}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// EstadisticasAnimadas (optimized)
const EstadisticasAnimadas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    years: 0,
    awards: 0,
  });

  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targets = { students: 400, teachers: 40, years: 10, awards: 10 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounts((prev) => ({
        students: Math.min(
          prev.students + Math.ceil(targets.students / steps),
          targets.students
        ),
        teachers: Math.min(
          prev.teachers + Math.ceil(targets.teachers / steps),
          targets.teachers
        ),
        years: Math.min(
          prev.years + Math.ceil(targets.years / steps),
          targets.years
        ),
        awards: Math.min(
          prev.awards + Math.ceil(targets.awards / steps),
          targets.awards
        ),
      }));
    }, increment);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    { icon: FaUsers, count: counts.students, label: "Estudiantes" },
    { icon: FaGraduationCap, count: counts.teachers, label: "Docentes" },
    { icon: FaHistory, count: counts.years, label: "Años de Experiencia" },
    { icon: FaTrophy, count: counts.awards, label: "Reconocimientos" },
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-4 sm:px-6 lg:px-20"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center group rounded-xl shadow-xl p-6 sm:p-8 bg-[#780000] hover:shadow-2xl transition"
        >
          <div className="text-4xl sm:text-5xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">
            <stat.icon className="mx-auto" />
          </div>
          <div className="text-2xl sm:text-4xl font-bold text-white mb-2 group-hover:text-[#e24585] transition-colors duration-300">
            {stat.count}+
          </div>
          <div className="text-white text-sm sm:text-base font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const Nosotros = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
    AOS.refresh();
    return () => AOS.refresh();
  }, []);

  const valoresV = [
    {
      año: "Fundación",
      evento:
        "Nuestra institución nació con el sueño de transformar vidas a través de la educación de calidad, estableciendo los cimientos de lo que hoy es una comunidad educativa sólida y comprometida con la excelencia académica.",
      icono: <FaBuilding className="text-yellow-400 text-3xl" />,
      color: "from-blue-600 to-purple-600",
    },
    {
      año: "Misión",
      evento:
        "Formar estudiantes íntegros, competentes y conscientes de su responsabilidad social, brindándoles herramientas académicas y valores humanos que les permitan contribuir positivamente al desarrollo de nuestra sociedad.",
      icono: <FaGraduationCap className="text-green-400 text-3xl" />,
      color: "from-green-600 to-teal-600",
    },
    {
      año: "Visión",
      evento:
        "Ser reconocidos como una institución educativa líder e innovadora, que inspire el amor por el aprendizaje y forme ciudadanos capaces de enfrentar los desafíos del futuro con creatividad, ética y liderazgo.",
      icono: <FaRocket className="text-purple-400 text-3xl" />,
      color: "from-purple-600 to-pink-600",
    },
  ];

  const directivos = [
    {
      nombre: "Evellyng Limaylla",
      cargo: "DIRECTORA GENERAL",
      descripcion: "Líder visionaria con 20 años de experiencia",
      imagen: Image1,
    },
    {
      nombre: "Roxana Torres",
      cargo: "PSICÓLOGA EDUCATIVA",
      descripcion: "Experta en desarrollo integral",
      imagen: Image2,
    },
    {
      nombre: "Julian Jameson",
      cargo: "SUBDIRECTOR ACADÉMICO",
      descripcion: "Especialista en innovación educativa",
      imagen: Image3,
    },
    {
      nombre: "Juan Lhi",
      cargo: "COORDINADOR ESTUDIANTIL",
      descripcion: "Comprometido con el bienestar estudiantil",
      imagen: Image4,
    },
  ];

  return (
    <div data-aos="fade-in" data-aos-duration="1200">
      {/* HERO SECTION */}
      <div
        className="relative w-full h-[80vh] sm:h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${img_map})` }}
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        {/* ---------- CSS in-line ---------- */}
        <style>{`
    @keyframes glow {
      0%,100% { box-shadow: 0 0 8px #fff, 0 0 24px #80caff }
      50% { box-shadow: 0 0 24px #fff, 0 0 48px #33d9ff }
    }
    .glow-light {
      position: absolute;
      width: 12px; height: 12px;
      border-radius: 50%;
      background: #fff;
      opacity: 0.8;
      animation: glow 2s ease-in-out infinite;
      z-index: 5;
    }

    @keyframes spin-slow {
      to { transform: rotate(360deg) }
    }
    .card-wrapper::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      padding: 2px;
      background: conic-gradient(#ffd700,#ff7300,#ff0000,#ff7300,#ffd700);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: spin-slow 20s linear infinite;
    }
  `}</style>

        {/* luciérnagas */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-light" style={{ top: "15%", left: "20%" }} />
          <div className="glow-light" style={{ top: "35%", left: "60%" }} />
          <div className="glow-light" style={{ top: "25%", left: "75%" }} />
          <div className="glow-light" style={{ top: "55%", left: "40%" }} />
          <div className="glow-light" style={{ top: "45%", left: "85%" }} />
        </div>

        {/* degradado azul */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent z-0" />

        {/* ---------- CONTENIDO ---------- */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 lg:px-24 gap-10 text-center lg:text-left">
          {/* título */}
          <div
            className="relative mt-10 sm:mt-12 lg:mt-0"
            data-aos="fade-right"
          >
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl">
              Ven&nbsp;conócenos
            </h1>
            <span className="absolute inset-0 rounded-lg bg-white/10 blur-sm -z-10" />
          </div>

          {/* GRID tarjetas */}
          <div
            className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
            data-aos="zoom-in-up"
            data-aos-delay="150"
          >
            {[
              {
                n: "400+",
                lbl: "Estudiantes",
                path: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
              },
              {
                n: "40+",
                lbl: "Docentes",
                path: "M12 14l9-5-9-5-9 5 9 5zm0 0v6",
              },
              {
                n: "10+",
                lbl: "Años de Experiencia",
                path: "M12 8v4l3 3M12 3a9 9 0 100 18 9 9 0 000-18z",
              },
              {
                n: "10+",
                lbl: "Reconocimientos",
                path: "M8 21h8M12 17a5 5 0 005-5V9a9 9 0 10-10 0v3a5 5 0 005 5z",
              },
            ].map(({ n, lbl, path }, idx) => (
              <div
                key={idx}
                className="relative card-wrapper rounded-xl p-[2px]"
              >
                <div
                  className="group relative flex flex-col items-center justify-center
              w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36
              bg-[#780000] text-white rounded-[10px] shadow-lg
              transition-transform duration-500 hover:scale-105 hover:rotate-[6deg]"
                >
                  <span
                    className="absolute -top-1 -left-1 w-0.5 h-0.5 bg-transparent
                shadow-[0_0_8px_4px_rgba(255,255,255,.45)] animate-ping"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mb-1 drop-shadow-[0_0_4px_rgb(255,255,255)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={path}
                    />
                  </svg>
                  <p className="text-2xl font-extrabold drop-shadow-[0_0_4px_rgb(255,255,255)]">
                    {n}
                  </p>
                  <p className="text-[0.7rem] sm:text-xs text-center">{lbl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HISTORIA / VALORES “PROFESIONAL+” CON TÍTULO ARREGLADO */}
      <div
        className="relative overflow-hidden min-h-[60vh] py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#002f4b] to-[#003558] perspective-1000"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {/* Fondo patrones y blobs */}
        <div className="absolute inset-0 bg-[url('/pattern-diagonal.svg')] bg-center bg-repeat opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#5E7FA1]/10 rounded-full animate-blob-slow opacity-30 pointer-events-none" />
        <div className="absolute bottom-1/6 right-1/3 w-[500px] h-[500px] bg-[#44789B]/10 rounded-full animate-blob-fast opacity-20 pointer-events-none" />

        <style>{`
    @keyframes spin-slow { to { transform: rotate(360deg); } }
    @keyframes blob-slow { 0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,-30px) scale(1.1)} }
    @keyframes blob-fast { 0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-30px,20px) scale(1.2)} }
    @keyframes icon-bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-25%)} }
    @keyframes pulse-slow { 0%,100%{opacity:0.7}50%{opacity:1} }
    @keyframes ripple { 0%{transform:scale(0);opacity:0.4}100%{transform:scale(2);opacity:0} }
    .animate-blob-slow { animation: blob-slow 14s ease-in-out infinite; }
    .animate-blob-fast { animation: blob-fast 10s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
    .animate-icon-bounce { animation: icon-bounce 1.2s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
    .ripple-effect::after {
      content: ""; position: absolute; inset: 0; border-radius: inherit;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 80%);
      transform: scale(0); opacity: 0; transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    }
    .group:hover .ripple-effect::after {
      transform: scale(1.5); opacity: 1; animation: ripple 0.6s ease-out;
    }
  `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          {/* TÍTULO */}
          <div className="text-center mb-12 md:mb-20 group">
            <h1 className="inline-block font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white relative overflow-hidden drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              <span className="block relative">
                Nuestra Historia,
                <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/20 mix-blend-screen skew-x-[-20deg] transition-transform duration-1000 group-hover:translate-x-[200%] z-0" />
              </span>
              <span className="block relative z-10 text-[#88AECF] drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]">
                Identidad y Visión
              </span>
            </h1>
            <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-[#88AECF] to-[#6698BC] rounded-full animate-pulse-slow" />
            <p className="mt-6 text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]">
              Conoce los pilares fundamentales que han guiado nuestro camino
              hacia la excelencia educativa a lo largo de los años
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-6xl">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#88AECF] to-[#6698BC] opacity-70 animate-pulse-slow drop-shadow-[0_0_10px_#88AECF]" />

            {valoresV.map((valor, i) => (
              <div
                key={i}
                className={`group flex flex-col md:flex-row items-center mb-12 md:mb-16 perspective-1000 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                data-aos={i % 2 === 0 ? "fade-left" : "fade-right"}
                data-aos-delay={i * 200}
              >
                <div
                  className={`w-[90%] sm:w-full md:w-5/12 ${
                    i % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  } mb-6 md:mb-0`}
                >
                  <div className="relative rounded-2xl p-5 sm:p-6 md:p-8 bg-gradient-to-br from-[#5E7FA1] to-[#44789B] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 ripple-effect transform transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-y-6 group-hover:rotate-x-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#6698BC]/20 rounded-full animate-spin-slow pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="relative text-lg sm:text-xl md:text-2xl font-bold text-white/90 before:absolute before:-bottom-1 before:left-0 before:h-1 before:w-0 before:bg-gradient-to-r from-white to-[#88AECF] before:transition-all before:duration-500 group-hover:before:w-full">
                        {valor.año}
                      </h3>
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow-[0_0_12px_#fff] group-hover:drop-shadow-[0_0_24px_#fff] animate-icon-bounce">
                        {valor.icono}
                      </div>
                    </div>
                    <div className="h-px w-full mb-4 bg-white/20" />
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed transition-colors duration-300 group-hover:text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
                      {valor.evento}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center z-20 mb-6 md:mb-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#88AECF] rounded-full flex items-center justify-center ring-4 ring-white/50 shadow-[0_0_14px_#88AECF] animate-pulse-slow transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_28px_#88AECF]">
                    <span className="font-extrabold text-white text-sm sm:text-base">
                      {i + 1}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIRECTIVOS */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${img_map})` }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="absolute inset-0 bg-[#f0e4d0]/90"></div>
        <div className="relative z-10 py-8 sm:py-12 md:py-16 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            {/* Título */}
            <div className="text-center mb-8 md:mb-14">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#003049] mb-3 md:mb-5">
                Nuestro{" "}
                <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  Equipo Directivo
                </span>
              </h2>
              <div className="h-1.5 w-16 sm:w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-4 rounded-full" />
              <p className="text-[#003049] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Conoce a los profesionales que lideran nuestra institución con
                pasión y compromiso por la excelencia educativa.
              </p>
            </div>

            {/* Tarjetas de directivos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {directivos.map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-[#003049] rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20"
                  data-aos="flip-up"
                  data-aos-delay={i * 150}
                >
                  {/* Imagen con proporción fija y menor altura */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.imagen}
                      alt={`Foto de ${item.nombre}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-white text-[11px] sm:text-xs">
                        <p className="mb-1">{item.descripcion}</p>
                        <div className="flex gap-1 items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-[10px] text-gray-300">
                            Disponible
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenido textual */}
                  <div className="px-2 py-3 text-center">
                    <h3 className="text-white text-sm sm:text-base font-bold mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                      {item.nombre}
                    </h3>
                    <p className="text-gray-300 text-[10px] sm:text-xs uppercase tracking-wide">
                      {item.cargo}
                    </p>
                    <div className="mt-2 w-full h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GALERÍA */}
      <div
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-10 sm:py-16 md:py-20"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-gray-800 font-bold text-3xl sm:text-5xl md:text-6xl mb-4 md:mb-6 leading-tight">
              Únete al Equipo <br />
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Ganador
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Estos son algunos de los momentos más especiales que hemos vivido
              en nuestra institución educativa
            </p>
          </div>
          <CarruselCintaMultiple />
        </div>
      </div>

      {/* VIDEO */}
      <div
        className="py-12 sm:py-16 md:py-24 bg-[#6698BC]"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-gradient-to-r from-[#a5123b] to-[#e24585] rounded-2xl p-4 sm:p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl mb-6 sm:mb-8">
              <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
                <FaPlay className="text-xl" />
                Himno Institucional
              </h2>
            </div>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">
              Escucha nuestro himno institucional que representa los valores y
              el espíritu de nuestra comunidad educativa
            </p>
          </div>
          <div
            className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#c2e9f9]/20 to-[#663399]/20 z-10 pointer-events-none"></div>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KZJvRU4JJak"
              title="Himno Institucional"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Nosotros;
