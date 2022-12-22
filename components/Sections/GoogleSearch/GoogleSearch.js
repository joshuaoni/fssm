import React, { useState } from 'react';
import styles from './GoogleSearch.module.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Image from 'next/image';
import search from '../../../assets/searc.png';
import { useRouter } from 'next/router';

const GoogleSearch = () => {
  const [text, setText] = useState('');
  const router = useRouter()
  const param = router.query.q

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleClear = () => {
    setText("");
  }


  // const handleSubmit=()=>{

  // }

  return (
    <>
      <h1 className={styles.title}>About</h1>
      <div className={styles.container}>
        <section>
          <div className={styles.form}>
            <div className={styles.left}>
              <div className="gcse-searchbox" data-queryparametername="q" data-gname='site-search' />
              {/* <FormControl variant="outlined" className={styles.input}>
                <OutlinedInput
                  value={param}
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
                          <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                      </InputAdornment> :
                      null
                  }
                />
              </FormControl> */}
              {/* <button onClick={handleClear} className={styles.crossBtn}>
                <CloseIcon />
              </button> */}

              {/* <div
                className={styles.btn}
              >
                <Image src={search} height={24} width={24} alt='icon' />
              </div> */}
            </div>

            <Link href='/advancedsearch'><a><div className={styles.btn2}>Advanced Search</div></a></Link>
          </div>
        </section>
        <div className='gcse-searchresults' data-gname='site-search'></div>
      </div>
    </>
  )
}

export default GoogleSearch