import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Barra from "../components/Barra";
import Header from "../components/Header";
import Stats from "../components/paneles/Stats";
import PublicacionesRecientes from "../components/paneles/Publicacionreciente";
import AccionesRapidas from "../components/paneles/Accionesrapidas";
import GestionContenido from "../components/paneles/Gestion";
import { API_BASE_URL, API_KEY } from "../../../config/env.jsx";

export default function PanelA() {
  const { user, name, admin, loading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [interesados, setInteresados] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (loading) return;

    const fetchPosts = async () => {
      try {
        const url = admin
          ? `${API_BASE_URL}/prisma/post/`
          : `${API_BASE_URL}/prisma/post/${user}`;

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los posts");

        const data = await response.json();
        setPosts([
          {
            type: 1,
            count: data.filter((item) => item.postTypeId === 2).length,
          },
          {
            type: 2,
            count: data.filter((item) => item.postTypeId === 1).length,
          },
          {
            type: 3,
            count: data.filter((item) => item.postTypeId === 3).length,
          },
        ]);
      } catch (error) {
        console.error("Error en fetch:", error.message);
      }
    };

    const fetchInteresados = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/prisma/getform`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los interesados");

        const data = await response.json();
        setInteresados(data);
      } catch (error) {
        console.error("Error en fetchInteresados:", error.message);
      }
    };

    fetchPosts();
    fetchInteresados();
  }, [token, admin, user, loading]);

  if (loading) {
    return <div className="p-6 text-center">Cargando...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral en escritorio */}
      <div className="hidden md:block">
        <Barra />
      </div>

      {/* Panel principal */}
      <div className="flex-1 flex flex-col mt-16 px-4 sm:px-6 lg:px-8 transition-all duration-300 md:ml-60">
        <Header user={name} />

        <Stats
          posts={posts.map((item) => item.count)}
          interesados={interesados.length}
        />

        {/* Layout responsive mejorado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {/* Columna principal */}
          <div className="xl:col-span-2 flex flex-col gap-6 order-2 xl:order-1">
            <PublicacionesRecientes />
          </div>

          {/* Columna secundaria */}
          <div className="flex flex-col gap-6 order-1 xl:order-2">
            <AccionesRapidas />
            <GestionContenido />
          </div>
        </div>
      </div>
    </div>
  );
}
