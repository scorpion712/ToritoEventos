import Typography from '@mui/material/Typography';
import { Layout } from '../components/layouts';
import { EventCalendar } from '../components/EventsCalendar';

export default function Dashboard() {
    return (
        <Layout>
            <Typography variant='h4'>
                Eventos
            </Typography>
            <EventCalendar />
        </Layout>
    )
}
