import { TableCell, TableHead, TableRow } from '@mui/material';

const headers: string[] = ["Nombre", "Apellido", "Edad", "Telefono", "Email"]

export default function UsersTableHeader() {
  return (
    <TableHead>
        <TableRow>
            {headers.map(header => (
                <TableCell
                    align="center" 
                    key={header}
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                    }}
                >
                    {header}
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
  )
}
