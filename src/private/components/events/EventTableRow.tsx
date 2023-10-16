import { IconButton, TableCell, TableRow } from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';

import { EventModel } from "../../../public/models/EventModel";
import { eventTypeReverseMap } from "../../../public/models/EventType";

interface EventTableRowProps { 
    event: EventModel;
}

export const EventTableRow = (props: EventTableRowProps) => { 
    const { event } = props;  
       
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
          {event.owners.map(o => (`${o.name} ${o.surname}`))}
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
            onClick={() => alert('Ver en detalle ' + event.id)}
          >
            <PreviewIcon/>
          </IconButton> 
        </TableCell>
      </TableRow>
    );
  };