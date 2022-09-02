import React, { useState } from 'react';
import styles from './GoogleSearch.module.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const GoogleSearch = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  }

  // const handleSubmit=()=>{

  // }

  return (
    <>
      <h1 className={styles.title}>About</h1>
      <div className={styles.container}>
        <section>
          <div className={styles.form}>
            <FormControl variant="outlined" className={styles.input}>
              <OutlinedInput
                value={text}
                onChange={handleChange}
                endAdornment={
                  text.length ?
                    <InputAdornment className={styles.close} position="end">
                      <IconButton
                        onClick={() => {
                          setText('');
                        }}
                        edge="end"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment> :
                    null
                }
              />
            </FormControl>

            <div
              className={styles.btn}
              onClick={() => {
                handleSubmit();
              }}
            >
              <SearchIcon style={{ color: 'white' }} />
            </div>

            <Link href='/advancedsearch'><a><div className={styles.btn2}>Advanced Search</div></a></Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default GoogleSearch