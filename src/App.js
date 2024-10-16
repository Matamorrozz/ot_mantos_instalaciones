import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Switch,
} from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Button } from '@mui/material';
import Home from './codigo/home';
import ActivityPage from './codigo/actividadespage';
import PlanTrabajoPage from './codigo/planes_trabajo';
import Tecnicos from './codigo/tecnicos';
import OrdenesTrabajoList from './codigo/ordenes_trabajo';
import DetalleOrdenTrabajo from './codigo/detalle_orden';
import Login from './codigo/login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './codigo/protected_route';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar position="static" sx={{ backgroundColor: darkMode ? 'black' : 'black' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="logo" component={RouterLink} to="/" style={{ marginRight: '20px' }}>
                <img src={`/logo_asiarob.png`} alt="Logo" style={{ width: '160px', height: '40px' }} />
              </IconButton>

              {/* Título de la aplicación */}
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                INSTALACIONES, MANTOS Y REPARACIONES
              </Typography>

              {/* Enlaces de navegación */}
              <Link component={RouterLink} to="/" color="inherit" style={{ marginRight: '20px', textDecoration: "none" }} className='link-appbar'>
                INICIO
              </Link>
              <Link component={RouterLink} to="/activities" color="inherit" style={{ marginRight: '20px', textDecoration: "none" }} className='link-appbar'>
                ACTIVIDADES
              </Link>
              <Link component={RouterLink} to="/plan_trabajo" color="inherit" style={{ marginRight: '20px', textDecoration: "none" }} className='link-appbar'>
                PLANES
              </Link>
              <Link component={RouterLink} to="/tecnico" color="inherit" style={{ marginRight: '20px', textDecoration: "none" }} className='link-appbar'>
                CREAR ORDEN
              </Link>
              <Link component={RouterLink} to="/ordenes_trabajo" color="inherit" style={{ marginRight: '20px', textDecoration: "none" }} className='link-appbar'>
                ORDENES
              </Link>

              {/* Botón de cambio de tema */}
              <p>Modo Oscuro</p>
              <Switch checked={darkMode} onChange={handleThemeChange} color="default" />

            </Toolbar>
          </AppBar>

          {/* Rutas de la aplicación */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activities" element={
              <PrivateRoute>
                <ActivityPage />
              </PrivateRoute>
            } />
            <Route path="/plan_trabajo" element={<PlanTrabajoPage />} />
            <Route path="/tecnico" element={<Tecnicos />} />
            <Route path="/ordenes_trabajo" element={<OrdenesTrabajoList />} />
            <Route path="/detalle_orden/:numeroOrden" element={<DetalleOrdenTrabajo />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
