import React, { useState } from 'react';
import styles from './GetInvolvedForm.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../../Buttons/Submit/SubmitButton';
import { postFormData } from '../../../services/getInvolvedService';

const GetInvolvedForm = () => {
  const [error, setError] = useState(false);
  const handleError = (err) => {
    console.log({ e: err })

  }

  const handleSubmit = (data) => {
    postFormData(data, (err, res) => {
      if (err) return handleError(err);
      if (res !== null) {
        console.log({ r: res.data })
        alert('Successfully Received!')
      }
    })
  }

  return (
    <>
      <div className={styles.container}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            shortNote: '',
            join_NFSSM: false,
            know_more: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required('Required')
              .email('Invalid email address')
              .test('is email valid?', 'Invalid email address', (val) => {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
              }),
            name: Yup.string()
              .required('Required')
              .min(3, '3 or more characters')
              .test('is name a letter?', 'Name must consist of letters only', (val) => {
                return /^(?![\s.]+$)[a-zA-Z\s.]*$/.test(val);
              }),
            shortNote: Yup.string()
              .required('Required')
              .min(10, 'Must be 10 characters minimum'),
          })}
          onSubmit={(data, actions) => {
            let categories = [];
            data.join_NFSSM ? categories.push({ userCat: 1 }) : null;
            data.know_more ? categories.push({ userCat: 2 }) : null;

            if (categories.length) {
              document.getElementById('user-cat').style.display = 'none';
            } else {
              document.getElementById('user-cat').style.display = 'block';
              setError(true);
              return;
            }

            document.querySelector('.modal2').style.display = "none";
            handleSubmit(data);
            actions.resetForm();
          }}
        >
          <Form>
            <div className={styles.textInput}>
              <label htmlFor="name">Name</label>
              <Field name="name" id='name' className={styles.input} placeholder='Name' type="text" />
              <span className='form-error'><ErrorMessage name="name" /></span>
            </div>

            <div className={styles.textInput}>
              <label htmlFor="email">Email</label>
              <Field name="email" id='email' className={styles.input} placeholder='Email' type="email" />
              <span className='form-error'><ErrorMessage name="email" /></span>
            </div>

            <p className={styles.instruction}>How do you wish to get involved?</p>

            <div>
              <div className={styles.row}>
                <div>
                  <Field name='join_NFSSM' id='join_NFSSM' type='checkbox' className={styles.checkbox} />
                  <label htmlFor="join_NFSSM">Join the NFSSM Alliance</label>
                </div>
                <div>
                  <Field name='know_more' id='know_more' type='checkbox' className={styles.checkbox} />
                  <label htmlFor="know_more">Know more about FSSM</label>
                </div>
              </div>
              {error ? <p className={styles.error}>You must select at least 1 category</p> : ""}

              <div className={styles.text_cont}>
                <Field name="shortNote" id='shortNote' className={styles.textarea} cols="30" rows="7" placeholder='Short note on how you wish to get involved (Less than 150 words)' as='textarea' />
                <span className='form-error'><ErrorMessage name="shortNote" /></span>
              </div>
            </div>
            <span id='user-cat' className="form-error none">You must select at least 1 category</span>


            <div className={styles.btn_cont}>
              <SubmitButton type='submit' style={styles.btn} title='Submit' />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  )
}

export default GetInvolvedForm