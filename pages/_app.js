import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import "../styles/utilities.scss";
import "../styles/nprogress.css";
import Router from "next/router";
import nProgress from "nprogress";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError ", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/icons/logo.svg" />
      </Head>
      <Layout>
        {/* <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: "",
            duration: 1500,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        /> */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
