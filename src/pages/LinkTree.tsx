import { Container, Grid } from '@mui/material';
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
        link: "Link a pdf menu dia"
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
        link: "Link a pdf menu noche"
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
        link: "Link a instagram"
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
        link: "Link a WhatsApp"
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
    const classes = useStyles();
    const handleClick = (treeButton: TreeButton) => {
        console.log(`Go to ${treeButton.link}`);
    }

    return (
        <Container sx={{ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <Grid container>
                {
                    treeButtons.map((treeButton: TreeButton, _idx: number) => (
                        <React.Fragment key={treeButton.key} >
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
                                <Stepper  orientation="vertical" sx={{ width: "100%", display: 'flex', alignContent: "center", justifyContent: "center", marginLeft: "1.6rem" }}>
                                    <Step>
                                        <StepLabel icon={<CustomStepIcon />} >
                                        </StepLabel>
                                    </Step>
                                </Stepper>
                            </Grid>
                            <Grid item xs={11} >
                                <Paper className={classes.paper} sx={{ 
                                        p: 2.3,
                                        mt: 1,
                                        mb: 1,
                                        backgroundColor: _idx % 2 == 0 ? "#FAFAFA" : "#27272D",
                                        color: _idx % 2 != 0 ? "#FAFAFA" : "#27272D"
                                    }}
                                    onClick={() => handleClick(treeButton)}>
                                    <Grid container>
                                        <Grid item xs={8} sm={3}>
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