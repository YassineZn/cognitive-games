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
        <title>Yassine Zaanouni</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
