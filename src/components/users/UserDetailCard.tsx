import { Button, Grid } from "@mui/material"

import { AppointmentOwner } from "../../models/AppointmentModel" 
import { UserDetailMessage, UserDetails } from ".";

interface UserDetailCardProps {
    user: AppointmentOwner;
}

function UserDetailCard(props: UserDetailCardProps) {

    const { user } = props;

    const handleDeleteUser = () => {
        // delete user.id
        alert('Proximamente')
    }

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <UserDetails user={user} />
            </Grid>
            <Grid xs={12} md={6}>
                <UserDetailMessage user={user} />
            </Grid>
            <Grid item xs={12} >
                <Button variant="outlined" color="error" onClick={handleDeleteUser}>Eliminar Usuario</Button>
            </Grid>
        </Grid >
    )
}

export default UserDetailCard