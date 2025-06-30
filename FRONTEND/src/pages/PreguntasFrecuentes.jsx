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
      category: "General",
      icon: <HelpCircle className="w-5 h-5" />,
      question: "¿Cómo puedo crear una cuenta?",
      answer:
        "Puedes crear una cuenta haciendo clic en el botón 'Registrarse' en la esquina superior derecha. Solo necesitas tu email y crear una contraseña segura. El proceso toma menos de 2 minutos y recibirás un email de confirmación.",
    },
    {
      id: 2,
      category: "Seguridad",
      icon: <Shield className="w-5 h-5" />,
      question: "¿Mis datos están seguros?",
      answer:
        "Absolutamente. Utilizamos encriptación de grado bancario (SSL 256-bit) para proteger toda tu información. Nuestros servidores están certificados y cumplimos con los más altos estándares de seguridad internacional.",
    },
    {
      id: 3,
      category: "Características",
      icon: <Star className="w-5 h-5" />,
      question: "¿Qué funciones incluye el plan gratuito?",
      answer:
        "El plan gratuito incluye acceso a todas las funciones básicas: hasta 5 proyectos, 1GB de almacenamiento, soporte por email y acceso a nuestra comunidad. Es perfecto para comenzar y probar nuestra plataforma.",
    },
    {
      id: 4,
      category: "Soporte",
      icon: <Users className="w-5 h-5" />,
      question: "¿Cómo puedo contactar al soporte técnico?",
      answer:
        "Ofrecemos múltiples canales de soporte: chat en vivo 24/7, email (soporte@ejemplo.com), y una base de conocimientos completa. Los usuarios premium también tienen acceso a soporte telefónico prioritario.",
    },
    {
      id: 5,
      category: "Características",
      icon: <Zap className="w-5 h-5" />,
      question: "¿Puedo cambiar mi plan en cualquier momento?",
      answer:
        "Sí, puedes actualizar o reducir tu plan cuando quieras desde tu panel de control. Los cambios se reflejan inmediatamente y solo pagas la diferencia prorrateada. No hay penalizaciones por cambios.",
    },
    {
      id: 6,
      category: "General",
      icon: <HelpCircle className="w-5 h-5" />,
      question: "¿Ofrecen reembolsos?",
      answer:
        "Ofrecemos una garantía de reembolso completo de 30 días sin preguntas. Si no estás satisfecho por cualquier razón, te devolvemos tu dinero. Para planes anuales, el período de reembolso se extiende a 60 días.",
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
      General: "bg-blue-100 text-blue-800",
      Seguridad: "bg-green-100 text-green-800",
      Características: "bg-purple-100 text-purple-800",
      Soporte: "bg-orange-100 text-orange-800",
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
