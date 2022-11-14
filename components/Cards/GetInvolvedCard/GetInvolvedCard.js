import React, { useState } from 'react';
import GetInvolvedForm from '../../Forms/GetInvolvedForm/GetInvolvedForm';
import styles from './GetInvolvedCard.module.css';
import Link from 'next/link';
import { getInvolvedText } from '../../TextArrays';

const GetInvolvedCard = ({ id, text, title, btn }) => {
  const [reactKey, setReactKey] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.num}>
          {id}
        </div>
        <p className={styles.head}>{title}</p>
        <p className={styles.body}>{text}{id === 3 ? <br /> : null}{id === 3 ? getInvolvedText.text[3] : null}</p>
        <Link href={id === 1 ? 'https://twitter.com/nfssmalliance?lang=en' : ''}><a target={id === 1 ? "_blank" : ""}><div
          className={styles.btn}
          data-modal="myModal1"
          onClick={() => {
            id === 1 ? null : document.querySelector('.modal2').style.display = "flex";
          }}
        >{btn}</div></a></Link>
      </div>

      <div id="myModal1" className='modal2'>
        <div
          className={styles.bg}
          onClick={() => {
            document.querySelector('.modal2').style.display = "none";
            document.getElementById('user-cat').style.display = 'none';
            setReactKey(!reactKey);
          }}>
        </div>
        <div className={styles.modal_content}>
          <div
            className={styles.close}
            onClick={() => {
              document.querySelector('.modal2').style.display = "none";
              document.getElementById('user-cat').style.display = 'none';
              setReactKey(!reactKey);
            }}
          ><span>x</span></div>
          <div className={styles.modal_header}>
            <h2>Tell us more about yourself</h2>
          </div>

          <div className={styles.form}>
            <GetInvolvedForm key={reactKey} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GetInvolvedCard