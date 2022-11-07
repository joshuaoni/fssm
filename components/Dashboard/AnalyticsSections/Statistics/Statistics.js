import React, { useEffect, useState } from 'react';
import styles from './Statistics.module.css';
import Image from 'next/image';
import ic1 from '../../../../assets/ic1.png';
import ic2 from '../../../../assets/ic2.png';
import ic3 from '../../../../assets/ic3.png';
import { getStats } from '../../../../services/dashboardService';
import CircularProgress from '@mui/material/CircularProgress';

const Statistics = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  const handleError = (err) => {
    setLoading(false);
    console.log({ e: err })
    //setError(err.response.statusText);
  }

  useEffect(() => {
    getStats((err, res) => {
      if (err) return handleError(err)
      if (res !== null) {
        setLoading(false);
        console.log({ r: res })
        setStats(res.data);
      }
    });
  }, []);

  return (
    <>
      <div className={styles.cont}>
        <div className={styles.one}>
          <div>
            <Image height={40} width={40} src={ic1} alt='icon' />
          </div>
          <div>
            <p>No of Docs Uploaded</p>
            {loading ?
              <div className={styles.justify_center}><CircularProgress /></div> :
              <h6>{stats['No Of Docs Uploaded']}</h6>}
          </div>
        </div>
        <div className={styles.two}>
          <div>
            <Image height={40} width={40} src={ic2} alt='icon' />
          </div>
          <div>
            <p>No of Docs Mapped</p>
            {loading ?
              <div className={styles.justify_center}><CircularProgress /></div> :
              <h6>{stats['No Of Docs Mapped']}</h6>}
          </div>
        </div>
        <div className={styles.three}>
          <div>
            <Image height={40} width={40} src={ic3} alt='icon' />
          </div>
          <div>
            <p>No of Docs Approved</p>
            {loading ?
              <div className={styles.justify_center}><CircularProgress /></div> :
              <h6>{stats['No Of Docs Approved']}</h6>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistics