import Layout from "../components/Layout";
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const param = { usr: router.query.usr, auth: false}
  console.log("prima di MYAPP");
  console.log(param.usr);
  console.log("dopo di MYAPP");
  
  return (
    <Provider store={store}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      <Layout user={param}>
        <Component {...pageProps} user={param} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
