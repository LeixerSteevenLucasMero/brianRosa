import "./App.css";
import Home from "./Components2/Home";
import Nosotros from "./Components2/Nosotros";
import Contacto from "./Components2/Contacto";
import Footer from "./Components2/Footer";
import Servicio from "./Components2/Servicio";
import Reserva from "./Components2/Reserva";
import Testimonio from "./Components2/Testimonio";
import Login from "./pages/Login";
import Spinner from "./Components/Spinner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import HomePage from "./pages/HomePage";
import PacienteForm from "./Components/paciente/PacienteForm";
import EditarPacienteForm from "./Components/paciente/EditarPacienteForm";
import ListaPacientes from "./Components/paciente/ListaPacientes";
import Users from "./pages/admin/Users";
import ApplyDoctor from "./pages/ApplyDoctor";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import Register from "./pages/Register";
import NotificationPage from "./pages/NotificationPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DoctorReservacion from "./pages/doctor/DoctorReservacion"; // Importa el componente DoctorReservacion
import EcografiaPacienteForm from "./Components/paciente/EcografiaPacienteForm";
import Reservalist from "./pages/doctor/ReservationList";
import Doctorslist from "./pages/admin/userslist";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Servicio />
                <Nosotros />
                <Testimonio />
                <Contacto />
                <Reserva />
                <Footer />
              </>
            }
          />
          {loading ? (
            <Route path="/loading" element={<Spinner />} />
          ) : (
            <>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/PacienteForm"
                element={
                  <ProtectedRoute>
                    <PacienteForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ListaPacientes"
                element={
                  <ProtectedRoute>
                    <ListaPacientes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ListaPacientes"
                element={
                  <ProtectedRoute>
                    <ListaPacientes />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/EditarPacienteForm/:id"
                element={<EditarPacienteForm />}
              />

              <Route
                path="/EcografiaPacienteForm/:id"
                element={<EcografiaPacienteForm />}
              />
              <Route
                path="/apply-doctor"
                element={
                  <ProtectedRoute>
                    <ApplyDoctor />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/doctors"
                element={
                  <ProtectedRoute>
                    <Doctors />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/admin/usuariolist"
                element={
                  <ProtectedRoute>
                    <Doctorslist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/profile/:id"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/calendario"
                element={
                  <ProtectedRoute>
                    <DoctorReservacion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="doctor/Reservalist"
                element={
                  <ProtectedRoute>
                    <Reservalist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notification"
                element={
                  <ProtectedRoute>
                    <NotificationPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
