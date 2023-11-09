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
import { useNavigate } from 'react-router-dom';
 
import { AppointmentOwner } from '../../models/AppointmentModel';
import { isOver18 } from '../../utilities';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store'; 
import { PrivateRoutes } from '../../models';
import { registerUserForm } from '../../services/user/createUser.service';
import { UserConfirm, UserForm } from '../../components/registration';
import { Layout } from '../../components/layouts';

const steps = ['Completa tus datos', 'Verifica tus datos'];

const isUserDataValid = (user: AppointmentOwner) => user.name && user.surname && user.phone && user.phone.length == 10 && user.address && user.city && user.state && user.bornDate != null && isOver18(user.bornDate || new Date()) || false;

export default function RegistrationPage() {
    const userStore = useSelector((store: AppStore) => store.user);
    const navigate = useNavigate();

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <UserForm user={user} onChange={onFieldChange} hasErrors={formErrors} />;
            case 1:
                return <UserConfirm user={user} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const [formErrors, setFormErrors] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [user, setUser] = React.useState({
        email: userStore.email,
        name: "",
        surname: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        bornDate: undefined
    } as AppointmentOwner);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            await registerUserForm(user) && setActiveStep(activeStep + 1);
            return;
        }
        const userValid = isUserDataValid(user);
        setFormErrors(!userValid);
        if (userValid)
            setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Date) => {
        if (e instanceof Date) {
            setUser({ ...user, bornDate: e })
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    React.useEffect(() => {
        if (!userStore.name) {
            navigate(`/${PrivateRoutes.REGISTRATION}`, { replace: true });
        }
        // load cities
            // on select city, load states
    }, []);


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