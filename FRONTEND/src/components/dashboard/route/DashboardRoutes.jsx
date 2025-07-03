import { Routes, Route } from "react-router-dom";
import PanelA from "../pages/PanelA";
import Eventos from "../pages/Eventos";
import Publicaciones from "../pages/Publicaciones";
import Comunicados from "../pages/Comunicados";
import Users from "../pages/Users";
import { Interesados } from "../pages/Interesados";

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Ruta predeterminada */}
        <Route index element={<PanelA />} />
        <Route path="/Eventos" element={<Eventos />} />
        <Route path="/Publicaciones" element={<Publicaciones />} />
        <Route path="/Comunicados" element={<Comunicados />} />
        <Route path="/Usuarios" element={<Users />} />
        <Route path="/Interesados" element={<Interesados />} />
        {/* Ruta para manejar 404 */}
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
