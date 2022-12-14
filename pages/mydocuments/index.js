import React from 'react';
import DashboardHeader from '../../components/Dashboard/Header/DashboardHeader';
import MyDocuments from '../../components/Dashboard/MyDocuments/MyDocuments';
import SideBar from '../../components/Dashboard/SideBar/SideBar';
import styles from '../../styles/Home.module.css';
import Layout from '../../components/Sections/Layout/Layout';
import Head from 'next/head';

const Documents = () => {
  return (
    <>
      <Head>
        <title>My Documents</title>
        <meta name="description" content="SWACHH FSSM Website" />
      </Head>

      <Layout>
        <DashboardHeader />

        <div className={styles.dash_cont}>
          <div>
            <SideBar />
          </div>
          <div>
            <MyDocuments />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Documents