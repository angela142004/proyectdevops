import React, { useState } from "react";
import { API_KEY, API_BASE_URL } from "../../src/config/env.jsx";

export default function ModalForm({ open, onClose, level }) {
  const [loading, setLoading] = useState(false);
  //form
  if (!open) return null;

  // Cerrar el modal haciendo click en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Definir las opciones y label según el nivel recibido
  let gradeLabel = "";
  let gradeOptions = [];
  if (level === "INICIAL") {
    gradeLabel = "Edad";
    gradeOptions = ["3 años", "4 años", "5 años"];
  } else if (level === "PRIMARIA") {
    gradeLabel = "Grado";
    gradeOptions = [
      "Primer grado",
      "Segundo grado",
      "Tercer grado",
      "Cuarto grado",
      "Quinto grado",
      "Sexto grado",
    ];
  } else if (level === "SECUNDARIA") {
    gradeLabel = "Grado";
    gradeOptions = [
      "Primer grado",
      "Segundo grado",
      "Tercer grado",
      "Cuarto grado",
      "Quinto grado",
    ];
  }

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    // Extraer valores del formulario
    const nombre = formData.get("nombre");
    const dni = formData.get("dni");
    const telefono = formData.get("telefono");
    const correo = formData.get("correo");
    const grado = formData.get("grado");
    const privacy = formData.get("privacy");

    // Validación simple: si falta algún campo o no se acepta las políticas, se rechaza el envío.
    if (!nombre || !dni || !telefono || !correo || !grado || !privacy) {
      alert(
        "Por favor, completa todos los campos y acepta las políticas de privacidad."
      );
      setLoading(false);
      return;
    }

    const data = {
      nombre,
      dni,
      telefono,
      correo,
      grado,
      nivel: level,
    };

    // Construir headers condicionalmente
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };
    console.log(data)
    try {
      const response = await fetch(`${API_BASE_URL}/prisma/upform`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al enviar la información");

      alert("¡Registro enviado correctamente!");
      onClose();
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all"
      onClick={handleOverlayClick}
    >
      <div
        className="relative bg-white bg-opacity-95 w-full max-w-md mx-auto rounded-3xl shadow-2xl border-2 border-[#003049] animate-modal-pop"
        style={{
          boxShadow: "0 10px 40px 0 #00304922, 0 0px 120px 0 #00304933",
        }}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#a5123b] text-2xl font-bold focus:outline-none"
          aria-label="Cerrar formulario"
        >
          ×
        </button>

        {/* Título y subrayado */}
        <div className="text-center mt-8 mb-5">
          <h2 className="text-3xl font-bold text-[#003049] tracking-widest drop-shadow">
            {level === "INICIAL"
              ? "Inicial"
              : level === "PRIMARIA"
              ? "Primaria"
              : level === "SECUNDARIA"
              ? "Secundaria"
              : "Nivel"}
          </h2>
          <div className="h-2 w-20 mx-auto rounded-full bg-gradient-to-r from-[#6698BC] to-[#003049] mt-2 mb-2"></div>
        </div>

        <form className="flex flex-col gap-5 px-8 pb-8" onSubmit={handleSubmit}>
          {[
            {
              label: "Nombre Completo",
              placeholder: "Insertar nombre completo",
              id: "nombre",
            },
            { label: "DNI", placeholder: "Insertar DNI", id: "dni" },
            {
              label: "Teléfono",
              placeholder: "Insertar teléfono",
              id: "telefono",
            },
            {
              label: "Correo",
              placeholder: "Insertar correo",
              id: "correo",
              type: "email",
            },
          ].map(({ label, placeholder, id, type }) => (
            <div key={id}>
              <label
                className="block text-[#003049] font-semibold mb-1 ml-1"
                htmlFor={id}
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type || "text"}
                className="w-full px-4 py-2.5 rounded-xl border border-[#003049] bg-white/70 shadow-inner
                  focus:ring-2 focus:ring-[#6698BC] focus:border-[#003049] outline-none
                  placeholder-gray-400 transition-all duration-200"
                placeholder={placeholder}
                autoComplete="off"
              />
            </div>
          ))}

          {/* Campo select para "Grado" o "Edad" según el nivel */}
          <div>
            <label
              className="block text-[#003049] font-semibold mb-1 ml-1"
              htmlFor="grado"
            >
              {gradeLabel}
            </label>
            <select
              id="grado"
              name="grado"
              className="w-full px-4 py-2.5 rounded-xl border border-[#003049] bg-white/70 shadow-inner
                  focus:ring-2 focus:ring-[#6698BC] focus:border-[#003049] outline-none
                  transition-all duration-200"
            >
              <option value="">Selecciona una opción</option>
              {gradeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Aceptar términos y condiciones */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              className="w-4 h-4 text-[#003049] border border-gray-300 rounded focus:ring-[#6698BC]"
            />
            <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
              Acepto las políticas de privacidad.*
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#780000] text-white font-bold py-3 mt-4 rounded-xl text-lg shadow-lg
                hover:bg-[#a5123b] hover:shadow-[0_0_16px_#a5123bbb] transition-all duration-200 tracking-wider"
          >
            {loading ? "Enviando..." : "ÚNETE"}
          </button>
        </form>
      </div>

      {/* Animación pop-in */}
      <style>
        {`
          @keyframes modal-pop {
            0% { transform: scale(.7); opacity:0; }
            100% { transform: scale(1); opacity:1; }
          }
          .animate-modal-pop { animation: modal-pop 0.35s cubic-bezier(.39,1.73,.71,.89); }
        `}
      </style>
    </div>
  );
}
