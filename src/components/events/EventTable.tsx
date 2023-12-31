import React from 'react'
import { Table, TableContainer, TablePagination } from '@mui/material';
 
import { EventModel } from '../../models/EventModel';
import EventTableHeader from './EventTableHeader';
import EventTableBody from './EventTableBody';
import { getAllEvents } from '../../services';

export default function EventTable() {
    const [events, setEvents] = React.useState<EventModel[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getAllEvents();
            setEvents(data);
        };

        fetchData();
    }, [])

    return (
        <React.Fragment>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <EventTableHeader />
                    <EventTableBody
                        events={events}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Eventos por página"
                style={{
                    fontSize: "1rem",
                }}
            />
        </React.Fragment>
    )
}
