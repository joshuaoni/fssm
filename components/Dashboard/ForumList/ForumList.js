import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Pagination, Select } from '@mui/material';
import styles from './ForumList.module.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import close from '../../../assets/Close.png';
import { editTopicApproval, getNotifs, viewComments } from '../../../services/adminForumServices';
import EmailIcon from '@mui/icons-material/Email';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(30px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#2E69AE',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 18 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const ForumList = ({ documents, setUpdated, updated, docId, setMessage, setDocId, reactKey, setUpdate, update, layout }) => {
  const [number, setNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [nPages, setNPages] = useState(1);
  const [search, setSearch] = useState('');
  const [list, setList] = useState(documents);
  const [replies, setReplies] = useState([]);
  const [replyId, setReplyId] = useState('');
  const [dateArray, setDateArray] = useState([]);
  const [dateArray2, setDateArray2] = useState([]);

  useEffect(() => {
    const indexOfLastRecord = currentPage * number;
    const indexOfFirstRecord = indexOfLastRecord - number;
    const records = list.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(records);
    const pageCount = Math.ceil(list.length / number);
    setNPages(pageCount);
  }, [currentPage, list, number])

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleError = (err) => {
    console.log({ e: err });
  }

  const handleSwitch = (id) => {
    editTopicApproval(id, (err, res) => {
      if (err) return handleError(err);
      if (res !== null) {
        console.log({ res });
        if (res.data.message = 'Discussion Topic has been edited') {
          setMessage('Changes Saved!');
          document.querySelector('.m15').style.display = 'flex';
          setUpdate(!update);
        }
      }
    })
  };

  const filterIt = (arr, searchKey) => {
    return arr.filter(obj => {
      return Object.keys(obj).some(key => {
        if (typeof obj[key] === 'string') {
          return obj[key].toLowerCase().trim().includes(searchKey);
        }
      })
    });
  }

  const handleFilter = () => {
    const results = filterIt(documents, search.toLowerCase().trim());
    setList(results);
  }

  useEffect(() => {
    setList(documents);
    const data = documents;
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
    setDateArray2(date);
  }, [documents])

  useEffect(() => {
    handleFilter();
  }, [updated])

  const handleDate = (replies, popup) => {
    let date = [];
    replies.forEach(({ createdOn }) => {
      let month;
      const day = createdOn.slice(8, 10);
      const year = createdOn.slice(0, 4);
      const hour = createdOn.slice(11, 13);
      const min = createdOn.slice(14, 16);
      switch (createdOn.slice(5, 7)) {
        case '01':
          month = 'January';
          break;
        case '02':
          month = 'February';
          break;
        case '03':
          month = 'March';
          break;
        case '04':
          month = 'April';
          break;
        case '05':
          month = 'May';
          break;
        case '06':
          month = 'June';
          break;
        case '07':
          month = 'July';
          break;
        case '08':
          month = 'August';
          break;
        case '09':
          month = 'September';
          break;
        case '10':
          month = 'October';
          break;
        case '11':
          month = 'November';
          break;
        case '12':
          month = 'December';
          break;
        default: ''
          break;
      }
      date.push([`${month} ${day}, ${year}`, `${hour}:${min}`])
    })
    setDateArray(date);
    popup ? popup.style.display = 'flex' : null;
  }

  const handleComment = (popup) => {
    getNotifs((err, res) => {
      if (err) return handleError(err);
      if (res !== null) {
        const result = [res.data["Notification Data For Admin"][0]?.commentRef]
        handleDate(result, popup);
        console.log(result);
        setReplies(result);
      }
    })
  }

  // useEffect(() => {
  //   replies.length && getNotifs((err, res) => {
  //     if (err) return handleError(err);
  //     if (res !== null) {
  //       const result = [res.data["Notification Data For Admin"][0].commentRef]
  //       handleDate(result, null);
  //       console.log(result);
  //       setReplies(result);
  //     }
  //   })
  // }, [updated])


  const handleReplies = (val, popup) => {
    viewComments({ val }, (err, res) => {
      if (err) return handleError(err);
      if (res !== null) {
        console.log(res.data);
        setReplies(res.data['Topic Data'][0].replies);
        handleDate(res.data['Topic Data'][0].replies, popup);
      }
    })
  }

  useEffect(() => {
    replies.length && viewComments({ val: replyId }, (err, res) => {
      if (err) return handleError(err);
      if (res !== null) {
        console.log({ resy: res });
        setReplies(res.data['Topic Data'][0].replies);
        handleDate(res.data['Topic Data'][0].replies, null);
      }
    })
  }, [updated])

  return (
    <>
      <div className={styles.container}>
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

          <div>
            <p>Search : </p>
            <input
              type="text"
              className={styles.input}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setUpdated(!updated);
              }} />
          </div>
        </div>

        <div className={styles.cont}>
          <div className={styles.heading}>
            <div className={styles.one}>
              <p>S.NO</p>
            </div>
            <div className={styles.one}>
              <p>Category Name</p>
            </div>
            <div className={styles.two}>
              <p>Topic Name</p>
            </div>
            <div className={styles.one}>
              <p>Creator Name</p>
            </div>
            <div className={styles.two}>
              <p>Created On</p>
            </div>
            <div className={styles.two}>
              <p>Approve</p>
            </div>
            <div className={styles.two}>
              <p>Actions</p>
            </div>
          </div>
          {currentRecords.length ?
            // layout !== 4 &&
            currentRecords.map(({ creatorName, id, category_id, topic_name, is_approved }, i) => {
              return (
                <div key={id} className={i % 2 !== 0 ? styles.row : styles.row2}>
                  <div className={styles.one}>
                    <p>{i + 1 + number * (currentPage - 1)}</p>
                  </div>
                  <div className={styles.one}>
                    <p> {category_id?.category}</p>
                  </div>
                  <div className={styles.two}>
                    <p> {topic_name}</p>
                  </div>
                  <div className={styles.one}>
                    <p>{creatorName?.first_name}</p>
                  </div>
                  <div className={styles.two}>
                    <p>{dateArray2[i]}</p>
                  </div>
                  <div className={styles.two}>
                    {/* <AntSwitch
                      key={reactKey}
                      checked={layout === 2 ? true : layout === 4 && is_approved ? true : false}
                      onChange={() => { handleSwitch(document.querySelector('.m15'), id); }}
                    /> */}
                    <Switch
                      key={reactKey}
                      checked={is_approved ? true : false}
                      onClick={() => { handleSwitch(id) }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </div>
                  <div className={styles.two}>
                    <div
                      title='Delete'
                      onClick={() => {
                        setDocId(id);
                        document.querySelector('.m10').style.display = "flex";
                      }}
                      className={`${styles.btn} ${styles.delbtn}`}>
                      <DeleteOutlineOutlinedIcon sx={{ color: '#e95454', height: '15px', width: '15px' }} />
                    </div>
                    {layout !== 1 && <div
                      className={`${styles.btn} ${styles.viewbtn}`}
                      title='View Comments'
                      onClick={() => {
                        setDocId(id);
                        setReplyId(id);
                        layout !== 4 && handleReplies(id, document.querySelector('.m'));
                        layout === 4 && handleComment(document.querySelector('.m'));
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon sx={{ color: 'white', height: '15px', width: '15px' }} />
                    </div>}
                  </div>
                </div>
              )
            }) :
            <p className={styles.no_results}>No records</p>
          }
        </div>
      </div>
      <p className={styles.results}>Showing {number} of {list.length} entries</p>
      <Pagination
        count={nPages}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        color='primary'
        onChange={(e, val) => {
          setCurrentPage(val);
        }} />

      <div id="myModal" className='modal2 m'>
        <div
          className={styles.bg}
          onClick={() => {
            document.querySelector('.m').style.display = "none";
            setReplies([]);
          }}>
        </div>
        <div className={styles.modal_content}>
          <div
            className={styles.close}
            onClick={() => {
              document.querySelector('.m').style.display = "none";
              setReplies([]);
            }}>
            <p>{layout === 2 ? "Approved Topic Answers" : "View Comment"}</p>
            <span><Image src={close} alt='icon' height={24} width={24} /></span>
          </div>

          <div className={styles.cover}>
            <div className={styles.content}>
              {
                replies.length ? replies.map(({ id, creatorName, dis_ref, comment }, i) => {
                  return (
                    <div key={id} className={styles.rep}>
                      <div className={styles.icon}>
                        <EmailIcon sx={{ color: '#024c73' }} fontSize="large" />
                        <button
                          onClick={() => {
                            setMessage('comment');
                            setDocId(id);
                            document.querySelector('.m10').style.display = 'flex';
                          }}
                          className={styles.btn2}>
                          Delete Comment
                        </button>
                      </div>
                      <div>
                        <p className={styles.name}>
                          {layout === 2 ? creatorName : dis_ref?.creatorName}
                          <button
                            onClick={() => {
                              setMessage('comment');
                              setDocId(id);
                              document.querySelector('.m10').style.display = 'flex';
                            }}
                            className={styles.btn2}>
                            Delete Comment
                          </button>
                        </p>
                        <p className={styles.date}>{dateArray[i][0]}</p>
                        <p className={styles.date}>{dateArray[i][1]}</p>
                        <p className={styles.body}>{comment}</p>
                      </div>
                    </div>
                  )
                }) :
                  <p className={styles.empty}>No records</p>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForumList