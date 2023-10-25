import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

import UserForm from '../components/registration/UserForm';
import UserConfirm from '../components/registration/UserConfirm';
import Layout from '../components/layouts/Layout';
import { AppointmentOwner } from '../models/AppointmentModel';

const steps = ['Completa tus datos', 'Verifica tus datos'];

export default function RegistrationPage() { 

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <UserForm user={user} onChange={onFieldChange} />;
            case 1:
                return <UserConfirm user={user} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [user, setUser] = React.useState({
        name: "",
        surname: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        bornDate: undefined
    } as AppointmentOwner);

    const handleNext = async () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <Layout>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Registro
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Gracias por registrarte en Torito.
                            </Typography>
                            <Typography variant="subtitle1">
                                Pronto te informaremos sobre todas las novedades que tenemos para vos.
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ m: 1 }}>
                                <Link color="inherit" href="/">
                                    Has clic aquí para continuar
                                </Link>
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Volver
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </Layout>
    );
}