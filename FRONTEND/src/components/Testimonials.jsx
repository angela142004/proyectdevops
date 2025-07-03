import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
import {
  Star,
  Quote,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Image1 from "../assets/testimonio1.png";
import Image2 from "../assets/testimonio2.png";
import Image3 from "../assets/testimonio3.png";
import Image4 from "../assets/testimonio4.png";
import Image5 from "../assets/testimonio5.png";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  const Data = [
    {
      id: 1,
      image: Image1,
      name: "John Perez",
      role: "Exalumno Promoción 2020",
      university: "PUCP - Ingeniería",
      quote:
        "Estuve, estoy y estaré muy agradecido con la Familia Prisma, y los increíbles integrantes de ella ¡Estudio, Disciplina, Superación, Fuerza Prisma!",
      rating: 5,
      achievement: "Becario de Excelencia Académica",
      color: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      image: Image2,
      name: "Aisha Pastor",
      role: "Exalumna Promoción 2019",
      university: "UNMSM - Medicina",
      quote:
        "Tengo la felicidad de decir que fue en Prisma donde encontré los sueños que quería; y gracias a esto logré mi ingreso a la Universidad",
      rating: 5,
      achievement: "Primera en su promoción",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      image: Image3,
      name: "Alisson Torres",
      role: "Exalumna Promoción 2021",
      university: "UNI - Medicina",
      quote:
        "Tengo los recuerdos de un colegio lleno de risas y niños en las horas de descanso, y de un aula con el profesor dictando las clases más dinámicas.",
      rating: 5,
      achievement: "Estudiante destacada",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 4,
      image: Image4,
      name: "Cristiano Cueva",
      role: "Exalumno Promoción 2018",
      university: "UPC - Administración",
      quote:
        "Tuve la increíble oportunidad de haber estado en este bonito hogar, con la mejor familia que hay; tuve la oportunidad de encontrar quien era yo realmente",
      rating: 5,
      achievement: "Empresario exitoso",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      image: Image5,
      name: "Samira Quispe",
      role: "Exalumna Promoción 2020",
      university: "UNALM - Derecho",
      quote:
        "Aún recuerdo la primera vez que entré al colegio, fue un día realmente especial, fue el comienzo de nuevas aventuras que día a día fueron marcando en mi corazón.",
      rating: 5,
      achievement: "Abogada corporativa",
      color: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section
      className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16 pb-20 overflow-hidden"
      data-aos="fade-up"
    >
      {/* Decorativos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-pink-200/20 to-orange-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-200/10 to-blue-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003049] mb-2">
            EXALUMNOS
            <br />
            PRISMÁTICOS
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Historias inspiradoras de quienes forjaron su destino en nuestra
            gran familia educativa
          </p>
        </div>

        {/* Navegación */}
        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300 group">
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#003049]" />
          </div>
          <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300 group">
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#003049]" />
          </div>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.5}
            spaceBetween={20}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 1.2,
              slideShadows: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="w-full py-12"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2.3 },
            }}
          >
            {Data.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                {({ isActive }) => (
                  <div
                    className={`relative transition-all duration-700 ease-out transform ${
                      isActive ? "scale-100" : "scale-90 opacity-60"
                    }`}
                  >
                    <div className="relative max-w-sm mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <div className="relative z-10 p-6">
                        <div className="text-center mb-6">
                          <div className="relative mb-6 mt-4">
                            <div
                              className={`w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-r ${testimonial.color} shadow-xl`}
                            >
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full rounded-full object-cover border-4 border-white"
                              />
                            </div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                              <div className="bg-yellow-400 rounded-full p-2 shadow-lg">
                                <Star className="w-4 h-4 text-white fill-current" />
                              </div>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {testimonial.name}
                          </h3>
                          <p className="text-xs text-gray-600 mb-1">
                            {testimonial.role}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-sm text-blue-600 font-semibold mb-4">
                            <GraduationCap className="w-4 h-4" />
                            {testimonial.university}
                          </div>
                          <div className="flex justify-center gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="relative mb-6">
                          <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
                          <blockquote className="text-gray-700 text-xs leading-relaxed italic pl-6 pr-2">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>

                        <div
                          className={`bg-gradient-to-r ${testimonial.color} bg-opacity-10 rounded-2xl p-4 text-center border border-gray-100`}
                        >
                          <p className="text-xs font-semibold text-gray-600 mb-1">
                            LOGRO DESTACADO
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            {testimonial.achievement}
                          </p>
                        </div>

                        <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-4 ring-blue-200/50 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(0, 48, 73, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #003049, #780000);
          transform: scale(1.2);
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.2),
            rgba(120, 0, 0, 0.1)
          );
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
