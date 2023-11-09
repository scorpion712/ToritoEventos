import { Typography } from '@mui/material'
 
import UsersTable from '../components/users/UsersTable'
import { Layout } from '../components/layouts'

export default function Users() {
  return (
    <Layout>
        <Typography variant='h4' sx={{mb: 2}}>
            Usuarios Registrados
        </Typography>
        <UsersTable />
    </Layout>
  )
}
