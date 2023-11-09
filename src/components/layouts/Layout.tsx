import React from 'react'
import { Box, Container, CssBaseline, styled } from '@mui/material'

import MenuAppBar from './MenuAppBar';
import MenuDrawer from './MenuDrawer';
import Copyright from '../Copyright';
import { useSelector } from 'react-redux'; 
import { AppStore } from '../../redux/store';
import { Roles } from '../../models/roles';

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

interface LayoutProps {
    children: React.ReactNode;// | string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export default function Layout({ children }: LayoutProps) {
    const userStore = useSelector((store: AppStore) => store.user);
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
            <MenuAppBar handleDrawerOpen={handleDrawerOpen} />
            <Box sx={{ display: 'flex' }}>
                {
                    userStore.rol === Roles.ADMIN &&
                        <MenuDrawer
                            handleDrawerClose={handleDrawerClose}
                            openDrawer={open} />
                }
                <Main open={open}>
                    <DrawerHeader />
                    <Container maxWidth="xl" >
                        {children}
                    </Container>
                    <Copyright sx={{ mt: 5 }} />
                </Main>
            </Box>
        </Box>
    )
}
