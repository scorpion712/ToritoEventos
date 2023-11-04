import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Copyright from '../components/Copyright';
import { isEmailValid, isPasswordValid } from '../utilities/Validators';
import { UserCredential } from 'firebase/auth';
import { createUser } from '../services/auth/signIn.service';
import { PublicRoutes } from '../../models';
import { CustomInput } from '../../components';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [userCredentials, setUserCredentials] = useState<UserCredential>();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userEmail = data.get('email') as string;
    const userPassword = data.get('password') as string

    if (!isEmailValid(userEmail)) {
      setErrorEmail("Ingrese un formato de email válido");
      return;
    }
    setErrorEmail("");

    if (!isPasswordValid(userPassword)) {
      setErrorPassword("El password debe tener al menos 8 caracteres, una mayúscula y un número");
      return;
    }
    setErrorPassword("");

    const user = await createUser(userEmail, userPassword);
    setUserCredentials(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrese
        </Typography>
        {userCredentials ?
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Gracias por registrarte en Torito.
              </Typography>
              <Typography variant="subtitle1">
                Revisa tu correo electrónico para confirmar el registro de tu cuenta y luego poder acceder a la plataforma.
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ m: 1 }}>
                <Link color="inherit" href="/login">
                  Inicia sesión para continuar
                </Link>
              </Typography>
            </React.Fragment>
          </Paper>
          : <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput 
                  inputId='email'
                  inputLabel='Email'
                  inputName='email'
                  errorMessage={errorEmail} />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth
                  variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    required
                    fullWidth
                    error={errorPassword ? true : false}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {
                  errorPassword &&
                  <Typography variant='caption' color='error'>{errorPassword}</Typography>
                }
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Deseo recibir información relacionada a eventos, marketing y actualizaciones via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={PublicRoutes.LOGIN} variant="body2">
                  Ya posee una cuenta? Acceder
                </Link>
              </Grid>
            </Grid>
          </Box>}
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}