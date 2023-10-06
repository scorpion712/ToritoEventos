import Typography from '@mui/material/FormControl';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'; 
import { Grid } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import { AppointmentOwner } from '../../models/AppointmentModel';

export const AppointmentCard = (({
    children, appointmentData, ...restProps
}: AppointmentTooltip.ContentProps) => (
    <Grid container alignItems="center">
        <Grid item xs={12} style={{ marginLeft: '25px' }}>
            <Typography component='h2' style={{ fontWeight: '700', color: "#4E4E4E" }}>{appointmentData.title}</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: '25px', marginBottom: '15px' }}>
            <span style={{ textDecoration: 'underline', fontWeight: '600', color: "#4E4E4E" }}>{`${appointmentData.owners.length == 1 ? "Organizador" : "Organizadores"}:`}</span>
            <Typography sx={{ ml: '5px' }}>{appointmentData.owners.map((owner: AppointmentOwner) => `${owner.name} ${owner.surname}`).join('; ')}</Typography>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }} >
            <AccessTimeIcon color='info' />
        </Grid>
        <Grid item xs={10} style={{ fontWeight: '400', color: '#000026' }}>
            {`${appointmentData.startDate.toLocaleString()} - ${appointmentData.startDate.toLocaleString('es-ES').substring(appointmentData.startDate.toLocaleString('es-ES').indexOf(',') + 1)}`}
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'center' }} >
            <EmojiPeopleIcon color='secondary' />
        </Grid>
        <Grid item xs={10} style={{ fontWeight: '400', color: '#000026' }}>
            {`${appointmentData.guests} invitados`}
        </Grid>
    </Grid>
));
