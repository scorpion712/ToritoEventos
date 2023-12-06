import { IconButton, TableCell, TableRow } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";

import { AppointmentOwner } from "../../models/AppointmentModel"
import { GetPersonAge } from "../../utilities/GetPersonAge"; 

interface UsersTableRowProps {
  user: AppointmentOwner;
}

export default function UsersTableRow(props: UsersTableRowProps) {
  const navigate = useNavigate();
  const { user } = props;

  const handleDetailClick = (userId: string) => {
    navigate(`${userId}`);
  }

  return (
    <TableRow hover key={user.id}>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {user.name}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {user.surname}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {GetPersonAge(user.bornDate as Date)}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {user.phone}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ fontSize: "1.3rem" }}
      >
        {user.email}
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
          onClick={() => handleDetailClick(user.id)}
        >
          <ManageAccountsIcon color="warning" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
