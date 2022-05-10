import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from "axios";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from "../styles/Admin.module.css";
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#b7903c',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
            contrastText: '#fff'
        }

    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 5,
    p: 2,
};

const cat = [
    {
        value: '1',
        label: 'Carne Bianca',
    },
    {
        value: '2',
        label: 'Carne Rossa',
    },
    {
        value: '3',
        label: 'Preparati',
    },
];

export default function UpdateProduct({ product }) {

    const [category, setCategory] = React.useState(product.id_category);

    const [open, setOpen] = React.useState(false);
    const [inputs, setInputs] = useState({
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        amount: product.amount,
        id_category: product.id_category,
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
        handleChange(event);
    };

    const handleSave = async () => {

        await axios.put(`http://localhost:80/api/product/${product.id}/edit`, inputs).then(function (response) {
            console.log(response.data);
        });
    }

    return (
        <>
            <button className={styles.button} onClick={handleOpen} >
                Modifica
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button onClick={handleClose}>X</Button>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginBottom: 8,
                                }}>
                                <Typography component="h1" variant="h5">
                                    Modifica Prodotto
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="name"
                                                type="text"
                                                defaultValue={`${product.name}`}
                                                required
                                                fullWidth
                                                label="Nome"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={15} sm={6}>
                                            <TextField
                                                name="image"
                                                type="text"
                                                defaultValue={`${product.image}`}
                                                required
                                                fullWidth
                                                label="Percorso foto"
                                                autoFocus
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="text"
                                            
                                                fullWidth
                                                size='large'
                                                label="Descrizione"
                                                name="description"
                                                defaultValue={`${product.description}`}
                                                rows={10}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={5}>
                                            <TextField
                                                type="tel"
                                                required
                                                fullWidth
                                                label="Prezzo al Kg"
                                                name="price"
                                                defaultValue={`${product.price}`}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Quantità"
                                                name="amount"
                                                defaultValue={`${product.amount}`}
                                                type="tel"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <TextField
                                                select
                                                label="Categoria"
                                                value={category}
                                                onChange={handleCategory}
                                                name="id_category"
                                            >
                                                {cat.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                        </Grid>
                                    </Grid>
                                    <Box
                                        sx={{

                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'

                                        }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, order: 2 }}
                                            onClick={handleSave}

                                        >
                                            Salva
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2, order: 1 }}
                                            onClick={handleClose}

                                        >
                                            Annulla
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Box>
            </Modal>
        </>
    );

}