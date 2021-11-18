import React from 'react';
import Header from '../Navbar/Header';
import Head from 'next/head';

import Styles from './Layout.module.scss';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className={Styles.main}>{children}</main>
    </>
  );
}
