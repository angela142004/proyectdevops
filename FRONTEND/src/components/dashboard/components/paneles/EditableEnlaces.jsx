import React, { useEffect, useState } from "react";
import { Table, Button, Input, Spin, message, Select } from "antd";
import { API_KEY, API_BASE_URL } from "../../../../config/env.jsx";

const { Option } = Select;

const EditableEnlaces = () => {
  const [enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [pagina, setPagina] = useState("home");

  const fetchEnlaces = async () => {
    try {
      setLoading(true);
      const endpoint = pagina === "home" ? "/prisma/home" : "/prisma/blog";
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al cargar enlaces");

      const data = await response.json();
      setEnlaces(
        data
          .map((item) => ({
            key: item.id,
            id: item.id,
            enlace: item.enlace,
            pagina: item.pagina,
          }))
          .sort((a, b) => b.id - a.id)
      );
    } catch (err) {
      message.error("No se pudieron cargar los enlaces");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnlaces();
  }, [pagina]);

  const extractYoutubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:.*v=|embed\/)|youtu\.be\/)([^?&#]+)/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  };

  const handleEditClick = (record) => {
    setEditingKey(record.key);

    let enlaceOriginal = record.enlace;
    const embedMatch = record.enlace.match(/youtube\.com\/embed\/([^?&#]+)/);
    if (embedMatch && embedMatch[1]) {
      if (record.pagina === "blog") {
        enlaceOriginal = `https://youtu.be/${embedMatch[1]}`;
      } else if (record.pagina === "home") {
        enlaceOriginal = `https://www.youtube.com/watch?v=${embedMatch[1]}`;
      }
    }

    setEditedRow({ ...record, enlace: enlaceOriginal });
  };

  const handleSaveClick = async () => {
    try {
      const original = enlaces.find((item) => item.key === editingKey);
      if (!original) {
        message.error("No se encontró el elemento a editar.");
        return;
      }
      let enlace = editedRow.enlace?.trim();
      const pagina = original.pagina;

      if (!enlace) {
        message.warning("El enlace no puede estar vacío.");
        return;
      }

      // Siempre genera el embed para blog y home si es un enlace de YouTube
      let enlaceFinal = enlace;
      const videoId = extractYoutubeId(enlace);
      if (videoId) {
        if (pagina === "home" || pagina === "blog") {
          enlaceFinal = `https://www.youtube.com/embed/${videoId}`;
          if (pagina === "home") {
            enlaceFinal += "?autoplay=1&rel=0&modestbranding=1";
          }
        }
      }

      const token = localStorage.getItem("jwtToken");
      const updated = { enlace: enlaceFinal, pagina };
      console.log("Datos enviados al backend:", updated);

      const response = await fetch(`${API_BASE_URL}/prisma/edit/${String(original.id)}`, {
        method: "PUT",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      const text = await response.text();
      if (!response.ok) {
        console.error("Respuesta del backend:", text);
        throw new Error("Error al guardar en el servidor: " + text);
      }

      message.success("Enlace actualizado correctamente");
      setEditingKey(null);
      setEditedRow({});
      fetchEnlaces();
    } catch (error) {
      console.error("Error al guardar:", error);
      message.error("No se pudo guardar el enlace: " + error.message);
    }
  };

  const columns = [
    {
      title: "Enlace",
      dataIndex: "enlace",
      key: "enlace",
      render: (_, record) => {
        const isEditing = record.key === editingKey;

        return isEditing ? (
          <div className="w-full flex flex-col gap-1">
            <Input
              value={editedRow.enlace}
              onChange={(e) =>
                setEditedRow({ ...editedRow, enlace: e.target.value })
              }
            />
          </div>
        ) : (
          record.enlace
        );
      },
    },
    {
      title: "Página",
      dataIndex: "pagina",
      key: "pagina",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => {
        const isEditing = record.key === editingKey;
        return isEditing ? (
          <Button type="primary" onClick={handleSaveClick}>
            Guardar
          </Button>
        ) : (
          <Button onClick={() => handleEditClick(record)}>Editar</Button>
        );
      },
    },
  ];

  return (
    <section className="bg-white rounded-xl shadow p-4 sm:p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-base sm:text-lg font-semibold mb-2 text-center">
        Enlaces por Página
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center">
        <label className="font-medium">Página:</label>
        <Select
          value={pagina}
          onChange={(value) => setPagina(value)}
          style={{ width: 160, minWidth: 120 }}
          size="middle"
        >
          <Option value="home">Home</Option>
          <Option value="blog">Blog</Option>
        </Select>
      </div>
      <Spin spinning={loading}>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={enlaces}
            pagination={false}
            className="mt-2 min-w-[340px]"
            size="small"
          />
        </div>
      </Spin>
    </section>
  );
};

export default EditableEnlaces;
