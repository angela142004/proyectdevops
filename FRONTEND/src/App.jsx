import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
