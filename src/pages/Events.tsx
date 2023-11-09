import { Typography } from '@mui/material'
 
import EventTable from '../components/events/EventTable';
import { Layout } from '../components/layouts';

export default function Events() {
    return (
        <Layout>
            <Typography variant='h4' sx={{mb: 2}}>
                Historial de Eventos
            </Typography>
            <EventTable/>
        </Layout>
    )
}
