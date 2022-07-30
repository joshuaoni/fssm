import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../Buttons/Submit/SubmitButton';
import styles from './FaqNavigation.module.css';
import { downloadPDF } from '../../../services/faqAndGlossaryService';
import FileDownload from 'js-file-download';

const FaqNavigation = () => {
  const [error, setError] = useState(null);

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

  const handleError = (err) => {
    console.log(err);  // error 404
    setError(err.response.statusText);
  }

  const handleDownload = () => {
    var id = router.pathname.slice(1);

    if (id === 'faq') {
      downloadPDF('quespdf/', (err, res) => {
        if (err) return handleError(err);
        if (res !== null) {
          console.log(res);
          FileDownload(response.data, 'faqs.pdf');
        }
      })
    } else {
      downloadPDF('glospdf/', (err, res) => {
        if (err) return handleError(err);
        if (res !== null) {
          console.log(res);
          FileDownload(response.data, 'glossary.pdf')
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
        <Button
          title='PDF Download'
          style={styles.btn}
          onClick={() => {
            handleDownload();
          }}
        />
      </div>
    </>
  )
}

export default FaqNavigation 