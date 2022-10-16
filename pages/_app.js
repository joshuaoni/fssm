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


axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = Cookies.get('access') ? 'Bearer ' + Cookies.get('access') : null;
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SiteBackground>
        <Component {...pageProps} />
      </SiteBackground>
    </LocalizationProvider>
  )
  // return <Component {...pageProps} />
}

export default MyApp
