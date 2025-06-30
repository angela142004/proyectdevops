// src/components/Blog_post.jsx
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";
import img4 from "../assets/blog_post1.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog_post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/prisma/post/page?tipo=2`, {
          headers: { "x-api-key": API_KEY },
          cache: "no-cache",
        });
        if (!res.ok) throw new Error("Error al obtener los posts del blog");
        setPosts(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPosts = posts.slice(startIndex, startIndex + pageSize);

  return (
    <section className="bg-[#f0e4d0] py-10 px-4 sm:px-6 lg:px-8">
      {/* Título y descripción */}
      <h2
        className="text-3xl sm:text-5xl font-black text-center mb-6 text-[#003049]"
        data-aos="fade-up"
      >
        Publicaciones
      </h2>
      <p
        className="max-w-2xl mx-auto text-[#3B4D61] text-sm sm:text-base text-center mb-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Aquí compartimos reflexiones, novedades y recomendaciones para
        acompañarte en el crecimiento y formación de tus hijos dentro y fuera
        del aula.
      </p>

      {/* Contenido */}
      {loading ? (
        <p className="text-center text-gray-600">Cargando publicaciones…</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Tarjetas */}
          <div
            className="mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl justify-items-center"
            data-aos="fade-up"
          >
            {paginatedPosts.map((post, idx) => (
              <div
                key={post.id}
                className="w-full max-w-[260px] border-2x1 shadow-md rounded-lg overflow-hidden bg-[#780000] hover:bg-[#003049] transition duration-300 flex flex-col"
                data-aos="zoom-in-up"
                data-aos-delay={idx * 100}
              >
                {/* Imagen con margen rojo conservado */}
                <img
                  src={post.images?.[0]?.image_url || img4}
                  alt={post.title}
                  className="w-52 h-52 object-cover mx-auto my-5 rounded border-4 border-[#780000]"
                  loading="lazy"
                />

                {/* Texto */}
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-base text-white mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white mb-2">
                    {formatDate(post.created_at)}
                  </p>
                  <Link
                    to={`/Blog/${post.id}`}
                    className="mt-auto flex items-center gap-1 text-blue-300 hover:underline text-sm"
                  >
                    Leer más
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center mt-10">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={posts.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Blog_post;
