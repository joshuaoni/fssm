import React from 'react';
import Header from '../../components/Headers/Header';
import HeaderComponent from '../../components/Headers/HeaderComponent';
import Footer from '../../components/Footers/Footer';
import Disclaimer from '../../components/Sections/Disclaimer/Disclaimer';
import Faqs from '../../components/Sections/Faqs/Faqs';
import Layout from '../../components/Sections/Layout/Layout';
import Head from 'next/head';

const Faq = () => {
  return (
    <>
      <Head>
        <title>FAQs</title>
        <meta name="description" content="SWACHH FSSM Website" />
      </Head>

      <Header />
      <HeaderComponent />

      <Layout>
        <Faqs />
      </Layout>

      <Disclaimer />

      <Footer />
    </>
  )
}

export default Faq