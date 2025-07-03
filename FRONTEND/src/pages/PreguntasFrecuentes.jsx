import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Star,
  Users,
  Shield,
  Zap,
} from "lucide-react";

const PreguntasFrecuentes = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      id: 1,
      category: "Admisión",
      icon: <HelpCircle className="w-5 h-5" />,
      question: "¿En qué fechas se realizan las matrículas?",
      answer:
        "Nuestro proceso de Admisión 2026 inicia en julio del 2025 y finaliza en marzo del 2026. Recomendamos estar atentos a nuestras redes sociales y página web, donde se publicará el cronograma detallado y los requisitos para cada fase del proceso.",
    },
    {
      id: 2,
      category: "Horarios",
      icon: <Shield className="w-5 h-5" />,
      question: "¿Cuál es el horario de clases?",
      answer:
        "El horario de clases varía según el nivel educativo: el nivel Inicial tiene clases hasta la 1:30 p.m., Primaria hasta las 2:00 p.m. y Secundaria hasta las 2:20 p.m. Las clases inician a las 7:30 a.m. en todos los niveles, de lunes a viernes.",
    },
    {
      id: 3,
      category: "Costos",
      icon: <Star className="w-5 h-5" />,
      question: "¿Cuánto cuesta la pensión mensual?",
      answer:
        "La pensión mensual varía según el nivel educativo: para Inicial es de S/ 300, para Primaria S/ 315 y para Secundaria S/ 345. Estos montos están diseñados para brindar una educación de calidad a un costo accesible.",
    },
    {
      id: 4,
      category: "Plataforma",
      icon: <Users className="w-5 h-5" />,
      question: "¿Cómo accedo a la plataforma virtual del colegio?",
      answer:
        "Puedes acceder a la plataforma virtual del colegio a través del enlace SIGEDU disponible en nuestra página web. Al hacer clic, serás redirigido al portal donde podrás ingresar con tu usuario y contraseña asignados. ",
    },

    {
      id: 5,
      category: "Admisión",
      icon: <HelpCircle className="w-5 h-5" />,
      question: "¿El colegio ofrece becas o descuentos?",
      answer:
        "Sí, el colegio cuenta con un programa de becas y descuentos para estudiantes con alto rendimiento académico, necesidades económicas comprobadas o hermanos matriculados.",
    },
    {
      id: 6,
      category: "Admisión",
      icon: <HelpCircle className="w-5 h-5" />,
      question: "¿Qué documentos necesito para matrícula o traslado?",
      answer:
        "Para realizar la matrícula o traslado al colegio, se requiere presentar los siguientes documentos: copia del DNI del estudiante y apoderado, partida de nacimiento, libreta de notas del último año cursado, constancia de matrícula y de no adeudo del colegio de origen (en caso de traslado), ficha única de matrícula (SIAGIE), y una foto tamaño carnet.",
    },
    {
      id: 7,
      category: "Horarios",
      icon: <HelpCircle className="w-5 h-5" />,
      question: "¿El colegio tiene horario extendido o tutorías?",
      answer:
        "Sí, el colegio ofrece servicio de horario extendido para estudiantes de Inicial y Primaria, disponible hasta las 4:00 p.m. Este espacio incluye actividades recreativas y apoyo académico.",
    },
    {
      id: 8,
      category: "Horarios",
      icon: <HelpCircle className="w-5 h-5" />,
      question: "¿Qué actividades extracurriculares ofrece el colegio?",
      answer:
        "El colegio ofrece diversas actividades extracurriculares que complementan la formación integral de los estudiantes. Entre ellas se incluyen talleres de música, preparación para concursos de matemáticas en horario vespertino y el uso de mesas de tenis de mesa para fomentar la actividad física y la recreación. ",
    },
    {
      id: 9,
      category: "Costos",
      icon: <Star className="w-5 h-5" />,
      question:
        "¿Hay cargos adicionales por materiales, excursiones o actividades especiales?",
      answer:
        "Sí, durante el año se solicita una cuota adicional para cubrir actividades especiales, como celebraciones, talleres, salidas educativas y el aniversario del colegio. Estos aportes son comunicados con anticipación y están destinados a garantizar una mejor organización y participación de los estudiantes. ",
    },
    {
      id: 10,
      category: "Plataforma",
      icon: <Users className="w-5 h-5" />,
      question: "¿Cómo accedo a la plataforma virtual del colegio?",
      answer:
        "Puedes acceder a la plataforma virtual del colegio a través del enlace SIGEDU disponible en nuestra página web. Al hacer clic, serás redirigido al portal donde podrás ingresar con tu usuario y contraseña asignados. ",
    },
    {
      id: 11,
      category: "Plataforma",
      icon: <Users className="w-5 h-5" />,
      question: "¿Cómo puedo comunicarme con los profesores?",
      answer:
        "Puedes comunicarte con los profesores a través de la plataforma virtual SIGEDU, donde podrás enviar mensajes directos o revisar los comunicados. También es posible coordinar reuniones o consultas mediante la agenda escolar o contactando a la tutora del aula. ",
    },
  ];

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Admisión: "bg-blue-100 text-blue-800",
      Horarios: "bg-green-100 text-green-800",
      Costos: "bg-purple-100 text-purple-800",
      Plataforma: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 mt-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las preguntas más comunes sobre
            nuestra plataforma
          </p>
        </div>
        <div className="absolute -bottom-1 left-0 w-full h-8 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-100 transform rotate-1 origin-bottom-left"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar en preguntas frecuentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSearchTerm("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              searchTerm === ""
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSearchTerm(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                searchTerm === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(
                        faq.category
                      )}`}
                    >
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {activeIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-400 transform transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 transform transition-transform duration-200" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pl-20">
                  <div className="border-l-4 border-blue-200 pl-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600">
              Intenta con diferentes términos de búsqueda o explora todas las
              categorías
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
