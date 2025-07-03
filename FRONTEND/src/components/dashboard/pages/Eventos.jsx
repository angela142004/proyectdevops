import React, { useEffect, useState, useContext } from "react";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const { user, admin } = useContext(AuthContext);

  useEffect(() => {
    const fetchEventos = async () => {
      const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();
      console.log("Todos los posts recibidos:", data);

      let visibles = data;
      if (!admin) {
        visibles = data.filter((post) => post.userId === user.id);
      }

      setEventos(visibles);
      setFilteredEventos(visibles);
    };
    fetchEventos();
  }, [user]);

  const refreshEventos = async () => {
    const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
      headers: { "x-api-key": API_KEY },
    });
    const data = await response.json();
    let visibles = data;
    if (!admin) {
      visibles = data.filter((post) => post.userId === user.id);
    }
    setEventos(visibles);
    setFilteredEventos(visibles);
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const result = eventos.filter((evento) => {
      const matchTitle = evento.title.toLowerCase().includes(lowerQuery);
      const fecha = evento.created_at
        ? new Date(evento.created_at).toLocaleDateString()
        : "";
      const matchFecha = fecha.includes(lowerQuery);
      return matchTitle || matchFecha;
    });
    setFilteredEventos(result);
  };

  return (
    <div
      className="flex-1 p-4 sm:p-6 mt-16 sm:ml-56 transition-all duration-300"
      style={{ overflowX: "hidden" }}
    >
      <HeaderPublicaciones
        tipo={"Evento"}
        descripcion={"Gestiona todos los eventos en la plataforma"}
        textoBoton={"+ Nuevo Evento"}
        onNuevaPublicacion={refreshEventos}
      />

      <div className="mb-4">
        <SearchP placeholder="Buscar eventos..." onSearch={handleSearch} />
      </div>

      {/* Scroll horizontal solo en móviles */}
      <div
        className="w-full"
        style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
      >
        <div className="w-full lg:w-auto" style={{ minWidth: 0 }}>
          <Registro
            layoutMode={1}
            tipo={"Evento"}
            posts={filteredEventos}
            onDelete={refreshEventos}
            onEdit={refreshEventos}
          />
        </div>
      </div>
    </div>
  );
};

export default Eventos;