import React, { useState } from 'react';
import styles from './HomePageTopSection.module.css';
import SubmitButton from '../../Buttons/Submit/SubmitButton';
import Card from '../../Cards/RepositoryCard/RepositoryCard';
import { homePageText } from '../../TextArrays';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, InputAdornment } from '@mui/material';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const HomePageTopSection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useRouter();

  const route = (path) => {
    navigate.push(`/${path}`);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card_cont}>
          <div className={styles.card}>
            <div className={styles.sub_heading}>
              <h2>{homePageText.sub_title1}</h2>
              <p>{homePageText.sub_title5}</p>
            </div>
            <div className={styles.card_1}>
              <div className={styles.input_cont}>
                {/* <div>
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    className={styles.input}
                  >
                    Search FSSM Docs
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      Duplicate
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      Archive
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      More
                    </MenuItem>
                  </StyledMenu>
                </div> */}
                <select defaultValue='' className={`${styles.input} form-select`} aria-label="Default select example">
                  <option hidden value=''>Search FSSM Docs</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className={styles.btn_cont}>
                <SubmitButton
                  title='Search'
                  style={styles.btn}
                  onClick={() => { route('googlesearch') }}
                />
                <SubmitButton
                  title='Advanced search'
                  style={styles.btn}
                  onClick={() => { route('advancedsearch'); }}
                />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.sub_heading}>
              <h2>{homePageText.sub_title2}</h2>
              <p>{homePageText.sub_title3}</p>
            </div>
            <div className={styles.card_2}>
              <div className={styles.card_4}>
                {homePageText.repository.map(({ title, id }) => {
                  return (
                    <span key={id}>
                      {id !== 10 && <Card id={id} text={title} />}
                    </span>
                  )
                })}
              </div>
              <div>
                <div>
                  <Card id={homePageText.repository[6].id} text={homePageText.repository[6].title} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.sub_heading}>
              <h2>{homePageText.sub_title4}</h2>
              <p>{homePageText.sub_title6}</p>
            </div>
            <div className={styles.card_3}>
              <Link href='/qanda'><a>
                <SubmitButton
                  style={styles.btn2}
                  title='Ask Question'
                />
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePageTopSection