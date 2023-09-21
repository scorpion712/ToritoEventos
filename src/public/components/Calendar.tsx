import * as React from 'react';
import Paper from '@mui/material/Paper'; 
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
import { BasicLayout } from './calendar/CalendarEventForm';
import { AppointmentCard } from './calendar/AppointmentCard';
import { AppointmentCardHeader } from './calendar/AppointmentCardHeader';

interface AppointmentOwner {
    id: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
}

const appointments = [
    {
        title: 'Reunion 100 personas',
        startDate: new Date(2023, 8, 15, 9, 35),
        endDate: new Date(2023, 8, 15, 11, 30),
        id: 0,
        guests: '100',
        img: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg',
        owners: [
            {
                id: Math.random().toString(16).slice(2),
                name: "Francisco",
                surname: "Fernandez",
                phone: "223456789",
                email: "franfernandez@gmail.com"
            } as AppointmentOwner
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
            {
                id: Math.random().toString(16).slice(2),
                name: "Federico",
                surname: "Gomez",
                phone: "2239876543",
                email: "fedegomez@gmail.com"
            } as AppointmentOwner
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
            {
                id: Math.random().toString(16).slice(2),
                name: "Francisco",
                surname: "Fernandez",
                phone: "223456789",
                email: "franfernandez@gmail.com"
            } as AppointmentOwner,
            {
                id: Math.random().toString(16).slice(2),
                name: "Federico",
                surname: "Gomez",
                phone: "2239876543",
                email: "fedegomez@gmail.com"
            } as AppointmentOwner
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
            {
                id: Math.random().toString(16).slice(2),
                name: "Francisco",
                surname: "Fernandez",
                phone: "223456789",
                email: "franfernandez@gmail.com"
            } as AppointmentOwner,
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
            console.log("Agregando: Validar que los campos sean validos - en caso de que no mostar snackbar", added)
            added.title = `${added.eventType} ${added.guests} invidados`;

            // validar que tenga un organizador con los datos completos
            // validar que coincidan las fechas (inicio > fin y hora inicio > hora fin)
            // validar fecha inicio >= hoy
            // validar que tenga al menos 1 invitado
            // si no tiene foto, por defecto la de torito

            // si no cumple mostrar un 

            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setData([...data, { id: startingAddedId, ...added }]); 
        }
        if (changed) {
            console.log("Modificando: Validar que los campos sean validos - en caso de que no mostar snackbar", data)
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
                        headerComponent={AppointmentCardHeader}
                        contentComponent={AppointmentCard}
                        showDeleteButton={allowDeleting}
                    />
                    <AppointmentForm
                        commandButtonComponent={CommandButton}
                        readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                        basicLayoutComponent={BasicLayout}
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