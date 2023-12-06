import { useState } from 'react';
import { AppointmentOwner } from '../../models/AppointmentModel';
import { Button, Grid, TextField, Typography } from '@mui/material';

type UserDetailMessageProps = {
    user: AppointmentOwner;
}

function UserDetailMessage(props: UserDetailMessageProps) {
    const { user } = props;

    const [msgTitle, setMsgTitle] = useState("");
    const [msgBody, setMsgBody] = useState("");

    const handleSendMessage = () => {
        msgTitle && msgBody ?
            alert(`Proximamente le enviaremos un mensaje a ${user.name} ${user.surname} al numero ${user.phone} que diga: ${msgTitle}\n "${msgBody}"`)
            : !msgTitle ? alert('Introduzca un titulo para el mensaje')
                : alert('introduzca el contenido del mensaje')
    }
    return (
        <Grid container>
            <Typography variant="h5" sx={{ ml: 1 }}>Enviar mensaje</Typography>
            <Grid item xs={12} sx={{ m: 2 }}>
                <TextField id="outlined-basic" label="Titulo" variant="outlined" fullWidth value={msgTitle}
                    onChange={(e) => setMsgTitle(e.target.value)} />
            </Grid>
            <Grid item xs={12} sx={{ m: 2 }}>
                <TextField id="outlined-basic" label="Contenido" variant="outlined" fullWidth value={msgBody} onChange={(e) => setMsgBody(e.target.value)} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1, ml: 2 }}>
                <Button variant="contained" onClick={handleSendMessage}>Enviar</Button>
            </Grid>
        </Grid>
    )
}

export default UserDetailMessage