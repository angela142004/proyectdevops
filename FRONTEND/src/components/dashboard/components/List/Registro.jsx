import React, { useContext, useState } from "react";
import { Table, message } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../Modal.jsx";
import Editpost from "../paneles/Editinput.jsx";
import { API_KEY, API_BASE_URL } from "../../../../config/env.jsx";
import { AuthContext } from "../../../../context/AuthContext.jsx";

const Registro = ({ layoutMode = 0, tipo, posts = [], onDelete, onEdit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { user, admin } = useContext(AuthContext);

  const [data, setData] = useState(...posts);
  const [selectedKey, setSelectedKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("jwtToken");

  // Función para abrir modal de eliminación
  const handleOpenDeleteModal = (record) => {
    if (record) {
      setSelectedKey(record);
      setModalOpen(true);
    }
  };

  // Función para abrir modal de edición
  const handleOpenEditModal = (record) => {
    if (record) {
      setSelectedKey(record);
      setEditOpen(true);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = admin
        ? `${API_BASE_URL}/prisma/post/`
        : `${API_BASE_URL}/prisma/post/${user}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status}`);
      }

      const responseData = await response.json();

      const processedData = responseData
        .filter((item) => item.postTypeId === layoutMode)
        .map((item, index) => ({
          key: item.id || index,
          id: item.id,
          titulo: item.title || "Título no disponible",
          autor: item.user?.username || "Autor no disponible",
          fecha: procesarFechas(item.created_at),
          duracion:
            item.start_at && item.end_at
              ? `${procesarFechas(item.start_at)} - ${procesarFechas(
                  item.end_at
                )}`
              : "Duración no disponible",
        }));

      setData(processedData);
    } catch (error) {
      console.error("Error al obtener datos:", error.message);
      message.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  // Función para confirmar eliminación
  const handleConfirm = async () => {
    if (!selectedKey) return;
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/prisma/post/${selectedKey.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al eliminar el registro");
      message.success("Registro eliminado correctamente");
      setModalOpen(false);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Error:", error);
      message.error("No se pudo eliminar el registro");
    } finally {
      setLoading(false);
    }
  };

  // Función callback después de editar
  const handleEditSubmit = (updatedPost) => {
    if (!updatedPost) {
      console.error("Error: updatedPost es undefined o null.");
      message.error("Error al actualizar el post.");
      return;
    }
    console.log("Post actualizado recibido:", updatedPost);
    if (onEdit) onEdit();
    message.success("Post actualizado correctamente");
    setEditOpen(false);
    setSelectedKey(null);
  };

  const procesarFechas = (fechaString) => {
    if (!fechaString) return "Fecha no disponible";

    try {
      const fecha = new Date(fechaString);
      if (isNaN(fecha.getTime())) return "Fecha inválida";

      return fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      console.error("Error al procesar fecha:", error);
      return "Error en formato de fecha";
    }
  };

  // Procesa los datos recibidos por props
  const processedData = posts
    .filter((item) => item.postTypeId === layoutMode || layoutMode === 0)
    .map((item, index) => ({
      key: item.id || index,
      id: item.id,
      titulo: item.title || "Título no disponible",
      autor:
        item.user?.username ||
        item.autor ||
        `ID: ${item.userId}` ||
        "Autor no disponible",
      fecha: procesarFechas(item.created_at),
      duracion:
        item.start_at && item.end_at
          ? `${procesarFechas(item.start_at)} - ${procesarFechas(item.end_at)}`
          : "Duración no disponible",
    }));

  // Columnas comunes
  const commonColumns = {
    titulo: {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    autor: {
      title: "Autor",
      dataIndex: "autor",
      key: "autor",
    },
    fecha: {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    duracion: {
      title: "Duración",
      dataIndex: "duracion",
      key: "duracion",
    },
    edit: {
      title: "Editar",
      key: "edit",
      render: (_, record) => (
        <button
          onClick={() => handleOpenEditModal(record)}
          className="text-blue-600 hover:text-blue-800 p-2"
          title="Editar post"
        >
          <FaEdit />
        </button>
      ),
    },
    delete: {
      title: "Eliminar",
      key: "delete",
      render: (_, record) => (
        <button
          onClick={() => handleOpenDeleteModal(record)}
          className="text-red-600 hover:text-red-800 p-2"
          title="Eliminar post"
        >
          <FaTrash />
        </button>
      ),
    },
  };

  const columns =
    layoutMode === 1
      ? [
          commonColumns.titulo,
          commonColumns.autor,
          commonColumns.fecha,
          commonColumns.duracion,
          commonColumns.edit,
          commonColumns.delete,
        ]
      : [
          commonColumns.titulo,
          commonColumns.autor,
          commonColumns.fecha,
          commonColumns.edit,
          commonColumns.delete,
        ];

  return (
    <div className="w-full">
      {/* ✅ Contenedor que permite scroll horizontal en móviles */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-md shadow-md min-w-[768px] md:min-w-0 p-4">
          <Table
            columns={columns}
            dataSource={processedData}
            pagination={false}
            loading={loading}
            scroll={{ x: "max-content" }} // ✅ Permite scroll horizontal si es necesario
            locale={{
              emptyText: loading ? "Cargando..." : "No hay datos disponibles",
            }}
            className="w-full"
          />

          {/* Modales */}
          {selectedKey && (
            <Modal
              id={selectedKey.titulo}
              isOpen={modalOpen}
              onClose={() => {
                setModalOpen(false);
                setSelectedKey(null);
              }}
              onConfirm={handleConfirm}
            />
          )}

          {selectedKey && (
            <Editpost
              id={selectedKey.id}
              isOpen={editOpen}
              onClose={() => {
                setEditOpen(false);
                setSelectedKey(null);
              }}
              onSubmit={handleEditSubmit}
              Tipo={tipo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Registro;
