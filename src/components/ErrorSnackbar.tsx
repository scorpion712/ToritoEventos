import { Alert, Snackbar } from '@mui/material' 

interface ErrorSnackbarProps {
    open: boolean;
    handleClose: () => void;
    errorMessage: string;
}

export const ErrorSnackbar = (props: ErrorSnackbarProps) => {

    const { open, handleClose, errorMessage } = props;

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}
