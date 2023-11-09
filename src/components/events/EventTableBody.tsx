import { TableBody } from '@mui/material';

import { EventModel } from '../../models/EventModel';
import { EventTableRow } from './EventTableRow';

interface EventTableBodyProps {
    events: EventModel[];
    page: number;
    rowsPerPage: number;
} 

export default function EventTableBody(props: EventTableBodyProps) {

    const { events, page, rowsPerPage } = props;

    return (
        <TableBody>
            {events
                  .sort((a, b) => {
                    return b.startDate.getTime() - a.startDate.getTime();
                  })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event: EventModel) => (
                    <EventTableRow
                        event={event}
                        key={event.id}
                    />
                ))}
        </TableBody>
    )
}
