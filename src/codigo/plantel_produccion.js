import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Box, Grid, Card, CardContent, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, Select, MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Para acceder al tema
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://teknia.app/api3';

function PlantelProduccion() {
  const { currentUser } = useAuth();
  const [ordenes, setOrdenes] = useState([]); 
  const [openForm, setOpenForm] = useState(false); 
  const [formData, setFormData] = useState({ id: ''});
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrdenesTrabajo = async () => {
      try {
        const response = await axios.get(`${API_URL}/obtener_ordenes_trabajo_agendada`);
        const filteredOrdenes = response.data.filter((orden) =>
          orden.reserva_id === 0
        );
        setOrdenes(filteredOrdenes);
      } catch (error) {
        console.error('Error al cargar las órdenes de trabajo:', error);
      }
    };

    fetchOrdenesTrabajo();
  }, []);

  const cardColor = theme.palette.mode === 'dark' ? 'grey' : '#6eb2ff';

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    navigate(`/detalle_orden_produccion/${formData.id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Bienvenido {currentUser ? currentUser.email : 'Invitado'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Crea órdenes y administra tu plantel de producción.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Información de la planta
          </Typography>

          <Button variant="contained" color="primary" onClick={handleOpenForm}>
            Asignar Orden
          </Button>
        </Grid>

        {/* Cards con órdenes filtradas */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Órdenes de trabajo: Ensamble
          </Typography>

          <Grid container spacing={2}>
            {ordenes.map((orden) => (
              <Grid item xs={12} sm={6} md={4} key={orden.id}>
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: cardColor,
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {orden.titulo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Estación: {orden.estacion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Descripción: {orden.descripcion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Fecha: {new Date(orden.fecha).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Formulario dentro de un Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle textAlign="center">Asignar Orden</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 2 }}>
            {/* Select para mostrar las órdenes */}
            <Select
              fullWidth
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Selecciona una equipo
              </MenuItem>
              {ordenes.map((orden) => (
                <MenuItem key={orden.id} value={orden.id}>
                  {orden.titulo}
                </MenuItem>
              ))}
            </Select>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSubmitForm} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PlantelProduccion;