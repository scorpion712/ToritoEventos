import Typography from '@mui/material/FormControl';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { AppointmentOwner } from '../../models/AppointmentModel';
import FileUpload from '../FileUploadButton';
import { eventTypeMap } from '../../models/EventType'; 
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
import { Roles } from '../../../models/roles';
import { useEffect, useState } from 'react';
import { getUsers } from '../../../private/services/users/getUsersService'; 
import { validEmail } from '../../utilities';


export const BasicLayout = ({ onFieldChange, appointmentData }: AppointmentForm.BasicLayoutProps) => {

    const userStore = useSelector((store: AppStore) => store.user);

    const [registeredUsers, setRegisteredUsers] = useState<AppointmentOwner[]>([]);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const fetchData = async () => {
        const data = await getUsers();
        setRegisteredUsers(data.filter(u => u.email)); 
    };

    useEffect(() => {
        if (userStore.rol === Roles.ADMIN) {
            fetchData();
        }
    }, []);

    const onEventTypeChange = (value: string) => {
        onFieldChange({ eventType: value })
    }

    const onStartDateChange = (value: string) => {
        const date = appointmentData.startDate;
        (date as Date).setHours(parseInt(value.substring(0, value.indexOf(':'))), parseInt(value.substring(value.indexOf(':') + 1)))
        onFieldChange({ endDate: date })
        onFieldChange({ startDate: date })
    }

    const onGuestsChange = (value: string) => {
        onFieldChange({ guests: value })
    }

    const onImageUpload = (value: string, file: File) => {
        onFieldChange({ img: value, imgFile: file });
    }

    const onDeleteOwner = () => {
        if (appointmentData.owners) {
            const filteredOwners = appointmentData.owners.filter((owner: any) => owner.id !== appointmentData.owners[appointmentData.owners.length - 1].id);
            onFieldChange({ owners: filteredOwners })
        }
    }

    const onOwnerNameChange = (owner: AppointmentOwner, value: string) => {
        owner.name = value;
        onFieldChange({ owners: appointmentData.owners })
    }

    const onOwnerSurnameChange = (owner: AppointmentOwner, value: string) => {
        owner.surname = value;
        onFieldChange({ owners: appointmentData.owners })
    }

    const onOwnerPhoneChange = (owner: AppointmentOwner, value: string) => {
        // Remove non-numeric characters from the input
        const input = value.replace(/\D/g, ''); 
        if (input.length <= 10) {
            owner.phone = input;
            onFieldChange({ owners: appointmentData.owners })
        }
    }

    const onOwnerEmailChange = (owner: AppointmentOwner, value: string) => {
        const isValid = validEmail(value);
        setIsEmailValid(isValid);
        if (isValid) {
            const registeredUser = registeredUsers.find(u => u.email == value);
            owner.email = value;
            if (registeredUser) {
                owner.id = registeredUser.id;
                owner.bornDate = registeredUser.bornDate; 
                owner.phone = registeredUser.phone;
                owner.name = registeredUser.name;
                owner.surname = registeredUser.surname;
            } 
            onFieldChange({ owners: appointmentData.owners });
        }
    } 

    const onNotesChange = (value: string) => {
        onFieldChange({ notes: value })
    }

    const handleFileUpload = (file: File) => {
        // read the image and set it on appointment
        const reader = new FileReader();
        reader.onload = (e) => {
            onImageUpload(e.target?.result as string, file);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Grid container style={{ marginRight: '10px', marginLeft: '0px', marginTop: '0' }} spacing={3}>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label" >Tipo de Evento</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={appointmentData.eventType}
                        defaultValue={""}
                        onChange={(e) => onEventTypeChange(e.target.value)}>
                        <MenuItem value="">
                            <em>Seleccionar tipo de evento</em>
                        </MenuItem>
                        {Object.keys(eventTypeMap).map((text) => (
                            <MenuItem key={text} value={eventTypeMap[text]}>
                                {text}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    id="time"
                    label="Hora Inicio"
                    type="time" 
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    value={(appointmentData.startDate as Date).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    onChange={(e) => onStartDateChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    id="guests-number"
                    label="Invitados"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: 1
                    }}
                    variant="outlined"
                    value={appointmentData.guests ? appointmentData.guests : 0}
                    onChange={(e) => onGuestsChange(e.target.value)}
                />
            </Grid>

            {
                userStore.rol === Roles.ADMIN &&
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography style={{ fontSize: '1.3rem' }}>Organizador/es</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', float: 'right', marginLeft: 'auto' }}>
                            <Button
                                variant='outlined'
                                color='error'
                                style={{ marginLeft: 'auto' }}
                                onClick={() => onDeleteOwner()}>
                                <DeleteForeverIcon />
                            </Button>
                            <Button
                                variant='outlined'
                                color='success'
                                style={{ marginLeft: '10px' }}
                                onClick={() => onFieldChange({ owners: appointmentData.owners ? [...appointmentData.owners, { id: Math.random().toString(16).slice(2) }] : [{ id: Math.random().toString(16).slice(2) }] })}>
                                <AddIcon />
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            }
            {appointmentData.owners &&
                appointmentData.owners.map((owner: AppointmentOwner) => (
                    <Grid item xs={12} key={owner.id}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Organizador: {owner.name} {owner.surname}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Autocomplete
                                            freeSolo
                                            id="autocomplete-emails"
                                            disableClearable
                                            onInputChange={(_e, newValue) => onOwnerEmailChange(owner, newValue)}
                                            value={owner.email}
                                            options={registeredUsers.map((user) => user.email)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Email"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: 'search',
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AlternateEmailIcon />
                                                            </InputAdornment>)
                                                    }}
                                                    variant="outlined"
                                                    fullWidth
                                                    helperText={!isEmailValid ? 'Dirección inválida' : ''}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PermContactCalendarIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={owner.name}
                                            onChange={(e) => onOwnerNameChange(owner, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="outlined-basic" label="Apellido" variant="outlined" fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PermContactCalendarIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={owner.surname}
                                            onChange={(e) => onOwnerSurnameChange(owner, e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="outlined-basic" label="Telefono" variant="outlined" fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={owner.phone}
                                            onChange={(e) => onOwnerPhoneChange(owner, e.target.value)} />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))
            }
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography style={{ fontSize: '1rem' }}>Notas del evento:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Notas"
                                    multiline
                                    maxRows={4}
                                    fullWidth
                                    value={appointmentData.notes}
                                    onChange={(e) => onNotesChange(e.target.value)}

                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="220"
                            image={appointmentData.img}
                            alt="Imagen No Seleccionada"
                        />
                    </CardActionArea>
                    <CardActions style={{ flex: 1, justifyContent: 'center' }}>
                        <FileUpload onFileUpload={handleFileUpload} />
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};
