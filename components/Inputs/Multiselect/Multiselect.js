import React, { useEffect, useState } from 'react';
import styles from './Multiselect.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OptionComp from './OptionComp';

const Multiselect = ({ val, content, id, setData, data, placeholder }) => {
  const [string, setString] = useState('');
  const [array, setArray] = useState(content);
  const [updated, setUpdated] = useState(false);
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    setArray(content);
  }, [content])

  const handleDropDown = (el) => {
    el.classList.toggle('none');
  }

  const handleCleanUp = (el) => {
    el.classList.add('none');
  }

  useEffect(() => {
    const newState = content.filter(({ title }) => {
      return title.toLowerCase().includes(string.trim().toLowerCase());
    })
    setArray(newState);
  }, [updated])

  useEffect(() => {
    const el = document.getElementById(`option-${id}`);
    const st = document.getElementById(`option-stakeholder`);
    const va = document.getElementById(`option-value_chain`);
    const pa = document.getElementById(`option-partner`);
    const la = document.getElementById(`option-language`);
    const sta = document.getElementById(`option-status`);
    const stat = document.getElementById(`option-state`);
    const th = document.getElementById(`option-theme`);
    el !== st && handleCleanUp(st);
    el !== va && handleCleanUp(va);
    el !== la && handleCleanUp(la);
    el !== pa && handleCleanUp(pa);
    el !== sta && handleCleanUp(sta);
    el !== stat && handleCleanUp(stat);
    el !== th && handleCleanUp(th);
    handleDropDown(document.getElementById(`option-${id}`))
  }, [dropped])

  useEffect(() => {
    handleCleanUp(document.getElementById(`option-stakeholder`));
    handleCleanUp(document.getElementById(`option-value_chain`));
    handleCleanUp(document.getElementById(`option-partner`));
    handleCleanUp(document.getElementById(`option-language`));
    handleCleanUp(document.getElementById(`option-status`));
    handleCleanUp(document.getElementById(`option-state`));
    handleCleanUp(document.getElementById(`option-theme`));
  }, [])

  return (
    <div tabIndex="1" onBlur={() => { setDropped(false) }}>
      <div
        className={styles.display}
        // tabIndex="1"
        onClick={() => dropped ? setDropped(false) : setDropped(true)}
      // onClick={() => setDropped(true)}
      // onBlur={() => { setDropped(false) }}
      >
        <div></div>
        <span className={styles.span}>
          {val.length ?
            val.length === content.length ?
              'All selected (' + content.length + ')' :
              val.length > 2 ?
                val.length + ' selected' :
                val.map((text, i) => <span key={text}>{i === val.length - 1 ? text : text + ', '}</span>) :
            placeholder}
        </span>
        <ArrowDropDownIcon />
      </div>

      <div id={`option-${id}`} className={`none ${styles.options}`}>
        <input
          className={styles.input}
          type="text"
          placeholder='Search'
          value={string}
          onChange={(e) => {
            setString(e.target.value);
            setUpdated(!updated);
          }}
        />
        <div className={styles.cont}>
          {
            array.length ?
              array.map(({ title }) => {
                return (
                  <OptionComp val={val} id={id} data={data} setData={setData} key={title} optionName={title} />
                )
              }) :
              <div className={styles.option}>No results</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Multiselect