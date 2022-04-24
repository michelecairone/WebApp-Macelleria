import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Login.module.css";

const Login = () => {

  const [error, setError] = useState(false);

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const [user, setUser] = useState();

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:80/api/user/login', inputs).then(function (response) {
      setUser(response.data);
      console.log(response.data);
      console.log(user);

      if (response.data == false) {
        setError(true);
      }
      else {
        
        router.push(`/usr/${response.data.id}`);

      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Login</h1>
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
          Accedi
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
        <Link href="/admin/register" >
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export default Login;
