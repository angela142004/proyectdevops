import React, { useEffect, useState, useContext } from "react";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

const Publicaciones = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { user, admin } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();

      let visibles = data;
      if (!admin) {
        visibles = data.filter((post) => post.userId === user.id);
      }

      setPosts(visibles);
      setFilteredPosts(visibles);
    };
    fetchPosts();
  }, [user]);

  const refreshPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
      headers: { "x-api-key": API_KEY },
    });
    const data = await response.json();
    let visibles = data;
    if (!admin) {
      visibles = data.filter((post) => post.userId === user.id);
    }
    setPosts(visibles);
    setFilteredPosts(visibles);
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const result = posts.filter((post) => {
      const matchTitle = post.title.toLowerCase().includes(lowerQuery);
      const fecha = post.created_at
        ? new Date(post.created_at).toLocaleDateString()
        : "";
      const matchFecha = fecha.includes(lowerQuery);
      return matchTitle || matchFecha;
    });
    setFilteredPosts(result);
  };

  return (
    <div
      className="flex-1 p-4 sm:p-6 mt-16 sm:ml-56 transition-all duration-300"
      style={{ overflowX: "hidden" }}
    >
      <HeaderPublicaciones
        tipo={"Blog"}
        descripcion={"Gestiona todas las publicaciones en la plataforma"}
        textoBoton={"+ Nueva Publicación"}
        onNuevaPublicacion={refreshPosts}
      />

      <div className="mb-4">
        <SearchP
          placeholder="Buscar publicaciones..."
          onSearch={handleSearch}
        />
      </div>

      {/* Scroll horizontal solo en móviles */}
      <div
        className="w-full"
        style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
      >
        <div className="w-full lg:w-auto" style={{ minWidth: 0 }}>
          <Registro
            layoutMode={2}
            tipo={"Blog"}
            posts={filteredPosts}
            onDelete={refreshPosts}
            onEdit={refreshPosts}
          />
        </div>
      </div>
    </div>
  );
};

export default Publicaciones;
