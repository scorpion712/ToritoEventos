import { Paper, Typography } from '@mui/material'
 
import UsersTable from '../components/users/UsersTable'
import { Layout } from '../components/layouts'

export default function Users() {
  return (
    <Layout>
      <Paper sx={{p:2, borderRadius: '10px' }}>
        <Typography variant='h4' sx={{mb: 2, p:2}}>
            Usuarios Registrados
        </Typography>
        <UsersTable />
      </Paper>
    </Layout>
  )
}
