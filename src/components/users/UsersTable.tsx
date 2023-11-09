import React from 'react' 
import { Table, TableContainer, TablePagination } from '@mui/material';

import { AppointmentOwner } from '../../models/AppointmentModel';
import { getUsers } from '../../services/users/getUsersService';
import UsersTableHeader from './UsersTableHeader';
import UsersTableBody from './UsersTableBody';

export default function UsersTable() {
    const [users, setUsers] = React.useState<AppointmentOwner[]>([]);
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
            const data = await getUsers();
            setUsers(data);
        };

        fetchData();
    }, [])

    return (
        <>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <UsersTableHeader />
                    <UsersTableBody
                        users={users}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Usuarios por página"
                style={{
                    fontSize: "1rem",
                }}
            />
        </>
  )
}
