import React from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, Button, Grid, Card, CardContent
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config'
import { signOut } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const {currentUser} = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Box textAlign="center" py={5}>
                  <Typography variant="h3" gutterBottom>
                    Bienvenido, {currentUser ? currentUser.email : "Invitado"} a la Plataforma de Órdenes de Trabajo
                  </Typography>
                  <Typography variant="h6" color="textSecondary" paragraph>
                    Gestiona todas las órdenes de trabajo de Asia Robótica de manera fácil y eficiente.
                  </Typography>
                  <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
                    Comenzar
                  </Button>
                  <Button variant="contained" onClick={handleLogout} sx={{ mt: 2 }}>
                    Cerrar Sesión
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;