import { Box, Grid, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PlaceIcon from '@mui/icons-material/Place';

import { AppointmentOwner } from "../../models/AppointmentModel"

type UserDetailsProps = {
    user: AppointmentOwner;
}

function UserDetails(props: UserDetailsProps) {
    const { user } = props;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <PersonIcon style={{ color: '#d5ad27' }} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {`${user.name} ${user.surname}`}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <TodayIcon style={{ color: '#0a66c2' }} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {user.bornDate?.toDateString() || "No informado"}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <LocalPhoneIcon style={{ color: '#424242' }} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {user.phone}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <AlternateEmailIcon style={{ color: '#15a5ee' }} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {user.email}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <PlaceIcon style={{ color: '#EA4335' }} />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {user.address && user.city && user.state ? `${user.address}, ${user.city}. ${user.state}` : "No informado"}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default UserDetails