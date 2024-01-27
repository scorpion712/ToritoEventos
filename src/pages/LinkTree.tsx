import { Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { makeStyles } from '@material-ui/core/styles';
import NightlightIcon from '@mui/icons-material/Nightlight';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#27272D',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(2),
        },
    },
    roundedIcon: {
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
        padding: ".5rem"
    },
    responsiveText: {
        fontSize: '1.2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
}));

type TreeButton = {
    key: string,
    text: string,
    icon1?: JSX.Element,
    icon2: JSX.Element,
    link: string,
};

const treeButtons = [
    {
        key: "1",
        text: "MENÚ DÍA",
        icon1: <LightModeIcon sx={{ ml: 2, mr: 2 }} />,
        icon2: <RestaurantIcon style={{
            borderRadius: "50%",
            padding: ".5rem",
            backgroundColor: "#27272D",
            color: 'white'
        }}
        />,
        link: "https://drive.google.com/file/d/124lpkoDxsDdgMtxdD86_HZYjEhhhu8kG/view"
    },
    {
        key: "2",
        text: "MENÚ NOCHE",
        icon1: <NightlightIcon sx={{ ml: 2, mr: 2 }} />,
        icon2: <RestaurantIcon style={{
            borderRadius: "50%",
            padding: ".5rem",
            backgroundColor: "#FAFAFA",
            color: "#27272D"
        }}
        />,
        link: "https://drive.google.com/file/d/124lpkoDxsDdgMtxdD86_HZYjEhhhu8kG/view"
    },
    {
        key: "3",
        text: "SEGUINOS",
        icon2: <InstagramIcon style={{
            borderRadius: "50%",
            padding: ".5rem",
            backgroundColor: "#27272D",
            color: 'white'
        }}
        />,
        link: "https://www.instagram.com/toritofabrica?igsh=MWQ1MjFmaXY4em92NQ=="
    },
    {
        key: "4",
        text: "ESCRIBINOS",
        icon2: <WhatsAppIcon style={{
            borderRadius: "50%",
            padding: ".5rem",
            backgroundColor: "#FAFAFA",
            color: "#27272D"
        }}
        />,
        link: "https://api.whatsapp.com/send/?phone=542235622838&text&type=phone_number&app_absent=0"
    }
] as TreeButton[];

const CustomStepIcon = () => (
    <div
        style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#27272D', // Puedes ajustar el color del círculo
        }}
    />
);

function LinkTree() {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

    const classes = useStyles();
    const handleClick = (treeButton: TreeButton) => {
        try {
            const newWindow = window.open(treeButton.link, '_blank');
            if (newWindow) {
                newWindow.opener = null; // Evita que la nueva pestaña tenga una referencia a la pestaña principal
            }
        } catch (error) {
            console.error('Error al abrir la nueva pestaña:', error);
            // Puedes agregar lógica adicional para manejar el error según tus necesidades
        }
    }

    return (
        <Container sx={{ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <Grid container>
                {
                    treeButtons.map((treeButton: TreeButton, _idx: number) => (
                        <React.Fragment key={treeButton.key} >
                            {
                                !isMobileScreen ?
                                    <Grid item xs={1} sx={{ position: "relative", display: 'flex', alignContent: "center", justifyContent: "center" }} >
                                        {/* Línea vertical que pasa por el centro del Grid */}
                                        <div
                                            style={{
                                                width: '4px',
                                                height: treeButtons.indexOf(treeButton) == 0 || treeButtons.indexOf(treeButton) == treeButtons.length - 1 ? "50%" : "100%",
                                                backgroundColor: '#27272D', // Puedes ajustar el color de la línea,
                                                position: "absolute",
                                                bottom: treeButtons.indexOf(treeButton) == treeButtons.length - 1 ? '' : 0,
                                            }}
                                        >
                                        </div>
                                        <Stepper orientation="vertical" sx={{ width: "100%", display: 'flex', alignContent: "center", justifyContent: "center", marginLeft: "1.6rem" }}>
                                            <Step>
                                                <StepLabel icon={<CustomStepIcon />} >
                                                </StepLabel>
                                            </Step>
                                        </Stepper>
                                    </Grid>
                                    : <></>
                            }
                            <Grid item xs={isMobileScreen ? 12 : 11} >
                                <Paper className={classes.paper} sx={{
                                    p: 2.3,
                                    mt: 1,
                                    mb: 1,
                                    backgroundColor: _idx % 2 == 0 ? "#FAFAFA" : "#27272D",
                                    color: _idx % 2 != 0 ? "#FAFAFA" : "#27272D"
                                }}
                                    onClick={() => handleClick(treeButton)}>
                                    <Grid container>
                                        <Grid item xs={8} sm={4}>
                                            <Typography variant="h6" className={classes.responsiveText}>{treeButton.text}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {treeButton.icon1}
                                        </Grid>
                                    </Grid>
                                    {treeButton.icon2}
                                </Paper>
                            </Grid>
                        </React.Fragment>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default LinkTree;