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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { PrintDisabled } from "@mui/icons-material";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function Orders({ user, orders }) {
    console.log(orders);
    const [product, setProduct] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {

        setExpanded(!expanded);
    };

    function Products({ order }) {
        axios.get(`http://localhost:80/api/user/1/orders/${order}`).then(function (response) {
            console.log(response.data);

            setProduct(response.data);

        });

        {
           product.map((prod) => {
                return (
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
                                image={`/image/${prod.image}`}
                                alt="Live from space album cover"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom>
                                {prod.name}
                            </Typography>
                        </Grid>

                        <Grid item>
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

                )
            })
        }



    }

    const [order, setOrder] = useState(orders[0].id_order);



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
                {orders.map((ord) => (
                    <Card sx={{ minWidth: 700 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom component="div">
                                #ORDINE: {ord.id_order}
                            </Typography>
                            <Typography variant="h7" component="div">
                                Data: {ord.date_ord}
                            </Typography>
                            <CardActions disableSpacing>

                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Products order={ord.id_order} />
                                    </Box>
                                </CardContent>
                            </Collapse>
                            <hr />

                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>

                ))}
                <Card sx={{ minWidth: 700 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom component="div">
                            #ORDINE: {orders[0].id_order}
                        </Typography>
                        <Typography variant="h7" component="div">
                            Data: {orders[0].date_ord}
                        </Typography>
                        <CardActions disableSpacing>

                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
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
                        </Collapse>
                        <hr />

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