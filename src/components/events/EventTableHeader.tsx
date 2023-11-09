import { TableCell, TableHead, TableRow } from '@mui/material';

const headers: string[] = ["Fecha", "Tipo de Evento", "Invitados", "Organizadores", "Asistentes"]

export default function EventTableHeader() {
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
