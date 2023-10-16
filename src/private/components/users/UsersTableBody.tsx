import { AppointmentOwner } from '../../../public/models/AppointmentModel'
import { TableBody } from '@mui/material';
import UsersTableRow from './UsersTableRow';

interface UsersTableBodyProps {
    users: AppointmentOwner[];
    page: number;
    rowsPerPage: number;
}

export default function UsersTableBody(props: UsersTableBodyProps) {
    
    const { users, page, rowsPerPage } = props;

    return (
        <TableBody>
            {users 
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: AppointmentOwner) => (
                    <UsersTableRow
                        user={user}
                        key={user.id}
                    />
                ))}
        </TableBody>
    )
}
