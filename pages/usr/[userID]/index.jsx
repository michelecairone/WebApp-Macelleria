import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from "axios";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useRouter } from "next/router";
import passwordHash from 'password-hash';

export default function ProfileDetail({ user, profile }) {
    const router = useRouter();

    const [read, setRead] = React.useState(true);
    function handleModify() {
        (read) ?
            setRead(false) : setRead(true);
    }
    function handleSave() {
        console.log(inputs);
        axios.put(`http://localhost:80/api/user/${profile.id}/edit`, inputs).then(function (response) {
            console.log(response.data);
            if (response.data.status == 1) {
                setRead(true);
                router.push(`/usr/${profile.id}?usr=${profile.id}`);
            }

        });

    }

    const [inputs, setInputs] = React.useState({
        id: profile.id,
        name: profile.name,
        surname: profile.surname,
        address: profile.address,
        city: profile.city,
        telephone: profile.telephone,
        email: profile.email,
        password: profile.password,
    });


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "password") {
            value = passwordHash.generate(value);
        }
        setInputs(values => ({ ...values, [name]: value }));
    }

    return (
        <>

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
                        Dettagli Profilo
                    </Typography>
                    <Box component="div" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Nome"
                                    fullWidth
                                    defaultValue={`${profile.name}`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="surname"
                                    label="Cognome"
                                    fullWidth
                                    defaultValue={`${profile.surname}`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    name="address"
                                    label="Indirizzo"
                                    fullWidth
                                    defaultValue={`${profile.address}`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    name="city"
                                    label="Città"
                                    fullWidth
                                    defaultValue={`${profile.city}`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="telephone"
                                    label="Telefono"
                                    fullWidth
                                    defaultValue={`${profile.telephone}`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    defaultValue={`${profile.email}`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    defaultValue={`${profile.password}`}
                                    InputProps={{
                                        readOnly: read,
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                        {(read == true) ?
                            <Button
                                type="submit"

                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleModify}

                            >
                                Modifica
                            </Button> :
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
                                    onClick={handleModify}

                                >
                                    Annulla
                                </Button>
                            </Box>

                        }


                    </Box>

                </Box>
            </Container>

        </>
    );

}

export const getServerSideProps = async ({ params }) => {

    const res = await axios.get(`http://localhost:80/api/user/${params.userID}`);

    return {
        props: {
            profile: res.data
        },
    };
};