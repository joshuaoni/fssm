import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../Buttons/Submit/SubmitButton';
import styles from './FaqNavigation.module.css';
import { downloadPDF } from '../../../services/faqAndGlossaryService';
import FileDownload from 'js-file-download';
import CircularProgress from '@mui/material/CircularProgress';

const FaqNavigation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    var id = router.pathname.slice(1);
    var faq = document.getElementById('faq-btn');
    var glossary = document.getElementById('glossary-btn');
    id === 'faq' ? faq.classList.add('onroute') : glossary.classList.add('onroute');
  }, [router])

  const navigate = (id) => {
    id === 2 ? router.push('/glossary') : router.push('/faq');
  }

  const handleError = () => {
    setLoading(false);
    setError(true);
  }

  const handleDownload = () => {
    var id = router.pathname.slice(1);

    if (id === 'faq') {
      downloadPDF('faqpdf/', (err, res) => {
        if (err) return handleError();
        if (res !== null) {
          setLoading(false);
          setError(false);
          FileDownload(res.data, 'FAQ.pdf');
        }
      })
    } else {
      downloadPDF('glossarypdf/', (err, res) => {
        if (err) return handleError(err);
        if (res !== null) {
          setLoading(false);
          setError(false);
          FileDownload(res.data, 'Glossary.pdf')
        }
      })
    }
  }

  return (
    <>
      <div className={styles.cont}>
        <div>
          <p
            id='faq-btn'
            onClick={() => {
              navigate(1);
            }}
          >FAQ&apos;s
          </p>
          <p
            id='glossary-btn'
            onClick={() => {
              navigate(2);
            }}
          >Glossary
          </p>
        </div>
        {loading ?
          <div className={styles.justify_center}><CircularProgress /></div> :
          <Button
            className="pdf-download"
            title='PDF Download'
            style={styles.btn}
            onClick={() => {
              setLoading(true);
              handleDownload();
            }}
          />}
        <span className="error">{error ? 'An error occured' : null}</span>
      </div>
    </>
  )
}

export default FaqNavigation

// env added