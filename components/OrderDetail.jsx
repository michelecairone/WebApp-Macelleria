import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from "react";
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";


const stato = [
    {
        value: '1',
        label: 'in preparazione',
    },
    {
        value: '2',
        label: 'in consegna',
    },
    {
        value: '3',
        label: 'consegnato',
    },
];



export default function OrderDetail({ products }) {
    const [state, setState] = useState('');

    const handleState = (event) => {
        setState(event.target.value);

    };

    const updateState = async () => {
        console.log(state);
        await axios.put(`http://localhost:80/api/order_state/${products[0].id_order}`, state).then(function (response) {
            console.log(response.data);

        });
    }

    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 8,
                }}
            >

                <Card sx={{ minWidth: 700 }}>

                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h6" gutterBottom component="div">
                                    ORDINE: {products[0].id_order}
                                </Typography>
                                <Typography variant="h7" component="div">
                                    Data: {products[0].date_ord}
                                </Typography>
                                {(products[0].name_client) ?
                                    <>
                                        <Typography variant="h7" component="div">
                                            Stato attuale: {products[0].state}
                                        </Typography>
                                        <TextField
                                            select
                                            label="Modifica stato"
                                            value={state}
                                            onChange={handleState}
                                            name="order_state"
                                            sx={{ marginTop: 2 }}
                                            size='small'
                                            fullWidth
                                        >
                                            {stato.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        {(state === '') ?
                                            <Button disabled>Conferma stato</Button>

                                            :
                                            <Button onClick={updateState}>Conferma stato</Button>
                                        }

                                    </>
                                    :

                                    <Typography variant="h7" component="div">
                                        Stato: {products[0].state}
                                    </Typography>
                                }


                            </Grid>

                            <Grid item>
                                {(products[0].name_client) ? <>
                                    <Typography variant="h7" gutterBottom component="div">
                                        {products[0].name_client} {products[0].surname}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {products[0].address}, {products[0].city}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        Tel. {products[0].telephone}
                                    </Typography></> :
                                    <></>
                                }
                            </Grid>
                        </Grid>
                        <hr />
                        {products.map((prod) => (
                            <Grid
                                key={prod.id}
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ marginBottom: 2 }}
                            >
                                <Grid item sx={{ width: 152 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={`/image/${prod.image}`}
                                        alt="Live from space album cover"
                                    />
                                </Grid>
                                <Grid item sx={{ width: 300 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {prod.name}
                                    </Typography>
                                </Grid>

                                <Grid item sx={{ width: 124 }}>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        {prod.amount} Kg
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        € {prod.total}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}

                    </CardContent>
                </Card>
            </Box>
        </Container>

    );

}