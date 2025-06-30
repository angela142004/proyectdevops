import React from "react";
import { FiFileText, FiCalendar, FiBell, FiEye } from "react-icons/fi";

const defaultStats = [
  {
    title: "Total Publicaciones",
    value: 5,
    description: "Noticias, eventos y comunicados",
    icon: (
      <FiFileText
        className="text-blue-400 bg-blue-50 rounded-full p-1"
        size={28}
      />
    ),

    trendColor: "text-green-600",
  },
  {
    title: "Eventos Activos",
    value: 1,
    description: "Eventos publicados",
    icon: (
      <FiCalendar
        className="text-green-400 bg-green-50 rounded-full p-1"
        size={28}
      />
    ),
    trendColor: "text-green-600",
  },
  {
    title: "Comunicados",
    value: 2,
    description: "Comunicados totales",
    icon: (
      <FiBell
        className="text-orange-400 bg-orange-50 rounded-full p-1"
        size={28}
      />
    ),
    trendColor: "text-green-600",
  },
  {
    title: "Interesados",
    value: 663,
    description: "Vistas totales",
    icon: (
      <FiEye
        className="text-purple-400 bg-purple-50 rounded-full p-1"
        size={28}
      />
    ),
    trendColor: "text-green-600",
  },
];

const Stats = ({ posts, interesados }) => (
  <section className="mb-8 mt-6">
    {/* ↑↑↑ Agregado mt-6 para separar del Header */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {defaultStats.map((stat, idx) => (
        <div
          key={stat.title}
          className="relative bg-white rounded-2xl border border-gray-100 shadow-lg p-7 flex flex-col gap-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group overflow-hidden"
          style={{ animation: `fadeInUp 0.5s ${idx * 0.08 + 0.1}s both` }}
        >
          <div className="absolute top-5 right-5 transition-transform duration-300 group-hover:scale-110">
            {stat.icon}
          </div>
          <span className="font-medium text-sm text-gray-700">
            {stat.title}
          </span>
          <span className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {posts[idx] || interesados}
          </span>
          <span className="text-xs text-gray-500">{stat.description}</span>
          <span className={`text-xs mt-2 ${stat.trendColor}`}>
            {stat.trend}
          </span>
          {/* Línea decorativa animada */}
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-r-full group-hover:w-full transition-all duration-500"></span>
        </div>
      ))}
    </div>
    {/* Animación fadeInUp */}
    <style>
      {`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>
  </section>
);

export default Stats;
