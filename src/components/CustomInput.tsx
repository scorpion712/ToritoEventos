import { InputBaseProps, TextField, Typography } from "@mui/material"
import { Fragment } from "react";

interface CustomInputProps extends InputBaseProps{
    errorMessage?: string;
    inputId: string;
    inputLabel: string;
    inputName: string;
}

function CustomInput(props: CustomInputProps) {

    const { errorMessage, inputId, inputLabel, inputName } = props;

    return (
        <Fragment>
            <TextField
                margin="normal"
                required
                fullWidth
                error={errorMessage ? true : false}
                id={inputId}
                label={inputLabel}
                name={inputName}
                autoFocus
            />
            {
                errorMessage &&
                <Typography variant='caption' color='error'>{errorMessage}</Typography>
            }
        </Fragment>
    )
}

export default CustomInput