import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ inputId, labelInput, value, onChange }) {

    const getTextId = (inputId) => {
        switch (inputId) {
            case 'outlined-basic':
                return <TextField id="outlined-basic" label={labelInput} variant="outlined" required className='textField' inputProps={{ maxLength: 40 }} value={value} onChange={onChange} />;
            case 'number':
                return <TextField id="outlined-number" label="Percentage (%)" type="number" required inputProps={{ min: 0, step: 1, maxLength: 3 }} value={value} onChange={onChange}
                    onKeyDown={(e) => {
                        if (['e', 'E', '.', '-'].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    className='textField' />
            case 'Image':
                return <TextField id="outlined-basic" label={labelInput} variant="outlined" required className='textField' inputProps={{ accept: "image/*"}} value={value} onChange={onChange}/>;

        }
    }

    return (
        <Box
            className='textBox'
            component="form"
            noValidate
            autoComplete="off"
        >
            {getTextId(inputId)}
        </Box>
    )
}