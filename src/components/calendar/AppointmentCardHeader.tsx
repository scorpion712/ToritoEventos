import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Box, IconButton, styled } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useSelector } from 'react-redux'; 

import { AppStore } from '../../redux/store';
import { Roles } from '../../models/roles';

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

const StyledIconButton = styled(IconButton)(() => ({
    [`&.${classes.commandButton}`]: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
}));

export const AppointmentCardHeader = ({
    children, appointmentData, ...restProps
}: AppointmentTooltip.HeaderProps) => {

    const userState = useSelector((store: AppStore) => store.user);

    return (
        <Box>
            <AppointmentTooltip.Header
                {...restProps}
                appointmentData={appointmentData}
            >
                {
                    userState.rol === Roles.ADMIN &&
                    <StyledIconButton
                        /* eslint-disable-next-line no-alert */
                        onClick={() => alert("Confirmar evento: Proximamente")}
                        size="large"
                    >
                        <AssignmentTurnedInIcon color='success' />
                    </StyledIconButton>
                }
            </AppointmentTooltip.Header>
            <img src={`${appointmentData?.img}`} height={260} width={'100%'} alt=" " />
        </Box>
    );
};