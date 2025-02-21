import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BasicSelect({inputId, flavourCount, setFlavourCount}) {

    const handleChange = (event) => {
        setFlavourCount(event.target.value);
    };

    const getSelectId = (inputId) => {
        switch (inputId) {
            case 'flavours':
                return (
                    <>
                        <InputLabel id="create-labels">Number of {inputId} </InputLabel>
                        <Select
                            labelId="create-labels"
                            id="demo-simple-select"
                            value={flavourCount}
                            label="Number of flavours"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>One</MenuItem>
                            <MenuItem value={2}>Two</MenuItem>
                            <MenuItem value={3}>Three</MenuItem>
                            <MenuItem value={4}>Four</MenuItem>

                        </Select>
                    </>

                );
                default:
                return null
        }
    }



    return (
        <Box>
            <FormControl required className='selector'>
                {getSelectId(inputId)}
            </FormControl>
        </Box>
    );
}