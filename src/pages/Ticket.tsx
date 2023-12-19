import { Button, Grid, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { AppStore } from "../redux/store";
import { EventModel } from "../models/EventModel";
import { getEventById } from "../services";
import { Layout } from "../components/layouts";

function Ticket() {
    // 👇️ get ID from url
    const { id: eventId } = useParams();
    const [event, setEvent] = useState<EventModel>();
    const userState = useSelector((store: AppStore) => store.user);

    const getEventInfo = async () => {
        const eventData = await getEventById(eventId as string);
        setEvent(eventData);
    }

    useEffect(() => {
        getEventInfo();
    }, []);

    const handleGetTicket = () => {
        alert("Pronto recibirar tu entrada via mail")
    }

    return (
        <Layout>
            <Paper sx={{ borderRadius: '22px' }}>
                {event ?
                    <Grid container sx={{ p: 2, }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img style={{borderRadius: '10px'}} src={event.img || "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} alt="Imagen no encontrada" />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m:2}}>
                            {
                                event.owners.some(o => o.email.toLowerCase() == userState.email.toLowerCase()) 
                                ? <Typography variant="h5">Has organizado: {event.title}</Typography> 
                            : <Typography variant="h5">Has sido invitado a: {event.title}</Typography> 
                            }
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="h6" textAlign={'center'}>
                                {
                                    event.owners.some(o => o.email.toLowerCase() == userState.email.toLowerCase())
                                        ? "Comparte este enlace con todos tus invitados para que puedan acceder a la plataforma y descargar su entrada"
                                        : `Pulse el boton para descargar su entrada`
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2}}>
                            <Button variant='contained' onClick={handleGetTicket}>
                                Obtener entrada
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Grid container sx={{ p: 2 }}>
                        <Grid item xs={12}>
                            <Typography>
                                Lo sentimos no existe tal evento. Si esta teniendo problemas, le recomendamos que se contacte con administracion
                            </Typography>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </Layout>
    )
}

export default Ticket