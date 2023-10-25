import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; 
import { DatePicker } from '@mui/x-date-pickers';

import { AppointmentOwner } from '../../models/AppointmentModel';

interface UserFormProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement> ) => void,
    user: AppointmentOwner
}

export default function UserForm(props : UserFormProps) {

    const { user, onChange } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tus datos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="name"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => onChange(e)}
            value={user.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="surname"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => onChange(e)}
            value={user.surname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Direccion"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e) => onChange(e)}
            value={user.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(e) => onChange(e)}
            value={user.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="Provincia"
            fullWidth
            variant="standard"
            onChange={(e) => onChange(e)}
            value={user.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Telefono"
            fullWidth
            variant="standard"
            onChange={(e) => onChange(e)}
            value={user.phone}
          />
        </Grid>
        <Grid item xs={12} md={6}>
            <DatePicker
                label="Nacimiento"
                format="DD/MM/YYYY" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}