import React, { Fragment } from 'react';
import Head from 'next/head';
import Login from '../../components/Login/Login';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Friend &mdash; Login</title>
      </Head>
      <Login />
    </Fragment>
  );
}
