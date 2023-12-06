import { Paper, Typography } from '@mui/material'

import EventTable from '../components/events/EventTable';
import { Layout } from '../components/layouts';

export default function Events() {
    return (
        <Layout>
            <Paper sx={{ p: 2, borderRadius: '10px' }}>
                <Typography variant='h4' sx={{ mb: 2, p: 2 }}>
                    Historial de Eventos
                </Typography>
                <EventTable />
            </Paper>
        </Layout>
    )
}
