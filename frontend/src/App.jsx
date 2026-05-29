import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Galeria from './pages/Galeria';
import FotoDetalle from './pages/FotoDetalle';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import AportarFoto from './pages/AportarFoto';
import MisAportes from './pages/MisAportes';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AdminFotoDetalle from './pages/AdminFotoDetalle';
import UsuarioBloqueado from './pages/UsuarioBloqueado';
import Terminos from './pages/Terminos';

export default function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/galeria/:id" element={<FotoDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/usuario-bloqueado" element={<UsuarioBloqueado />} />
          <Route path="/oauth-callback" element={<AuthCallback />} />
          <Route path="/aportar" element={<ProtectedRoute><AportarFoto /></ProtectedRoute>} />
          <Route path="/mis-aportes" element={<ProtectedRoute><MisAportes /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
          <Route path="/admin/fotos/:id" element={<ProtectedRoute adminOnly><AdminFotoDetalle /></ProtectedRoute>} />
        </Routes>
      </Container>
    </>
  );
}
