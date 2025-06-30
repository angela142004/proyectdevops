import React, { useState } from "react";
import { message } from "antd";
import HeaderPublicaciones from "../components/List/HeaderP";
import ModalGeneral from "../components/List/ModalGeneral";
import FormularioUsuario from "../components/List/FormularioUsuario";
import RegistroU from "../components/List/RegistroU";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";

const Users = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const handleNuevaUsuario = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleCrearUsuario = async (values) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_BASE_URL}/prisma/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Usuario creado correctamente");
        setModalVisible(false);
        setReload((r) => !r); // Recarga la tabla de usuarios
      } else {
        message.error("Error al crear usuario");
      }
    } catch (error) {
      message.error("Error de conexión");
    }
  };

  return (
    <div
      className="flex-1 p-4 sm:p-6 mt-16 sm:ml-56 transition-all duration-300"
      style={{ overflowX: "hidden" }}
    >
      <HeaderPublicaciones
        tipo="Usuarios"
        descripcion="Gestiona todos los usuarios registrados en la plataforma"
        textoBoton="+ Nuevo Usuario"
        onNuevaPublicacion={handleNuevaUsuario}
      />

      <ModalGeneral
        visible={modalVisible}
        onClose={handleCloseModal}
        destroyOnHidden
      >
        <FormularioUsuario onFinish={handleCrearUsuario} />
      </ModalGeneral>

      {/* Scroll horizontal en móviles */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ width: "900px" }}>
          <RegistroU reload={reload} />
        </div>
      </div>
    </div>
  );
};

export default Users;
