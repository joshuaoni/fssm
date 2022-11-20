import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Pagination, Select } from '@mui/material';
import styles from './UserCategoriesList.module.css';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Image from 'next/image';
import close from '../../../assets/Close.png';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { editUserProfile, delUserProfile } from '../../../services/userCatServices';
import DeletePopup from '../DeletePopup/DeletePopup';
import MapSection from '../MapSection/MapSection';

const UserCategoriesList = ({ setMessage, loading2, setLoading2, update, setUpdate, profiles, setAction, action, setLoading, addItemsText }) => {
  const [number, setNumber] = useState(10);
  const [docId, setDocId] = useState(null);
  const [list, setList] = useState(profiles);
  const [index, setIndex] = useState(0);
  const [updated, setUpdated] = useState([]);
  const [current, setCurrent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [nPages, setNPages] = useState(1);

  useEffect(() => {
    const indexOfLastRecord = currentPage * number;
    const indexOfFirstRecord = indexOfLastRecord - number;
    const records = list.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(records);
    const pageCount = Math.ceil(list.length / number);
    setNPages(pageCount);
  }, [currentPage, list, number])

  const handleClick = (profile) => {
    const newState = addItemsText.filter(({ title }) => {
      return title === profile;
    })
    setCurrent(newState);
  }

  useEffect(() => {
    const newState = addItemsText.filter(({ title }) => {
      return title === userProfile;
    })
    setCurrent(newState);
  }, [addItemsText])

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  useState(() => {
    setList(profiles);
  }, [profiles])

  const handleSubmit = (values, confirmation) => {
    console.log({ values })
    editUserProfile(docId, values, (err, res) => {
      if (err) return handleError(err)
      if (res !== null) {
        console.log({ res: res.data.message });
        if (res.data.message === 'Updated Successfully') {
          setMessage('Updated Successfully');
          confirmation.style.display = 'flex';
          setLoading(true);
          setAction(!action);
        }
      }
    })
  }

  const handleDelete = (id, confirmation) => {
    delUserProfile(id, (err, res) => {
      if (err) return handleError(err)
      if (res !== null) {
        console.log({ res: res.data.message });
        if (res.data.message === 'Delete Successfully') {
          confirmation.style.display = 'flex';
        }
      }
    })
  }

  useEffect(() => {
    list.length && document.getElementById('span-click').click();
  }, [updated])

  const handleValues = (setFieldValue) => {
    setFieldValue('user_profile', list[index].user_profile);
    setFieldValue('display_order', list[index].display_order);
    setFieldValue('is_hidden', list[index].is_hidden);
  }

  return (
    <>
      {list.length ? <div className={styles.container}>
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

        <div className={styles.cont}>
          <div className={styles.heading}>
            <div className={styles.one}>
              <p>S.NO</p>
            </div>
            <div className={styles.two}>
              <p>User Profile</p>
            </div>
            <div className={styles.two}>
              <p>Display</p>
            </div>
            <div className={styles.two}>
              <p>Display Order</p>
            </div>
            <div className={styles.two}>
              <p>Action</p>
            </div>
          </div>
          {currentRecords.map(({ id, user_profile, display_order, is_hidden }, i) => {
            return (
              <div key={id} className={i % 2 !== 0 ? styles.row : styles.row2}>
                <div className={styles.one}>
                  <p>{i + 1}</p>
                </div>
                <div className={styles.two}>
                  <p>{user_profile}</p>
                </div>
                <div className={styles.two}>
                  <p>{is_hidden ? 'Hide' : 'Show'}</p>
                </div>
                <div className={styles.two}>
                  <p>{display_order}</p>
                </div>
                <div className={styles.two}>
                  <div
                    className={`${styles.btn} ${styles.addbtn}`}
                    title="Add Items"
                    data-modal="myModal"
                    onClick={() => {
                      setUserProfile(user_profile);
                      handleClick(user_profile);
                      document.querySelector('.m8').style.display = "flex";
                    }}>
                    <AddOutlinedIcon sx={{ color: '#024c73', height: '12px', width: '12px' }} />
                  </div>
                  <div
                    title='Edit User Profile'
                    className={`${styles.btn} ${styles.editbtn}`}
                    data-modal="myModal"
                    onClick={() => {
                      setDocId(id);
                      setIndex(i);
                      setUpdated(!updated);
                      document.querySelector('.m7').style.display = "flex";
                    }}>
                    <CheckBoxOutlinedIcon sx={{ height: '15px', width: '15px' }} />
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
      </div> : null}
      <p className={styles.results}>Showing {list?.length} of {number} enties</p>
      <Pagination
        count={nPages}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        color='primary'
        onChange={(e, val) => {
          setCurrentPage(val);
        }} />

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
            <p>Edit User Profile</p>
            <span><Image src={close} alt='icon' height={24} width={24} /></span>
          </div>

          <div className={styles.cover}>
            <div className={styles.content}>
              <Formik
                initialValues={{ user_profile: '', is_hidden: false, display_order: '' }}
                validationSchema={Yup.object({
                  user_profile: Yup.string()
                    .required('Required')
                  // .test('is value valid?', 'Characters must consist of letters only', (val) => {
                  //   return /^(?![\s.]+$)[a-zA-Z\s.]*$/.test(val);
                  // })
                  // .min(4, '4 or more characters')
                  ,
                  display_order: Yup.string()
                    .required('Required')
                    .test('is value a number?', 'Display order must be a number', (val) => {
                      return !isNaN(val);
                    }),
                })}
                onSubmit={(values, actions) => {
                  handleSubmit({ ...values, display_order: Number(values.display_order) }, document.querySelector('.m15'));
                  actions.resetForm();
                  document.querySelector('.m7').style.display = "none";
                }}
              >
                {({ resetForm, setFieldValue, values }) => (
                  <Form>
                    <div className={styles.textInput2}>
                      <label htmlFor="user_profile">User Profile <span>*</span></label>
                      <Field name="user_profile" id='user_profile' className={styles.input} type="text" />
                      <span className='form-error'><ErrorMessage name="user_profile" /></span>
                    </div>

                    <div className={styles.textInput2}>
                      <label htmlFor="is_hidden">Display</label>
                      <Field name='is_hidden' as='select' id='is_hidden' onChange={() => { setFieldValue('is_hidden', !values.is_hidden) }} className={`${styles.select2} ${styles.form_select} form-select`}>
                        <option hidden value=''>--Select--</option>
                        <option value={false}>Show</option>
                        <option value={true}>Hide</option>
                      </Field>
                    </div>

                    <div className={styles.textInput2}>
                      <label htmlFor="display_order">Display Order <span>*</span></label>
                      <Field name="display_order" id='display_order' className={styles.input} type="text" />
                      <span className='form-error'><ErrorMessage name="display_order" /></span>
                    </div>

                    <div className={styles.btn_cont}>
                      <button type='submit' className={`${styles.btn3} ${styles.save}`}>Save</button>
                      <button
                        className={`${styles.btn3} ${styles.cancel}`}
                        type='reset'
                        onClick={() => {
                          resetForm();
                          document.querySelector('.m7').style.display = "none";
                        }}>
                        Cancel
                      </button>
                    </div>
                    <span id='span-click' onClick={() => { handleValues(setFieldValue) }}></span>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <MapSection
        loading2={loading2}
        setLoading2={setLoading2}
        update={update}
        setUpdate={setUpdate}
        addItemsText={current}
      />

      <DeletePopup setLoading={setLoading} action={action} setAction={setAction} docId={docId} handleDelete={handleDelete} />
    </>
  )
}

export default UserCategoriesList