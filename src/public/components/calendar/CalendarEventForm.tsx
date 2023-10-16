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
    TextareaAutosize,
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }: AppointmentForm.BasicLayoutProps) => {

    const onEventTypeChange = (value: string) => {
        onFieldChange({ eventType: value })
    }

    const onStartDateChange = (value: string) => {
        const date = appointmentData.startDate;
        date.setHours(value.substring(0, value.indexOf(':')), value.substring(value.indexOf(':') + 1))
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
        owner.phone = value;
        onFieldChange({ owners: appointmentData.owners })
    }

    const onOwnerEmailChange = (owner: AppointmentOwner, value: string) => {
        owner.email = value;
        onFieldChange({ owners: appointmentData.owners })
    }

    const onOwnerBornDateChange = (owner: AppointmentOwner, value: Date) => {
        if (value.getTime() < new Date().getTime()) {
            owner.bornDate = value;
            onFieldChange({ owners: appointmentData.owners })
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
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={3}>
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
                                    <Grid item xs={12} md={6}>
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

                                    <Grid item xs={12} md={6}>
                                        <DatePicker
                                            label="Nacimiento"
                                            format="DD/MM/YYYY"
                                            defaultValue={new Date('01-01-2000')}
                                            value={owner.bornDate}
                                            onChange={(e) => onOwnerBornDateChange(owner, e as Date)} />
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
