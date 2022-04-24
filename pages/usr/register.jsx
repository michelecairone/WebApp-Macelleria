import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Register = () => {
    
    const router = useRouter();

    
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:80/api/user/save', inputs).then(function (response) {
            console.log(response.data);

        });
    }
    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Nuovo account</h1>
                <input
                    placeholder="Nome"
                    name = "name"
                    className={styles.input}
                    onChange={handleChange}
                />
                <input
                    placeholder="Cognome"
                    name="surname"
                    className={styles.input}
                    onChange={handleChange}
                />
                <input
                    placeholder="Indirizzo"
                    name="address"
                    className={styles.input}
                    onChange={handleChange}
                />
                <input
                    placeholder="Città"
                    name="city"
                    className={styles.input}
                    onChange={handleChange}
                />
                <input
                    placeholder="Telefono"
                    name="telephone"
                    className={styles.input}
                    onChange={handleChange}
                />
                <input
                    placeholder="Email"
                    name="email"
                    className={styles.input}
                    onChange={handleChange}
                />
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    className={styles.input}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit} className={styles.button}>
                   Registrati
                </button>
                
            </div>
        </div>
    );
}

export default Register
