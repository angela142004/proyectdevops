import React, { useState } from "react";
import { API_KEY, API_BASE_URL } from "../../src/config/env.jsx";

export default function ModalForm({ open, onClose, level }) {
  const [loading, setLoading] = useState(false);
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const dni = formData.get("dni");
    const telefono = formData.get("telefono");
    const correo = formData.get("correo");
    const grado = formData.get("grado");
    const colegio_procedencia = formData.get("colegio_procedencia");
    const privacy = formData.get("privacy");

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
      colegio_procedencia,
    };

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

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
        className="modalform-container relative bg-white bg-opacity-95 w-full max-w-xs mx-auto rounded-2xl shadow-xl border border-[#003049] animate-modal-pop px-3 sm:px-4 py-6"
        style={{
          boxShadow: "0 8px 30px 0 #00304922, 0 0px 80px 0 #00304933",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#a5123b] text-2xl font-bold focus:outline-none"
          aria-label="Cerrar formulario"
        >
          ×
        </button>

        <div className="text-center mt-6 mb-4">
          <h2 className="text-2xl font-bold text-[#003049] tracking-widest drop-shadow">
            {level === "INICIAL"
              ? "Inicial"
              : level === "PRIMARIA"
              ? "Primaria"
              : level === "SECUNDARIA"
              ? "Secundaria"
              : "Nivel"}
          </h2>
          <div className="h-2 w-16 mx-auto rounded-full bg-gradient-to-r from-[#6698BC] to-[#003049] mt-1.5 mb-2"></div>
        </div>

        <form className="flex flex-col gap-3 pb-4" onSubmit={handleSubmit}>
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
                className="block text-[#003049] font-semibold mb-1 ml-1 text-sm"
                htmlFor={id}
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type || "text"}
                className="modalform-input w-full px-3 py-2 rounded-xl border border-[#003049] bg-white/70 shadow-inner
                  focus:ring-2 focus:ring-[#6698BC] focus:border-[#003049] outline-none
                  placeholder-gray-400 transition-all duration-200"
                placeholder={placeholder}
                autoComplete="off"
              />
            </div>
          ))}

          <div>
            <label
              className="block text-[#003049] font-semibold mb-1 ml-1 text-sm"
              htmlFor="grado"
            >
              {gradeLabel}
            </label>
            <select
              id="grado"
              name="grado"
              className="modalform-select w-full px-3 py-2 rounded-xl border border-[#003049] bg-white/70 shadow-inner
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

          <div>
            <label
              className="block text-[#003049] font-semibold mb-1 ml-1 text-sm"
              htmlFor="colegio_procedencia"
            >
              Colegio de procedencia (opcional)
            </label>
            <input
              id="colegio_procedencia"
              name="colegio_procedencia"
              type="text"
              className="w-full px-3 py-2 rounded-xl border border-[#003049] bg-white/70 shadow-inner
                focus:ring-2 focus:ring-[#6698BC] focus:border-[#003049] outline-none
                placeholder-gray-400 transition-all duration-200"
              placeholder="Ejemplo: Colegio Nacional ..."
              autoComplete="off"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              className="w-4 h-4 text-[#003049] border border-gray-300 rounded focus:ring-[#6698BC]"
            />
            <label htmlFor="privacy" className="ml-2 text-xs text-gray-600">
              Acepto las políticas de privacidad.*
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#780000] text-white font-bold py-2 mt-3 rounded-xl text-base shadow-md
                hover:bg-[#a5123b] hover:shadow-[0_0_12px_#a5123bbb] transition-all duration-200 tracking-wide"
          >
            {loading ? "Enviando..." : "ÚNETE"}
          </button>
        </form>
      </div>

      <style>{`
        .modalform-input,
        .modalform-select {
          font-size: 0.9rem;
          padding: 0.6rem 0.75rem;
        }

        .modalform-container h2 {
          font-size: 1.5rem;
        }

        .modalform-container label {
          font-size: 0.85rem;
        }

        .modalform-container button {
          font-size: 0.95rem;
          padding: 0.65rem;
        }

        @media (max-width: 640px) {
          .modalform-container {
            width: 92%;
            padding: 0.75rem;
            border-radius: 1rem;
          }

          .modalform-container h2 {
            font-size: 1.3rem;
          }

          .modalform-input,
          .modalform-select {
            font-size: 0.9rem;
            padding: 0.6rem 0.8rem;
          }

          .modalform-container label {
            font-size: 0.8rem;
          }

          .modalform-container button {
            font-size: 0.9rem;
            padding: 0.6rem;
          }
        }

        @keyframes modal-pop {
          0% { transform: scale(.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-modal-pop {
          animation: modal-pop 0.35s cubic-bezier(.39, 1.73, .71, .89);
        }
      `}</style>
    </div>
  );
}
