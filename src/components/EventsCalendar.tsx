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
    CurrentTimeIndicator
} from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector } from 'react-redux';

import { BasicLayout } from './calendar/CalendarEventForm';
import { AppointmentCard } from './calendar/AppointmentCard';
import { AppointmentCardHeader } from './calendar/AppointmentCardHeader';
import { getEvents } from '../services/events/getEvents.service'; 
import { deleteEvent } from '../services/events/removeEvent.service';
import { addEvent } from '../services/events/addEvent.service';
import { ErrorSnackbar } from './ErrorSnackbar';  
import { eventTypeReverseMap, getEventColorByType } from '../models/EventType';
import { AppStore } from '../redux/store';
import { Roles } from '../models/roles';
import { EventModel } from '../models/EventModel';


interface AppointmentOwner {
    id: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
}


const Appointment = ({
    children, ...restProps
}: Appointments.AppointmentProps) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            backgroundColor: `${getEventColorByType(restProps.data.eventType)}`,
            borderRadius: '8px',
            fontSize: '20px',
        }}
    >
        {children}
    </Appointments.Appointment>
);


export const EventCalendar = () => {
    const userState = useSelector((store: AppStore) => store.user);
    
    React.useEffect(() => { 
        if (userState.rol === Roles.ADMIN) {
            const fetchData = async () => {
                const data = await getEvents();
                setData(data);
            };

            fetchData();
        } 
    }, [])


    const [showSnackBar, setShowSnackBar] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [data, setData] = React.useState<EventModel[]>([]); 

    const isFormValid = (data: EventModel) => {
        if (!data.owners || data.owners?.length <= 0
            && !data.owners?.some((owner: AppointmentOwner) =>
                owner.email?.length == 0
                || owner.name?.length == 0
                || owner.surname?.length == 0
                || owner.phone?.length == 0)) {
            setErrorMessage("Los datos del organizador son obligatorios!");
            return false;
        }
        if (data.startDate.getTime() > data.endDate.getTime()) {
            setErrorMessage("La fecha de fin del evento no puede ser menor a la de inicio!");
            return false;
        } 
        if (data.startDate < new Date()) {
            setErrorMessage("No puede crear un evento para una fecha anterior!");
            return false;
        }
        if (parseInt(data.guests) < 1) {
            setErrorMessage("Debe haber al menos un invitado al evento!");
            return false;
        }

        // si no tiene foto enviar la de torito

        return true;
    }

    const isChangeValid = (data: EventModel) => {  
        if (data.owners) {
            if (data.owners?.length <= 0
                || data.owners?.some((owner: AppointmentOwner) =>
                    owner.email?.length == 0
                    || owner.name?.length == 0
                    || owner.surname?.length == 0
                    || owner.phone?.length == 0)) {
                setErrorMessage("Los datos del organizador son obligatorios!");
                return false;
            }
        }
        if (data.startDate) {
            if (data.startDate.getTime() > data.endDate.getTime()) {
                setErrorMessage("La fecha del evento no puede ser menor a la de inicio!");
                return false;
            }
        }
        if (data.guests) {
            if (parseInt(data.guests) < 1) {
                setErrorMessage("Debe haber al menos un invitado al evento!");
                return false;
            }
        }
        // si no tiene foto enviar la de torito

        return true;
    }


    const handleSnackBarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnackBar(false);
    };

    const editingOptions = {
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true,
        allowDragging: true,
        allowResizing: false,
    };
    const { allowDeleting, allowUpdating, allowDragging } = editingOptions;

    const [addedAppointment, setAddedAppointment] = React.useState({});
    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);


    const onCommitChanges = React.useCallback(({ added, changed, deleted }: any) => {
        if (added) { 
            added.title = `${eventTypeReverseMap[added.eventType]} ${added.guests} invitados`;
            if (isFormValid(added)) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                addEvent(added);
                setData([...data, { id: startingAddedId, ...added }]);
            } else {
                setShowSnackBar(true);
                return;
            }
        }
        if (changed) { 
            const appointmentToChange = data.find(appointment => appointment.id === Object.keys(changed)[0]);
            changed[Object.keys(changed)[0]].title = `${changed[Object.keys(changed)[0]].eventType ? eventTypeReverseMap[changed[Object.keys(changed)[0]].eventType] : eventTypeReverseMap[appointmentToChange?.eventType as any]} ${changed[Object.keys(changed)[0]].guests
                ? changed[Object.keys(changed)[0]].guests
                : appointmentToChange?.guests} invitados`;
            if (isChangeValid(changed[Object.keys(changed)[0]])) {
                addEvent({ ...appointmentToChange, ...changed[Object.keys(changed)[0]] } as EventModel);
                setData(data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
            } else {
                setShowSnackBar(true);
                return;
            }
        }
        if (deleted !== undefined) {
            deleteEvent(deleted);
            setData(data.filter(appointment => appointment.id !== deleted));
        }
        setIsAppointmentBeingCreated(false);
    }, [setData, setIsAppointmentBeingCreated, data]);

    const onAddedAppointmentChange = React.useCallback((appointment: object) => {
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
    }, [addedAppointment]);
 

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

                <ErrorSnackbar open={showSnackBar}
                    handleClose={handleSnackBarClose}
                    errorMessage={errorMessage} />
            </Paper>
        </React.Fragment>
    );
};