import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select, Switch } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Image from 'next/image';
import close from '../../../assets/Close.png';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import styles from "./GetInvolved.module.css"
import { getData, delData } from '../../../services/adminGetInvolvedService';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination } from '@mui/material';

const GetInvolved = () => {
  const [number, setNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [nPages, setNPages] = useState(1);
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [dateArray2, setDateArray2] = useState([]);
  const [current, setCurrent] = useState({
    name: '',
    email: '',
    know_more: '',
    join_NFSSM: '',
    id: '',
    shortNote: ''
  })

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  useEffect(() => {
    const indexOfLastRecord = currentPage * number;
    const indexOfFirstRecord = indexOfLastRecord - number;
    const records = documents.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(records);
    const pageCount = Math.ceil(documents.length / number);
    setNPages(pageCount);
  }, [currentPage, documents, number])

  const handleError = (err) => {
    setLoading(false);
    console.log({ e: err });
  }

  useEffect(() => {
    getData((err, res) => {
      if (err) return handleError(err)
      if (res !== null) {
        setLoading(false);
        console.log(res)
        setDocuments(res.data['getInvoled Data']);
        //     const data = res.data['getInvoled Data'];
        // let date = [];
        // data.forEach(item => {
        //   date.push([]);
        // })
        // data.forEach(({ createdOn }, i) => {
        //   const month = createdOn.slice(5, 7);
        //   const day = createdOn.slice(8, 10);
        //   const year = createdOn.slice(0, 4);
        //   const hour = createdOn.slice(11, 13);
        //   const min = createdOn.slice(14, 16);
        //   date[i] = `${year}-${month}-${day} ${hour}:${min} ${hour >= 12 ? 'PM' : 'AM'}`;
        // })
        // setDateArray2(date);
      }
    })
  }, [update])

  const handleDelete = () => {
    delData(docId, (err, res) => {
      if (err) return handleError(err)
      if (res !== null) {
        if (res.data.message === 'Deleted') {
          alert('Deleted Successfully');
          setLoading(true);
          setUpdate(!update);
        }
      }
    })
  }

  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.label2}>Get Involved</h4>
        {loading ?
          <div className={styles.justify_center}><CircularProgress /></div> :
          <>
            <div className={styles.controlCont}>
              <div className={styles.control}>
                <div>
                  <p>Show</p>
                  <FormControl sx={{ m: 1, width: 55 }} size="small">
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={number}
                      className={styles.select}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                  <p>entries</p>
                </div>
              </div>
              <div className={styles.search}>
                <p>Search:</p>
                <input type="text" name="" id="" />
              </div>
            </div>

            <div className={styles.cont}>
              <div className={styles.heading}>
                <div className={styles.one}>
                  <p>S.NO</p>
                </div>
                <div className={styles.two}>
                  <p>Name</p>
                </div>
                <div className={styles.two}>
                  <p>Email</p>
                </div>
                <div className={styles.two}>
                  <p>Join NFSSM</p>
                </div>
                <div className={styles.two}>
                  <p>Know about FSM</p>
                </div>
                <div className={styles.two}>
                  <p>Created on</p>
                </div>
                <div className={styles.two}>
                  <p>Action</p>
                </div>
              </div>
              {
                currentRecords.map(({ id, name, email, join_NFSSM, know_more, shortNote }, i) => {
                  return (
                    <div key={id} className={i % 2 !== 0 ? styles.row : styles.row2}>
                      <div className={styles.one}>
                        <p>{i + 1 + number * (currentPage - 1)}</p>
                      </div>
                      <div className={styles.two}>
                        <p>{name}</p>
                      </div>
                      <div className={styles.two}>
                        <p>{email}</p>
                      </div>
                      <div className={styles.two}>
                        <p>{join_NFSSM ? 'Yes' : 'No'}</p>
                      </div>
                      <div className={styles.two}>
                        <p>{know_more ? 'Yes' : 'No'}</p>
                      </div>
                      <div className={styles.two}>
                        <p>date</p>
                      </div>
                      <div className={styles.two}>
                        <div className={styles.two}>
                          <div
                            title="View Question"
                            className={`${styles.btn} ${styles.editbtn}`}
                            data-modal="myModal"
                            onClick={() => {
                              setCurrent({
                                name: name,
                                know_more: know_more,
                                join_NFSSM: join_NFSSM,
                                email: email,
                                id: id,
                                shortNote: shortNote
                              })
                              document.querySelector(".m7").style.display = "flex";
                            }}
                          >
                            <RemoveRedEyeOutlinedIcon
                              sx={{ height: "14px", width: "14px" }}
                            />
                          </div>
                        </div>
                        <div
                          title='Delete User Profile'
                          className={`${styles.btn} ${styles.delbtn}`}
                          onClick={() => {
                            setDocId(id);
                            document.querySelector('.m10').style.display = "flex";
                          }}>
                          <DeleteOutlineOutlinedIcon sx={{ color: '#e95454', height: '15px', width: '15px' }} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>
        }
      </div>
      <p className={styles.results}>Showing {number} of {documents.length} entries</p>
      <Pagination
        count={nPages}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        color='primary'
        onChange={(e, val) => {
          setCurrentPage(val);
        }} />

      <div id="myModal" className='modal2 m10'>
        <div
          className={styles.bg}
          onClick={() => {
            document.querySelector('.m10').style.display = "none";
          }}>
        </div>
        <div className={styles.modal_content2}>
          <div
            className={styles.deleteRecordHeading}
            onClick={() => {
              document.querySelector('.m10').style.display = "none";
            }}
          >
            <p>Attention !!</p>
            <span><Image src={close} alt='icon' height={24} width={24} /></span>
          </div>

          <div>
            <p className={styles.deleteRecord}>
              Do You want to delete this records?
            </p>
            <button
              className={styles.btn3} onClick={() => {
                handleDelete();
                document.querySelector('.m10').style.display = "none";
              }}>Ok</button>
          </div>
        </div>
      </div>

      <div id="myModal" className='modal2 m7'>
        <div
          className={styles.bg}
          onClick={() => {
            document.querySelector('.m7').style.display = "none";
          }}>
        </div>
        <div className={styles.modal_content}>
          <div
            className={styles.close}
            onClick={() => {
              document.querySelector('.m7').style.display = "none";
            }}
          >
            <p>View Get Involved</p>
            <span><Image src={close} alt='icon' height={24} width={24} /></span>
          </div>
          {/* View Question Modal Content */}
          <div className={styles.cover}>
            <div className={styles.content}>
              <h4 className={styles.label4}>View Details</h4>
              <div className={styles.questionDetails}>
                <div className={styles.questionHeading}>
                  <p>Name</p>
                </div>
                <div className={styles.questionBody}>
                  <p>:{current.name}</p>
                </div>
              </div>
              <div className={styles.questionDetails}>
                <div className={styles.questionHeading}>
                  <p>Email</p>
                </div>
                <div className={styles.questionBody}>
                  <p>:{current.email}</p>
                </div>
              </div>
              <div className={styles.questionDetails}>
                <div className={styles.questionHeading}>
                  <p>Join FSSM</p>
                </div>
                <div className={styles.questionBody}>
                  <p>:{current.join_NFSSM === true ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className={styles.questionDetails}>
                <div className={styles.questionHeading}>
                  <p>Know about FSSM</p>
                </div>
                <div className={styles.questionBody}>
                  <p>:{current.know_more === true ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className={styles.questionDetails}>
                <div className={styles.questionHeading}>
                  <p>Short Notes</p>
                </div>
                <div className={styles.questionBody}>
                  <p>:{current.shortNote}</p>
                </div>
              </div>
              <div className={styles.questionDetails}>
                <div className={styles.questionHeading}>
                  <p>Creator on</p>
                </div>
                <div className={styles.questionBody}>
                  <p>:date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetInvolved;