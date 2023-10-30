import { Avatar, Box, Container, CssBaseline, Link, Paper, Typography } from "@mui/material"; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from "react";
import Copyright from "../components/Copyright";

function EmailNotVerified() {
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
                    Active su cuenta
                </Typography>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Aún no ha verificado su cuenta.
                        </Typography>
                        <Typography variant="subtitle1">
                            Revisa tu correo electrónico para confirmar el registro de tu cuenta y luego poder acceder a la plataforma.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ m: 1 }}>
                            <Link color="inherit" href="/login">
                                Si ya lo hiciste, inicia sesión para continuar
                            </Link>
                        </Typography>
                    </React.Fragment>
                </Paper>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default EmailNotVerified