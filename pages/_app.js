import Layout from "../components/Layout";
import "../styles/globals.css";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
