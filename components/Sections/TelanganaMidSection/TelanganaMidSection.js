import React from 'react';
import styles from './TelanganaMidSection.module.css';
import Image from 'next/image';
import house from '../../../assets/ta-1 1.png';
import andre from '../../../assets/andre.png';
import { useRouter } from 'next/router';

const TelanganaMidSection = () => {
  const router = useRouter();

  var id = router.pathname.slice(1);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.cont}>
          <div className={styles.img}>
            <Image width={535} height={387} alt='icon img' src={id === 'telangana' ? andre : house} />
          </div>
          <div>
            <div>
              <h4>{id === 'telangana' ? 'Telanga' : 'Andhra Pradesh'}</h4>
              <p>{id === 'telangana' ? `The Telangana State Government in India's FSSM journey is one of the forerunners, championing gender inclusive sanitation, worker safety and innovations in WSH.` : `Steadily heading towards its goal to ensure 100% safe treatment of faecal sludge, championing behavioural transformation among its citizens and nurturing entrepreneurs across the sector.`}
              </p>
              <button className={styles.btn}>View State's FSSM Journey</button>
            </div>
          </div>
        </div>
        <div className={styles.footer}></div>
      </section>
    </>
  )
}

export default TelanganaMidSection