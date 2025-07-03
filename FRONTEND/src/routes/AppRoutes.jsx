import { Routes, Route, Navigate } from "react-router-dom";

// import PanelA from "../components/dashboard/pages/PanelA";

import Home from "../pages/Home";
import Nosotros from "../pages/Nosotros";
import Blog from "../pages/Blog";
import Comunicado from "../pages/Comunicado";
import Comunidad from "../pages/Comunidad";
import Login from "../components/dashboard/pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import { Panelout } from "../components/dashboard/Panelout";
import BlogDetalle from "../pages/BlogDetalle";
import PreguntasFrecuentes from "../pages/PreguntasFrecuentes";
import Registro from "../pages/Registro";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/PreguntasFrecuentes" element={<PreguntasFrecuentes />} />
    <Route path="/Registro" element={<Registro />} />
    <Route path="/Nosotros" element={<Nosotros />} />
    <Route path="/Blog" element={<Blog />} />
    <Route path="/Blog/:id" element={<BlogDetalle />} />
    <Route path="/Comunicado" element={<Comunicado />} />
    <Route path="/Comunidad" element={<Comunidad />} />
    <Route path="/Login" element={<Login />} />
    {/* Rutas protegidas del panel */}
    <Route path="/Panel/*" element={<ProtectedRoute component={Panelout} />} />

    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
