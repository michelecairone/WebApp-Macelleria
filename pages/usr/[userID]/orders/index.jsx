import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from "next/link";



export default function Orders({ user, orders }) {


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
                    <Box sx={{ marginBottom: 2 }}>
                        <Card key={ord.id_order} sx={{ minWidth: 700 }}>
                            <Link href={`/usr/${user.usr}/orders/${ord.id_order}/?usr=${user.usr}`} passHref>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom component="div">
                                        #ORDINE: {ord.id_order}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        Data: {ord.date_ord}
                                    </Typography>


                                </CardContent>
                            </Link>

                        </Card>
                    </Box>
                ))}



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