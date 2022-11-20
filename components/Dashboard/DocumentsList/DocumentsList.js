import React, { useEffect, useState } from 'react';
import styles from './DocumentsList.module.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import EditCategory from '../EditCategory/EditCategory';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { delMyDocs } from '../../../services/mydocumentServices';
import DeletePopup from '../DeletePopup/DeletePopup';
import { useRouter } from 'next/router';
import { delAllDocs } from '../../../services/allDocumentServices';
import ViewDocument from '../ViewDocument/ViewDocument';
import AlertCard from '../AlertCard/AlertCard';
import Cookies from 'js-cookie';
import { Pagination } from '@mui/material';
import { GrDescend } from "react-icons/gr";
import { GrAscend } from "react-icons/gr";
import { RiArrowUpDownLine } from "react-icons/ri";
import pdf from "../../../assets/pdf.png"
import Image from 'next/image';

const DocumentsList = ({ updating, setUpdating, documents, dateArray }) => {
  const [number, setNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [nPages, setNPages] = useState(1);
  const [search, setSearch] = useState('');
  const [list, setList] = useState(documents);
  const [updated, setUpdated] = useState(false);
  const [update, setUpdate] = useState(false);
  const [docId, setDocId] = useState(null);
  const [currentDoc, setCurrentDoc] = useState([]);
  const [index, setIndex] = useState(null);
  const [click, setClick] = useState(false);
  const [docDetails, setDocDetails] = useState({
    categories: [],
    stake_holder: [],
    valueChain: [],
    states: [],
    languages: [],
    chips: [],
    theme: ''
  });
  const [serialIcon, setSerialIcon] = useState("true");
  const [titleIcon, setTitleIcon] = useState("true");
  const [descIcon, setDescIcon] = useState("true");
  const [dateIcon, setDateIcon] = useState("true");



  const [sortConfig, setSortConfig] = useState(null);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...currentRecords];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
    console.log(sortableItems)
  }, [currentRecords, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  const handleSerial = () => {
    if (serialIcon === "true") {
      setSerialIcon("ascending");
    }
    else if (serialIcon === "ascending") {
      setSerialIcon("descending");
    }
    else {
      setSerialIcon("ascending");
    }
    requestSort('id')
  }
  const handleTitle = () => {
    if (titleIcon === "true") {
      setTitleIcon("ascending");
    }
    else if (titleIcon === "ascending") {
      setTitleIcon("descending");
    }
    else {
      setTitleIcon("ascending");
    }
    requestSort('title')
  }
  const handleDesc = () => {
    if (descIcon === "true") {
      setDescIcon("ascending");
    }
    else if (descIcon === "ascending") {
      setDescIcon("descending");
    }
    else {
      setDescIcon("ascending");
    }
    requestSort('description')
  }
  const handleDate = () => {
    if (dateIcon === "true") {
      setDateIcon("ascending");
    }
    else if (dateIcon === "ascending") {
      setDateIcon("descending");
    }
    else {
      setDateIcon("ascending");
    }
    requestSort('createdOn')
  }















  const router = useRouter();

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
    handleFilter();
  }, [updated])

  useEffect(() => {
    setList(documents);
    setClick(!click);
    setIndex(0);
  }, [documents])

  const handleError = (err) => {
    console.log({ e: err })
  }

  const handleDelete = (id, confirmation) => {
    console.log(id);
    if (router.pathname === '/mydocuments') {
      delMyDocs(id, (err, res) => {
        if (err) return handleError(err)
        if (res !== null) {
          console.log({ r: res })
          if (res.data.message === 'Document has been deleted') {
            confirmation.style.display = "flex";
          }
        }
      })
    } else if (router.pathname === '/documents') {
      delAllDocs(id, (err, res) => {
        if (err) return handleError(err)
        if (res !== null) {
          console.log({ r: res })
          if (res.data.message === 'Document has been deleted') {
            confirmation.style.display = "flex";
          }
        }
      })
    }
  }

  useEffect(() => {
    let data = [];
    currentRecords.forEach((doc) => {
      data.push({
        id: doc.id,
        theme: doc.theme?.theme_title,
        title: doc.title,
        citation: doc.citation,
        description: doc.description,
        city: doc.city,
        status: doc.status,
        geography: doc.geography,
        doc_type: doc.document_type === 'file' ? 'file' : 'URL',
        categories: [
          doc.sub_cat?.map(({ subcat_title }) => {
            return subcat_title;
          })
        ][0],
        stake_holder: [
          doc.stake_holder?.map(({ stake_holderName }) => {
            return stake_holderName;
          })
        ][0],
        valueChain: [
          doc.value_chain?.map(({ vc_name }) => {
            return vc_name;
          })
        ][0],
        states: [
          doc.state?.map(({ stateName }) => {
            return stateName;
          })
        ][0],
        languages: [
          doc.language?.map(({ lang }) => {
            return lang;
          })
        ][0],
        chips: [
          doc.keywords?.map(({ keyword }) => {
            return keyword;
          })
        ][0]
      })
    });
    setDocDetails(data[index]);
  }, [click, index])

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
            <div onClick={handleSerial} className={styles.one}>
              <p>S.NO</p>
              <div className={styles.icon}>{serialIcon === "true" ? <RiArrowUpDownLine /> : serialIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div className={styles.one}>
              <p>Thumbnail</p>
              <div className={styles.icon}><RiArrowUpDownLine /></div>
            </div>
            <div onClick={handleTitle} className={styles.two}>
              <p>Title</p>
              <div className={styles.icon}>{titleIcon === "true" ? <RiArrowUpDownLine /> : titleIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleDesc} className={styles.three}>
              <p>Document Name</p>
              <div className={styles.icon}>{descIcon === "true" ? <RiArrowUpDownLine /> : descIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleDate} className={styles.four}>
              <p>Created Date</p>
              <div className={styles.icon}>{dateIcon === "true" ? <RiArrowUpDownLine /> : dateIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div className={styles.five}>
              <p>Action</p>
              <div className={styles.icon}><RiArrowUpDownLine /></div>
            </div>
          </div>
          {currentRecords?.length ?
            sortedItems.map(({ id, description, title, createdOn }, i) => {
              return (
                <div key={id} className={i % 2 !== 0 ? styles.row : styles.row2}>
                  <div className={styles.one}>
                    <p>{i + 1 + number * (currentPage - 1)}</p>
                    {/* <p>{id - 636 + number * (currentPage - 1)}</p> */}
                  </div>
                  <div className={styles.one}>
                    <div className={styles.pdf}>
                      <Image
                        src={pdf}
                        alt="Picture of pdf"
                        width={47}
                        height={54} />
                    </div>
                  </div>
                  <div className={styles.two}>
                    {title}
                  </div>
                  <div className={styles.three}>
                    <p>{description}</p>
                  </div>
                  <div className={styles.four}>
                    {/* <p>{dateArray[i]}</p> */}
                    <p>{createdOn.split("T")[0]} {createdOn.split("T")[1].split("+")[0].split(":")[0] > 12 ? `${createdOn.split("T")[1].split("+")[0].split(":")[0] - 12}` : `${createdOn.split("T")[1].split("+")[0].split(":")[0]}`}:{createdOn.split("T")[1].split("+")[0].split(":")[1]} {createdOn.split("T")[1].split("+")[0].split(":")[0] > 12 ? "PM" : "AM"}</p>
                  </div>
                  <div className={styles.five}>
                    {!(Cookies.get('isAdmin') !== 'true' && router.pathname === '/documents') && <div
                      title='delete'
                      onClick={() => {
                        setDocId(id);
                        document.querySelector('.m10').style.display = "flex";
                      }}
                      className={`${styles.btn} ${styles.delbtn}`}>
                      <DeleteOutlineOutlinedIcon sx={{ color: '#e95454', height: '15px', width: '15px' }} />
                    </div>}
                    <div
                      className={`${styles.btn} ${styles.viewbtn}`}
                      title='view'
                      data-modal="myModal"
                      onClick={() => {
                        setCurrentDoc({ ...currentRecords[i], date: dateArray[i] });
                        document.querySelector('.m').style.display = "flex";
                      }}
                    >
                      <RemoveRedEyeOutlinedIcon sx={{ color: 'white', height: '15px', width: '15px' }} />
                    </div>
                    {!(Cookies.get('isAdmin') !== 'true' && router.pathname === '/documents') && <div
                      title='edit'
                      className={`${styles.btn} ${styles.editbtn}`}
                      data-modal="myModal"
                      onClick={() => {
                        setClick(!click);
                        setIndex(i);
                        document.querySelector('.m2').style.display = "flex";
                      }}
                    >
                      <CheckBoxOutlinedIcon sx={{ height: '15px', width: '15px' }} />
                    </div>}
                  </div>
                </div>
              )
            }) :
            <p className={styles.no_results}>No results</p>
          }
        </div>
      </div>
      <p className={styles.results}>Showing {list?.length ? `${list?.length}` : `${list?.length}`} of {number} enties</p>
      <Pagination
        count={nPages}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        color='primary'
        onChange={(e, val) => {
          setCurrentPage(val);
        }} />

      <ViewDocument click={click} setClick={setClick} setDocId={setDocId} currentDoc={currentDoc} />

      <EditCategory update={update} setUpdate={setUpdate} docDetails={docDetails} />

      <DeletePopup docId={docId} handleDelete={handleDelete} />

      <AlertCard message='Document Edited Sucessfully' />
    </>
  )
}

export default DocumentsList