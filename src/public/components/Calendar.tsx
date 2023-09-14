import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler, 
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AppointmentForm,
    AppointmentTooltip,
    DragDropProvider, 
    ChangeSet,
    CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Box, Grid, Menu, MenuItem } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TextEditor = (props: any) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
        return null;
    } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }: any) => {
    const onCustomFieldChange = (nextValue: any) => {
        onFieldChange({ customField: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Custom Field"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                placeholder="Custom field"
            />
        </AppointmentForm.BasicLayout>
    );
};

const appointments = [
    {
        title: 'Reunion 100 personas',
        startDate: new Date(2023, 8, 15, 9, 35),
        endDate: new Date(2023, 8, 15, 11, 30),
        id: 0,
        guests: '100',
        img: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg',
        owners: [
            "Francisco Fernandez"
        ],
        eventType: "Meet"
    }, {
        title: 'Cumpleanos Federico',
        startDate: new Date(2023, 8, 25, 12, 11),
        endDate: new Date(2023, 8, 25, 13, 0),
        id: 1,
        guests: '20',
        img: '',
        owners: [
            "Federico Gomez"
        ],
        eventType: "Birthday"
    }, {
        title: 'Cumpleanos 34 personas',
        startDate: new Date(2023, 8, 5, 14, 30),
        endDate: new Date(2023, 8, 5, 15, 35),
        id: 2,
        guests: '34',
        img: 'https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg',
        owners: [
            "Francisco Fernandez",
            "Federico Gomez"
        ],
        eventType: "Birthday"
    }, {
        title: 'Evento Privado Francisco',
        startDate: new Date(2023, 8, 6, 10, 0),
        endDate: new Date(2023, 8, 6, 11, 0),
        id: 3,
        guests: '30',
        img: 'https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg',
        owners: [
            "Federico Franco Fernandez"
        ],
        eventType: "Private"
    }
];

const PREFIX = 'Demo';

const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    firstRoom: `${PREFIX}-firstRoom`,
    secondRoom: `${PREFIX}-secondRoom`,
    thirdRoom: `${PREFIX}-thirdRoom`,
    header: `${PREFIX}-header`,
    commandButton: `${PREFIX}-commandButton`,
}; 

const getClassByLocation = (location: string) => {
    if (location === 'Room 1') return classes.firstRoom;
    if (location === 'Room 2') return classes.secondRoom;
    return classes.thirdRoom;
};

const getEventColorByType = (eventType: string) => {
    switch (eventType) {
        case "Meet":
            return "#E9B546";
        case "Private":
            return "#AF3B3B";
        default:
            return "#6F1E4F";
    }
}

const StyledIconButton = styled(IconButton)(() => ({
    [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
}));

const AppointmentTooltipHeader = (({
    children, appointmentData, ...restProps
}: AppointmentTooltip.HeaderProps) => ( 
    <Box>
        <AppointmentTooltip.Header
            {...restProps} 
            appointmentData={appointmentData}
        >

            <StyledIconButton
                /* eslint-disable-next-line no-alert */
                onClick={() => alert("Confirmar evento: Proximamente")}
                size="large"
            >
                <AssignmentTurnedInIcon color='success' />
            </StyledIconButton>
        </AppointmentTooltip.Header>
        <img src={`${appointmentData.img}`} height={260} width={'100%'} alt=" " />
    </Box>
));

const AppointmentTooltipContent = (({
    children, appointmentData, ...restProps
}: AppointmentTooltip.ContentProps) => (
    <Grid container alignItems="center">
        <Grid item xs={12} style={{ marginLeft: '25px' }}>
            <Typography component='h2' style={{ fontWeight: '700', color: "#4E4E4E" }}>{appointmentData.title}</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: '25px', marginBottom: '15px' }}>
            <span style={{textDecoration:'underline', fontWeight: '600', color: "#4E4E4E"}}>{`${appointmentData.owners.length == 1 ? "Organizador" : "Organizadores"}:`}</span>
            <Typography>{appointmentData.owners.join('; ')}</Typography>
        </Grid>
        <Grid item xs={2} style={{textAlign: 'center'}} >
            <AccessTimeIcon color='info' />
        </Grid>
        <Grid item xs={10} style={{ fontWeight: '400', color: '#000026' }}>
            {`${appointmentData.startDate.toLocaleString()} - ${appointmentData.startDate.toLocaleString('es-ES').substring(appointmentData.startDate.toLocaleString('es-ES').indexOf(',')+1)}`}
        </Grid>
        <Grid item xs={2} style={{textAlign: 'center'}} >
            <EmojiPeopleIcon color='secondary' />
        </Grid>
        <Grid item xs={10} style={{ fontWeight: '400', color: '#000026' }}>
            {`${appointmentData.guests} invitados`}
        </Grid>
    </Grid>
));


const Appointment = ({
    children, style, ...restProps
}: Appointments.AppointmentProps) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: `${getEventColorByType(restProps.data.eventType)}`,
            borderRadius: '8px',
            fontSize: '20px',
        }}
    >
        {children}
    </Appointments.Appointment>
);

export const EventCalendar = () => {
    const [data, setData] = React.useState(appointments);
    const [editingOptions, setEditingOptions] = React.useState({
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true,
        allowDragging: true,
        allowResizing: false,
    });
    const [addedAppointment, setAddedAppointment] = React.useState({});
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

    const {
        allowDeleting, allowUpdating, allowDragging,
    } = editingOptions;

    const onCommitChanges = React.useCallback(({ added, changed, deleted }: ChangeSet) => {
        if (added) {
            console.log("Agregando: Validar que los campos sean validos")
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setData([...data, { id: startingAddedId, ...added }]);
        }
        if (changed) {
            console.log("Modificando: Validar que los campos sean validos")
            setData(data.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        }
        if (deleted !== undefined) {
            setData(data.filter(appointment => appointment.id !== deleted));
        }
        setIsAppointmentBeingCreated(false);
    }, [setData, setIsAppointmentBeingCreated, data]);

    const onAddedAppointmentChange = React.useCallback((appointment: object) => {
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    }, [addedAppointment]);

    const CommandButton = React.useCallback(({ id, ...restProps }: AppointmentForm.CommandButtonProps) => { 
        if (id === 'deleteButton') {
            return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
        }
        return <AppointmentForm.CommandButton id={id} {...restProps} />;
    }, [allowDeleting]);

    const allowDrag = React.useCallback(
        () => allowDragging && allowUpdating,
        [allowDragging, allowUpdating],
    );

    return (
        <React.Fragment>
            <Paper>
                <Scheduler data={data}
                            locale={'es-ES'}>
                    <ViewState defaultCurrentDate={new Date()} />
                    <EditingState
                        onCommitChanges={onCommitChanges}
                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={onAddedAppointmentChange}
                    />

                    <IntegratedEditing />

                    <MonthView />

                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />

                    <Appointments appointmentComponent={Appointment} />

                    <AppointmentTooltip
                        showOpenButton
                        headerComponent={AppointmentTooltipHeader}
                        contentComponent={AppointmentTooltipContent}
                        showDeleteButton={allowDeleting}
                    />
                    <AppointmentForm
                        commandButtonComponent={CommandButton}
                        readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                        basicLayoutComponent={BasicLayout}
                        textEditorComponent={TextEditor}
                    />
                    <DragDropProvider allowDrag={allowDrag} />

                    <CurrentTimeIndicator
                        shadePreviousCells={true}
                        shadePreviousAppointments={true}
                        updateInterval={10}
                    />
                </Scheduler>
            </Paper>
        </React.Fragment>
    );
};



// Controlled mode weeks vierw