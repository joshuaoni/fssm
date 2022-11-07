import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import styles from "./AnalyticsPage.module.css"
import DatePickerComponent from '../../Sections/DatePicker/DatePickerComponent';



const AnalyticsPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.label}>Analytics</h4>
        <button className={styles.googleAnalytics}>Google Analytics</button>
        <div className={styles.inputFieldCont}>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Users</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Sessions</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Bounce Rate</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Session Duration</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Sessions by Country</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Sessions by Device</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Traffic Paid / Organic Search</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>All Traffic Sources / Medium</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Refering Sites</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>New / Returning Visitors</h4>
            <div className={styles.inputContent}>
              <div className={styles.inputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pageViews}>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Page Views</h4>
            <div className={styles.pageViewInputContent}>
              <div className={styles.pageViewInputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Search</button>
              </div>
            </div>
            <p className={styles.pageReport}>Page Report</p>
          </div>
        </div>
        <div className={styles.pageViews}>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Most Viewed / Downloaded Documents</h4>
            <div className={styles.pageViewInputContent}>
              <div className={styles.pageViewInputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Search</button>
              </div>
            </div>
            <p className={styles.pageReport}></p>
          </div>
        </div>
        <div className={styles.pageViews}>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Most Visited User Profiles</h4>
            <div className={styles.pageViewInputContent}>
              <div className={styles.pageViewInputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Search</button>
              </div>
            </div>
            <p className={styles.pageReport}></p>
          </div>
        </div>
        <div className={styles.pageViews}>
          <div className={styles.userInput}>
            <h4 className={styles.label1}>Most Viewed Questions</h4>
            <div className={styles.pageViewInputContent}>
              <div className={styles.pageViewInputContainer}>
                <div>
                  <p className={styles.startDate}>Start Date</p>
                  <DatePickerComponent isStart={true} />
                </div>
                <div>
                  <p className={styles.startDate}>End Date</p>
                  <DatePickerComponent isStart={false} />
                </div>
                <button className={styles.submitBtn}>Search</button>
              </div>
            </div>
            <p className={styles.pageReport}></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnalyticsPage