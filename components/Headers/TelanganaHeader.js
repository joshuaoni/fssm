import React, { useEffect } from 'react';
import styles from './Header.module.css';
import bharat from '../../assets/ap-logo 1.png';
import Image from 'next/image';
import moshua from '../../assets/telangana-logo2 1.png';
import amrut from '../../assets/AMRUT.png';
import sbm from '../../assets/sbm.png';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ComponentLayout from '../Sections/ComponentLayout/ComponentLayout';

const TelanganaHeader = () => {
  const router = useRouter();

  const route = router.pathname.slice(1);

  useEffect(() => {
    document.querySelector('#states').classList.add('onroute');
    document.querySelector('#states-desktop').classList.add('onroute-desktop');
    document.getElementById('header').classList.add('white');
  }, [router])
  return (
    <>
      <header>
        <div>
          <div id='header' className={styles.container2}>
            <ComponentLayout>
              <Link href=''><a>
                <div className={styles.logo1}></div>
                <Image className={styles.logo} src={bharat} alt='logo1' height={82} width={79} />
              </a></Link>

              <span className={styles.middle}>
                <div className={styles.logo2}></div>
                {route === 'telangana' && <Link className='link' href=''><a><Image src={moshua} alt='logo2' height={82} width={79} /></a></Link>}
              </span>

              <div className={styles.div}>
                <Link href='http://amrut.gov.in/content/'><a target={"_blank"}>
                  <div className={styles.logo_3}></div>
                  <Image src={amrut} alt='logo3' height={74} width={139} />
                </a></Link>
                <div className={styles.space}></div>
                <Link href='https://swachhbharat.mygov.in/'><a target={"_blank"}>
                  <div className={styles.logo_4}></div>
                  <Image src={sbm} alt='logo4' height={73} width={166} />
                </a></Link>
              </div>
            </ComponentLayout>
          </div>
        </div>
      </header>
    </>
  )
}

export default TelanganaHeader