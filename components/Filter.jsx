import axios from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


export default function Filter({ setCount, setList }) {

    const [filter, setFilter] = useState({
        Bianca: false,
        Rossa: false,
        Preparati: false,
    });

    const handleSubmit = (event) => {
        if (filter.Bianca == false && filter.Rossa == false && filter.Preparati == false) {
            setCount(true);
        }
        else {
            setCount(false);
            event.preventDefault();
            axios.post('http://localhost:80/api/products/filter', filter).then(function (response) {

                console.log(response.data);
                setList(response.data);
            });
        }

    }

    const handleChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.checked,
        });
    };

    const { Bianca, Rossa, Preparati } = filter;

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Filtri di ricerca</FormLabel>
                <FormGroup sx={{ flexDirection: 'row' }}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={Bianca} onChange={handleChange} name="Bianca" />
                        }
                        label="Bianca"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={Rossa} onChange={handleChange} name="Rossa" />
                        }
                        label="Rossa"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={Preparati} onChange={handleChange} name="Preparati" />
                        }
                        label="Preparati"
                    />
                </FormGroup>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Applica
                </Button>
            </FormControl>
        </Box>

    );
}
