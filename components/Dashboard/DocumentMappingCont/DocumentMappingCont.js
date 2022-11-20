import React, { useEffect, useState } from 'react';
import styles from './DocumentMappingCont.module.css';
import close from '../../../assets/Close.png';
import Image from 'next/image';
import MappingForm from '../../Forms/MappingForm/MappingForm';
import { getUnmappedDocs, deleteDocs } from '../../../services/documentMappingService';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import AlertCard from '../AlertCard/AlertCard';
import pdf from "../../../assets/pdf.png"

const DocumentMappingCont = () => {
  const [unmapped, setUnmapped] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateArray, setDateArray] = useState([]);
  const [docId, setDocId] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleError = (err) => {
    setLoading(false);
    console.log({ e: err })
    setError(err.message);
  }

  useEffect(() => {
    getUnmappedDocs((err, res) => {
      // if (err) return handleError(err)
      if (res !== null) {
        setLoading(false);
        console.log({ r: res })
        setUnmapped(res.data);
        const data = res.data;
        let date = [];
        data.forEach(item => {
          date.push([]);
        })
        data.forEach(({ createdOn }, i) => {
          const month = createdOn.slice(5, 7);
          const day = createdOn.slice(8, 10);
          const year = createdOn.slice(0, 4);
          const hour = createdOn.slice(11, 13);
          const min = createdOn.slice(14, 16);
          date[i] = `${year}-${month}-${day} ${hour}:${min} ${hour >= 12 ? 'PM' : 'AM'}`;
        })
        setDateArray(date);
      }
    });
  }, [])

  const handleDelete = (id, confirmation) => {
    deleteDocs(id, (err, res) => {
      if (err) return handleError(err)
      if (res !== null) {
        setLoading(false);
        console.log({ r: res.data.message })
        if (res.data.message === 'Document has been deleted') {
          confirmation.style.display = "flex";
        }
      }
    })
  }

  const handleRefresh = () => {
    router.reload(window.location.pathname);
  }

  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.label}>Documents Mapping</h4>

        <h4 className={styles.label2}>Unmapped Documents</h4>
        {loading ?
          <div className={styles.justify_center}><CircularProgress /></div> :
          error ?
            <span className={`${styles.justify_center} error`}>{error}</span> :
            <section>
              <div className={styles.cont}>
                <div className={styles.heading}>
                  <div className={styles.one}>
                    <p>S.NO</p>
                  </div>
                  <div className={styles.two}>
                    <p>Thumbnail</p>
                  </div>
                  <div className={styles.three}>
                    <p>Document Name</p>
                  </div>
                  <div className={styles.four}>
                    <p>Created Date</p>
                  </div>
                  <div className={styles.five}>
                    <p>Action</p>
                  </div>
                </div>

                {
                  unmapped.map(({ attachment, id }, i) => {
                    return (
                      <div key={id} className={i % 2 !== 0 ? styles.row : styles.row2}>
                        <div className={styles.one}>
                          <p>{i + 1}</p>
                        </div>
                        <div className={styles.two}>
                          <div>
                            <Image
                              src={pdf}
                              alt="Picture of pdf"
                              width={47}
                              height={54} />
                          </div>
                        </div>
                        <div className={styles.three}>
                          <p>{attachment?.replaceAll('_', ' ').trim().split("/").pop()}</p>
                        </div>
                        <div className={styles.four}>
                          <p>{dateArray[i]}</p>
                        </div>
                        <div className={styles.five}>
                          <button
                            className={`${styles.btn} ${styles.mapbtn}`}
                            data-modal="myModal1"
                            onClick={() => {
                              setDocId(id);
                              document.querySelector('.m4').style.display = "flex";
                            }}
                          >
                            Map
                          </button>
                          <a href={`https://swacchfssm.herokuapp.com${attachment}`} rel="noreferrer" target="_blank"><span
                            className={`${styles.btn} ${styles.viewbtn}`}>
                            View
                          </span></a>
                          <button
                            onClick={() => {
                              setDocId(id);
                              document.querySelector('.m10').style.display = "flex";
                            }}
                            className={`${styles.btn} ${styles.delbtn}`}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </section>
        }
      </div>

      <div id="myModal1" className='modal2 m4'>
        <div
          className={styles.bg}
          onClick={() => {
            document.querySelector('.m4').style.display = "none";
          }}>
        </div>
        <div className={styles.modal_content}>
          <div
            className={styles.close}
            onClick={() => {
              document.querySelector('.m4').style.display = "none";
            }}
          >
            <p>Documents Mapping</p>
            <span><Image src={close} alt='icon' height={24} width={24} /></span>
          </div>

          <div className={styles.form}>
            <MappingForm docId={docId} modal='m4' />
          </div>
        </div>
      </div>

      <div id="myModal" className='modal2 m10'>
        <div
          className={styles.bg}
          onClick={() => {
            document.querySelector('.m10').style.display = "none";
          }}>
        </div>
        <div className={styles.modal_content2}>
          <div
            className={styles.close}
            onClick={() => {
              document.querySelector('.m10').style.display = "none";
            }}
          >
            <p>Attention !!</p>
            <span><Image src={close} alt='icon' height={24} width={24} /></span>
          </div>

          <div className={styles.cover}>
            <div className={styles.content}>
              Do You want to delete this document?
            </div>
            <div className={styles.btn_cont}>
              <button
                className={`${styles.btn3} ${styles.no}`} onClick={() => {
                  document.querySelector('.m10').style.display = "none";
                }}>No</button>
              <button
                className={`${styles.btn3} ${styles.yes}`}
                onClick={() => {
                  document.querySelector('.m10').style.display = "none";
                  handleDelete(docId, document.querySelector('.m9'));
                }}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="myModal" className='modal2 m9'>
        <div
          className={styles.bg}
          onClick={() => {
            handleRefresh();
            document.querySelector('.m9').style.display = "none";
          }}>
        </div>
        <div className={styles.modal_content2}>
          <div
            className={styles.close}
            onClick={() => {
              handleRefresh();
              document.querySelector('.m9').style.display = "none";
            }}
          >
            <p>Attention !!</p>
            <span><Image src={close} alt='icon' height={24} width={24} /></span>
          </div>

          <div className={styles.cover}>
            <div className={styles.content}>
              Document is deleted successfully.
            </div>
            <div className={styles.ok}>
              <div onClick={() => {
                handleRefresh();
                document.querySelector('.m9').style.display = "none";
              }}>Ok</div>
            </div>
          </div>
        </div>
      </div>

      <AlertCard message='Mapping is Done successfully' />
    </>
  )
}

export default DocumentMappingCont