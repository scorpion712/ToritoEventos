import { Typography } from '@mui/material'

import Layout from '../../public/components/layouts/Layout'
import UsersTable from '../components/users/UsersTable'

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
