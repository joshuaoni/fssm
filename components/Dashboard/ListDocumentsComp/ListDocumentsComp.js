import React, { useState, useEffect } from 'react';
import styles from './ListDocumentsComp.module.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Pagination } from '@mui/material';
import { GrDescend } from "react-icons/gr";
import { GrAscend } from "react-icons/gr";
import { RiArrowUpDownLine } from "react-icons/ri";
import pdf from "../../../assets/pdf.png"
import Image from 'next/image';

const ListDocumentsComp = ({ dateArray, documents }) => {
  const [number, setNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [nPages, setNPages] = useState(1);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);

  const [serialIcon, setSerialIcon] = useState("true");
  const [titleIcon, setTitleIcon] = useState("true");
  const [descIcon, setDescIcon] = useState("true");
  const [dateIcon, setDateIcon] = useState("true");
  const [partner, setPartner] = useState("true");
  const [theme, setTheme] = useState("true");
  const [subCat, setSubCat] = useState("true");
  const [stake, setStake] = useState("true");
  const [valueChain, setValueChain] = useState("true");
  const [state, setState] = useState("true");
  const [city, setCity] = useState("true");
  const [lang, setLang] = useState("true");
  const [geo, setGeo] = useState("true");
  const [urban, setUrban] = useState("true");
  const [citation, setCitation] = useState("true");
  console.log(currentRecords);





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
  const handlePartner = () => {
    if (partner === "true") {
      setPartner("ascending");
    }
    else if (partner === "ascending") {
      setPartner("descending");
    }
    else {
      setPartner("ascending");
    }
    requestSort('organization')
  }
  const handleTheme = () => {
    if (theme === "true") {
      setTheme("ascending");
    }
    else if (theme === "ascending") {
      setTheme("descending");
    }
    else {
      setTheme("ascending");
    }
    requestSort('theme')
  }
  const handleSubCat = () => {
    if (subCat === "true") {
      setSubCat("ascending");
    }
    else if (subCat === "ascending") {
      setSubCat("descending");
    }
    else {
      setSubCat("ascending");
    }
    requestSort('sub_cat')
  }
  const handleStake = () => {
    if (stake === "true") {
      setStake("ascending");
    }
    else if (stake === "ascending") {
      setStake("descending");
    }
    else {
      setStake("ascending");
    }
    requestSort('stake_holder')
  }
  const handleValueChain = () => {
    if (valueChain === "true") {
      setValueChain("ascending");
    }
    else if (valueChain === "ascending") {
      setValueChain("descending");
    }
    else {
      setValueChain("ascending");
    }
    requestSort('value_chain')
  }
  const handleState = () => {
    if (state === "true") {
      setState("ascending");
    }
    else if (state === "ascending") {
      setState("descending");
    }
    else {
      setState("ascending");
    }
    requestSort('state')
  }
  const handleCity = () => {
    if (city === "true") {
      setCity("ascending");
    }
    else if (city === "ascending") {
      setCity("descending");
    }
    else {
      setCity("ascending");
    }
    requestSort('city')
  }
  const handleLang = () => {
    if (lang === "true") {
      setLang("ascending");
    }
    else if (lang === "ascending") {
      setLang("descending");
    }
    else {
      setLang("ascending");
    }
    requestSort('language')
  }
  const handleGeo = () => {
    if (geo === "true") {
      setGeo("ascending");
    }
    else if (geo === "ascending") {
      setGeo("descending");
    }
    else {
      setGeo("geography");
    }
    requestSort('createdOn')
  }
  const handleUrban = () => {
    if (urban === "true") {
      setUrban("ascending");
    }
    else if (urban === "ascending") {
      setUrban("descending");
    }
    else {
      setUrban("ascending");
    }
    requestSort('status')
  }
  const handleCitation = () => {
    if (citation === "true") {
      setCitation("ascending");
    }
    else if (citation === "ascending") {
      setCitation("descending");
    }
    else {
      setCitation("ascending");
    }
    requestSort('citation')
  }






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
  }, [update])

  useEffect(() => {
    documents.length && setList(...documents);
  }, [documents])



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
                setUpdate(!update);
              }} />
          </div>
        </div>

        <div className={styles.cont}>
          <div className={styles.heading}>
            <div onClick={handleSerial} className={styles.one}>
              <p>S.NO</p>
              <div className={styles.icon}>{serialIcon === "true" ? <RiArrowUpDownLine /> : serialIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div className={styles.two}>
              <p>Thumbnail</p>
              <div className={styles.icon}><RiArrowUpDownLine /></div>
            </div>
            <div onClick={handleTitle} className={styles.two}>
              <p>Title</p>
              <div className={styles.icon}>{titleIcon === "true" ? <RiArrowUpDownLine /> : titleIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleDesc} className={styles.two}>
              <p>Document Name</p>
              <div className={styles.icon}>{descIcon === "true" ? <RiArrowUpDownLine /> : descIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleDate} className={styles.two}>
              <p>Created On</p>
              <div className={styles.icon}>{dateIcon === "true" ? <RiArrowUpDownLine /> : dateIcon === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handlePartner} className={styles.two}>
              <p>Partner</p>
              <div className={styles.icon}>{partner === "true" ? <RiArrowUpDownLine /> : partner === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleTheme} className={styles.two}>
              <p>Theme</p>
              <div className={styles.icon}>{theme === "true" ? <RiArrowUpDownLine /> : theme === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleSubCat} className={styles.two}>
              <p>Sub Category</p>
              <div className={styles.icon}>{subCat === "true" ? <RiArrowUpDownLine /> : subCat === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleStake} className={styles.two}>
              <p>Stake Holder</p>
              <div className={styles.icon}>{stake === "true" ? <RiArrowUpDownLine /> : stake === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleValueChain} className={styles.two}>
              <p>Value Chain</p>
              <div className={styles.icon}>{valueChain === "true" ? <RiArrowUpDownLine /> : valueChain === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleState} className={styles.two}>
              <p>State</p>
              <div className={styles.icon}>{state === "true" ? <RiArrowUpDownLine /> : state === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleCity} className={styles.two}>
              <p>City</p>
              <div className={styles.icon}>{city === "true" ? <RiArrowUpDownLine /> : city === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleLang} className={styles.two}>
              <p>Language</p>
              <div className={styles.icon}>{lang === "true" ? <RiArrowUpDownLine /> : lang === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleGeo} className={styles.two}>
              <p>Geography</p>
              <div className={styles.icon}>{geo === "true" ? <RiArrowUpDownLine /> : geo === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleUrban} className={styles.two}>
              <p>Urban/Rural</p>
              <div className={styles.icon}>{urban === "true" ? <RiArrowUpDownLine /> : urban === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
            <div onClick={handleCitation} className={styles.two}>
              <p>Citation</p>
              <div className={styles.icon}>{citation === "true" ? <RiArrowUpDownLine /> : citation === "ascending" ? <GrAscend /> : <GrDescend />}</div>
            </div>
          </div>
          {
            currentRecords.length ?
              sortedItems.map(({ id, sub_cat, description, title, theme, organization, language, geography, stake_holder, status, state, value_chain, citation, city, createdOn }, i) => {
                return (
                  <div key={id} className={i % 2 !== 0 ? styles.row : styles.row2}>
                    <div className={styles.one}>
                      <p>{i + 1 + number * (currentPage - 1)}</p>
                      {/* <p>{id - 636 + number * (currentPage - 1)}</p> */}
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
                    <div className={styles.two}>
                      <p>{title}</p>
                    </div>
                    <div className={styles.two}>
                      <p>{description}</p>
                    </div>
                    <div className={styles.two}>
                      {/* <p>{dateArray[i]}</p> */}
                      <p>{createdOn.split("T")[0]} {createdOn.split("T")[1].split("+")[0].split(":")[0] > 12 ? `${createdOn.split("T")[1].split("+")[0].split(":")[0] - 12}` : `${createdOn.split("T")[1].split("+")[0].split(":")[0]}`}:{createdOn.split("T")[1].split("+")[0].split(":")[1]} {createdOn.split("T")[1].split("+")[0].split(":")[0] > 12 ? "PM" : "AM"}</p>
                    </div>
                    <div className={styles.two}>
                      <p>{organization?.org_name}</p>
                    </div>
                    <div className={styles.two}>
                      <p>{theme?.theme_title}</p>
                    </div>
                    <div className={styles.two}>
                      <p>
                        {
                          sub_cat?.map(({ subcat_title }) => {
                            return subcat_title + ', ';
                          })
                        }
                      </p>
                    </div>
                    <div className={styles.two}>
                      <p>
                        {
                          stake_holder?.map(({ stake_holderName }) => {
                            return stake_holderName + ', ';
                          })
                        }
                      </p>
                    </div>
                    <div className={styles.two}>
                      <p>
                        {
                          value_chain?.map(({ vc_name }) => {
                            return vc_name + ', ';
                          })
                        }
                      </p>
                    </div>
                    <div className={styles.two}>
                      <p>
                        {
                          state?.map(({ stateName }) => {
                            return stateName + ', ';
                          })
                        }
                      </p>
                    </div>
                    <div className={styles.two}>
                      <p>{city}</p>
                    </div>
                    <div className={styles.two}>
                      <p>
                        {
                          language?.map(({ lang }) => {
                            return lang + ', ';
                          })
                        }
                      </p>
                    </div>
                    <div className={styles.two}>
                      <p>{geography}</p>
                    </div>
                    <div className={styles.two}>
                      <p>{status}</p>
                    </div>
                    <div className={styles.two}>
                      <p>{citation}</p>
                    </div>
                  </div>
                )
              }) :
              <p className={styles.no_results}>No results</p>
          }
        </div>
      </div>
      <p className={styles.results}>Showing {list.length} of {number} enties</p>
      <Pagination
        count={nPages}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        color='primary'
        onChange={(e, val) => {
          setCurrentPage(val);
        }} />
    </>
  )
}

export default ListDocumentsComp