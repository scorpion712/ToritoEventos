import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'; 
import { ListItemButton, ListItemIcon } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CakeIcon from '@mui/icons-material/Cake';

import { AppointmentOwner } from '../../models/AppointmentModel';

interface UserConfirmProps {
    user: AppointmentOwner;
}

export default function UserConfirm(props: UserConfirmProps) {

    const { user } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Confirma que tus datos sean correctos
      </Typography>
      <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={`${user.name} ${user.surname}`} />
            </ListItemButton>
          </ListItem> 
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ContactPhoneIcon />
              </ListItemIcon>
              <ListItemText primary={user.phone} />
            </ListItemButton>
          </ListItem> 
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary={user.email} />
            </ListItemButton>
          </ListItem>  
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CakeIcon />
              </ListItemIcon>
              <ListItemText primary={user.bornDate?.toLocaleDateString('ES-es')} />
            </ListItemButton>
          </ListItem> 
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationCityIcon />
              </ListItemIcon>
              <ListItemText primary={`${user.address}, ${user.city}. ${user.state}`} />
            </ListItemButton>
          </ListItem> 
      </List>  
    </React.Fragment>
  );
}