import { Typography } from '@mui/material'

import Layout from '../../public/components/layouts/Layout'; 
import EventTable from '../components/events/EventTable';

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
