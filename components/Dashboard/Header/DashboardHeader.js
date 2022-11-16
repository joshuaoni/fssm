import React, { useEffect, useState } from 'react';
import styles from './DashboardHeader.module.css';
import Image from 'next/image';
import swachh from '../../../assets/swachh.png';
import profile from '../../../assets/Ellipse 10.png';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { sideBarText } from '../../TextArrays';
import Link from 'next/link';
import Cookies from 'js-cookie';

const DashboardHeader = () => {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState(sideBarText);

  const router = useRouter();

  const handleNav = () => {
    router.push('/');
  }

  useEffect(() => {
    if (Cookies.get('isAdmin') !== 'true') {
      const newState = sideBarText.filter(({ id }) => {
        return id < 6 || id === 11 || id === 14;
      })
      setData(newState);
    }
  }, [])

  useEffect(() => {
    Cookies.get('isAdmin') === 'true' ? setText('NFSSM') : setText('CDD');
    setName(Cookies.get('firstName') + ' ' + Cookies.get('lastName'));
  }, [])

  useEffect(() => {
    document.querySelector('.nav').classList.toggle('none');
    document.querySelector('.nav').classList.toggle('show');
    document.getElementById('d-open').classList.toggle('none');
    document.getElementById('d-close').classList.toggle('none');
  }, [clicked])

  useEffect(() => {
    document.getElementById('d-open').classList.remove('none');
    document.getElementById('d-close').classList.add('none');
    document.querySelector('.nav').classList.remove('show');
    document.querySelector('.nav').classList.add('none');
  }, [])

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <span className={styles.icon_cont}>
            <CloseIcon
              id='d-close'
              className='none mobile-comp'
              onClick={() => { setClicked(!clicked); }}
              sx={{ cursor: 'pointer', color: 'white', width: '40px', height: '40px' }} />
            <MenuIcon
              id='d-open'
              className='mobile-comp'
              onClick={() => { setClicked(!clicked); }}
              sx={{ cursor: 'pointer', color: 'white', width: '40px', height: '40px' }} />
          </span>
          <Link href="/"><Image src={swachh} height={66} width={116} alt='logo' /></Link>
        </div>
        <div className={styles.right}>
          <button onClick={() => { handleNav(); }} className={styles.btn}>Go to website</button>
          <h4>{text}</h4>
          <div
            className={styles.admin}
            title='Toggle pop-up'
            onClick={() => {
              document.getElementById('pop_up').classList.toggle('none');
            }}>
            <Image src={profile} height={40} width={40} alt='logo' />
            <p>{name}</p>
          </div>
        </div>
      </nav>

      <div className={`${styles.nav2} nav none`}>
        <div className={styles.sidebar}>
          <div>
            {
              data.map(({ id, text, link, image }) => {
                return (
                  <Link key={id} href={`/${link}`}><a className='mobile-comp'>
                    <div className={`mobile-comp ${styles.card}`}>
                      <Image className='mobile-comp' height={20} width={20} src={image} alt='icon' />
                      <h6 className='mobile-comp'>{text}</h6>
                    </div>
                  </a></Link>
                )
              })
            }
          </div>
        </div>
      </div>

      <div id='pop_up' className={`none ${styles.pop_up}`}>
        <div className={styles.cont}>
          <Image src={profile} height={80} width={80} alt='logo' />
        </div>
        <div className={styles.footer}>
          <Link href='/changepassword'><a>
            <div className={styles.btn2}>Change Password</div>
          </a></Link>
          <div
            onClick={() => {
              Cookies.remove('access');
              Cookies.remove('refresh');
              Cookies.remove('isAdmin');
              Cookies.remove('firstName');
              Cookies.remove('lastName');
              Cookies.remove('check');
              Cookies.remove('email');
              router.push('/');
            }}
            className={styles.btn3}>Sign Out</div>
        </div>
      </div>
    </>
  )
}

export default DashboardHeader