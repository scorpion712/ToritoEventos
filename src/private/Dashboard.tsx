import { Box, Container } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

import MenuAppBar from '../public/components/MenuAppBar'
import MenuDrawer from '../public/components/MenuDrawer';

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <MenuAppBar handleDrawerOpen={handleDrawerOpen}  />
            <Box sx={{ display: 'flex' }}>
                <MenuDrawer
                    handleDrawerClose={handleDrawerClose}
                    openDrawer={open} />
                <Main open={open}>
                    <DrawerHeader />
                    <Container>
                        <Typography paragraph>
                            aca va el calendario {open ? 'si' : 'no'}
                        </Typography>
                    </Container>
                </Main>
            </Box>
        </Box>
    )
}
