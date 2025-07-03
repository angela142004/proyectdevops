import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { BookOpen, Users, Calendar } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Alert,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Eye,
  EyeOff,
} from "../components/UI";
import logo from "../assets/logo.jpg";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";

const loginAction = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/prisma/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    const data = await response.json();
    return { success: true, token: data.token };
  } catch (error) {
    return { error: error.message };
  }
};

export default function Login() {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Panel");
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await loginAction(email, password);

    if (result?.success) {
      login(result.token);
      navigate("/Panel");
    } else if (result?.error) {
      setError(result.error);
    }

    setIsLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #003049 0%, #4361ee 50%, #ef233c 100%)",
      }}
    >
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block">
          <div className="relative">
            <img
              src={logo}
              alt="Estudiante aprendiendo"
              width={400}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>INICIAR SESIÓN</CardTitle>
                  <p className="text-gray-600 mt-2">
                    Accede a tu panel de control
                  </p>
                </div>
                <Link
                  to="/"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Volver al Inicio
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {error && <Alert>{error}</Alert>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@prisma.edu.pe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-12 px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      style={{ background: "transparent" }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "INGRESANDO..." : "INGRESAR"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Características</h3>
            <div className="space-y-2 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Gestión de entradas</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Control de fechas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Panel administrativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
