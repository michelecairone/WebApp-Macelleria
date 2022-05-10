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
import Link from "next/link";



export default function Orders({ products }) {
    
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
                            #ORDINE: {products[0].id_order}
                        </Typography>
                        <Typography variant="h7" component="div">
                            Data: {products[0].date_ord}
                        </Typography>
                        <hr />
                        {products.map((prod) => (
                            <Grid
                                key={prod.id}
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
                        ))}

                    </CardContent>
                </Card>
            </Box>
        </Container>
    );

}