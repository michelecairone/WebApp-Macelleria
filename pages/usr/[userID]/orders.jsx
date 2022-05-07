import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from "react";
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';



export default function Orders({ user, orders }) {
    console.log(orders.lenght);

    const [order, setOrder] = useState(orders[0].id_order);

    function Scheda() {
        let i = orders.lenght;


        return (
            <Card sx={{ minWidth: 700 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom component="div">
                        #ORDINE: {orders[i - 1].id_order}
                    </Typography>
                    <Typography variant="h7" component="div">
                        Data: {orders[i - 1].date_ord}
                    </Typography>
                    <hr />
                    <Box sx={{ flexGrow: 1 }}>

                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

        );
    };


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
                        <Typography variant="h6" gutterBottom component="div">
                            #ORDINE: {orders[0].id_order}
                        </Typography>
                        <Typography variant="h7" component="div">
                            Data: {orders[0].date_ord}
                        </Typography>
                        <hr />
                        <Box sx={{ flexGrow: 1 }}>


                            {orders.map((ord) => (


                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 151 }}
                                            image={`/image/${ord.image}`}
                                            alt="Live from space album cover"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" gutterBottom>
                                            {ord.name}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="overline" display="block" gutterBottom>
                                            {ord.amount} Kg
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="overline" display="block" gutterBottom>
                                            € {ord.total}
                                        </Typography>
                                    </Grid>
                                </Grid>




                            ))}
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>


            </Box>
        </Container>
    );

}

export const getServerSideProps = async ({ params }) => {

    const res = await axios.get(`http://localhost:80/api/user/${params.userID}/orders`);

    return {
        props: {
            orders: res.data
        },
    };
};