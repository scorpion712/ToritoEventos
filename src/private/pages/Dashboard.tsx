import Typography from '@mui/material/Typography';

import { EventCalendar } from '../../public/components/Calendar';
import Layout from '../../public/components/layouts/Layout';

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
