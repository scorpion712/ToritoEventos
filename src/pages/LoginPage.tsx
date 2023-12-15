import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'; 
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
 
import { validEmail, isPasswordValid } from '../utilities/Validators'; 
import { getUserById } from '../services/users/getUsersService';
import { createUser, resetUser, userKey } from '../redux/states/user';
import { PrivateRoutes, PublicRoutes } from '../models';
import { clearLocalStorage } from '../utilities/LocalStorage'; 
import { CustomInput } from '../components';
import { authUser } from '../services/auth/auth.service';
import { adaptFirebaseUserCredentialToUserInfo } from '../adapters';
import Copyright from '../components/Copyright';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    useEffect(() => {
        clearLocalStorage(userKey);
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    }, []);


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userEmail = data.get('email') as string;
        const userPassword = data.get('password') as string

        if (!validEmail(userEmail)) {
            setErrorEmail("Ingrese un formato de email válido");
            return;
        }
        setErrorEmail("");

        if (!isPasswordValid(userPassword)) {
            setErrorPassword("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número");
            return;
        }
        setErrorPassword("");

        const user = await authUser(userEmail, userPassword);

        if (user) { 
            if (user.emailVerified) {
                const userData = await getUserById(user.uid); 
                const adaptedUser = adaptFirebaseUserCredentialToUserInfo(user);
                adaptedUser.name = adaptedUser.name ? adaptedUser.name : userData.name;
                dispatch(createUser(adaptedUser));  
                navigate(`/${userData.id ? "main" : PrivateRoutes.REGISTRATION}`, { replace: true });
            } 
            else 
                navigate(`/${PublicRoutes.NOT_VERIFIED_EMAIL}`, { replace: true });
        } else {
            console.log("Error de usuario invalido => context para error y snackbar afuera");
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <CustomInput inputId='email'
                            inputLabel='Email'
                            inputName='email'
                            errorMessage={errorEmail} /> 
                        
                        <FormControl fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}>
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password"
                                required
                                error={errorPassword ? true : false}
                                fullWidth
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
                                label="Contraseña"
                            />
                            {
                                errorPassword &&
                                <Typography variant='caption' color='error'>{errorPassword}</Typography>
                            }
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Olvidó su contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={PublicRoutes.SIGN_UP} variant="body2">
                                    {"Aún no está registrado? Registrese"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}