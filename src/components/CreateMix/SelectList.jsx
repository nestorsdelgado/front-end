import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ sabores = [], value, onChange }) {

    return (
        <Autocomplete
            className='selectorList'
            disablePortal
            options={sabores}
            getOptionLabel={(option) => `${option.Sabor} - ${option.Marca}`}
            renderInput={(params) => <TextField {...params} label="Flavour" required />}
            value={value}
            onChange={(event, newValue) => {
                if (onChange) {
                    onChange(newValue);
                }
            }}
        />
    );
}