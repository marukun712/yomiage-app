import { useState } from 'react';
import Form from '../components/form'
import { useLeavePageConfirm } from '../components/leave'
import Head from 'next/head'

export default function Home() {
  useLeavePageConfirm();
  return (
    <>
      <Head>
        <title>読み上げアプリ(仮)</title>
      </Head>
      <Form />
    </>
  )
}


