import React, { useEffect, useState, useContext } from "react";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

const Comunicados = () => {
  const [comunicados, setComunicados] = useState([]);
  const [filteredComunicados, setFilteredComunicados] = useState([]);
  const { user, admin } = useContext(AuthContext);

  useEffect(() => {
    const fetchComunicados = async () => {
      const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();

      let visibles = data;
      if (!admin) {
        visibles = data.filter((post) => post.userId === user.id);
      }

      setComunicados(visibles);
      setFilteredComunicados(visibles);
    };
    fetchComunicados();
  }, [user]);

  const refreshComunicados = async () => {
    const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
      headers: { "x-api-key": API_KEY },
    });
    const data = await response.json();
    let visibles = data;
    if (!admin) {
      visibles = data.filter((post) => post.userId === user.id);
    }
    setComunicados(visibles);
    setFilteredComunicados(visibles);
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const result = comunicados.filter((com) => {
      const matchTitle = com.title.toLowerCase().includes(lowerQuery);
      const fecha = com.created_at
        ? new Date(com.created_at).toLocaleDateString()
        : "";
      const matchFecha = fecha.includes(lowerQuery);
      return matchTitle || matchFecha;
    });
    setFilteredComunicados(result);
  };

  return (
    <div
      className="flex-1 p-4 sm:p-6 mt-16 sm:ml-56 transition-all duration-300"
      style={{ overflowX: "hidden" }}
    >
      <HeaderPublicaciones
        tipo={"Comunicado"}
        descripcion={"Gestiona todos los comunicados en la plataforma"}
        textoBoton={"+ Nuevo Comunicado"}
        onNuevaPublicacion={refreshComunicados}
      />

      <div className="mb-4">
        <SearchP placeholder="Buscar comunicados..." onSearch={handleSearch} />
      </div>

      {/* Scroll horizontal para móviles */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ width: "900px" }}>
          <Registro
            layoutMode={3}
            tipo={"Comunicado"}
            posts={filteredComunicados}
            onDelete={refreshComunicados}
            onEdit={refreshComunicados}
          />
        </div>
      </div>
    </div>
  );
};

export default Comunicados;
