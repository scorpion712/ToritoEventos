import Typography from '@mui/material/FormControl';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
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


export const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }: AppointmentForm.BasicLayoutProps) => {

    const onEventTypeChange = (value: string) => { 
        onFieldChange({ eventType: value })
    }

    const onStartDateChange = (value: string) => {
        const date = appointmentData.startDate;
        date.setHours(value.substring(0, value.indexOf(':')), value.substring(value.indexOf(':') + 1))
        onFieldChange({ startDate: date })
    }

    const onEndDateChange = (value: string) => {
        const endDate = new Date(value);
        endDate.setTime(endDate.getTime() - 3 * 60 * 60 * 1000);
        onFieldChange({ endDate: endDate })
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
        owner.phone = value;
        onFieldChange({ owners: appointmentData.owners })
    }

    const onOwnerEmailChange = (owner: AppointmentOwner, value: string) => {
        owner.email = value;
        onFieldChange({ owners: appointmentData.owners })
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
            <Grid item xs={12}>
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
            <Grid item xs={3}>
                <TextField
                    id="time"
                    label="Hora Inicio"
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    value={appointmentData.startDate.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    onChange={(e) => onStartDateChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="datetime-local"
                    label="Fecha (mm-dd-yyyy) y hora de fin"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={appointmentData.endDate.toISOString().substring(0, 16)}
                    onChange={(e) => onEndDateChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="outlined-number"
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

            {
                appointmentData.owners &&
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
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
                                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AlternateEmailIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={owner.email}
                                            onChange={(e) => onOwnerEmailChange(owner, e.target.value)} />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))
            }

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
