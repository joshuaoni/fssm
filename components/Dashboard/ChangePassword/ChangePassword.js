import React, { useState } from 'react';
import styles from './ChangePassword.module.css';
import { useRouter } from 'next/router';
import { changePass } from '../../../services/authService';
import AlertCard from '../AlertCard/AlertCard';

const ChangePassword = () => {
  const [passErr, setPassErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useRouter();

  const handleNav = () => {
    navigate.back();
  }

  const handleError = (err) => {
    console.log({ e: err })
  }

  const handleSubmit = (e) => {
    setPassErr("");
    e.preventDefault();
    const pass = e.target.pass.value;
    const confirmPass = e.target.confirmPass.value;
    if (pass === confirmPass) {
      changePass(
        {
          newpass: pass,
          confirmpass: confirmPass
        },
        (err, res) => {
          if (err) return handleError(err)
          if (res !== null) {
            e.target.pass.value = "";
            e.target.confirmPass.value = "";
            if (res.data.message === 'Password updated successfully') {
              setMessage('Password updated successfully');
              document ? document.querySelector('.m15').style.display = 'flex' : null;
            }
          }
        });
    }
    else {
      setPassErr("Passwords do not match");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.label2}>Change Password</h4>
        <form
          className={styles.cont}
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <div className={styles.inputCont1}>
            <label htmlFor="pass">New Password</label>
            <input
              name='pass'
              required
              id="pass"
              minLength="6"
              maxLength="20" c
              className={styles.input}
              type="password"
              placeholder='New Password'
            />
          </div>
          <div className={styles.inputCont2}>
            <div>
              <label htmlFor="confirm">Confirm Password</label>
              <input
                name='confirmPass'
                required
                id="confirm"
                minLength="6"
                maxLength="20"
                className={styles.input}
                type="password"
                placeholder='Confirm Password' />
            </div>
            <p className={styles.error}>{passErr}</p>
          </div>
          <div className={styles.btn_cont}>
            <button
              type='submit'
              className={`${styles.btn} ${styles.submit}`}>
              Submit
            </button>
            <span
              className={`${styles.btn} ${styles.cancel}`}
              onClick={() => {
                handleNav();
              }}>
              Cancel
            </span>
          </div>
        </form>
      </div>
      <AlertCard message={message} />
    </>
  )
}

export default ChangePassword