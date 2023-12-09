import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import NoteIcon from '@mui/icons-material/Note';

import { getEventById } from "../../services";
import { EventModel } from "../../models/EventModel";
import { Layout } from "../layouts";

function EventDetails() {
  // 👇️ get ID from url
  const { id: eventId } = useParams();

  const [event, setEvent] = useState<EventModel>();

  const getEventInfo = async () => {
    const eventData = await getEventById(eventId as string);
    setEvent(eventData);
  }

  useEffect(() => {
    getEventInfo();
  }, []);

  return (
    <Layout>
      {!event ? <Typography>Cargando</Typography>
        :
        <Paper sx={{ borderRadius: '22px' }}>
          <Grid container sx={{ p: 2 }}>
            <Grid item xs={12} sx={{ ml: 2 }}>
              <Typography variant="h3">{event.title}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <TodayIcon style={{ color: '#7C3FE9' }} />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  {`Fecha: ${event.startDate.toLocaleDateString('es-ES')} ${event.startDate.toLocaleTimeString()}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <PersonIcon style={{ color: '#FF8849' }} />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  {`Organizadores: ${event.owners.map(o => (`${o.name} ${o.surname}`)).join(', ')}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <GroupIcon style={{ color: '#E389B9' }} />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  {`Invitados: ${event.guests}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <ConfirmationNumberIcon style={{ color: '#746AB0' }} />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  {`Confimado: ${event.confirmed ? 'Si' : 'No'}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ ml: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <NoteIcon style={{ color: '#ffc14a' }} />
                <Typography variant="h5" sx={{ ml: 1 }}>
                  {`Notas: ${event.notes}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ ml: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={event.img} alt="Imagen no encontrada" height={800} width={600} style={{ borderRadius: '18px' }} />
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined' color="error" sx={{ m: 2, p: 1 }}
                onClick={() => alert("Proximamente")}>Cancelar Evento</Button>
            </Grid>
          </Grid>
        </Paper>}
    </Layout>
  )
}

export default EventDetails