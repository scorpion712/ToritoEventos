import { MenuItem } from '@mui/material'
import { clearLocalStorage } from '../../utilities/LocalStorage'
import { resetUser, userKey } from '../../redux/states/user'
import { useNavigate } from 'react-router-dom'
import { PublicRoutes } from '../../models';
import { useDispatch } from 'react-redux';

function Logout() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    clearLocalStorage(userKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, {replace: true});
  }

  return (
    <MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
  )
}

export default Logout