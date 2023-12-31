import { IconButton, TableCell, TableRow } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from "react-router-dom";

import { EventModel } from "../../models/EventModel";
import { eventTypeReverseMap } from "../../models/EventType";

interface EventTableRowProps {
  event: EventModel;
}

export const EventTableRow = (props: EventTableRowProps) => {
  const navigate = useNavigate();
  const { event } = props;

  const handleDetailClick = (eventId: string) => {
    navigate(`${eventId}`);
  }

  return (
    <TableRow hover key={event.id}>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {event.startDate.toLocaleDateString('es-ES')}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {eventTypeReverseMap[event.eventType as number]}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {event.guests}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {event.owners.map(o => (`${o.name} ${o.surname}`)).join(', ')}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {event.guests}
      </TableCell>
      <TableCell
        align="left"
        style={{ width: "10rem" }}
      >
        <IconButton
          title="Ver detalle"
          aria-label="show-detail"
          style={{ color: "#2f2628" }} //or 461e92
          size="medium"
          onClick={() => handleDetailClick(event.id)}
        >
          <PreviewIcon />
        </IconButton>
        {
          !event.confirmed &&
            <IconButton
              /* eslint-disable-next-line no-alert */
              onClick={() => alert("Confirmar evento: Proximamente")}
              size="large"
            >
              <AssignmentTurnedInIcon color='success' />
            </IconButton>
        }
      </TableCell>
    </TableRow>
  );
};