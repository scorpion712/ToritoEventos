import { styled, useTheme } from '@mui/material/styles'; 
import Drawer from '@mui/material/Drawer'; 
import List from '@mui/material/List'; 
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton'; 
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText'; 
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

interface MenuDrawerProps {
    openDrawer?: boolean; 
    handleDrawerClose: () => void;  
} 

interface MenuItem {
    itemName: string;
    itemIcon:  React.ReactElement;
    dir: string;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MenuItemsList : MenuItem[] = [
    {
        itemName: "Eventos",
        itemIcon: <EventIcon />,
        dir: '/'
    },
    {
        itemName: "Clientes",
        itemIcon: <PeopleIcon />,
        dir: '/users'
    },
    {
        itemName: "Histórico",
        itemIcon: <CalendarMonthIcon />,
        dir: '/events'
    },
];

export default function MenuDrawer(props: MenuDrawerProps) {
  const theme = useTheme(); 

  const { openDrawer: open, handleDrawerClose } = props;

  return (
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MenuItemsList.map((item) => (
            <ListItem button component={Link} to={item.dir} key={item.itemName} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.itemIcon}
                </ListItemIcon>
                <ListItemText primary={item.itemName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> 
      </Drawer>
  );
}