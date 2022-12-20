import '../styles/globals.css';
import '../styles/root.css';
import '../styles/dropdown.css';
import { useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../services/authService';
import Cookies from 'js-cookie';
import SiteBackground from '../components/Sections/SiteBackground/SiteBackground';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useScrollRestoration from '../components/useScrollRestoration';
import TagManager from 'react-gtm-module'
import Head from 'next/head'



axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = Cookies.get('access') ? 'Bearer ' + Cookies.get('access') : null;
  }, [])


  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";


  const tagManagerArgs = {
    gtmId
  }


  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])


  useScrollRestoration(router);

  return (
    <>
      {/* <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SiteBackground>
          <Component {...pageProps} />
        </SiteBackground>
      </LocalizationProvider>
    </>
  )
  // return <Component {...pageProps} />
}

export default MyApp
