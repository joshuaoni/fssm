import React, { useState } from 'react';
import styles from './TenderCard.module.css';
import pdf from '../../../assets/pdf.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

const TenderCard = ({ searchData, theme, id, urban_rural, org, document_type, expiry_date, citation, description, title, value_chain, keywords, language, stake_holder, geography }) => {
  const [clicked, setClicked] = useState(true);

  const router = useRouter();
  const { subitem } = router.query;


  const dropDown = (e, s, u) => {
    if (e.classList.contains("active-dropdown")) {
      e.style.maxHeight = 0;
      e.classList.remove("active-dropdown");
      // u.style.display = 'block';
      s.style.justifyContent = 'space-between'
    } else {
      e.style.maxHeight = 'max-content';
      e.classList.add("active-dropdown");
      // u.style.display = 'none';
      s.style.justifyContent = 'flex-end'
    }
  }

  const handleNav = () => {
    router.pathname === '/knowledgedata' ?
      router.push(`/knowledgedatadownload?id=${id}&category=${router.query.category}&subitem=${subitem}&title=${router.query.title}`) :
      router.pathname === '/advancedsearch' ?
        router.push(`/tenderdownload?stakeholder=${searchData.stakeholder}&value_chain=${searchData.value_chain}&state=${searchData.state}&language=${searchData.language}&partner=${searchData.partner}&words=${searchData.words}&theme=${searchData.theme}&status=${searchData.status}&page=${'Advanced Search'}&id=${id}`) :
        router.push(`/tenderdownload?page=${'Tenders'}&id=${id}`);
  }

  return (
    <>
      <div className={styles.container}>
        <div></div>
        <div className={styles.avatar}>
          <Image width={75} height={80} src={pdf} alt='pdf icon' />
          <p className={`${styles.title} ${styles.title2}`}>{title}</p>
        </div>
        <div className={styles.main}>
          <div className={styles.top}>
            <p className={`${styles.title} ${styles.title3}`}>{title}</p>
            <button className={styles.btn} onClick={() => { handleNav(); }}>View Document</button>
          </div>
          <div className={styles.useContainer}>
            <div className={styles.useCont}>
              <p className={styles.body}>{description}</p>
              <div className={styles.use_case}>
                <p className={styles.head}>Use cases / Application</p>
                <p>This document can be used by relevant stakeholders to
                  compare different technologies in India with respect to -
                  features, performance, application, O&M, challenges & costing</p>
              </div>
            </div>
            <div id='show-btn' className={styles.show_btn}>
              <p
                className={`${clicked === true ? styles.drop_btn : styles.title2}`}
                onClick={() => {
                  dropDown(document.getElementById('drop' + `${id}`), document.getElementById('show-btn'), document.getElementById('use-case'));
                  setClicked(!clicked);
                }}
              >{clicked ? 'Show More...' : 'Show Less...'}</p>
            </div>
          </div>

          <div id={'drop' + `${id}`} className='dropdown-content2'>
            <div className={styles.description}>
              <div className={styles.row}>
                <div>
                  <p className={styles.top_p}>Citation </p><span>: {citation}</span>
                </div>
                {expiry_date ? <div>
                  <p className={styles.top_p}>Expiry Date </p><span>: {expiry_date.replaceAll('-', '/')}</span>
                </div> : null}
              </div>

              <div className={styles.row}>
                <div>
                  <p>Uploaded By </p><span>: {org}</span>
                </div>
                <div>
                  <p>Theme </p><span>: {theme}</span>
                </div>
              </div>

              <div className={styles.row}>
                <div>
                  <p>Stakeholder </p>
                  <span>
                    : {
                      stake_holder.map(({ stake_holderName }) => {
                        return stake_holderName + ', ';
                      })
                    }
                  </span>
                </div>
                <div>
                  <p>Value Chain </p>
                  <span>
                    : {
                      value_chain.map(({ vc_name }) => {
                        return vc_name + ', ';
                      })
                    }
                  </span>
                </div>
              </div>

              <div className={styles.row}>
                <div>
                  <p>Geography </p><span>: {geography}</span>
                </div>
                <div>
                  <p>Urban / Rural </p><span>: {urban_rural}</span>
                </div>
              </div>

              <div className={styles.row}>
                <div>
                  <p>Language </p>
                  <span>
                    : {
                      language.map(({ lang }) => {
                        return lang + ', ';
                      })
                    }
                  </span>
                </div>
              </div>

              <div className={styles.row}>
                <div>
                  <p>Keywords </p>
                  <span>
                    :  {
                      keywords.map(({ keyword }) => {
                        return keyword + ', ';
                      })
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div id='show-btn' className={styles.show_btn}>
            <p
              className={`${clicked === false ? styles.drop_btn : styles.title2}`}
              onClick={() => {
                dropDown(document.getElementById('drop' + `${id}`), document.getElementById('show-btn'), document.getElementById('use-case'));
                setClicked(!clicked);
              }}
            >{clicked ? 'Show More...' : 'Show Less...'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TenderCard