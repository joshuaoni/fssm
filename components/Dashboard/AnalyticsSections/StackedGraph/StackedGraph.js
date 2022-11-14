import React, { useEffect, useState } from 'react';
import styles from './StackedGraph.module.css';
import dynamic from 'next/dynamic';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { getStats } from '../../../../services/dashboardService';
import CircularProgress from '@mui/material/CircularProgress';
import { getOrgStackedGraph } from '../../../../services/dashboardService';
import WarningIcon from '@mui/icons-material/Warning';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StackedGraph = () => {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [options, setOptions] = useState([]);
  const [multiplier, setMultiplier] = useState(90);
  const [series, setSeries] = useState([{
    name: 'Uploaded',
    data: []
  }, {
    name: 'Mapped',
    data: []
  }, {
    name: 'Approved',
    data: []
  }])
  const [option, setOption] = useState({
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 65,
      },
    },
    stroke: {
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [],
      labels: {
        offsetY: 15,
        offsetX: -2,
        formatter: function (val) {
          return val.toFixed(2);
        }
      },
      tickAmount: 10,
      // axisTicks: {
      //   show: true,
      //   borderType: 'solid',
      //   color: '#D5D5D5',
      //   height: 30,
      //   offsetX: 0,
      //   offsetY: 0
      // },
    },
    yaxis: {
      title: {
        text: undefined
      },
      labels: {
        style: {
          fontSize: '14px',
        },
      }
    },
    grid: {
      show: true,
      borderColor: '#D5D5D5',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        bottom: 20
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#22B8CF', '#50CF66', '#CB5DE8']
    },
    legend: {
      position: 'right',
      fontWeight: 600,
      //horizontalAlign: 'left',
      offsetX: -10,
      offsetY: 15,
      markers: {
        width: 17,
        height: 17,
        fillColors: ['#22B8CF', '#50CF66', '#CB5DE8'],
        offsetX: -5,
        offsetY: 2
      },
      itemMargin: {
        vertical: 0
      }
    },
    dataLabels: {
      enabled: false
    }
  })

  const router = useRouter();

  const handleStats = (data) => {
    const cats = Object.keys(data).map((key) => key);

    setOption(current => {
      return {
        ...current,
        xaxis: {
          ...current.xaxis,
          categories: cats
        }
      }
    })

    setOptions([
      ...cats
    ])

    let uploaded = [], approved = [], unmapped = [];
    cats.forEach(item => {
      uploaded.push(data[item].uploaded)
    })

    cats.forEach(item => {
      unmapped.push(data[item].unmapped)
    })

    cats.forEach(item => {
      approved.push(data[item].approved)
    })

    setSeries([
      {
        name: 'Uploaded',
        data: uploaded
      },
      {
        name: 'Mapped',
        data: unmapped
      },
      {
        name: 'Approved',
        data: approved
      }
    ])
    setLoading(false);
  }

  const handleError = (err) => {
    setLoading(false);
    setError(err.message);
    if (err === 'Refresh token expired') {
      Cookies.remove('access');
      Cookies.remove('refresh');
      Cookies.remove('isAdmin');
      router.push('/signin');
    }
    console.log({ e: err })
  }

  useEffect(() => {
    if (window.matchMedia('(max-width:950px').matches) setMultiplier(45);
    getStats((err, res) => {
      if (err) return handleError(err)
      if (res !== null) {
        handleStats(res.data['Stacked Graph'])
      }
    });
  }, []);

  const handleResize = () => {
    if (window.matchMedia('(max-width:950px').matches) {
      setMultiplier(45);
    } else {
      setMultiplier(90);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  const handleStart = (val) => {
    const day = val ?
      val['$D'].toString().length === 1 ? '0' + val['$D'].toString() : val['$D'] :
      startDate['$D'];
    const month = val ?
      val['$M'].toString().length === 1 ? '0' + (val['$M'] + 1).toString() : val['$M'] + 1 :
      startDate['$M'];
    const year = val ? val['$y'] : startDate['$y'];
    setFormError(null);
    setStart(`${year}-${month}-${day}`)
    setStartDate(val);
  };

  const handleEnd = (val) => {
    const day = val ?
      val['$D'].toString().length === 1 ? '0' + val['$D'].toString() : val['$D'] :
      endDate['$D'];
    const month = val ?
      val['$M'].toString().length === 1 ? '0' + (val['$M'] + 1).toString() : val['$M'] + 1 :
      endDate['$M'];
    const year = val ? val['$y'] : endDate['$y'];
    setFormError(null);
    setEnd(`${year}-${month}-${day}`);
    setEndDate(val);
  }

  const handleSubmit = () => {
    console.log(option.xaxis.categories.length)
    if (startDate['$y'] > endDate['$y'] ||
      (startDate['$y'] === endDate['$y'] && startDate['$M'] > endDate['$M']) ||
      (startDate['$y'] === endDate['$y'] && startDate['$M'] === endDate['$M'] && startDate['$D'] >= endDate['$D'])) {
      setFormError('Start date must be earlier than end date');
    } else if (value === null) {
      setFormError('Select organization name');
    } else {
      setLoading(true);

      getOrgStackedGraph({
        org: value,
        start,
        end
      }, (err, res) => {
        if (err) return handleError(err);
        if (res !== null) {
          setMultiplier(180);
          setLoading(false);

          setOption(current => {
            return {
              ...current,
              xaxis: {
                ...current.xaxis,
                categories: [value]
              }
            }
          })

          setSeries([
            {
              name: 'Uploaded',
              data: [res.data['No Of Docs Uploaded']]
            },
            {
              name: 'Mapped',
              data: [res.data['No Of Docs Mapped']]
            },
            {
              name: 'Approved',
              data: [res.data['No Of Docs Approved']]
            }
          ])
          console.log({ r: res });
        }
      });
    }
    setTimeout(() => {
      setFormError(null);
    }, 2000);
  }

  useEffect(() => {
    const el = document.getElementById('stack-error');
    formError === null ? el.classList.add('none') : el.classList.remove('none');
  }, [formError])

  return (
    <>
      <section className={styles.container}>
        <h4 className={styles.label}>Stacked Graph</h4>
        <div className={styles.filter}>
          <div>
            <p className={styles.title}>Organization Name</p>
            <Autocomplete
              className={styles.select}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => <TextField {...params} placeholder="--Select--" />}
            />
          </div>

          <div>
            <p className={styles.title}>Start Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <MobileDatePicker
                className={styles.date}
                inputFormat="MM/DD/YYYY"
                value={startDate}
                onChange={handleStart}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              <DatePicker
                className={styles.date}
                clearable={true}
                open={startDateOpen}
                maxDate={new Date()}
                onClose={() => setStartDateOpen(false)}
                inputFormat="MM/DD/YYYY"
                value={startDate}
                onChange={(e) => {
                  handleStart;
                  setStartDate(e);
                }}
                placeholder={""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: ""
                    }}
                    onClick={() => setStartDateOpen(true)}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div>
            <p className={styles.title}>End Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <MobileDatePicker
                className={styles.date}
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={handleEnd}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              <DatePicker
                className={styles.date}
                clearable={true}
                open={endDateOpen}
                maxDate={new Date()}
                onClose={() => setEndDateOpen(false)}
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={(e) => {
                  handleEnd;
                  setEndDate(e);
                }}
                placeholder={""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: ""
                    }}
                    onClick={() => setEndDateOpen(true)}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <button onClick={() => { handleSubmit(); }} className={styles.btn}>Search</button>
        </div>

        {error ?
          // <span className={`error ${styles.justify_center}`}>{error}</span> :
          null :
          <div className={styles.chart}>
            {loading ?
              <div className={styles.justify_center}><CircularProgress /></div> :
              <div className={styles.div} id="chart">
                <ReactApexChart options={option} height={option.xaxis.categories.length * multiplier} series={series} type="bar" />
              </div>
            }
          </div>}
      </section>


      <div id='stack-error' className={`none  ${styles.error_cont}`}><div className={`${styles.tc} form-error`}><WarningIcon />{formError}</div></div>
    </>
  )
}

export default StackedGraph