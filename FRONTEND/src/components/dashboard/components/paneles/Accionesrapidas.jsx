import React, { useState } from "react";
import { FiFileText, FiCalendar, FiBell } from "react-icons/fi";
import Crearinput from "./Crearinput";

const acciones = [
  {
    label: "Nueva Publicación",
    desc: "Crear una nueva noticia",
    color: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
    icon: <FiFileText size={28} className="mb-2" />,
    tipo: "Blog",
  },
  {
    label: "Nuevo Evento",
    desc: "Programar un evento",
    color: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    icon: <FiCalendar size={28} className="mb-2" />,
    tipo: "Evento",
  },
  {
    label: "Nuevo Comunicado",
    desc: "Enviar comunicado",
    color: "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300",
    icon: <FiBell size={28} className="mb-2" />,
    tipo: "Comunicado",
  },
];

const AccionesRapidas = ({
  onNuevaPublicacion,
  onNuevoEvento,
  onNuevoComunicado,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tipo, setTipo] = useState("");

  const handleOpenModal = (tipo) => {
    setTipo(tipo);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);
  const handleFormSubmit = (data) => {
    setModalOpen(false);
    setTipo("");
    if (onNuevaPublicacion && tipo === "Blog") onNuevaPublicacion(data);
    if (onNuevoEvento && tipo === "Evento") onNuevoEvento(data);
    if (onNuevoComunicado && tipo === "Comunicado") onNuevoComunicado(data);
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7 transition-all duration-200">
      <h2 className="text-xl font-bold mb-2 text-gray-800 tracking-tight">
        Acciones Rápidas
      </h2>
      <p className="text-gray-500 text-sm mb-5">
        Crear nuevo contenido para el colegio
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {acciones.map((accion) => (
          <button
            key={accion.label}
            className={`flex-1 flex flex-col items-center justify-center ${accion.color} text-white rounded-xl py-6 shadow transition-all duration-150 focus:outline-none focus:ring-2 font-semibold group`}
            onClick={() => handleOpenModal(accion.tipo)}
            type="button"
          >
            <span className="transition-transform group-hover:scale-110">
              {accion.icon}
            </span>
            <span className="text-base mb-1">{accion.label}</span>
            <span className="text-xs font-normal opacity-80">
              {accion.desc}
            </span>
          </button>
        ))}
      </div>
      <Crearinput
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        Tipo={tipo}
      />
    </section>
  );
};

export default AccionesRapidas;
